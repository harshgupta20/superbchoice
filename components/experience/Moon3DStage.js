"use client";

import { motion } from "framer-motion";
import CrystalBall from "./CrystalBall";

/**
 * Product display stage: the crystal ball on its wooden base, gently rotating
 * on a slow turntable with an ambient glow and floating sparkles.
 *
 * @param {object} props
 * @param {"moon"|"solar"|"shiva"} [props.design="moon"]
 * @param {number} [props.size=200]
 * @param {string} [props.glow]
 */
export default function Moon3DStage({ design = "moon", size = 200, glow = "rgba(255,196,120,0.6)" }) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden" style={{ perspective: 1100, height: size * 1.9 }}>
      {/* Slow turntable + float (the ball supplies its own glow) */}
      <motion.div
        className="preserve-3d"
        animate={{ rotateY: [-9, 9, -9] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="animate-float">
          <CrystalBall design={design} size={size} glow={glow} />
        </div>
      </motion.div>

      {/* Floating depth sparkles */}
      {[
        { x: -size * 0.5, y: -size * 0.25, s: 7, d: "5.5s" },
        { x: size * 0.5, y: -size * 0.05, s: 5, d: "6.5s" },
        { x: size * 0.42, y: size * 0.28, s: 6, d: "5s" },
      ].map((f, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full bg-cream/80 animate-float"
          style={{
            width: f.s,
            height: f.s,
            transform: `translate(${f.x}px, ${f.y}px)`,
            animationDuration: f.d,
            boxShadow: "0 0 8px rgba(255,244,214,0.6)",
          }}
        />
      ))}
    </div>
  );
}
