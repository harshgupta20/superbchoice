"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─── Design engravings (etched, lit warm from below) ──────────────────── */

function MoonEngraving() {
  const craters = [
    [42, 40, 4], [58, 46, 5.5], [50, 58, 6.5], [63, 62, 3.5], [38, 55, 3],
    [46, 68, 2.6], [55, 34, 2.4], [66, 50, 2], [44, 50, 2.2], [52, 46, 1.6],
  ];
  const dots = [[40, 44], [60, 40], [64, 55], [36, 62], [48, 62], [58, 66], [70, 46], [34, 48]];
  return (
    <g>
      <circle cx="50" cy="52" r="30" fill="rgba(255,240,205,0.10)" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
      {craters.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="currentColor" opacity={0.32 + (i % 3) * 0.08} />
      ))}
      {dots.map(([x, y], i) => (
        <circle key={`d${i}`} cx={x} cy={y} r="0.9" fill="currentColor" opacity="0.4" />
      ))}
    </g>
  );
}

function SolarEngraving() {
  const orbits = [
    { rx: 9, ry: 5 }, { rx: 16, ry: 9 }, { rx: 23, ry: 13 }, { rx: 30, ry: 17 },
  ];
  const planets = [[41, 52], [66, 54], [30, 48], [72, 62], [50, 35]];
  const stars = [[26, 34], [74, 32], [30, 72], [70, 74], [50, 24], [22, 56], [78, 50]];
  return (
    <g>
      {stars.map(([x, y], i) => (
        <circle key={`s${i}`} cx={x} cy={y} r="0.7" fill="currentColor" opacity="0.5" />
      ))}
      {orbits.map((o, i) => (
        <ellipse key={i} cx="50" cy="54" rx={o.rx} ry={o.ry} fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      ))}
      <circle cx="50" cy="54" r="4" fill="currentColor" opacity="0.9" />
      {planets.map(([x, y], i) => (
        <circle key={`p${i}`} cx={x} cy={y} r={1.6 + (i % 2)} fill="currentColor" opacity="0.75" />
      ))}
      {/* ringed planet */}
      <g opacity="0.75">
        <ellipse cx="72" cy="62" rx="4.5" ry="1.6" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </g>
    </g>
  );
}

function ShivaEngraving() {
  return (
    <g stroke="currentColor" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
      {/* crescent on the head */}
      <path d="M44 20 a5 5 0 1 0 5 6 a4 4 0 1 1 -5 -6" fill="currentColor" opacity="0.7" stroke="none" />
      {/* head */}
      <circle cx="50" cy="33" r="5.5" fill="currentColor" opacity="0.35" />
      {/* topknot */}
      <path d="M47 28 q3 -5 6 0" />
      {/* neck + shoulders */}
      <path d="M50 39 v4" />
      <path d="M39 52 q11 -9 22 0" />
      {/* arms resting on knees */}
      <path d="M40 52 q-4 8 -3 14" />
      <path d="M60 52 q4 8 3 14" />
      {/* torso */}
      <path d="M44 48 q6 6 12 0" />
      {/* folded legs (lotus) */}
      <path d="M33 70 q17 -12 34 0 q-17 8 -34 0 z" fill="currentColor" opacity="0.28" />
      {/* hands on knees */}
      <circle cx="37" cy="66" r="1.6" fill="currentColor" stroke="none" opacity="0.7" />
      <circle cx="63" cy="66" r="1.6" fill="currentColor" stroke="none" opacity="0.7" />
      {/* trishul (trident) on the right */}
      <path d="M74 40 v30" />
      <path d="M69 44 v-6 M74 42 v-8 M79 44 v-6" />
      <path d="M69 44 h10" />
    </g>
  );
}

const ENGRAVINGS = { moon: MoonEngraving, solar: SolarEngraving, shiva: ShivaEngraving };

/* ─── The crystal ball ─────────────────────────────────────────────────── */

/**
 * A transparent 3D-engraved crystal ball on a warm wooden LED base.
 *
 * @param {object} props
 * @param {"moon"|"solar"|"shiva"} [props.design="moon"]
 * @param {number} [props.size=240]      glass sphere diameter (px)
 * @param {string} [props.glow]          warm interior/base LED color (rgba)
 * @param {number} [props.brightness=1]  0..1 scales the LED glow
 * @param {boolean} [props.base=true]    show the wooden LED base + cable
 * @param {boolean} [props.interactive=false] finger + gyro tilt
 * @param {boolean} [props.fragments=false]   floating sparkles
 */
