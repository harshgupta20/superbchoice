// ─────────────────────────────────────────────────────────────
// Central brand configuration.
// Change these values before deployment — nothing else required.
// ─────────────────────────────────────────────────────────────

export const brand = {
  name: "superb.choice",
  handle: "superb.choice",
  tagline: "Bring the moon home.",
  // Include country code, no "+" or spaces. Example: 91XXXXXXXXXX for India.
  whatsappNumber: "919999999999",
  instagramUrl: "https://instagram.com/superb.choice",
  email: "hello@superb.choice",
};

export const pricing = {
  currency: "₹",
  original: 1999,
  current: 999,
  get savings() {
    return this.original - this.current;
  },
  get discountPercent() {
    return Math.round((this.savings / this.original) * 100);
  },
  unitsLeft: 17,
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
