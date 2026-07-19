// ─────────────────────────────────────────────────────────────
// Central brand configuration.
// Change these values before deployment — nothing else required.
// ─────────────────────────────────────────────────────────────

export const brand = {
  name: "superb.choice",
  handle: "superb.choice",
  tagline: "Bring the moon home.",
  // Include country code, no "+" or spaces. Example: 91XXXXXXXXXX for India.
  whatsappNumber: "918595332917",
  instagramUrl: "https://instagram.com/superb.choice",
  email: "hello@superb.choice",
};

export const pricing = {
  currency: "₹",
  original: 449,
  current: 199,
  get savings() {
    return this.original - this.current;
  },
  get discountPercent() {
    return Math.round((this.savings / this.original) * 100);
  },
  // SSR fallback only — real, live stock is computed client-side (see LiveStoreProvider).
  unitsLeft: 11,
};

export const defaultWhatsAppMessage =
  "Hi superb.choice! 🌙 I want to order the Moon Lamp. Please share the details.";

/**
 * Build a wa.me deep link with a prefilled message.
 * @param {string} [message]
 */
export function whatsappLink(message = defaultWhatsAppMessage) {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
