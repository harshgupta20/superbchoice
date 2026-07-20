"use client";

import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import Tilt3D from "@/components/experience/Tilt3D";
import { reviews, trust } from "@/lib/product";
import { revealViewport } from "@/lib/utils";

const PHOTO_BG = [
  "radial-gradient(90% 80% at 70% 25%, rgba(255,211,105,0.5), transparent 60%), #17130f",
  "radial-gradient(90% 80% at 30% 70%, rgba(122,91,255,0.4), transparent 60%), #12111c",
  "radial-gradient(90% 80% at 50% 30%, rgba(255,120,140,0.42), transparent 60%), #1a1114",
  "radial-gradient(90% 80% at 60% 40%, rgba(80,200,255,0.4), transparent 60%), #0f1418",
];

export default function ReviewsWall() {
  return (
    <section id="reviews" className="relative px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-md">
        <div className="mb-2 flex justify-center">
          <span className="eyebrow">The proof</span>
        </div>
        <h2 className="mb-2 text-center font-display text-3xl font-extrabold leading-tight text-white">
          Loved In <span className="text-gradient-gold">Real Rooms</span>
        </h2>

        {/* Trust metric */}
        <div className="mb-8 flex items-center justify-center gap-3 text-sm text-white/70">
          <span className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={15} className="fill-gold text-gold" strokeWidth={0} />
            ))}
          </span>
          <span>
            <span className="font-bold text-white">{trust.rating}</span> · {trust.customers} {trust.label}
          </span>
        </div>

        {/* Customer photo tiles */}
        <div className="mb-4 grid grid-cols-4 gap-2">
          {PHOTO_BG.concat(PHOTO_BG).slice(0, 4).map((bg, i) => (
            <div key={i} className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-white/10" style={{ background: bg }}>
              <span
                className="h-8 w-8 rounded-full"
                style={{ background: "radial-gradient(circle at 34% 30%, #fff9ec, #ffe6ad 45%, #d99f3c 100%)", boxShadow: "0 0 14px rgba(255,211,105,0.55)" }}
              />
            </div>
          ))}
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ delay: (i % 2) * 0.08 }}
              className="group"
            >
              <Tilt3D max={8} glare={false}>
                <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-1 text-gold">
                    {Array.from({ length: r.rating }).map((_, s) => (
                      <Star key={s} size={12} className="fill-gold text-gold" strokeWidth={0} />
                    ))}
                  </div>
                  <blockquote className="mt-2 flex-1 text-[13px] leading-relaxed text-white/75">“{r.text}”</blockquote>
                  <figcaption className="mt-3 flex items-center gap-1.5 text-xs">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-gold/5 text-[10px] font-bold text-gold">
                      {r.name.slice(0, 1)}
                    </span>
                    <span className="font-semibold text-white">{r.name}</span>
                    <span className="text-white/45">· {r.city}</span>
                    <BadgeCheck size={12} className="ml-auto text-gold" />
                  </figcaption>
                </figure>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
