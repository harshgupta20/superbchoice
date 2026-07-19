"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Scene from "@/components/experience/Scene";
import LivingMoon from "@/components/experience/LivingMoon";
import RevealText from "@/components/experience/RevealText";
import { sceneLines } from "@/lib/experience";

const NEON = [
  { glow: "rgba(255,59,107,0.6)", tint: "rgba(255,59,107,0.45)", dot: "#ff3b6b" },
  { glow: "rgba(122,91,255,0.6)", tint: "rgba(122,91,255,0.45)", dot: "#7a5bff" },
  { glow: "rgba(59,209,255,0.6)", tint: "rgba(59,209,255,0.45)", dot: "#3bd1ff" },
  { glow: "rgba(57,255,136,0.55)", tint: "rgba(57,255,136,0.4)", dot: "#39ff88" },
];

export default function SetupScene() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % NEON.length), 1100);
    return () => clearInterval(id);
  }, []);
  const c = NEON[i];

  return (
    <Scene id="setup">
      <RevealText as="h2" className="mb-2 text-center font-display text-3xl font-extrabold leading-tight text-white">
        The Setup Everyone <span className="text-gradient-gold">Screenshots</span>
      </RevealText>
      <RevealText delay={0.1} className="mb-8 text-center text-sm text-white/55">
        RGB that moves to your vibe.
      </RevealText>

      <div className="relative flex h-[300px] w-full items-center justify-center">
        {/* reactive glow */}
        <motion.div
          className="pointer-events-none absolute h-72 w-72 rounded-full blur-3xl"
          animate={{ background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)` }}
          transition={{ duration: 0.9 }}
        />

        {/* Monitor silhouettes */}
        <div className="absolute top-6 flex gap-2 opacity-60">
          <div className="h-20 w-28 rounded-md border border-white/10 bg-white/[0.03]" />
          <div className="h-16 w-24 self-end rounded-md border border-white/10 bg-white/[0.03]" />
        </div>

        <div className="animate-float">
          <LivingMoon size={190} glow={c.glow} tint={c.tint} />
        </div>

        {/* Desk line + keyboard underglow */}
        <div className="absolute bottom-8 flex w-64 flex-col items-center">
          <div className="flex gap-1">
            {Array.from({ length: 10 }).map((_, k) => (
              <span key={k} className="h-2 w-4 rounded-sm bg-white/15" />
            ))}
          </div>
          <motion.div
            className="mt-1 h-1 w-56 rounded-full"
            animate={{ boxShadow: `0 0 20px 2px ${c.glow}`, background: c.dot }}
            transition={{ duration: 0.9 }}
          />
          <div className="mt-1 h-1.5 w-64 rounded-full bg-[#2a2a33]" />
        </div>

        {/* Equalizer */}
        <div className="absolute bottom-24 right-8 flex items-end gap-1">
          {[0, 1, 2, 3, 4].map((b) => (
            <span
              key={b}
              className="w-1.5 rounded-full"
              style={{ background: c.dot, animation: `eq 0.8s ease-in-out ${b * 0.12}s infinite`, height: 8 }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes eq {
          0%, 100% { height: 8px; opacity: 0.6; }
          50% { height: 26px; opacity: 1; }
        }
      `}</style>

      <span className="sr-only">{sceneLines.setup}</span>
    </Scene>
  );
}
