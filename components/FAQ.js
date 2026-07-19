"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, MessageCircleQuestion } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import CTAButton from "./ui/CTAButton";
import { faqs } from "@/lib/data";
import { whatsappLink } from "@/lib/config";
import { revealViewport } from "@/lib/utils";

function Item({ item, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl glass">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-white sm:text-base">{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold"
        >
          <Plus size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-white/60">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section-pad">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Got questions?"
          title="Everything you need to know"
          subtitle="Still unsure? Message us on WhatsApp — we usually reply in minutes."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          className="mx-auto mt-12 flex max-w-3xl flex-col gap-3"
        >
          {faqs.map((f, i) => (
            <Item key={f.q} item={f} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </motion.div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="flex items-center gap-2 text-sm text-white/60">
            <MessageCircleQuestion size={16} className="text-gold" /> Still have a question?
          </p>
          <CTAButton
            href={whatsappLink("Hi! I have a question about the Moon Lamp before ordering.")}
            variant="ghost"
          >
            Chat with us on WhatsApp
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
