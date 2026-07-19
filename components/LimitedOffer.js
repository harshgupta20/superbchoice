"use client";

import { motion } from "framer-motion";
import { Zap, Flame } from "lucide-react";
import Countdown from "./ui/Countdown";
import CTAButton from "./ui/CTAButton";
import { whatsappLink, pricing } from "@/lib/config";
import { revealViewport } from "@/lib/utils";

export default function LimitedOffer() {
  return (
    <section className="px-5 py-10 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={{ duration: 0.6 }}
        className="container-tight relative overflow-hidden rounded-4xl border border-gold/20 p-8 text-center sm:p-12"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 0%, rgba(255,211,105,0.16), transparent 60%), rgba(255,255,255,0.02)",
        }}
      >
        {/* Animated ambient glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl animate-pulse-glow" />

        <div className="relative flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-400">
            <Flame size={14} className="animate-pulse" /> Only Today
          </span>

          <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            Get <span className="text-gradient-gold">{pricing.discountPercent}% OFF</span> + Free Shipping
          </h2>
          <p className="max-w-md text-sm text-white/65 sm:text-base">
            This price disappears at midnight. Once the timer hits zero, it's back to full price —
            no exceptions.
          </p>

          <Countdown />

          <CTAButton
            href={whatsappLink("Hi! I want to claim the Only-Today 50% OFF + Free Shipping on the Moon Lamp!")}
            size="lg"
            className="mt-2"
          >
            <Zap size={18} className="fill-night-950" /> Claim My Offer Now
          </CTAButton>

          <p className="text-xs text-white/45">
            ⏳ Offer expires soon · Discount auto-applied when you order
          </p>
        </div>
      </motion.div>
    </section>
  );
}
