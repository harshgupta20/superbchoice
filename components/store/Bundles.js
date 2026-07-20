"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Tilt3D from "@/components/experience/Tilt3D";
import { useCheckout } from "@/components/store/CheckoutProvider";
import { bundles } from "@/lib/product";
import { formatPrice, revealViewport } from "@/lib/utils";

function MiniMoons({ n }) {
  return (
    <div className="flex -space-x-2" style={{ transform: "translateZ(40px)" }}>
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          className="relative h-9 w-9 rounded-full border border-night-950"
          style={{
            background: [
              "radial-gradient(circle at 50% 80%, rgba(255,196,120,0.75) 0%, transparent 55%)",
              "radial-gradient(circle at 38% 30%, rgba(255,255,255,0.28), transparent 42%)",
              "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.12), rgba(0,0,0,0.4) 92%)",
            ].join(","),
            boxShadow: "inset 0 0 8px rgba(255,255,255,0.12), 0 0 14px rgba(255,196,120,0.55)",
          }}
        >
          <span
            className="absolute left-1/2 top-[16%] h-1.5 w-3.5 -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,244,214,0.9), transparent 70%)" }}
          />
        </span>
      ))}
    </div>
  );
}

export default function Bundles() {
  const { open } = useCheckout();
  return (
    <section id="offers" className="relative px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-md">
        <div className="mb-2 flex justify-center">
          <span className="eyebrow">Best value</span>
        </div>
        <h2 className="mb-3 text-center font-display text-3xl font-extrabold leading-tight text-white">
          Buy More, <span className="text-gradient-gold">Glow More</span>
        </h2>
        <p className="mb-8 text-center text-sm text-white/55">Most customers grab the Duo. Tap to order.</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {bundles.map((b, i) => {
            const highlight = b.badge === "Most Popular";
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ delay: (i % 2) * 0.08 }}
                className="group"
              >
                <Tilt3D max={10}>
                  <div
                    className={`relative flex h-full flex-col items-center rounded-3xl border p-5 text-center ${
                      highlight ? "border-gold/50 bg-gold/[0.06]" : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    {b.badge && (
                      <span
                        className={`absolute -top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${
                          highlight ? "bg-gold-gradient text-night-950" : "bg-white/10 text-white/80"
                        }`}
                      >
                        {b.badge}
                      </span>
                    )}
                    <div className="mb-3 mt-2 flex h-12 items-center justify-center">
                      <MiniMoons n={b.qty} />
                    </div>
                    <h3 className="font-display text-base font-bold text-white">{b.title}</h3>
                    <p className="mt-0.5 text-[11px] text-white/50">{b.note}</p>
                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className="font-display text-2xl font-extrabold text-gold">{formatPrice(b.price)}</span>
                      <span className="text-xs text-white/40 line-through">{formatPrice(b.original)}</span>
                    </div>
                    <span className="mt-1 text-[10px] font-semibold text-emerald-400">
                      Save {formatPrice(b.original - b.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        open({
                          title: b.title,
                          qty: b.qty,
                          amount: b.price,
                          note: `superb.choice ${b.title}`,
                        })
                      }
                      className={`mt-4 flex min-h-[46px] w-full items-center justify-center gap-1.5 rounded-full text-sm font-bold transition-transform active:scale-95 ${
                        highlight ? "text-night-950" : "border border-white/15 bg-white/5 text-white"
                      }`}
                      style={highlight ? { backgroundImage: "linear-gradient(135deg,#fff4d6,#ffd369 45%,#e6b84c)" } : undefined}
                    >
                      <Check size={15} /> Choose
                    </button>
                  </div>
                </Tilt3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
