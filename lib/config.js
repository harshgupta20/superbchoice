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
  email: "",
};

// ── UPI (direct phone payment) ─────────────────────────────────
// IMPORTANT: replace `id` with your real UPI ID / VPA before going live.
// It usually looks like: 8595332917@ybl  ·  yourname@okhdfcbank  ·  store@paytm
export const upi = {
  id: "devguru@upi",
  name: "superb.choice",
};

/**
 * Build a `upi://pay` deep link. On a phone this opens the UPI app selector
 * (GPay / PhonePe / Paytm …) with the amount + note prefilled.
 * @param {{ amount?: number|string, note?: string }} opts
 */
export function upiLink({ amount, note = "superb.choice order" } = {}) {
  const parts = [
    `pa=${encodeURIComponent(upi.id)}`,
    `pn=${encodeURIComponent(upi.name)}`,
    "cu=INR",
    `tn=${encodeURIComponent(note)}`,
  ];
  if (amount) parts.splice(2, 0, `am=${encodeURIComponent(amount)}`);
  return `upi://pay?${parts.join("&")}`;
}

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
  "Hi superb.choice! 🌙 I want to order the Crystal Ball Lamp. Please share the details.";

/**
 * Build a wa.me deep link with a prefilled message.
 * @param {string} [message]
 */
export function whatsappLink(message = defaultWhatsAppMessage) {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
