// The single product is a 3D laser-engraved crystal ball on a wooden LED base.
// These are the design variants — all ₹199.

export const designs = [
  { id: "moon", label: "Moon", tagline: "The classic full moon", price: 199, original: 449 },
  { id: "solar", label: "Solar System", tagline: "The galaxy in your hands", price: 199, original: 449 },
  { id: "shiva", label: "Lord Shiva", tagline: "Calm, divine, powerful", price: 199, original: 449 },
];

export const DESIGN_PRICE = 199;
export const DESIGN_ORIGINAL = 449;

export function getDesign(id) {
  return designs.find((d) => d.id === id) || designs[0];
}
