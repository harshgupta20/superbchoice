"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, BadgeCheck } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Stars from "./ui/Stars";
import { testimonials } from "@/lib/data";
import { revealViewport } from "@/lib/utils";

export default function Testimonials() {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="section-pad">
      <div className="container-tight">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Loved by thousands"
            title="Don't take our word for it"
            subtitle="Real reviews from real customers who upgraded their space."
            className="max-w-2xl"
          />
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous reviews"
              className="flex h-11 w-11 items-center justify-center rounded-full glass text-white transition-colors hover:border-gold/30"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next reviews"
              className="flex h-11 w-11 items-center justify-center rounded-full glass text-white transition-colors hover:border-gold/30"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-5 px-5 pb-4 sm:px-8"
      >
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="relative flex w-[85%] shrink-0 snap-start flex-col rounded-3xl glass p-6 sm:w-[360px]"
          >
            <Quote size={30} className="mb-3 text-gold/30" />
            <blockquote className="flex-1 text-sm leading-relaxed text-white/80">
              &ldquo;{t.text}&rdquo;
            </blockquote>
            <Stars size={14} className="mt-5" />
            <figcaption className="mt-4 flex items-center gap-3 border-t border-white/8 pt-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-gold/5 text-sm font-bold text-gold">
                {t.initials}
              </span>
              <div>
                <p className="flex items-center gap-1 text-sm font-semibold text-white">
                  {t.name}
                  <BadgeCheck size={14} className="text-gold" />
                </p>
                <p className="text-xs text-white/50">{t.city} · Verified Buyer</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      {/* Mobile controls */}
      <div className="container-tight mt-6 flex justify-center gap-2 sm:hidden">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous reviews"
          className="flex h-11 w-11 items-center justify-center rounded-full glass text-white"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next reviews"
          className="flex h-11 w-11 items-center justify-center rounded-full glass text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
