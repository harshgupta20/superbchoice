"use client";

import { motion } from "framer-motion";
import { Truck, BadgeIndianRupee, RefreshCw, Instagram, Zap } from "lucide-react";
import Scene from "@/components/experience/Scene";
import LivingMoon from "@/components/experience/LivingMoon";
import RevealText from "@/components/experience/RevealText";
import PulseCTA from "@/components/experience/PulseCTA";
import Magnetic from "@/components/experience/Magnetic";
import Countdown from "@/components/ui/Countdown";
import { whatsappLink, brand, pricing } from "@/lib/config";
import { formatPrice } from "@/lib/utils";
import { sceneLines } from "@/lib/experience";

export default function OfferScene() {
  return (
    <Scene id="offer" className="justify-center pb-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
        className="animate-float"
      >
        <LivingMoon size={180} fragments />
      </motion.div>

      <RevealText as="h2" className="mt-6 text-center font-display text-[2.4rem] font-extrabold leading-[1.05] text-white">
        Own Your Own <span className="text-gradient-gold">Moon</span>
      </RevealText>

      {/* Price */}
      <RevealText delay={0.1} className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-4xl font-extrabold text-gradient-gold">{formatPrice(pricing.current)}</span>
        <span className="text-lg text-white/40 line-through">{formatPrice(pricing.original)}</span>
        <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs font-bold text-gold">
          {pricing.discountPercent}% OFF
        </span>
      </RevealText>

      {/* Countdown */}
      <RevealText delay={0.15} className="mt-6 flex flex-col items-center gap-2">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Tonight's price ends in</span>
        <Countdown />
      </RevealText>

      {/* Scarcity */}
      <RevealText delay={0.2} className="mt-5 w-full max-w-xs">
        <div className="rounded-2xl border border-red-500/25 bg-red-500/5 px-4 py-2.5 text-center text-xs font-medium text-red-300">
          🔥 Only {pricing.unitsLeft} left at this price
        </div>
      </RevealText>

      {/* Magnetic buy */}
      <div className="mt-6 w-full max-w-xs">
        <Magnetic>
          <PulseCTA href={whatsappLink()}>
            <Zap size={18} className="fill-night-950" /> Buy Now — {formatPrice(pricing.current)}
          </PulseCTA>
        </Magnetic>
        <a
          href={brand.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-white backdrop-blur"
        >
          <Instagram size={17} /> DM to Order
        </a>
      </div>

      {/* Trust */}
      <RevealText delay={0.25} className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/55">
        <span className="inline-flex items-center gap-1.5"><Truck size={14} className="text-gold" /> Free shipping</span>
        <span className="inline-flex items-center gap-1.5"><BadgeIndianRupee size={14} className="text-gold" /> COD</span>
        <span className="inline-flex items-center gap-1.5"><RefreshCw size={14} className="text-gold" /> 7-day replace</span>
      </RevealText>

      <span className="sr-only">{sceneLines.offer}</span>
    </Scene>
  );
}
