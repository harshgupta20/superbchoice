"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { whatsappLink, pricing } from "@/lib/config";
import { formatPrice } from "@/lib/utils";

export default function StickyBuyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      setVisible(pastHero);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Hide when the final offer scene (which has its own CTA) is on screen.
    const offer = document.getElementById("offer");
    let io;
    if (offer) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible(false);
          else onScroll();
        },
        { threshold: 0.35 }
      );
      io.observe(offer);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 px-3 pb-3"
        >
          <div className="mx-auto flex max-w-md items-center gap-3 rounded-full border border-white/10 bg-night-900/85 p-1.5 pl-4 shadow-card backdrop-blur-xl">
            <div className="shrink-0">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-base font-extrabold text-gold">{formatPrice(pricing.current)}</span>
                <span className="text-[11px] text-white/40 line-through">{formatPrice(pricing.original)}</span>
              </div>
              <span className="text-[9px] font-semibold uppercase tracking-wide text-red-400">
                {pricing.unitsLeft} left
              </span>
            </div>
            <a
              href={whatsappLink()}
              className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full text-sm font-bold text-night-950"
              style={{ backgroundImage: "linear-gradient(135deg,#fff4d6 0%,#ffd369 45%,#e6b84c 100%)" }}
            >
              <ShoppingBag size={17} /> Buy Now
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
