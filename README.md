# 🌙 NIGHTFALL — superb.choice Moon Lamp Experience

An immersive, **mobile-first** product *film* for the Moon Lamp — built to continue an Instagram
Reel, not to feel like a website. You scroll through one night: the sky color-grades from **dusk →
deep midnight → dawn**, the moon breathes and follows your finger, and every scene is a fullscreen
cinematic "shot" that ends in one tap to buy.

Built with **Next.js (App Router) · JavaScript · TailwindCSS · Framer Motion · Lucide**.
The moon and every scene are **pure CSS + motion** — zero external images, so it's fast, offline-safe,
and never breaks on deploy.

---

## 🚀 Quick start

```bash
npm install
npm run dev        # http://localhost:3000  (open on a phone / device toolbar)
npm run build && npm run start
```

> Best viewed at **390–430px** width. On a real phone, tilt it — the moon reacts to the gyroscope.

## ⚙️ Before you deploy — edit ONE file

Everything brand-specific lives in [`lib/config.js`](lib/config.js):
`whatsappNumber` (powers every Buy button), `instagramUrl`, `email`, and `pricing`.
Content (colors, customer posts, scene lines) lives in [`lib/experience.js`](lib/experience.js).

---

## 🎬 The 9 scenes (`components/scenes/`)

| # | Scene | The moment | Signature interaction |
|---|---|---|---|
| 00 | **Hero** (dusk) | "Bring The Moon Home" | Moon follows finger + gyroscope, breathing glow |
| 01 | **Room** | Cold empty room → warm cozy sanctuary | Scroll-scrubbed light transformation |
| 02 | **Colors** | 16 shades | Tap swatches → moon + air recolor (auto-demos first) |
| 03 | **Reading** | Wind down | Drag the brightness slider, glow dims live |
| 04 | **Setup** | Gaming/desk | RGB pulses to a beat + equalizer |
| 05 | **Romance** | Two glows drift into one | Soft mid-experience CTA |
| 06 | **Gift** | Unbox the moon | **Tap the box** → lid flies off, moon rises in light |
| 07 | **Social** | 10,000 rooms | Self-scrolling wall of IG-style posts |
| 08 | **Offer** (dawn) | "Own Your Own Moon" | Countdown + scarcity + magnetic Buy button |

## 🏗 Architecture

```
app/                 layout (fonts, SEO, JSON-LD), page (assembles scenes), globals.css
components/experience/
  SkyBackdrop        fixed sky that color-grades with scroll (dusk→midnight→dawn)
  Starfield          seeded twinkling stars + shooting stars + constellation
  StoriesProgress    Instagram Stories chrome — segmented progress tied to scroll
  LivingMoon         the hero: finger/gyro tilt, breathing glow, colorable, 3D
  Scene / RevealText / PulseCTA / Magnetic / StickyBuyBar   reusable primitives
components/scenes/   the 9 cinematic scenes
components/WhatsAppButton.js · components/ui/Countdown.js
lib/                 config (brand) · experience (content) · utils (helpers)
```

## ⚡ Performance & UX

- Fully static prerender · ~147 kB First Load JS · no external image requests
- Motion is GPU-only (transform/opacity), animations run on scroll/visibility
- Seeded starfield = **no hydration mismatch / layout shift**
- `prefers-reduced-motion` respected · 52px+ thumb-friendly tap targets · Product JSON-LD

---

Made with 🌙 for **superb.choice** — record it, and it's a Reel.
