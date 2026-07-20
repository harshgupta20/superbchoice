"use client";

import { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Seeded PRNG so star positions are identical on server & client (no hydration mismatch / layout shift).
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Starfield({ count = 40 }) {
  const { scrollYProgress } = useScroll();
  // Stars are dim at dusk, brilliant at midnight, fade toward dawn.
  const opacity = useTransform(scrollYProgress, [0, 0.32, 0.7, 1], [0.25, 1, 1, 0.3]);

  const stars = useMemo(() => {
    const rand = mulberry32(20260720);
    return Array.from({ length: count }).map(() => {
      const size = rand() * 1.8 + 0.6;
      return {
        top: rand() * 100,
        left: rand() * 100,
        size,
        duration: rand() * 3 + 2,
        delay: rand() * 4,
        bright: rand() > 0.82,
      };
    });
  }, [count]);

  const shooting = useMemo(() => {
    const rand = mulberry32(77);
    return Array.from({ length: 3 }).map((_, i) => ({
      top: rand() * 40 + 5,
      left: rand() * 50 + 40,
      delay: i * 7 + rand() * 6,
      duration: rand() * 2 + 2.5,
    }));
  }, []);

  return (
    <motion.div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" style={{ opacity }}>
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            boxShadow: s.bright ? "0 0 6px 1px rgba(255,235,190,0.9)" : "none",
            backgroundColor: s.bright ? "#fff4d6" : "#ffffff",
          }}
        />
      ))}

      {/* Shooting stars */}
      {shooting.map((s, i) => (
        <span
          key={`sh-${i}`}
          className="absolute h-px w-24"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            background: "linear-gradient(90deg, rgba(255,244,214,0.9), transparent)",
            animation: `shoot ${s.duration}s ease-in ${s.delay}s infinite`,
            opacity: 0,
          }}
        />
      ))}

      {/* Faint constellation for the deep-night stretch */}
      <svg className="absolute right-6 top-[22%] h-24 w-24 opacity-40" viewBox="0 0 100 100" fill="none">
        <path d="M12 30 L38 18 L60 44 L84 34 L70 70 L40 62 Z" stroke="rgba(255,244,214,0.35)" strokeWidth="0.6" />
        {[[12,30],[38,18],[60,44],[84,34],[70,70],[40,62]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="1.4" fill="#fff4d6" />
        ))}
      </svg>
    </motion.div>
  );
}
