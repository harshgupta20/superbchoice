"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, BookOpen } from "lucide-react";
import Scene from "@/components/experience/Scene";
import LivingMoon from "@/components/experience/LivingMoon";
import RevealText from "@/components/experience/RevealText";
import { sceneLines } from "@/lib/experience";

export default function ReadingScene() {
  const [level, setLevel] = useState(70); // 25..100
  const brightness = level / 100;

  return (
    <Scene id="reading">
      <RevealText as="h2" className="mb-2 text-center font-display text-3xl font-extrabold leading-tight text-white">
        Your Perfect <span className="text-gradient-gold">Night In</span>
      </RevealText>
      <RevealText delay={0.1} className="mb-8 text-center text-sm text-white/55">
        Dim it to a whisper. Drag to feel it.
      </RevealText>

      <div className="relative flex h-[280px] w-full items-center justify-center">
        <motion.div
          className="pointer-events-none absolute h-64 w-64 rounded-full blur-3xl"
          animate={{ opacity: brightness }}
          style={{ background: "radial-gradient(circle, rgba(255,200,120,0.6) 0%, transparent 70%)" }}
        />
        <div className="animate-float">
          <LivingMoon size={200} glow="rgba(255,205,130,0.6)" brightness={brightness} />
        </div>
        {/* dim film that grows as you lower brightness */}
        <div
          className="pointer-events-none absolute inset-0 bg-black transition-opacity duration-200"
          style={{ opacity: (1 - brightness) * 0.55 }}
        />
        <BookOpen size={20} className="absolute bottom-4 left-8 text-white/25" />
      </div>

      {/* Brightness slider */}
      <div className="mt-6 flex w-full max-w-xs items-center gap-3">
        <Sun size={16} className="text-white/40" />
        <div className="relative flex-1">
          <input
            type="range"
            min="25"
            max="100"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            aria-label="Brightness"
            className="moon-range w-full"
          />
        </div>
        <Sun size={22} className="text-gold" />
      </div>
      <span className="mt-3 text-xs font-medium tabular-nums text-white/50">{level}% brightness</span>

      <style jsx>{`
        .moon-range {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 999px;
          background: linear-gradient(
            to right,
            #ffd369 0%,
            #ffd369 ${((level - 25) / 75) * 100}%,
            rgba(255, 255, 255, 0.15) ${((level - 25) / 75) * 100}%,
            rgba(255, 255, 255, 0.15) 100%
          );
          outline: none;
        }
        .moon-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: radial-gradient(circle at 35% 30%, #fff7e4, #ffd369 60%, #e6b84c);
          box-shadow: 0 0 18px rgba(255, 211, 105, 0.8);
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.5);
        }
        .moon-range::-moz-range-thumb {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: radial-gradient(circle at 35% 30%, #fff7e4, #ffd369 60%, #e6b84c);
          box-shadow: 0 0 18px rgba(255, 211, 105, 0.8);
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.5);
        }
      `}</style>

      <span className="sr-only">{sceneLines.reading}</span>
    </Scene>
  );
}
