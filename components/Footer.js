"use client";

import { motion } from "framer-motion";
import { Instagram, Mail, Moon, ArrowUpRight } from "lucide-react";
import CTAButton from "./ui/CTAButton";
import { brand, whatsappLink } from "@/lib/config";
import { revealViewport } from "@/lib/utils";

const POLICIES = [
  { label: "Privacy Policy", href: "#" },
  { label: "Refund Policy", href: "#" },
  { label: "Shipping Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const NAV = [
  { label: "Features", href: "#features" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Order Now", href: "#order" },
];

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-white/10 bg-white/[0.015]">
      {/* Final CTA band */}
      <div className="container-tight px-5 pt-16 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          className="relative overflow-hidden rounded-4xl border border-gold/20 p-8 text-center sm:p-14"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 0%, rgba(255,211,105,0.16), transparent 60%), rgba(255,255,255,0.02)",
          }}
        >
          <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Ready to bring the moon home?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/60 sm:text-base">
            Join 10,000+ happy customers. Free shipping, Cash on Delivery, and a 7-day replacement
            guarantee — order in under a minute.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton href={whatsappLink()} size="lg">
              Order on WhatsApp
            </CTAButton>
            <CTAButton href={brand.instagramUrl} variant="ghost" size="lg">
              <Instagram size={18} /> DM on Instagram
            </CTAButton>
          </div>
        </motion.div>
      </div>

      {/* Links */}
      <div className="container-tight grid gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a href="#home" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-gradient text-night-950">
              <Moon size={17} className="fill-night-950" />
            </span>
            <span className="font-display text-base font-bold text-white">
              superb<span className="text-gold">.</span>choice
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
            Aesthetic Moon Lamps that turn any room into your favourite place. Handcrafted, warm,
            and made to be gifted.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full glass text-white transition-colors hover:border-gold/30 hover:text-gold"
            >
              <Instagram size={18} />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full glass text-white transition-colors hover:border-gold/30 hover:text-gold"
            >
              <svg viewBox="0 0 32 32" width={18} height={18} fill="currentColor" aria-hidden="true">
                <path d="M16 3.2C8.94 3.2 3.2 8.94 3.2 16c0 2.26.6 4.46 1.73 6.4L3.2 28.8l6.57-1.72A12.74 12.74 0 0 0 16 28.68c7.06 0 12.8-5.74 12.8-12.8S23.06 3.2 16 3.2zm0 23.02a10.6 10.6 0 0 1-5.41-1.48l-.39-.23-3.9 1.02 1.04-3.8-.25-.4A10.6 10.6 0 1 1 16 26.22zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.64s1.14 3.06 1.3 3.27c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
              </svg>
            </a>
            <a
              href={`mailto:${brand.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full glass text-white transition-colors hover:border-gold/30 hover:text-gold"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Explore</h4>
          <ul className="mt-4 space-y-3">
            {NAV.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-sm text-white/55 transition-colors hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Policies</h4>
          <ul className="mt-4 space-y-3">
            {POLICIES.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-sm text-white/55 transition-colors hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/55">
            <li>
              <a href={whatsappLink()} className="inline-flex items-center gap-1 transition-colors hover:text-gold">
                WhatsApp Orders <ArrowUpRight size={13} />
              </a>
            </li>
            <li>
              <a href={`mailto:${brand.email}`} className="transition-colors hover:text-gold">
                {brand.email}
              </a>
            </li>
            <li>
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-gold"
              >
                @{brand.handle} <ArrowUpRight size={13} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-5 py-6 sm:px-8">
        <div className="container-tight flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/40">
            © {2026} superb.choice. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Made with 🌙 for dreamers · Free shipping across India
          </p>
        </div>
      </div>
    </footer>
  );
}
