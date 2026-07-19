"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  BadgeIndianRupee,
  Truck,
  RefreshCw,
  Gem,
  ShieldCheck as GuaranteeIcon,
} from "lucide-react";
import { trustBadges } from "@/lib/data";
import { staggerContainer, fadeUp, scaleIn, revealViewport } from "@/lib/utils";

const ICONS = { ShieldCheck, BadgeIndianRupee, Truck, RefreshCw, Gem };

export default function TrustSection() {
  return (
    <section className="section-pad">
      <div className="container-tight">
        {/* Money-back guarantee banner */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="relative overflow-hidden rounded-3xl glass-gold p-8 text-center sm:p-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
          <div className="relative flex flex-col items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-gradient text-night-950 shadow-glow">
              <GuaranteeIcon size={30} />
            </span>
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Shop with 100% confidence
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              Every Moon Lamp is backed by our{" "}
              <span className="font-semibold text-gold">7-day money-back guarantee</span> and a{" "}
              <span className="font-semibold text-gold">6-month warranty</span>. If you don't
              absolutely love it, we'll make it right — no questions asked.
            </p>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {trustBadges.map((b) => {
            const Icon = ICONS[b.icon] || ShieldCheck;
            return (
              <motion.div
                key={b.label}
                variants={fadeUp}
                className="flex flex-col items-center gap-3 rounded-2xl glass p-5 text-center"
              >
                <Icon size={26} className="text-gold" />
                <span className="text-xs font-medium text-white/80 sm:text-sm">{b.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
