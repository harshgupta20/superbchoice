"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { whatsappLink } from "@/lib/config";

function WhatsAppGlyph({ size = 30 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.46 1.73 6.4L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.23 1.6h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05A12.7 12.7 0 0 0 16.004 3.2zm0 23.02h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.9 1.02 1.04-3.8-.25-.4a10.58 10.58 0 0 1-1.62-5.64c0-5.86 4.77-10.62 10.63-10.62 2.84 0 5.5 1.11 7.51 3.12a10.55 10.55 0 0 1 3.11 7.51c0 5.86-4.77 10.62-10.63 10.62zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.64 0 1.56 1.14 3.06 1.3 3.27.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [showTip, setShowTip] = useState(false);

  // Auto-reveal the tooltip briefly after load to draw the eye.
  useEffect(() => {
    const t1 = setTimeout(() => setShowTip(true), 6000);
    const t2 = setTimeout(() => setShowTip(false), 11000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
      className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white sm:bottom-6 sm:right-6"
      style={{
        background: "linear-gradient(135deg,#25D366,#128C7E)",
        boxShadow: "0 0 0 0 rgba(37,211,102,0.5), 0 10px 30px -6px rgba(37,211,102,0.6)",
      }}
    >
      {/* Pulsing green glow */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />

      <WhatsAppGlyph size={30} />

      <AnimatePresence>
        {showTip && (
          <motion.span
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="absolute right-16 hidden whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-semibold text-night-950 shadow-card sm:block"
          >
            Order on WhatsApp 🌙
            <span className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-white" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
