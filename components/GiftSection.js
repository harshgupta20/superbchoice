"use client";

import { motion } from "framer-motion";
import {
  Cake,
  Heart,
  HeartHandshake,
  Gift,
  Sparkles,
  Home,
  Flower2,
  Star,
} from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import CTAButton from "./ui/CTAButton";
import { gifts } from "@/lib/data";
import { whatsappLink } from "@/lib/config";
import { staggerContainer, scaleIn, revealViewport } from "@/lib/utils";

const ICONS = { Cake, Heart, HeartHandshake, Gift, Sparkles, Home, Flower2, Star };

export default function GiftSection() {
  return (
    <section className="section-pad">
      <div className="container-tight">
        <SectionHeading
          eyebrow="The gift they'll never forget"
          title="Perfect for every occasion"
          subtitle="Comes gift-ready in a premium box. Whoever unwraps it will remember who gave it."
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {gifts.map((g) => {
            const Icon = ICONS[g.icon] || Gift;
            return (
              <motion.div
                key={g.label}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                className="group flex flex-col items-center gap-3 rounded-2xl glass p-6 text-center transition-colors hover:border-gold/25"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl glass-gold text-gold transition-transform duration-300 group-hover:scale-110">
                  <Icon size={24} />
                </span>
                <span className="text-sm font-semibold text-white">{g.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <CTAButton href={whatsappLink("Hi! 🎁 I want to gift the Moon Lamp. Please help me order.")} size="lg">
            Gift a Moon Lamp
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
