"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import MoonLamp from "./ui/MoonLamp";
import { gallery } from "@/lib/data";
import { cn } from "@/lib/utils";

// Each scene gets a distinct room-lighting gradient so the grid feels varied.
const SCENES = [
  "radial-gradient(120% 90% at 75% 15%, rgba(255,211,105,0.35), transparent 55%), linear-gradient(160deg,#1a1712,#0b0b0b)",
  "radial-gradient(120% 90% at 25% 80%, rgba(255,211,105,0.3), transparent 55%), linear-gradient(160deg,#161616,#0b0b0b)",
  "radial-gradient(110% 80% at 60% 20%, rgba(255,211,105,0.28), transparent 55%), linear-gradient(160deg,#191411,#0b0b0b)",
  "radial-gradient(130% 90% at 40% 30%, rgba(255,211,105,0.32), transparent 55%), linear-gradient(160deg,#141210,#0b0b0b)",
  "radial-gradient(120% 90% at 80% 70%, rgba(255,211,105,0.26), transparent 55%), linear-gradient(160deg,#151515,#0b0b0b)",
  "radial-gradient(120% 90% at 30% 25%, rgba(255,211,105,0.3), transparent 55%), linear-gradient(160deg,#181410,#0b0b0b)",
  "radial-gradient(110% 90% at 70% 40%, rgba(255,211,105,0.28), transparent 55%), linear-gradient(160deg,#161311,#0b0b0b)",
  "radial-gradient(130% 90% at 50% 20%, rgba(255,211,105,0.34), transparent 55%), linear-gradient(160deg,#1a1613,#0b0b0b)",
];

function Scene({ item, index, big = false }) {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: SCENES[index % SCENES.length] }}>
      {/* Glowing moon orb suggesting the lamp in-scene */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ filter: "saturate(1.05)" }}
      >
        <MoonLamp size={big ? 220 : 96} withBase={false} />
      </div>
      {/* Floor reflection */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">{item.label}</p>
        <p className="text-sm text-white/80">{item.caption}</p>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="gallery" className="section-pad">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Real rooms, real glow"
          title="See it in every space you love"
          subtitle="From cozy bedrooms to gaming setups — tap any scene to see how the Moon Lamp transforms a room."
        />

        <div className="mt-14 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {gallery.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className={cn(
                "group relative block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 text-left",
                item.span === "tall" ? "aspect-[3/4]" : "aspect-square"
              )}
            >
              <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                <Scene item={item} index={i} />
              </div>
              <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full glass text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ZoomIn size={16} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-5 backdrop-blur-md"
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full glass text-white"
            >
              <X size={22} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[4/5] w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 shadow-card"
            >
              <Scene item={gallery[active]} index={active} big />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
