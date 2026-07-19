"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Truck, BadgeIndianRupee, RefreshCw, Sparkles } from "lucide-react";
import MoonLamp from "./ui/MoonLamp";
import CTAButton from "./ui/CTAButton";
import Stars from "./ui/Stars";
import { whatsappLink, pricing } from "@/lib/config";
import { heroBadges } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const BADGE_ICONS = {
  "Free Shipping": Truck,
  "Cash on Delivery": BadgeIndianRupee,
  "7-Day Replacement": RefreshCw,
};

const ease = [0.22, 1, 0.36, 1];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const moonY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const moonScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section id="home" ref={ref} className="relative overflow-hidden px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16">
      {/* Decorative stars */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute left-[12%] top-[18%] h-1 w-1 rounded-full bg-white/70" />
        <div className="absolute left-[78%] top-[12%] h-1.5 w-1.5 rounded-full bg-gold/70" />
        <div className="absolute left-[64%] top-[40%] h-1 w-1 rounded-full bg-white/50" />
        <div className="absolute left-[24%] top-[62%] h-1 w-1 rounded-full bg-white/40" />
        <div className="absolute left-[88%] top-[58%] h-1 w-1 rounded-full bg-gold/60" />
      </div>

      <div className="container-tight grid items-center gap-10 lg:grid-cols-2 lg:gap-6">
        {/* Copy */}
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="eyebrow"
          >
            <Sparkles size={14} /> The viral #1 aesthetic Moon Lamp
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.06 }}
            className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Bring the Moon
            <br />
            <span className="text-gradient-gold">Into Your Room</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.14 }}
            className="mt-5 max-w-md text-base leading-relaxed text-white/65 sm:text-lg"
          >
            A hand-finished 3D moon that fills your space with a warm, dreamy glow.
            The one piece that turns any room into <span className="text-white">your</span>{" "}
            favourite place to be — and everyone else's favourite photo.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.22 }}
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <CTAButton href={whatsappLink()} size="lg" className="w-full sm:w-auto">
              Buy Now — {formatPrice(pricing.current)}
            </CTAButton>
            <CTAButton href="#video" variant="ghost" size="lg" className="w-full sm:w-auto">
              <Play size={16} className="fill-white" /> Watch Video
            </CTAButton>
          </motion.div>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="mt-7 flex items-center gap-3"
          >
            <div className="flex -space-x-2.5">
              {["A", "P", "R", "S", "K"].map((c, i) => (
                <span
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-night-950 bg-gradient-to-br from-white/25 to-white/5 text-xs font-semibold text-white"
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="text-left">
              <Stars size={14} />
              <p className="text-xs text-white/60">
                <span className="font-semibold text-white">4.9/5</span> from 10,000+ happy customers
              </p>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.38 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            {heroBadges.map((b) => {
              const Icon = BADGE_ICONS[b];
              return (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/75"
                >
                  <Icon size={13} className="text-gold" /> {b}
                </span>
              );
            })}
          </motion.div>
        </div>

        {/* Moon */}
        <motion.div
          style={{ y: moonY, scale: moonScale }}
          className="order-1 flex justify-center lg:order-2"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease }}
            className="animate-float"
          >
            <MoonLamp size={300} className="sm:hidden" />
            <MoonLamp size={420} className="hidden sm:flex" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
