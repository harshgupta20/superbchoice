"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Primary breathing CTA. Always ≥52px tall, thumb-friendly, with a pulsing
 * glow ring and a shine sweep. Renders an <a> when href is given.
 */
export default function PulseCTA({ children, href, className, variant = "gold", ...rest }) {
  const isGold = variant === "gold";
  const base = cn(
    "group relative inline-flex min-h-[54px] w-full items-center justify-center gap-2 overflow-hidden rounded-full px-8 text-base font-semibold",
    isGold ? "text-night-950" : "border border-white/20 bg-white/5 text-white backdrop-blur",
    className
  );
  const style = isGold
    ? { backgroundImage: "linear-gradient(135deg,#fff4d6 0%,#ffd369 45%,#e6b84c 100%)", boxShadow: "0 10px 44px -6px rgba(255,211,105,0.55)" }
    : undefined;

  const inner = (
    <>
      {isGold && (
        <>
          <span className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-gold/40 blur-xl animate-breathe" />
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  const motionProps = { whileTap: { scale: 0.96 }, whileHover: { y: -2 }, className: base, style };

  return href ? (
    <motion.a href={href} {...motionProps} {...rest}>
      {inner}
    </motion.a>
  ) : (
    <motion.button {...motionProps} {...rest}>
      {inner}
    </motion.button>
  );
}
