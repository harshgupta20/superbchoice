"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Reusable animated CTA. Renders an <a> when `href` is given, else a <button>.
 * Includes a hover lift and an animated shine sweep on the gold variant.
 *
 * @param {object} props
 * @param {"gold"|"ghost"} [props.variant="gold"]
 * @param {string} [props.href]
 * @param {"sm"|"md"|"lg"} [props.size="md"]
 */
export default function CTAButton({
  children,
  variant = "gold",
  size = "md",
  href,
  className,
  ...rest
}) {
  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-transform duration-200 will-change-transform",
    sizes[size],
    variant === "gold"
      ? "text-night-950 shadow-gold-cta"
      : "border border-white/15 bg-white/5 text-white backdrop-blur hover:border-white/30 hover:bg-white/10",
    className
  );

  const goldStyle =
    variant === "gold"
      ? { backgroundImage: "linear-gradient(135deg,#ffe39b 0%,#ffd369 45%,#e6b84c 100%)" }
      : undefined;

  const content = (
    <>
      {variant === "gold" && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.97 },
    className: base,
    style: goldStyle,
  };

  if (href) {
    return (
      <motion.a href={href} {...motionProps} {...rest}>
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button {...motionProps} {...rest}>
      {content}
    </motion.button>
  );
}
