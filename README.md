# superb.choice — Moon Lamp Landing Page 🌙

A premium, high-converting one-page landing page for the **superb.choice** Instagram store,
built to sell the Moon Lamp and drive **WhatsApp / Instagram orders**.

Built with **Next.js (App Router) · JavaScript · TailwindCSS · Framer Motion · Lucide Icons**.
The moon is rendered in **pure CSS** — no external images, so it never breaks on deploy and stays fast.

---

## 🚀 Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

---

## ⚙️ Before you deploy — edit ONE file

All brand-specific values live in [`lib/config.js`](lib/config.js):

| Value | What it does |
| --- | --- |
| `brand.whatsappNumber` | Your WhatsApp number (country code, no `+`/spaces) — powers every "Order" button |
| `brand.instagramUrl` | Your Instagram profile link |
| `brand.email` | Contact email in the footer |
| `pricing.original` / `pricing.current` | Anchored (struck-through) price and sale price |
| `pricing.unitsLeft` | Drives the "Only X left" scarcity indicator |

Content (features, testimonials, gallery, FAQ, notifications) lives in [`lib/data.js`](lib/data.js).

> **Add your real media:** the video modal in [`components/VideoSection.js`](components/VideoSection.js)
> has a placeholder frame — drop in your Instagram Reel embed or an `<video>` tag.
> For real lifestyle photos, swap the CSS scenes in [`components/Gallery.js`](components/Gallery.js)
> with `next/image`.

---

## 🧠 Conversion principles built in

Scarcity · Urgency (countdown) · Social proof (live purchase popups, animated stats) ·
Authority · Trust badges · Price anchoring · FOMO · Loss aversion · Money-back guarantee ·
Limited-stock bar · Emotional, benefit-driven copy · Sticky CTAs everywhere · FAQ to kill objections.

## 🗂 Structure

```
app/            layout, page, globals.css, SEO (robots, sitemap, icon), JSON-LD
components/      all 20 sections + floating widgets
components/ui/   reusable primitives (MoonLamp, Reveal, CTAButton, Countdown, ...)
lib/             config.js (brand), data.js (content), utils.js (helpers + motion variants)
```

## 📈 Performance & SEO

- Fully static prerender · ~150 kB First Load JS
- `next/font` self-hosting · AVIF/WebP images · reduced-motion support
- Open Graph + Twitter cards + Product & FAQ structured data (rich results)
- Semantic, accessible markup with ARIA labels

---

Made with 🌙 for **superb.choice**.
