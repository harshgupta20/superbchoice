"use client";

import { Instagram, Mail, Moon, ArrowUpRight } from "lucide-react";
import { brand, whatsappLink } from "@/lib/config";
import { paymentMethods } from "@/lib/product";

const NAV = [
  { label: "Shop", href: "#shop" },
  { label: "Reviews", href: "#reviews" },
];

function WhatsAppGlyph({ size = 18 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M16 3.2C8.94 3.2 3.2 8.94 3.2 16c0 2.26.6 4.46 1.73 6.4L3.2 28.8l6.57-1.72A12.74 12.74 0 0 0 16 28.68c7.06 0 12.8-5.74 12.8-12.8S23.06 3.2 16 3.2zm0 23.02a10.6 10.6 0 0 1-5.41-1.48l-.39-.23-3.9 1.02 1.04-3.8-.25-.4A10.6 10.6 0 1 1 16 26.22zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.64s1.14 3.06 1.3 3.27c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-5 pb-28 pt-14">
      <div className="mx-auto max-w-md">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-gradient text-night-950">
            <Moon size={16} className="fill-night-950" />
          </span>
          <span className="font-display text-base font-bold text-white">
            superb<span className="text-gold">.</span>choice
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/55">
          Handcrafted 3D crystal ball lamps that turn any room into your favourite place. Warm,
          dreamy, and made to be gifted.
        </p>

        {/* Socials */}
        <div className="mt-5 flex gap-3">
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-11 w-11 items-center justify-center rounded-full glass text-white transition-colors hover:text-gold"
          >
            <Instagram size={18} />
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-11 w-11 items-center justify-center rounded-full glass text-white transition-colors hover:text-gold"
          >
            <WhatsAppGlyph />
          </a>
          <a
            href={`mailto:${brand.email}`}
            aria-label="Email"
            className="flex h-11 w-11 items-center justify-center rounded-full glass text-white transition-colors hover:text-gold"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Nav + contact */}
        <div className="mt-8 grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">Explore</h4>
            <ul className="mt-3 space-y-2.5">
              {NAV.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-white/60 transition-colors hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">Contact</h4>
            <ul className="mt-3 space-y-2.5 text-sm text-white/60">
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
                <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-gold">
                  @{brand.handle} <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment */}
        <div className="mt-8 flex flex-wrap items-center gap-1.5">
          {paymentMethods.map((m) => (
            <span key={m} className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-1 text-[10px] font-bold text-white/60">
              {m}
            </span>
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-5">
          <p className="text-xs text-white/40">© 2026 superb.choice · Made with 🌙 across India</p>
        </div>
      </div>
    </footer>
  );
}
