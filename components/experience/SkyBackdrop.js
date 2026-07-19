"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";

/**
 * Fixed, full-screen sky that color-grades with scroll:
 * dusk (warm) → twilight → deep midnight → pre-dawn → dawn (warm again).
 * Pure GPU compositing (gradients + opacity) — cheap and smooth.
 */
export default function SkyBackdrop() {
  const { scrollYProgress } = useScroll();
  // Smooth the raw scroll so the grade eases instead of snapping.
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.4 });

  const skyTop = useTransform(
    p,
    [0, 0.28, 0.55, 0.82, 1],
    ["#2a1c40", "#141029", "#070710", "#0b0a18", "#2a1e38"]
  );
  const skyBottom = useTransform(
    p,
    [0, 0.28, 0.55, 0.82, 1],
    ["#7a3b2c", "#211736", "#090910", "#100c1c", "#7e5638"]
  );
  const bg = useMotionTemplate`linear-gradient(180deg, ${skyTop} 0%, #090909 52%, ${skyBottom} 100%)`;

  // Warm horizon glow: strong at dusk & dawn, gone at midnight.
  const horizonOpacity = useTransform(p, [0, 0.22, 0.5, 0.78, 1], [0.85, 0.35, 0, 0.28, 0.8]);
  // Aurora: only visible in the deep-night stretch.
  const auroraOpacity = useTransform(p, [0.3, 0.5, 0.65, 0.82], [0, 0.55, 0.55, 0]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ background: bg }} />

      {/* Warm horizon */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          opacity: horizonOpacity,
          background:
            "radial-gradient(120% 90% at 50% 120%, rgba(255,180,90,0.55) 0%, rgba(255,140,70,0.18) 35%, transparent 70%)",
        }}
      />

      {/* Aurora ribbons for deep night */}
      <motion.div className="absolute inset-0" style={{ opacity: auroraOpacity }}>
        <div
          className="absolute left-[-10%] top-[18%] h-64 w-[120%] rounded-full blur-3xl animate-aurora"
          style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(120,255,214,0.22), transparent 70%)" }}
        />
        <div
          className="absolute left-[-10%] top-[30%] h-64 w-[120%] rounded-full blur-3xl animate-aurora"
          style={{
            animationDelay: "-6s",
            background: "radial-gradient(60% 60% at 50% 50%, rgba(150,120,255,0.2), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Vignette for depth */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 50% 30%, transparent 55%, rgba(0,0,0,0.6) 100%)" }}
      />
    </div>
  );
}
