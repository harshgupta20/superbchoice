"use client";

import { motion } from "framer-motion";
import AnimatedNumber from "./ui/AnimatedNumber";
import { stats } from "@/lib/data";
import { staggerContainer, fadeUp, revealViewport } from "@/lib/utils";

export default function SocialProof() {
  return (
    <section className="relative border-y border-white/10 bg-white/[0.02] px-5 py-12 sm:px-8">
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="container-tight grid grid-cols-2 gap-6 md:grid-cols-4"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="flex flex-col items-center text-center">
            <span className="font-display text-3xl font-extrabold text-gradient-gold sm:text-4xl md:text-5xl">
              <AnimatedNumber value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
            </span>
            <span className="mt-1.5 text-xs font-medium uppercase tracking-wider text-white/55 sm:text-sm">
              {s.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
