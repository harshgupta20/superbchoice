"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Scene from "@/components/experience/Scene";
import LivingMoon from "@/components/experience/LivingMoon";
import RevealText from "@/components/experience/RevealText";
import { sceneLines } from "@/lib/experience";

export default function RoomScene() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });

  // Scrub the room from cold/off to warm/on as it moves through the viewport.
  const warmth = useTransform(scrollYProgress, [0.1, 0.55], [0, 1], { clamp: true });
  const coldOpacity = useTransform(warmth, [0, 1], [0.9, 0]);
  const warmGlow = useTransform(warmth, [0, 1], [0.05, 1]);
  const moonOff = useTransform(warmth, [0, 1], [0.72, 0]);
  const cozyOpacity = useTransform(warmth, [0.4, 1], [0, 1]);
  const cozyY = useTransform(warmth, [0.4, 1], [14, 0]);

  return (
    <Scene id="room">
      <RevealText as="h2" className="mb-6 text-center font-display text-3xl font-extrabold leading-tight text-white">
        Turn Any Room <span className="text-gradient-gold">Into Magic</span>
      </RevealText>

      <div ref={ref} className="relative w-full">
        {/* The room */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0c14] shadow-card">
          {/* Warm ambient light from the lamp */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: warmGlow,
              background:
                "radial-gradient(90% 70% at 68% 62%, rgba(255,190,110,0.55) 0%, rgba(255,150,80,0.18) 40%, transparent 72%)",
            }}
          />

          {/* Window with night sky */}
          <div className="absolute left-6 top-8 h-28 w-24 overflow-hidden rounded-lg border border-white/10 bg-gradient-to-b from-[#141033] to-[#0a0818]">
            <span className="absolute right-3 top-3 h-6 w-6 rounded-full bg-cream/80 blur-[1px]" />
            <span className="absolute left-4 top-8 h-0.5 w-0.5 rounded-full bg-white" />
            <span className="absolute left-10 top-14 h-0.5 w-0.5 rounded-full bg-white" />
            <span className="absolute left-6 top-20 h-0.5 w-0.5 rounded-full bg-white" />
            <span className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
            <span className="absolute inset-y-0 left-1/2 w-px bg-white/10" />
          </div>

          {/* Shelf + the moon lamp */}
          <div className="absolute bottom-[26%] right-[14%] flex flex-col items-center">
            <div className="relative">
              <LivingMoon size={104} />
              {/* "off" dimmer */}
              <motion.span
                className="absolute inset-0 rounded-full bg-black"
                style={{ opacity: moonOff }}
              />
            </div>
            <span className="mt-1 h-1.5 w-28 rounded-full bg-[#5a3413]" />
            <span className="h-6 w-1 bg-[#4a2b10]" />
          </div>

          {/* Cozy props that appear once it's warm */}
          <motion.div style={{ opacity: cozyOpacity, y: cozyY }} className="absolute inset-0">
            {/* Plant */}
            <div className="absolute bottom-[22%] left-[14%] flex flex-col items-center">
              <div className="flex gap-0.5">
                <span className="h-8 w-1.5 -rotate-12 rounded-full bg-emerald-700/80" />
                <span className="h-10 w-1.5 rounded-full bg-emerald-600/80" />
                <span className="h-8 w-1.5 rotate-12 rounded-full bg-emerald-700/80" />
              </div>
              <span className="h-4 w-6 rounded-b-md bg-[#8a5623]" />
            </div>
            {/* Bed / headboard hint */}
            <div className="absolute bottom-[8%] left-[8%] h-12 w-40 rounded-t-xl bg-white/[0.06]" />
            <div className="absolute bottom-[10%] left-[12%] h-6 w-12 rounded-lg bg-white/10" />
            {/* Framed art */}
            <div className="absolute right-[16%] top-[16%] h-14 w-11 rounded-md border border-white/15 bg-white/[0.04]" />
          </motion.div>

          {/* Floor warm pool */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{ opacity: warmGlow, background: "linear-gradient(to top, rgba(255,170,90,0.28), transparent)" }}
          />

          {/* Cold "lights off" film */}
          <motion.div
            className="absolute inset-0"
            style={{ opacity: coldOpacity, background: "linear-gradient(160deg, rgba(20,26,60,0.85), rgba(6,8,20,0.9))" }}
          />

          {/* State label */}
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <motion.span
              className="rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur"
              style={{ opacity: coldOpacity }}
            >
              Lights off
            </motion.span>
            <motion.span
              className="rounded-full bg-gold/20 px-3 py-1 text-[11px] font-semibold text-gold backdrop-blur"
              style={{ opacity: warmGlow }}
            >
              ✨ Lights on
            </motion.span>
          </div>
        </div>

        <p className="mt-5 text-center text-sm text-white/55">
          Same room. One switch. <span className="text-white/80">Keep scrolling ↓</span>
        </p>
      </div>

      <span className="sr-only">{sceneLines.room}</span>
    </Scene>
  );
}
