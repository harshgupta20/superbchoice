"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { announcements } from "@/lib/data";

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % announcements.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative z-50 overflow-hidden border-b border-white/10 bg-gradient-to-r from-gold-deep via-gold to-gold-soft text-night-950">
      <div className="container-tight flex h-9 items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-center text-[11px] font-bold tracking-wide sm:text-xs"
          >
            {announcements[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
