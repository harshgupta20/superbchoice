"use client";

import { motion } from "framer-motion";
import { Sparkles, Usb, Gift } from "lucide-react";
import Tilt3D from "@/components/experience/Tilt3D";
import { benefits } from "@/lib/product";
import { revealViewport } from "@/lib/utils";

const ICONS = { Sparkles, Usb, Gift };

export default function Benefits() {
  return (
    <section className="relative px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-md">
        <div className="mb-2 flex justify-center">
          <span className="eyebrow">Why it's worth it</span>
        </div>
        <h2 className="mb-8 text-center font-display text-3xl font-extrabold leading-tight text-white">
          Built To Be <span className="text-gradient-gold">Loved</span>
        </h2>

        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = ICONS[b.icon] || Moon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Tilt3D max={10}>
                  <div className="flex h-full items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:flex-col sm:items-start sm:text-left">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-gold"
                      style={{ background: "rgba(255,211,105,0.08)", boxShadow: "0 0 20px rgba(255,211,105,0.2)", transform: "translateZ(30px)" }}
                    >
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-white">{b.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-white/55">{b.desc}</p>
                    </div>
                  </div>
                </Tilt3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
