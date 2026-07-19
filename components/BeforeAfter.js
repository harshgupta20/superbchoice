"use client";

import { motion } from "framer-motion";
import { Check, X, MoveRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import MoonLamp from "./ui/MoonLamp";
import { beforeAfter } from "@/lib/data";
import { fadeLeft, fadeRight, revealViewport } from "@/lib/utils";

function Panel({ data, tone, moon }) {
  const isAfter = tone === "after";
  return (
    <motion.div
      variants={isAfter ? fadeRight : fadeLeft}
      className="relative overflow-hidden rounded-3xl border p-6 sm:p-8"
      style={{
        borderColor: isAfter ? "rgba(255,211,105,0.25)" : "rgba(255,255,255,0.08)",
        background: isAfter
          ? "radial-gradient(120% 90% at 70% 10%, rgba(255,211,105,0.18), transparent 55%), rgba(255,255,255,0.03)"
          : "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)",
      }}
    >
      {/* Mini scene */}
      <div className="mb-6 flex h-40 items-center justify-center rounded-2xl border border-white/5 bg-black/40">
        {isAfter ? (
          <div className="animate-float">
            <MoonLamp size={120} withBase={false} />
          </div>
        ) : (
          <div className="h-16 w-16 rounded-full bg-white/[0.04]" />
        )}
      </div>

      <div className="mb-4 inline-flex items-center gap-2">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full ${
            isAfter ? "bg-gold text-night-950" : "bg-white/10 text-white/50"
          }`}
        >
          {isAfter ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
        </span>
        <h3 className={`font-display text-lg font-bold ${isAfter ? "text-white" : "text-white/60"}`}>
          {data.title}
        </h3>
      </div>

      <ul className="space-y-3">
        {data.points.map((p) => (
          <li key={p} className="flex items-center gap-3 text-sm">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                isAfter ? "bg-gold/20 text-gold" : "bg-white/5 text-white/40"
              }`}
            >
              {isAfter ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
            </span>
            <span className={isAfter ? "text-white/85" : "text-white/45 line-through decoration-white/20"}>
              {p}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="section-pad">
      <div className="container-tight">
        <SectionHeading
          eyebrow="The difference is night & day"
          title="One lamp changes everything"
          subtitle="This is the upgrade you feel the moment you switch it on."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          transition={{ staggerChildren: 0.15 }}
          className="relative mt-14 grid items-stretch gap-5 md:grid-cols-2"
        >
          <Panel data={beforeAfter.before} tone="before" />

          {/* Center arrow (desktop) */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient text-night-950 shadow-glow">
              <MoveRight size={22} strokeWidth={2.5} />
            </span>
          </div>

          <Panel data={beforeAfter.after} tone="after" />
        </motion.div>
      </div>
    </section>
  );
}
