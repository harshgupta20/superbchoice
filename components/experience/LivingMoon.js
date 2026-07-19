"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const CRATERS = [
  { top: 22, left: 30, size: 12, o: 0.5 },
  { top: 34, left: 62, size: 18, o: 0.45 },
  { top: 55, left: 40, size: 22, o: 0.5 },
  { top: 68, left: 66, size: 13, o: 0.4 },
  { top: 44, left: 20, size: 9, o: 0.4 },
  { top: 74, left: 34, size: 8, o: 0.35 },
  { top: 18, left: 55, size: 7, o: 0.35 },
  { top: 60, left: 76, size: 6, o: 0.35 },
  { top: 30, left: 46, size: 6, o: 0.3 },
  { top: 50, left: 58, size: 10, o: 0.4 },
];

/**
 * The hero product — a pure-CSS moon that feels alive.
 * @param {object} props
 * @param {number} [props.size=300]
 * @param {string} [props.glow] rgba glow color
 * @param {string} [props.tint] overlay tint for color modes (default none)
 * @param {number} [props.brightness=1] 0..1 scales glow/emission
 * @param {boolean} [props.interactive=false] enable finger + gyro follow
 * @param {boolean} [props.fragments=false] floating orbiting fragments
 */
export default function LivingMoon({
  size = 300,
  glow = "rgba(255,211,105,0.55)",
  tint = "transparent",
  brightness = 1,
  interactive = false,
  fragments = false,
  className,
}) {
  const px = useMotionValue(0); // -1..1
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });

  const rotateY = useTransform(sx, [-1, 1], [14, -14]);
  const rotateX = useTransform(sy, [-1, 1], [-12, 12]);
  const tx = useTransform(sx, [-1, 1], [16, -16]);
  const ty = useTransform(sy, [-1, 1], [12, -12]);

  const ref = useRef(null);

  useEffect(() => {
    if (!interactive) return;

    const onPointer = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      px.set(x);
      py.set(y);
    };
    const onOrient = (e) => {
      if (e.gamma == null || e.beta == null) return;
      px.set(Math.max(-1, Math.min(1, e.gamma / 35)));
      py.set(Math.max(-1, Math.min(1, (e.beta - 45) / 35)));
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("deviceorientation", onOrient, true);
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("deviceorientation", onOrient, true);
    };
  }, [interactive, px, py]);

  return (
    <div
      ref={ref}
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size, perspective: 900 }}
      aria-hidden="true"
    >
      {/* Breathing ambient glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-breathe gpu"
        style={{
          width: size * 1.7,
          height: size * 1.7,
          opacity: brightness,
          background: `radial-gradient(circle, ${glow} 0%, ${glow.replace(/[\d.]+\)$/, "0.14)")} 42%, transparent 70%)`,
          x: interactive ? tx : 0,
          y: interactive ? ty : 0,
        }}
      />

      {/* 3D moon */}
      <motion.div
        className="relative preserve-3d gpu"
        style={{
          width: size,
          height: size,
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          x: interactive ? tx : 0,
          y: interactive ? ty : 0,
        }}
      >
        <div
          className="relative h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 34% 30%, #fff9ec 0%, #ffeec4 30%, #ffd369 56%, #d99f3c 80%, #9a6420 100%)",
            boxShadow:
              "inset -30px -32px 66px rgba(110,66,12,0.6), inset 20px 18px 44px rgba(255,255,255,0.4), 0 0 80px rgba(255,211,105,0.4)",
          }}
        >
          {CRATERS.map((c, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${c.top}%`,
                left: `${c.left}%`,
                width: `${c.size}%`,
                height: `${c.size}%`,
                background:
                  "radial-gradient(circle at 40% 35%, rgba(120,80,25,0.55) 0%, rgba(160,110,40,0.25) 55%, transparent 75%)",
                boxShadow: "inset -2px -2px 4px rgba(255,240,200,0.35)",
                opacity: c.o,
              }}
            />
          ))}

          {/* Moving light reflection sweep */}
          <span
            className="absolute inset-0 rounded-full animate-spin-slow"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.18) 40deg, transparent 90deg, transparent 360deg)",
              mixBlendMode: "screen",
            }}
          />

          {/* Top highlight */}
          <span
            className="absolute rounded-full"
            style={{
              top: "10%",
              left: "22%",
              width: "34%",
              height: "27%",
              background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
              filter: "blur(6px)",
            }}
          />

          {/* Color-mode tint */}
          <span
            className="absolute inset-0 rounded-full transition-colors duration-700"
            style={{ background: tint, mixBlendMode: "overlay" }}
          />
        </div>
      </motion.div>

      {/* Floating fragments */}
      {fragments && (
        <>
          <span className="absolute left-[8%] top-[18%] h-2 w-2 rounded-full bg-gold/70 blur-[1px] animate-float" style={{ animationDuration: "5s" }} />
          <span className="absolute right-[10%] top-[30%] h-1.5 w-1.5 rounded-full bg-cream/80 blur-[1px] animate-float" style={{ animationDuration: "6.5s", animationDelay: "-2s" }} />
          <span className="absolute bottom-[16%] left-[16%] h-1.5 w-1.5 rounded-full bg-gold/60 blur-[1px] animate-float" style={{ animationDuration: "7s", animationDelay: "-1s" }} />
          <span className="absolute bottom-[24%] right-[14%] h-1 w-1 rounded-full bg-white/70 animate-float" style={{ animationDuration: "5.5s", animationDelay: "-3s" }} />
        </>
      )}
    </div>
  );
}
