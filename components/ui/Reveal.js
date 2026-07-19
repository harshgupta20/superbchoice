"use client";

import { motion } from "framer-motion";
import { fadeUp, revealViewport } from "@/lib/utils";

/**
 * Scroll-reveal wrapper. Animates its children in once they enter the viewport.
 *
 * @param {object} props
 * @param {object} [props.variants=fadeUp] Framer Motion variants.
 * @param {number} [props.delay=0]
 * @param {string} [props.as="div"]
 */
export default function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  as = "div",
  className,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
