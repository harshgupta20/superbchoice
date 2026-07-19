"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, BadgeCheck, X } from "lucide-react";
import { recentBuyers } from "@/lib/data";

const MINUTES = ["just now", "2 minutes ago", "5 minutes ago", "8 minutes ago", "12 minutes ago", "just now"];

export default function PurchasePopup() {
  const [current, setCurrent] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let idx = Math.floor(Math.random() * recentBuyers.length);
    let showTimer;
    let hideTimer;

    const cycle = () => {
      const buyer = recentBuyers[idx % recentBuyers.length];
      const when = MINUTES[Math.floor(Math.random() * MINUTES.length)];
      setCurrent({ ...buyer, when });
      idx += 1;

      // Visible for ~4.5s, then hide and wait ~4s before next.
      hideTimer = setTimeout(() => {
        setCurrent(null);
        showTimer = setTimeout(cycle, 4000);
      }, 4500);
    };

    // First popup after a short delay.
    showTimer = setTimeout(cycle, 3500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div className="pointer-events-none fixed bottom-24 left-3 z-40 sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex max-w-[250px] items-center gap-3 rounded-2xl glass p-3 pr-8 shadow-card sm:max-w-xs"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-gradient text-night-950">
              <ShoppingBag size={20} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {current.name} from {current.city}
              </p>
              <p className="text-xs text-white/60">
                purchased {current.qty > 1 ? `${current.qty} Moon Lamps` : "a Moon Lamp"}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-[10px] text-gold">
                <BadgeCheck size={11} /> Verified · {current.when}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss notifications"
              className="absolute right-2 top-2 text-white/40 transition-colors hover:text-white"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
