"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * 3D pointer-tilt wrapper. Cards lean toward the finger/cursor with real
 * perspective and a subtle lift. Harmless on touch (resets on release).
 *
 * @param {object} props
 * @param {number} [props.max=12]  max tilt in degrees
 * @param {number} [props.scale=1.02]
 */
export default function Tilt3D({ children, className, max = 12, scale = 1.02, glare = true }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 200, damping: 20 });
  const sy = useSpring(my, { stiffness: 200, damping: 20 });

  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glareBg = useTransform(
    sx,
    (v) => `radial-gradient(140px 140px at ${v * 100}% 0%, rgba(255,255,255,0.16), transparent 70%)`
  );

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileHover={{ scale }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className={cn("relative", className)}
    >
      {children}
      {glare && (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
