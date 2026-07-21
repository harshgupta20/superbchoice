"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QRCode from "react-qr-code";
import { X, ShieldCheck, Smartphone, Check, ArrowRight, Truck, Banknote } from "lucide-react";
import { upiLink, whatsappLink, upi } from "@/lib/config";
import { ONLINE_PRICE, COD_PRICE } from "@/lib/designs";
import { formatPrice } from "@/lib/utils";

const STORE_KEY = "sc_buyer";
const PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Checkout({ order, onClose }) {
  const open = !!order;
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [touched, setTouched] = useState(false);
  const [paid, setPaid] = useState(false);
  const [method, setMethod] = useState("online"); // "online" | "cod"

  // Prefill from last time + lock scroll while open.
  useEffect(() => {
    if (!open) return;
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (saved) setForm((f) => ({ ...f, ...saved }));
    } catch {}
    setTouched(false);
    setPaid(false);
    setMethod("online");
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const errors = {
    name: form.name.trim().length < 2 ? "Enter your name" : "",
    phone: !PHONE_RE.test(form.phone) ? "Enter a valid 10-digit number" : "",
    email: !EMAIL_RE.test(form.email) ? "Enter a valid email" : "",
  };
  const valid = !errors.name && !errors.phone && !errors.email;

  const set = (k) => (e) => {
    let v = e.target.value;
    if (k === "phone") v = v.replace(/\D/g, "").slice(0, 10);
    setForm((f) => ({ ...f, [k]: v }));
  };

  const persist = () => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(form));
    } catch {}
  };

  // Guard the payment / confirm links until details are valid.
  const guard = (after) => (e) => {
    if (!valid) {
      e.preventDefault();
      setTouched(true);
      return;
    }
    persist();
    after?.();
  };

  const qty = order?.qty || 1;
  const onlineTotal = ONLINE_PRICE * qty;
  const codTotal = COD_PRICE * qty;
  const amount = method === "cod" ? codTotal : onlineTotal;

  const link = order ? upiLink({ amount: onlineTotal, note: order.note }) : "";

  const onlineMsg =
    `Hi superb.choice! ✅ I've placed an order & paid online (UPI).\n` +
    `• Item: ${order?.title}\n• Qty: ${qty}\n• Amount paid: ${formatPrice(onlineTotal)}\n` +
    `• Name: ${form.name}\n• Phone: ${form.phone}\n• Email: ${form.email}\n` +
    `I'll share my delivery address here. Please confirm & ship. 🙏`;

  const codMsg =
    `Hi superb.choice! 🛵 I want to place a *Cash on Delivery* order.\n` +
    `• Item: ${order?.title}\n• Qty: ${qty}\n• Amount to pay on delivery: ${formatPrice(codTotal)}\n` +
    `• Name: ${form.name}\n• Phone: ${form.phone}\n• Email: ${form.email}\n` +
    `I'll share my delivery address here. Please confirm the order. 🙏`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
            className="no-scrollbar max-h-[92svh] w-full max-w-md overflow-y-auto rounded-t-[2rem] border border-white/12 bg-night-900/95 p-5 backdrop-blur-xl sm:rounded-[2rem]"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-white">Secure Checkout</h3>
                <p className="text-xs text-white/50">Pay online or Cash on Delivery</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close checkout"
                className="flex h-9 w-9 items-center justify-center rounded-full glass text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Order summary */}
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-white">{order?.title}</p>
                <p className="text-xs text-white/50">Qty {qty}</p>
              </div>
              <span className="font-display text-xl font-extrabold text-gradient-gold">{formatPrice(amount)}</span>
            </div>

            {/* Payment method */}
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">Payment method</p>
            <div className="mb-4 grid grid-cols-2 gap-2">
              <MethodCard
                active={method === "online"}
                onClick={() => setMethod("online")}
                title="Pay Online"
                price={formatPrice(onlineTotal)}
                note="UPI · GPay · PhonePe"
                badge={`Save ${formatPrice(codTotal - onlineTotal)}`}
              />
              <MethodCard
                active={method === "cod"}
                onClick={() => setMethod("cod")}
                title="Cash on Delivery"
                price={formatPrice(codTotal)}
                note="Pay when it arrives"
              />
            </div>

            {/* Free delivery highlight */}
            <div className="mb-5 flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-sm font-semibold text-emerald-300">
              <Truck size={16} /> Free Home Delivery across India
            </div>

            {/* Details form */}
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">Your details</p>
            <div className="flex flex-col gap-3">
              <Field label="Full name" value={form.name} onChange={set("name")} error={touched && errors.name} placeholder="e.g. Aarav Sharma" autoComplete="name" />
              <Field label="Phone (WhatsApp)" value={form.phone} onChange={set("phone")} error={touched && errors.phone} placeholder="10-digit mobile number" inputMode="numeric" autoComplete="tel" />
              <Field label="Email" value={form.email} onChange={set("email")} error={touched && errors.email} placeholder="you@email.com" type="email" autoComplete="email" />
            </div>

            {method === "online" ? (
              <>
                {/* Pay via UPI */}
                <a
                  href={valid ? link : undefined}
                  onClick={guard(() => setPaid(true))}
                  className={`mt-5 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full text-base font-bold transition-transform active:scale-[0.98] ${
                    valid ? "text-night-950" : "cursor-pointer text-night-950/60"
                  }`}
                  style={{ backgroundImage: valid ? "linear-gradient(135deg,#fff4d6,#ffd369 45%,#e6b84c)" : "linear-gradient(135deg,#6b6252,#7d7460)" }}
                >
                  <Smartphone size={18} /> Pay {formatPrice(onlineTotal)} via UPI
                </a>
                <p className="mt-2 text-center text-[11px] text-white/45">Opens Google Pay, PhonePe, Paytm & any UPI app</p>

                {/* QR fallback */}
                <div className="mt-5 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3 self-stretch text-[11px] uppercase tracking-wider text-white/35">
                    <span className="h-px flex-1 bg-white/10" /> or scan to pay <span className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="rounded-2xl bg-white p-3">
                    <QRCode value={link} size={148} fgColor="#0b0b0b" bgColor="#ffffff" level="M" />
                  </div>
                  <p className="text-[11px] text-white/45">Scan with any UPI app · pays {upi.id}</p>
                </div>

                {/* Confirm on WhatsApp */}
                <div className={`mt-5 rounded-2xl border p-4 transition-colors ${paid ? "border-gold/40 bg-gold/[0.06]" : "border-white/10 bg-white/[0.02]"}`}>
                  <p className="flex items-center gap-2 text-sm font-semibold text-white">
                    {paid ? <Check size={16} className="text-gold" /> : <ArrowRight size={16} className="text-gold" />}
                    {paid ? "Last step — confirm your order" : "After paying, confirm your order"}
                  </p>
                  <p className="mt-1 text-xs text-white/55">
                    Send your details (and payment screenshot) on WhatsApp so we can ship it out fast.
                  </p>
                  <a
                    href={valid ? whatsappLink(onlineMsg) : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={guard()}
                    className={`mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full text-sm font-bold ${valid ? "text-white" : "text-white/50"}`}
                    style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
                  >
                    Confirm on WhatsApp
                  </a>
                </div>
              </>
            ) : (
              <>
                {/* Cash on Delivery */}
                <a
                  href={valid ? whatsappLink(codMsg) : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={guard()}
                  className={`mt-5 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full text-base font-bold transition-transform active:scale-[0.98] ${
                    valid ? "text-night-950" : "cursor-pointer text-night-950/60"
                  }`}
                  style={{ backgroundImage: valid ? "linear-gradient(135deg,#fff4d6,#ffd369 45%,#e6b84c)" : "linear-gradient(135deg,#6b6252,#7d7460)" }}
                >
                  <Banknote size={18} /> Place COD Order — {formatPrice(codTotal)}
                </a>
                <p className="mt-2 text-center text-[11px] text-white/45">
                  Confirm on WhatsApp · pay {formatPrice(codTotal)} in cash when it's delivered
                </p>
              </>
            )}

            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-white/40">
              <ShieldCheck size={13} className="text-gold" /> Secure checkout · Free home delivery
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MethodCard({ active, onClick, title, price, note, badge }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-start rounded-2xl border px-3.5 py-3 text-left transition-all ${
        active ? "border-gold bg-gold/10" : "border-white/12 bg-white/[0.03]"
      }`}
    >
      {badge && (
        <span className="absolute -top-2 left-2 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[9px] font-bold text-night-950">
          {badge}
        </span>
      )}
      <span className="text-[13px] font-bold text-white">{title}</span>
      <span className="font-display text-lg font-extrabold text-gold">{price}</span>
      <span className="text-[10px] text-white/50">{note}</span>
      <span
        className={`absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full border ${
          active ? "border-gold bg-gold text-night-950" : "border-white/30"
        }`}
      >
        {active && <Check size={11} strokeWidth={3} />}
      </span>
    </button>
  );
}

function Field({ label, error, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-white/60">{label}</span>
      <input
        {...props}
        className={`w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-gold/60 ${
          error ? "border-red-500/60" : "border-white/12"
        }`}
      />
      {error && <span className="mt-1 block text-[11px] text-red-400">{error}</span>}
    </label>
  );
}
