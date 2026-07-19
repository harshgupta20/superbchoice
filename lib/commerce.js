// Data + helpers for the live "someone just bought this" notifications and
// the dynamic stock counter. Pure functions — safe to call client-side.

export const buyers = [
  { name: "Aarav", city: "Delhi", qty: 1 },
  { name: "Priya", city: "Jaipur", qty: 2 },
  { name: "Ananya", city: "Bengaluru", qty: 1 },
  { name: "Rohan", city: "Mumbai", qty: 1 },
  { name: "Ishaan", city: "Pune", qty: 1 },
  { name: "Sneha", city: "Hyderabad", qty: 2 },
  { name: "Karan", city: "Chandigarh", qty: 1 },
  { name: "Diya", city: "Lucknow", qty: 1 },
  { name: "Aditya", city: "Kochi", qty: 2 },
  { name: "Meera", city: "Ahmedabad", qty: 1 },
  { name: "Vivaan", city: "Surat", qty: 1 },
  { name: "Riya", city: "Indore", qty: 1 },
  { name: "Arjun", city: "Kolkata", qty: 1 },
  { name: "Nisha", city: "Nagpur", qty: 2 },
  { name: "Kabir", city: "Bhopal", qty: 1 },
  { name: "Tara", city: "Patna", qty: 1 },
  { name: "Dev", city: "Coimbatore", qty: 1 },
  { name: "Sanya", city: "Guwahati", qty: 1 },
];

// Weighted toward "recent" so it always feels like it's happening right now.
const TIME_PHRASES = [
  "just now",
  "just now",
  "a few seconds ago",
  "1 minute ago",
  "2 minutes ago",
  "3 minutes ago",
  "4 minutes ago",
  "6 minutes ago",
];

const VERBS = ["ordered", "just bought", "grabbed", "purchased"];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/** Build a fresh, randomized purchase event. */
export function makePurchase() {
  const b = pick(buyers);
  const qty = Math.random() < 0.72 ? 1 : b.qty || 2;
  return {
    id: `${b.name}-${Date.now()}-${randInt(0, 9999)}`,
    name: b.name,
    city: b.city,
    qty,
    verb: pick(VERBS),
    when: pick(TIME_PHRASES),
  };
}

/** Random delay (ms) before the next notification — keeps timing organic. */
export function nextDelay() {
  return randInt(6500, 15000);
}

export const STOCK_MIN = 4;
const STOCK_KEY = "sc_moon_stock";

/**
 * Live stock that keeps dropping across visits so it never looks static:
 * seeds once, decays with elapsed time, and "restocks" believably if it runs
 * too low. Persisted in localStorage. Returns { value, ts }.
 */
export function readLiveStock() {
  const now = Date.now();
  let value;
  try {
    const raw = localStorage.getItem(STOCK_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      const elapsedMin = (now - saved.ts) / 60000;
      // Roughly one unit sold every ~11 minutes, plus a little jitter.
      const decay = Math.floor(elapsedMin / 11) + (Math.random() < 0.4 ? 1 : 0);
      value = saved.value - decay;
      if (value < STOCK_MIN) value = STOCK_MIN + randInt(2, 8); // fresh restock
    } else {
      value = randInt(9, 19); // first-ever visit
    }
  } catch {
    value = randInt(9, 19);
  }
  writeLiveStock(value, now);
  return value;
}

export function writeLiveStock(value, ts = Date.now()) {
  try {
    localStorage.setItem(STOCK_KEY, JSON.stringify({ value, ts }));
  } catch {
    /* storage unavailable — ignore */
  }
}
