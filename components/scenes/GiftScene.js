"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import Scene from "@/components/experience/Scene";
import LivingMoon from "@/components/experience/LivingMoon";
import RevealText from "@/components/experience/RevealText";
import PulseCTA from "@/components/experience/PulseCTA";
import { whatsappLink } from "@/lib/config";
import { sceneLines } from "@/lib/experience";

const ease = [0.22, 1, 0.36, 1];

export default function GiftScene() {
  const [open, setOpen] = useState(false);

  return (
    <Scene id="gift">
      <RevealText as="h2" className="mb-2 text-center font-display text-3xl font-extrabold leading-tight text-white">
        The Gift They'll <span className="text-gradient-gold">Never Forget</span>
      </RevealText>
      <RevealText delay={0.1} className="mb-6 text-center text-sm text-white/55">
        {open ? "Every unboxing feels like this." : "Tap the box to unwrap it."}
      </RevealText>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Unwrap the gift"
        className="relative flex h-[320px] w-full items-center justify-center"
      >
        {/* Burst rays */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(255,211,105,0.6) 0%, transparent 70%)" }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* The moon rising out */}
        <motion.div
          className="absolute z-20"
          initial={false}
          animate={open ? { opacity: 1, scale: 1, y: -40 } : { opacity: 0, scale: 0.2, y: 30 }}
          transition={{ duration: 0.9, ease, delay: open ? 0.2 : 0 }}
        >
          <div className={open ? "animate-float" : ""}>
            <LivingMoon size={170} fragments={open} />
          </div>
        </motion.div>

        {/* Gift box */}
        <div className="absolute bottom-10 z-10 flex flex-col items-center">
          {/* Lid */}
          <motion.div
            className="relative z-20 h-6 w-40 rounded-md"
            initial={false}
            animate={open ? { y: -180, rotate: -18, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease }}
            style={{ background: "linear-gradient(180deg,#2a1c40,#1a1230)", boxShadow: "0 4px 14px rgba(0,0,0,0.4)" }}
          >
            {/* Bow */}
            <span className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border-2 border-gold" />
            <span className="absolute inset-x-0 top-0 mx-auto h-full w-3 bg-gold/80" />
          </motion.div>

          {/* Box body */}
          <div className="relative -mt-1 h-28 w-36 overflow-hidden rounded-b-lg rounded-t-sm" style={{ background: "linear-gradient(180deg,#241a3a,#140e26)" }}>
            <span className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-gold/80" />
            {/* inner light when open */}
            <motion.span
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: open ? 1 : 0 }}
              style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,211,105,0.8), transparent 60%)" }}
            />
          </div>
        </div>

        {/* Tap hint */}
        <AnimatePresence>
          {!open && (
            <motion.span
              exit={{ opacity: 0 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="absolute bottom-2 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur"
            >
              <Gift size={13} /> Tap to open
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-4 w-full max-w-xs"
          >
            <PulseCTA href={whatsappLink("Hi! 🎁 I want to gift the Moon Lamp. Please help me order.")}>
              Gift It Now
            </PulseCTA>
          </motion.div>
        )}
      </AnimatePresence>

      <span className="sr-only">{sceneLines.gift}</span>
    </Scene>
  );
}
