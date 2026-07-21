// The single product is a 3D laser-engraved crystal ball on a wooden LED base.
// These are the design variants. Each design can carry its own price.
//
// `image` points to a real product photo in /public/products/. If the file is
// missing, the UI gracefully falls back to the CSS crystal ball render.

export const designs = [
  { id: "moon", label: "Moon", tagline: "The classic full moon", price: 199, original: 449, image: "/products/moon.jpeg" },
  { id: "solar", label: "Solar System", tagline: "The galaxy in your hands", price: 199, original: 449, image: "/products/solar.jpg" },
  { id: "shiva", label: "Lord Shiva", tagline: "Calm, divine, powerful", price: 249, original: 499, image: "/products/shiva.webp" },
];

// Cash-on-Delivery adds a flat handling fee on top of the online price.
export const COD_SURCHARGE = 30;

// Headline "from" price shown in generic spots (e.g. hero).
export const DESIGN_PRICE = 199;
export const DESIGN_ORIGINAL = 449;

export function getDesign(id) {
  return designs.find((d) => d.id === id) || designs[0];
}

/** Cash-on-Delivery price for a design (online price + surcharge). */
export function codPrice(design) {
  return design.price + COD_SURCHARGE;
}
