"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, X } from "lucide-react";
import { useLiveStore } from "./LiveStoreProvider";

export default function PurchasePopup() {
  const { purchase, dismiss } = useLiveStore();

  return (
    <div className="pointer-events-none fixed bottom-28 left-3 z-40 sm:left-6">
      <AnimatePresence>
        {purchase && (
          <motion.div
            key={purchase.id}
            initial={{ opacity: 0, x: -40, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.92 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex max-w-[255px] items-center gap-3 rounded-2xl border border-white/10 bg-night-900/85 p-2.5 pr-8 shadow-card backdrop-blur-xl"
          >
            {/* Mini glowing moon avatar */}
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{
                background: "radial-gradient(circle at 34% 30%, #fff9ec, #ffe6ad 45%, #d99f3c 100%)",
                boxShadow: "0 0 16px rgba(255,211,105,0.6)",
              }}
            />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-white">
                {purchase.name} from {purchase.city}
              </p>
              <p className="text-[11px] text-white/60">
                {purchase.verb} {purchase.qty > 1 ? `${purchase.qty} Moon Lamps` : "a Moon Lamp"}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-[10px] text-gold">
                <BadgeCheck size={11} /> Verified · {purchase.when}
              </p>
            </div>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss purchase notifications"
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
