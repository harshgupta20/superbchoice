"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { whatsappLink, pricing } from "@/lib/config";
import { formatPrice } from "@/lib/utils";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-night-950/90 px-3 py-3 backdrop-blur-xl md:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-lg font-extrabold text-gold">
                  {formatPrice(pricing.current)}
                </span>
                <span className="text-xs text-white/40 line-through">
                  {formatPrice(pricing.original)}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-red-400">
                {pricing.discountPercent}% OFF · {pricing.unitsLeft} left
              </span>
            </div>
            <a
              href={whatsappLink()}
              className="flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold text-night-950"
              style={{ backgroundImage: "linear-gradient(135deg,#ffe39b 0%,#ffd369 45%,#e6b84c 100%)" }}
            >
              <ShoppingCart size={18} /> Buy Now
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
