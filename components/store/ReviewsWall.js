"use client";

import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import Tilt3D from "@/components/experience/Tilt3D";
import ProductPhoto from "@/components/store/ProductPhoto";
import { reviews, trust } from "@/lib/product";
import { designs } from "@/lib/designs";
import { revealViewport } from "@/lib/utils";

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

        {/* Real product shots */}
        <div className="mb-6 grid grid-cols-3 gap-2">
          {designs.map((d) => (
            <div key={d.id} className="aspect-square">
              <ProductPhoto src={d.image} alt={d.label} design={d.id} variant="thumb" feather />
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
