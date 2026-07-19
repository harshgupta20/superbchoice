"use client";

import { motion } from "framer-motion";
import { ChevronsDown, Sparkles, Star } from "lucide-react";
import Scene from "@/components/experience/Scene";
import LivingMoon from "@/components/experience/LivingMoon";
import PulseCTA from "@/components/experience/PulseCTA";
import { whatsappLink, pricing } from "@/lib/config";
import { formatPrice } from "@/lib/utils";
import { sceneLines } from "@/lib/experience";

const ease = [0.22, 1, 0.36, 1];

export default function HeroScene() {
  return (
    <Scene id="hero" className="justify-between pt-24 pb-10" contentClassName="h-full justify-between gap-6">
      {/* Badge */}
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="eyebrow"
      >
        <Sparkles size={13} /> Handcrafted Moon · superb.choice
      </motion.span>

      {/* The hero moon — dominates the screen */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease }}
        className="flex flex-1 items-center justify-center"
      >
        <div className="animate-float">
          <LivingMoon size={300} interactive fragments />
        </div>
      </motion.div>

      {/* Copy + CTA */}
      <div className="flex w-full flex-col items-center gap-5 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          className="font-display text-[2.7rem] font-extrabold leading-[1.02] tracking-tight text-white"
        >
          Bring The <span className="text-gradient-gold">Moon</span> Home
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="max-w-[19rem] text-[15px] leading-relaxed text-white/65"
        >
          The glow that turns your room into somewhere you never want to leave.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="fill-gold text-gold" strokeWidth={0} />
            ))}
          </span>
          <span className="text-sm text-white/70">4.9 · 10,000+ loved it</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72 }}
          className="flex w-full flex-col items-center gap-3"
        >
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-extrabold text-white">{formatPrice(pricing.current)}</span>
            <span className="text-base text-white/40 line-through">{formatPrice(pricing.original)}</span>
            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs font-bold text-gold">
              {pricing.discountPercent}% OFF
            </span>
          </div>
          <PulseCTA href={whatsappLink()} className="max-w-xs">
            Buy Now
          </PulseCTA>
        </motion.div>
      </div>

      {/* Swipe indicator */}
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-1 text-white/60"
      >
        <span className="text-[11px] uppercase tracking-[0.25em]">Swipe</span>
        <ChevronsDown size={18} />
      </motion.div>

      <span className="sr-only">{sceneLines.hero}</span>
    </Scene>
  );
}
