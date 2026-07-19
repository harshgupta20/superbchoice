"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { makePurchase, nextDelay, readLiveStock, writeLiveStock, STOCK_MIN } from "@/lib/commerce";
import { pricing } from "@/lib/config";

const LiveStoreContext = createContext(null);

export function useLiveStore() {
  return useContext(LiveStoreContext) || { stock: pricing.unitsLeft, purchase: null, dismiss: () => {} };
}

export default function LiveStoreProvider({ children }) {
  // Start from the SSR fallback so server & first client render match (no hydration mismatch).
  const [stock, setStock] = useState(pricing.unitsLeft);
  const [purchase, setPurchase] = useState(null);
  const [dismissed, setDismissed] = useState(false);
  const timers = useRef([]);

  const dismiss = useCallback(() => {
    setDismissed(true);
    setPurchase(null);
  }, []);

  // Compute the real, live stock on mount (client only).
  useEffect(() => {
    setStock(readLiveStock());
  }, []);

  // Drip purchase notifications on an organic, randomized cadence.
  useEffect(() => {
    if (dismissed) return;

    const clearAll = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };

    const loop = () => {
      const show = setTimeout(() => {
        const p = makePurchase();
        setPurchase(p);

        // Most purchases nudge stock down — reinforces the scarcity honestly.
        if (Math.random() < 0.6) {
          setStock((s) => {
            const n = Math.max(STOCK_MIN, s - p.qty);
            writeLiveStock(n);
            return n;
          });
        }

        const hide = setTimeout(() => setPurchase(null), 4600);
        timers.current.push(hide);
        loop();
      }, nextDelay());
      timers.current.push(show);
    };

    // First one lands a few seconds after the page settles.
    const kick = setTimeout(loop, 4000);
    timers.current.push(kick);

    return clearAll;
  }, [dismissed]);

  return (
    <LiveStoreContext.Provider value={{ stock, purchase, dismiss }}>
      {children}
    </LiveStoreContext.Provider>
  );
}
