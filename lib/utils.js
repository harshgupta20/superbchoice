/** Join truthy className parts. */
export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

/** Format a number as Indian Rupee price string. */
export function formatPrice(value, currency = "₹") {
  return `${currency}${Number(value).toLocaleString("en-IN")}`;
}

// ── Shared Framer Motion variants ──────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/** Stagger container: children animate in sequence. */
export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Standard viewport config for scroll-reveal (fires once, slightly early). */
export const revealViewport = { once: true, amount: 0.25, margin: "0px 0px -80px 0px" };
