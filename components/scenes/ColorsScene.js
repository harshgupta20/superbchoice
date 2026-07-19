"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scene from "@/components/experience/Scene";
import LivingMoon from "@/components/experience/LivingMoon";
import RevealText from "@/components/experience/RevealText";
import { moonColors, sceneLines } from "@/lib/experience";

export default function ColorsScene() {
  const [index, setIndex] = useState(1);
  const [touched, setTouched] = useState(false);
  const active = moonColors[index];

  // Gently auto-cycle to demo the range — stops the moment the user taps.
  useEffect(() => {
    if (touched) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % moonColors.length), 2000);
    return () => clearInterval(id);
  }, [touched]);

  const pick = (i) => {
    setTouched(true);
    setIndex(i);
  };

  return (
    <Scene id="colors">
      <RevealText as="h2" className="mb-2 text-center font-display text-3xl font-extrabold leading-tight text-white">
        A Glow For <span className="text-gradient-gold">Every Mood</span>
      </RevealText>
      <RevealText delay={0.1} className="mb-8 text-center text-sm text-white/55">
        16 shades. Tap to paint the night.
      </RevealText>

      {/* Moon reacting to color */}
      <div className="relative flex h-[300px] w-full items-center justify-center">
        <motion.div
          key={active.label}
          className="pointer-events-none absolute h-72 w-72 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.7 }}
          style={{ background: `radial-gradient(circle, ${active.glow} 0%, transparent 70%)` }}
        />
        <div className="animate-float">
          <LivingMoon size={220} glow={active.glow} tint={active.tint} />
        </div>
      </div>

      {/* Current shade name */}
      <div className="mb-5 h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={active.label}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: active.dot }}
          >
            {active.label}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Swatches */}
      <div className="flex max-w-xs flex-wrap items-center justify-center gap-1.5">
        {moonColors.map((c, i) => (
          <button
            key={c.label}
            type="button"
            onClick={() => pick(i)}
            aria-label={`Set color to ${c.label}`}
            className="flex h-11 w-11 items-center justify-center rounded-full"
          >
            <motion.span
              animate={{ scale: index === i ? 1.25 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`h-6 w-6 rounded-full ${index === i ? "ring-2 ring-white ring-offset-2 ring-offset-transparent" : ""}`}
              style={{ background: c.dot, boxShadow: `0 0 14px ${c.glow}` }}
            />
          </button>
        ))}
      </div>

      <span className="sr-only">{sceneLines.colors}</span>
    </Scene>
  );
}
