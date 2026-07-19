"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Hand, Usb, Boxes, Sun, Snowflake, Palette } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import MoonLamp from "./ui/MoonLamp";
import CTAButton from "./ui/CTAButton";
import { productCallouts } from "@/lib/data";
import { whatsappLink } from "@/lib/config";
import { fadeLeft, fadeRight, revealViewport } from "@/lib/utils";

const CALLOUT_ICONS = [Hand, Usb, Boxes, Sun, Snowflake, Palette];

const MODES = {
  warm: { label: "Warm", tint: "transparent", ring: "rgba(255,211,105,0.55)" },
  cool: { label: "Cool White", tint: "rgba(160,200,255,0.35)", ring: "rgba(190,215,255,0.5)" },
  rgb: { label: "RGB", tint: "rgba(200,110,255,0.4)", ring: "rgba(210,120,255,0.55)" },
};

function Callout({ item, icon: Icon, index, side }) {
  return (
    <motion.div
      variants={side === "left" ? fadeLeft : fadeRight}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="flex items-center gap-3 rounded-2xl glass p-3.5"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass-gold text-gold">
        <Icon size={18} />
      </span>
      <div className={side === "right" ? "text-left" : "text-left"}>
        <p className="text-sm font-semibold text-white">{item.title}</p>
        <p className="text-xs text-white/55">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function ProductShowcase() {
  const [mode, setMode] = useState("warm");
  const left = productCallouts.filter((c) => c.side === "left");
  const right = productCallouts.filter((c) => c.side === "right");
  const active = MODES[mode];

  return (
    <section id="product" className="section-pad">
      <div className="container-tight">
        <SectionHeading
          eyebrow="A closer look"
          title="Crafted to be admired"
          subtitle="Touch to switch modes, dim the glow, and set the mood. Tap a color below to see it change."
        />

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          {/* Left callouts */}
          <div className="flex flex-col gap-4 lg:items-end">
            {left.map((c, i) => (
              <Callout key={c.title} item={c} icon={CALLOUT_ICONS[i]} index={i} side="left" />
            ))}
          </div>

          {/* Moon */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={revealViewport}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Color-mode tint + ring */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-colors duration-700"
                style={{ background: `radial-gradient(circle, ${active.ring} 0%, transparent 65%)` }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                className="relative"
              >
                <MoonLamp size={300} withBase={false} />
                {/* Tint overlay for cool / rgb */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-full mix-blend-overlay transition-colors duration-700"
                  style={{ background: active.tint }}
                />
              </motion.div>
            </motion.div>

            {/* Color mode pills */}
            <div className="mt-8 flex items-center gap-2 rounded-full glass p-1.5">
              {Object.entries(MODES).map(([key, m]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    mode === key ? "bg-gold-gradient text-night-950" : "text-white/60 hover:text-white"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right callouts */}
          <div className="flex flex-col gap-4 lg:items-start">
            {right.map((c, i) => (
              <Callout key={c.title} item={c} icon={CALLOUT_ICONS[i + 3]} index={i} side="right" />
            ))}
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <CTAButton href={whatsappLink()} size="lg">
            Order Your Moon Lamp
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
