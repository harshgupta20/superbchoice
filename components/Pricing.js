"use client";

import { motion } from "framer-motion";
import { Check, Star, Instagram, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import MoonLamp from "./ui/MoonLamp";
import CTAButton from "./ui/CTAButton";
import Stars from "./ui/Stars";
import { whatsappLink, brand, pricing } from "@/lib/config";
import { formatPrice, fadeLeft, fadeRight, revealViewport } from "@/lib/utils";

const INCLUDED = [
  "Premium 3D Moon Lamp (15cm)",
  "Hand-finished solid wood base",
  "USB-C fast charging cable",
  "16 colors + touch control",
  "Gift-ready premium box",
  "6-month warranty + 7-day replacement",
];

// Stock bar: how "full" the remaining-stock bar appears.
const STOCK_PERCENT = Math.min(100, Math.max(8, pricing.unitsLeft * 2));

export default function Pricing() {
  return (
    <section id="order" className="section-pad">
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          transition={{ staggerChildren: 0.15 }}
          className="grid items-center gap-8 rounded-4xl glass p-6 sm:p-10 lg:grid-cols-2"
        >
          {/* Visual */}
          <motion.div variants={fadeLeft} className="relative flex flex-col items-center">
            <span className="absolute -top-2 right-4 z-10 rotate-6 rounded-full bg-red-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg sm:right-10">
              SAVE {formatPrice(pricing.savings)}
            </span>
            <div className="animate-float">
              <MoonLamp size={260} />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Stars size={16} />
              <span className="text-sm text-white/60">4.9 · 10,000+ reviews</span>
            </div>
          </motion.div>

          {/* Offer */}
          <motion.div variants={fadeRight} className="flex flex-col">
            <span className="eyebrow w-fit">
              <Star size={13} className="fill-gold" /> Bestseller
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              The Moon Lamp
            </h2>

            {/* Price anchoring */}
            <div className="mt-5 flex items-end gap-3">
              <span className="font-display text-5xl font-extrabold text-gradient-gold">
                {formatPrice(pricing.current)}
              </span>
              <span className="mb-1 text-xl text-white/40 line-through">
                {formatPrice(pricing.original)}
              </span>
              <span className="mb-1.5 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-bold text-gold">
                {pricing.discountPercent}% OFF
              </span>
            </div>
            <p className="mt-1 text-sm text-white/55">
              You save <span className="font-semibold text-gold">{formatPrice(pricing.savings)}</span> today ·
              Inclusive of all taxes
            </p>

            {/* What's included */}
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/75">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Stock indicator */}
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
              <div className="mb-2 flex items-center justify-between text-xs font-medium">
                <span className="text-red-400">🔥 Selling fast — almost gone</span>
                <span className="text-white/70">Only {pricing.unitsLeft} left</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${STOCK_PERCENT}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-red-500 to-gold"
                />
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CTAButton
                href={whatsappLink()}
                size="lg"
                className="w-full sm:flex-1"
              >
                Order Now — {formatPrice(pricing.current)}
              </CTAButton>
              <CTAButton href={brand.instagramUrl} variant="ghost" size="lg" className="w-full sm:w-auto">
                <Instagram size={18} /> DM to Order
              </CTAButton>
            </div>

            {/* Micro trust row */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <Truck size={14} className="text-gold" /> Free shipping
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-gold" /> COD available
              </span>
              <span className="inline-flex items-center gap-1.5">
                <RefreshCw size={14} className="text-gold" /> 7-day replacement
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
