"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Returns time-parts remaining until the next local midnight. */
function getRemaining() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  let diff = Math.max(0, Math.floor((end - now) / 1000));
  const hours = Math.floor(diff / 3600);
  diff -= hours * 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff - minutes * 60;
  return { hours, minutes, seconds };
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function Unit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl glass sm:h-20 sm:w-20">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-display text-2xl font-extrabold text-gradient-gold sm:text-3xl"
          >
            {pad(value)}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[10px] font-medium uppercase tracking-wider text-white/50 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(getRemaining());
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  // Stable placeholder before mount to avoid hydration mismatch.
  const t = time || { hours: 0, minutes: 0, seconds: 0 };

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Unit value={t.hours} label="Hours" />
      <span className="font-display text-2xl font-bold text-gold/60 sm:text-3xl">:</span>
      <Unit value={t.minutes} label="Minutes" />
      <span className="font-display text-2xl font-bold text-gold/60 sm:text-3xl">:</span>
      <Unit value={t.seconds} label="Seconds" />
    </div>
  );
}
