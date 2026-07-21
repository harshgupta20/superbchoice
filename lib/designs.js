// The single product is a 3D laser-engraved crystal ball on a wooden LED base.
// These are the design variants — all ₹199.
//
// `image` points to a real product photo in /public/products/. If the file is
// missing, the UI gracefully falls back to the CSS crystal ball render.

export const designs = [
  { id: "moon", label: "Moon", tagline: "The classic full moon", price: 199, original: 449, image: "/products/moon.jpeg" },
  { id: "solar", label: "Solar System", tagline: "The galaxy in your hands", price: 199, original: 449, image: "/products/solar.jpg" },
  { id: "shiva", label: "Lord Shiva", tagline: "Calm, divine, powerful", price: 199, original: 449, image: "/products/shiva.webp" },
];

export const DESIGN_PRICE = 199; // headline price (= online)
export const DESIGN_ORIGINAL = 449;

// Payment options (per unit)
export const ONLINE_PRICE = 199; // pay online via UPI
export const COD_PRICE = 229; // cash on delivery

export function getDesign(id) {
  return designs.find((d) => d.id === id) || designs[0];
}
