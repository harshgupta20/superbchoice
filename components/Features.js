"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import { features } from "@/lib/data";
import { staggerContainer, fadeUp, revealViewport } from "@/lib/utils";

export default function Features() {
  return (
    <section id="features" className="section-pad">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Why everyone loves it"
          title="Small lamp. Massive difference."
          subtitle="Every detail is engineered to make your space feel calmer, cozier and unmistakably yours."
        />

        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-3xl glass p-7"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl glass-gold text-3xl">
                {f.emoji}
              </div>
              <h3 className="font-display text-lg font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
