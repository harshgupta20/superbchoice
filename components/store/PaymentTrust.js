"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Gem, Truck } from "lucide-react";
import { paymentMethods } from "@/lib/product";
import { revealViewport } from "@/lib/utils";

const GUARANTEES = [
  { icon: ShieldCheck, title: "7-Day Money Back", desc: "Not in love? Full refund." },
  { icon: Gem, title: "6-Month Warranty", desc: "Covered against defects." },
  { icon: Truck, title: "Fast Free Shipping", desc: "Dispatched in 24 hours." },
];

export default function PaymentTrust() {
  return (
    <section className="relative px-5 py-14">
      <div className="mx-auto max-w-md">
        {/* Guarantee band */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          className="grid grid-cols-3 gap-2 rounded-3xl border border-gold/20 bg-gold/[0.05] p-4"
        >
          {GUARANTEES.map((g) => (
            <div key={g.title} className="flex flex-col items-center gap-2 text-center">
              <g.icon size={22} className="text-gold" />
              <span className="text-[11px] font-bold leading-tight text-white">{g.title}</span>
              <span className="text-[10px] leading-tight text-white/50">{g.desc}</span>
            </div>
          ))}
        </motion.div>

        {/* Payment methods */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">Easy & secure payments</span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {paymentMethods.map((m) => (
              <span
                key={m}
                className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-bold tracking-wide text-white/80"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
