"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scene from "@/components/experience/Scene";
import CrystalBall from "@/components/experience/CrystalBall";
import RevealText from "@/components/experience/RevealText";
import { designs } from "@/lib/designs";

export default function DesignsScene() {
  const [index, setIndex] = useState(0);
  const [touched, setTouched] = useState(false);
  const active = designs[index];

  // Auto-cycle through the designs to show the range — stops once tapped.
  useEffect(() => {
    if (touched) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % designs.length), 2600);
    return () => clearInterval(id);
  }, [touched]);

  const pick = (i) => {
    setTouched(true);
    setIndex(i);
  };

  return (
    <Scene id="designs">
      <RevealText as="h2" className="mb-2 text-center font-display text-3xl font-extrabold leading-tight text-white">
        One Orb. <span className="text-gradient-gold">Many Worlds.</span>
      </RevealText>
      <RevealText delay={0.1} className="mb-6 text-center text-sm text-white/55">
        Moon, galaxy or the divine — tap to switch.
      </RevealText>

      {/* Crystal ball morphing between designs */}
      <div className="relative flex h-[320px] w-full items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 900 }}
          >
            <div className="animate-float">
              <CrystalBall design={active.id} size={210} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Design label */}
      <div className="mb-5 h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={active.id}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-semibold uppercase tracking-[0.18em] text-gold"
          >
            {active.label} · {active.tagline}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Design thumbnails */}
      <div className="flex items-center justify-center gap-3">
        {designs.map((d, i) => (
          <button
            key={d.id}
            type="button"
            onClick={() => pick(i)}
            aria-label={`Show ${d.label}`}
            className={`flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border transition-all ${
              index === i ? "border-gold bg-gold/10" : "border-white/12 bg-white/[0.03]"
            }`}
          >
            <span className="pointer-events-none scale-90">
              <CrystalBall design={d.id} size={48} base={false} />
            </span>
          </button>
        ))}
      </div>

      <span className="sr-only">Choose your crystal ball design</span>
    </Scene>
  );
}
