// Single-product catalog: a 3D laser-engraved crystal ball on a wooden LED base.
// Variants are the engraved designs (all ₹199). Bundles = quantity offers.
// Prices in ₹. WhatsApp is the checkout.

export const bundles = [
  { id: "single", title: "Single Orb", qty: 1, price: 199, original: 449, note: "Pick any design", badge: null },
  { id: "duo", title: "Duo Set", qty: 2, price: 349, original: 898, note: "Mix two designs", badge: "Most Popular" },
  { id: "trio", title: "Family Trio", qty: 3, price: 499, original: 1347, note: "One for every room", badge: "Best Value" },
  { id: "gift", title: "Gift Set", qty: 1, price: 299, original: 649, note: "+ premium box & card", badge: "Giftable" },
];

export const benefits = [
  { icon: "Sparkles", title: "3D Laser-Engraved Crystal", desc: "A real glass orb with a crisp 3D design etched inside — it looks unreal switched on." },
  { icon: "Usb", title: "Warm Wooden LED Base", desc: "Hand-finished wood base with a cosy warm glow. USB powered — plug in and it comes alive." },
  { icon: "Gift", title: "Made To Be Gifted", desc: "Moon, Solar System or Lord Shiva — a keepsake that earns a genuine gasp every time." },
];

export const reviews = [
  { name: "Ananya", city: "Bengaluru", rating: 5, text: "The most beautiful thing in my room now. Falls-asleep-in-minutes kind of glow." },
  { name: "Rahul", city: "Delhi", rating: 5, text: "Gifted it for our anniversary — she teared up. The texture is unreal." },
  { name: "Sneha", city: "Hyderabad", rating: 5, text: "Arrived in 3 days, packaging felt premium. My daughter is obsessed with it." },
  { name: "Karan", city: "Mumbai", rating: 5, text: "Ended up buying two more for friends. Everyone who visits asks about it." },
  { name: "Meera", city: "Pune", rating: 5, text: "My bedroom feels like a boutique hotel. Best decor buy this year, easily." },
  { name: "Aditya", city: "Kochi", rating: 5, text: "Feels like it should cost 3x the price. Touch control is buttery smooth." },
];

export const trust = { customers: "5,000+", rating: "4.9", label: "Happy customers across India" };

// Rendered as text pills (self-contained, no external image requests).
export const paymentMethods = ["UPI", "GPay", "PhonePe", "Paytm", "VISA", "RuPay"];

/** Build a WhatsApp order message for a chosen design + quantity. */
export function designOrderMessage(design, qty, total) {
  return (
    `Hi superb.choice! 🌙 I'd like to order the Crystal Ball Lamp.\n` +
    `• Design: ${design.label}\n` +
    `• Quantity: ${qty}\n` +
    `• Total: ₹${total}\n` +
    `Please confirm my order. 🙏`
  );
}

/** Build a WhatsApp order message for a chosen bundle. */
export function bundleOrderMessage(bundle) {
  return (
    `Hi superb.choice! 🌙 I want the "${bundle.title}" offer.\n` +
    `• Includes: ${bundle.qty} Crystal Ball Lamp${bundle.qty > 1 ? "s" : ""}${bundle.id === "gift" ? " + gift box & card" : ""}\n` +
    `• Price: ₹${bundle.price}\n` +
    `Please confirm my order. 🙏`
  );
}
