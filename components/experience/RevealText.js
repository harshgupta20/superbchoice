"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

/** Cinematic reveal — fades, rises and un-blurs into view. */
export default function RevealText({ children, as = "div", delay = 0, className, y = 28 }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </Tag>
  );
}
