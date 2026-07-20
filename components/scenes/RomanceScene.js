"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Scene from "@/components/experience/Scene";
import CrystalBall from "@/components/experience/CrystalBall";
import RevealText from "@/components/experience/RevealText";
import PulseCTA from "@/components/experience/PulseCTA";
import { whatsappLink } from "@/lib/config";
import { sceneLines } from "@/lib/experience";

export default function RomanceScene() {
  return (
    <Scene id="romance">
      <RevealText as="h2" className="mb-2 text-center font-display text-3xl font-extrabold leading-tight text-white">
        Some Nights <span className="text-gradient-gold">Deserve A Moon</span>
      </RevealText>
      <RevealText delay={0.1} className="mb-6 text-center text-sm text-white/55">
        Set the mood without saying a word.
      </RevealText>

      <div className="relative flex h-[300px] w-full items-center justify-center">
        <div className="animate-float">
          <CrystalBall design="moon" size={188} glow="rgba(255,150,130,0.6)" />
        </div>

        {/* Two glows drifting together */}
        <motion.span
          className="absolute h-4 w-4 rounded-full bg-rose-300 blur-[2px]"
          animate={{ x: [-70, -14, -70], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute h-4 w-4 rounded-full bg-gold blur-[2px]"
          animate={{ x: [70, 14, 70], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating hearts */}
        {[0, 1, 2].map((h) => (
          <motion.span
            key={h}
            className="absolute text-rose-300/70"
            style={{ left: `${30 + h * 18}%`, bottom: "10%" }}
            animate={{ y: [-4, -60], opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: h * 1.3, ease: "easeOut" }}
          >
            <Heart size={14} className="fill-rose-300/70" />
          </motion.span>
        ))}
      </div>

      <div className="mt-6 w-full max-w-xs">
        <PulseCTA href={whatsappLink("Hi! I want the Crystal Ball Lamp for a special someone 💛")}>
          Make Tonight Magic
        </PulseCTA>
      </div>

      <span className="sr-only">{sceneLines.romance}</span>
    </Scene>
  );
}
