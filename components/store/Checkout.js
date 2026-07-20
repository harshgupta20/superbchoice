"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QRCode from "react-qr-code";
import { X, ShieldCheck, Smartphone, Check, ArrowRight } from "lucide-react";
import { upiLink, whatsappLink, upi } from "@/lib/config";
import { formatPrice } from "@/lib/utils";

const STORE_KEY = "sc_buyer";
const PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Checkout({ order, onClose }) {
  const open = !!order;
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [touched, setTouched] = useState(false);
  const [paid, setPaid] = useState(false);

  // Prefill from last time + lock scroll while open.
  useEffect(() => {
    if (!open) return;
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (saved) setForm((f) => ({ ...f, ...saved }));
    } catch {}
    setTouched(false);
    setPaid(false);
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

  const link = order ? upiLink({ amount: order.amount, note: order.note }) : "";
  const waMsg = order
    ? `Hi superb.choice! ✅ I've placed an order & paid via UPI.\n` +
      `• Item: ${order.title}\n` +
      `• Qty: ${order.qty}\n` +
      `• Amount: ${formatPrice(order.amount)}\n` +
      `• Name: ${form.name}\n` +
      `• Phone: ${form.phone}\n` +
      `• Email: ${form.email}\n` +
      `Please confirm & ship. 🙏`
    : "";

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
                <p className="text-xs text-white/50">Pay directly from your phone</p>
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
            <div className="mb-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-white">{order?.title}</p>
                <p className="text-xs text-white/50">Qty {order?.qty}</p>
              </div>
              <span className="font-display text-xl font-extrabold text-gradient-gold">
                {order ? formatPrice(order.amount) : ""}
              </span>
            </div>

            {/* Details form */}
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">Your details</p>
            <div className="flex flex-col gap-3">
              <Field label="Full name" value={form.name} onChange={set("name")} error={touched && errors.name} placeholder="e.g. Aarav Sharma" autoComplete="name" />
              <Field label="Phone (WhatsApp)" value={form.phone} onChange={set("phone")} error={touched && errors.phone} placeholder="10-digit mobile number" inputMode="numeric" autoComplete="tel" />
              <Field label="Email" value={form.email} onChange={set("email")} error={touched && errors.email} placeholder="you@email.com" type="email" autoComplete="email" />
            </div>

            {/* Pay via UPI */}
            <a
              href={valid ? link : undefined}
              onClick={guard(() => setPaid(true))}
              className={`mt-5 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full text-base font-bold transition-transform active:scale-[0.98] ${
                valid ? "text-night-950" : "cursor-pointer text-night-950/60"
              }`}
              style={{ backgroundImage: valid ? "linear-gradient(135deg,#fff4d6,#ffd369 45%,#e6b84c)" : "linear-gradient(135deg,#6b6252,#7d7460)" }}
            >
              <Smartphone size={18} /> Pay {order ? formatPrice(order.amount) : ""} via UPI
            </a>
            <p className="mt-2 text-center text-[11px] text-white/45">
              Opens Google Pay, PhonePe, Paytm & any UPI app
            </p>

            {/* QR fallback */}
            <div className="mt-5 flex flex-col items-center gap-2">
              <div className="flex items-center gap-3 self-stretch text-[11px] uppercase tracking-wider text-white/35">
                <span className="h-px flex-1 bg-white/10" /> or scan to pay <span className="h-px flex-1 bg-white/10" />
              </div>
              <div className="rounded-2xl bg-white p-3">
                {order && <QRCode value={link} size={148} fgColor="#0b0b0b" bgColor="#ffffff" level="M" />}
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
                Send us your details (and payment screenshot) on WhatsApp so we can ship it out fast.
              </p>
              <a
                href={valid ? whatsappLink(waMsg) : undefined}
                target="_blank"
                rel="noopener noreferrer"
                onClick={guard()}
                className={`mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full text-sm font-bold ${
                  valid ? "text-white" : "text-white/50"
                }`}
                style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
              >
                Confirm on WhatsApp
              </a>
            </div>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-white/40">
              <ShieldCheck size={13} className="text-gold" /> 100% secure · Powered by UPI
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