export default function CrystalBall({
  design = "moon",
  size = 240,
  glow = "rgba(255,196,120,0.6)",
  brightness = 1,
  base = true,
  interactive = false,
  fragments = false,
  ambient = true,
  className,
}) {
  const Engraving = ENGRAVINGS[design] || MoonEngraving;
  // Only large instances render the (expensive) blurred glow — thumbnails skip it.
  const showGlow = ambient && size >= 120;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });
  const rotateY = useTransform(sx, [-1, 1], [12, -12]);
  const rotateX = useTransform(sy, [-1, 1], [-10, 10]);

  useEffect(() => {
    if (!interactive) return;
    const onPointer = (e) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
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

  const baseH = size * 0.42;

  return (
    <div
      className={cn("relative flex flex-col items-center", className)}
      style={{ width: size, perspective: 900 }}
      aria-hidden="true"
    >
      {/* Outer ambient glow (large instances only) */}
      {showGlow && (
        <div
          className="pointer-events-none absolute left-1/2 top-[46%] -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl animate-breathe"
          style={{
            width: size * 1.35,
            height: size * 1.35,
            opacity: brightness,
            background: `radial-gradient(circle, ${glow} 0%, transparent 68%)`,
          }}
        />
      )}

      {/* Glass sphere */}
      <motion.div
        className="relative gpu"
        style={{
          width: size,
          height: size,
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
        }}
      >
        {/* glass body */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: [
              `radial-gradient(circle at 50% 82%, ${glow} 0%, rgba(255,170,90,0.14) 28%, transparent 54%)`,
              "radial-gradient(circle at 38% 30%, rgba(255,255,255,0.22), transparent 38%)",
              "radial-gradient(circle at 50% 50%, rgba(15,12,9,0.05), rgba(0,0,0,0.42) 92%)",
            ].join(","),
            boxShadow:
              "inset 0 0 20px rgba(255,255,255,0.12), inset -12px -16px 30px rgba(0,0,0,0.55), 0 10px 24px rgba(0,0,0,0.5), 0 0 32px rgba(255,190,110,0.28)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        />

        {/* engraving */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full p-[14%]"
          style={{
            color: "#ffedc4",
            opacity: 0.55 + brightness * 0.4,
            filter: `drop-shadow(0 0 5px rgba(255,205,135,${0.5 * brightness})) drop-shadow(0 0 1px rgba(255,240,210,0.8))`,
          }}
        >
          <Engraving />
        </svg>

        {/* top hot-spot (LED reflection) */}
        <span
          className="absolute rounded-full"
          style={{
            top: "9%",
            left: "27%",
            width: "46%",
            height: "22%",
            background:
              "radial-gradient(circle, rgba(255,244,214,0.95) 0%, rgba(255,214,150,0.4) 45%, transparent 72%)",
            filter: "blur(2px)",
            opacity: 0.5 + brightness * 0.5,
          }}
        />

        {/* glass specular highlight */}
        <span
          className="absolute rounded-full"
          style={{
            top: "20%",
            left: "22%",
            width: "18%",
            height: "13%",
            background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)",
            filter: "blur(3px)",
          }}
        />
      </motion.div>

      {/* Wooden LED base */}
      {base && (
        <div className="relative" style={{ width: size * 0.72, marginTop: -size * 0.06 }}>
          {/* warm LED spill onto the ball */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-[50%] blur-md"
            style={{
              top: -size * 0.06,
              width: "80%",
              height: size * 0.16,
              background: glow,
              opacity: brightness,
            }}
          />
          {/* lit top rim */}
          <div
            className="relative mx-auto rounded-[50%]"
            style={{
              width: "100%",
              height: size * 0.15,
              background: "radial-gradient(circle at 50% 30%, #ffe6b8 0%, #d9b47a 32%, #c79a5e 62%, #a97e45 100%)",
              boxShadow: `0 0 26px ${glow}`,
            }}
          />
          {/* body */}
          <div
            className="relative mx-auto overflow-hidden rounded-b-2xl rounded-t-md"
            style={{
              marginTop: -size * 0.05,
              width: "90%",
              height: size * 0.24,
              background: "linear-gradient(180deg,#c99a63 0%,#a5763f 55%,#7c5730 100%)",
              boxShadow: "inset 0 6px 10px rgba(255,220,170,0.25), 0 10px 22px rgba(0,0,0,0.5)",
            }}
          >
            {/* wood grain */}
            <span className="absolute inset-y-0 left-[22%] w-px bg-black/10" />
            <span className="absolute inset-y-0 left-[52%] w-px bg-black/10" />
            <span className="absolute inset-y-0 left-[78%] w-px bg-white/10" />
          </div>
          {/* USB cable */}
          <span
            className="absolute rounded-full bg-white/70"
            style={{ right: "-14%", bottom: "22%", width: "34%", height: 3, transform: "rotate(12deg)" }}
          />
        </div>
      )}

      {/* Floating sparkles */}
      {fragments && (
        <>
          <span className="absolute left-[6%] top-[14%] h-1.5 w-1.5 rounded-full bg-cream/80 blur-[1px] animate-float" style={{ animationDuration: "5s" }} />
          <span className="absolute right-[8%] top-[26%] h-1 w-1 rounded-full bg-gold/80 animate-float" style={{ animationDuration: "6.5s", animationDelay: "-2s" }} />
          <span className="absolute left-[14%] top-[52%] h-1 w-1 rounded-full bg-white/70 animate-float" style={{ animationDuration: "7s", animationDelay: "-1s" }} />
        </>
      )}
    </div>
  );
}
