"use client";

import { Star, Minus, Plus, Truck, ShieldCheck, RefreshCw, Check } from "lucide-react";
import ProductPhoto from "@/components/store/ProductPhoto";
import PulseCTA from "@/components/experience/PulseCTA";
import Countdown from "@/components/ui/Countdown";
import { useLiveStore } from "@/components/experience/LiveStoreProvider";
import { useCheckout } from "@/components/store/CheckoutProvider";
import { useSelection } from "@/components/store/SelectionProvider";
import { whatsappLink } from "@/lib/config";
import { designs } from "@/lib/designs";
import { designOrderMessage } from "@/lib/product";
import { formatPrice } from "@/lib/utils";

export default function ProductBlock() {
  const { stock } = useLiveStore();
  const { open } = useCheckout();
  const { designId, setDesignId, qty, setQty, design, price, original, save, percent, order } = useSelection();

  const orderHref = whatsappLink(designOrderMessage(design, qty, price));

  return (
    <section id="shop" className="relative px-5 py-16 sm:py-20">
      <div className="mx-auto flex max-w-md flex-col">
        <div className="mb-2 flex justify-center">
          <span className="eyebrow">Own your own moon</span>
        </div>
        <h2 className="mb-8 text-center font-display text-3xl font-extrabold leading-tight text-white">
          Get Yours <span className="text-gradient-gold">Tonight</span>
        </h2>

        {/* Product photo — blends into the scene, no box */}
        <div className="relative flex items-center justify-center py-2">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/18 blur-2xl" />
          <div className="relative aspect-square w-[80%] max-w-[320px] animate-float">
            <ProductPhoto src={design.image} alt={`Crystal Ball Lamp — ${design.label}`} design={designId} variant="main" feather />
          </div>
        </div>

        {/* Design chooser (doubles as gallery) */}
        <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-wider text-white/50">Choose your design</p>
        <div className="grid grid-cols-3 gap-2.5">
          {designs.map((d) => {
            const on = d.id === designId;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setDesignId(d.id)}
                className={`relative flex flex-col items-center gap-1 overflow-hidden rounded-2xl border px-2 pb-3 pt-2 transition-all ${
                  on ? "border-gold bg-gold/10" : "border-white/12 bg-white/[0.03]"
                }`}
              >
                {on && (
                  <span className="absolute -right-1.5 -top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-night-950">
                    <Check size={12} strokeWidth={3} />
                  </span>
                )}
                <div className="pointer-events-none mb-1 h-16 w-full">
                  <ProductPhoto src={d.image} alt={d.label} design={d.id} variant="thumb" feather />
                </div>
                <span className="text-[13px] font-bold leading-tight text-white">{d.label}</span>
                <span className="text-[10px] text-gold">{formatPrice(d.price)}</span>
              </button>
            );
          })}
        </div>

        {/* Title + rating */}
        <div className="mt-6">
          <h3 className="font-display text-xl font-bold text-white">Crystal Ball Lamp — {design.label}</h3>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-gold text-gold" strokeWidth={0} />
              ))}
            </span>
            <span className="text-xs text-white/60">4.9 · 10,000+ reviews</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            A real 3D laser-engraved crystal ball on a hand-finished wooden LED base. Warm glow,
            USB powered — the keepsake your room (and your feed) deserves.
          </p>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-end gap-2.5">
          <span className="font-display text-4xl font-extrabold text-gradient-gold">{formatPrice(price)}</span>
          <span className="mb-1 text-lg text-white/40 line-through">{formatPrice(original)}</span>
          <span className="mb-1.5 rounded-full bg-gold/15 px-2 py-0.5 text-xs font-bold text-gold">{percent}% OFF</span>
        </div>
        <p className="mt-1 text-xs text-white/50">You save {formatPrice(save)} · Inclusive of all taxes</p>

        {/* Quantity */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Quantity</p>
          <div className="flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.03] p-1">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
            >
              <Minus size={16} />
            </button>
            <span className="w-6 text-center font-display text-lg font-bold tabular-nums text-white">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(5, q + 1))}
              aria-label="Increase quantity"
              className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Urgency */}
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Offer ends in</span>
          <Countdown />
          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
            🔥 Only {stock} left in stock
          </span>
        </div>

        {/* CTA */}
        <div className="mt-5">
          <PulseCTA onClick={() => open(order)}>Buy Now — {formatPrice(price)}</PulseCTA>
          <a href={orderHref} className="mt-3 block text-center text-xs text-white/50 underline underline-offset-4">
            or order on WhatsApp
          </a>
        </div>

        {/* Trust row */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/55">
          <span className="inline-flex items-center gap-1.5"><Truck size={14} className="text-gold" /> Free shipping</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-gold" /> Secure order</span>
          <span className="inline-flex items-center gap-1.5"><RefreshCw size={14} className="text-gold" /> 7-day replace</span>
        </div>
      </div>
    </section>
  );
}
