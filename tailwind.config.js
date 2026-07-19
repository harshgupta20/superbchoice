/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: "#090909",
          800: "#111018",
          900: "#0c0b12",
          950: "#090909",
        },
        gold: {
          DEFAULT: "#FFD369",
          soft: "#FFE39B",
          deep: "#E6B84C",
        },
        cream: "#FFF4D6",
        beige: "#E8D5A8",
        warm: "#F5B942",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(255,211,105,0.55)",
        "glow-lg": "0 0 140px -10px rgba(255,211,105,0.6)",
        card: "0 20px 60px -20px rgba(0,0,0,0.7)",
        "gold-cta": "0 10px 44px -6px rgba(255,211,105,0.5)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FFF4D6 0%, #FFD369 45%, #E6B84C 100%)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.95", transform: "scale(1.06)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "1" },
        },
        shoot: {
          "0%": { transform: "translate3d(0,0,0) rotate(-24deg)", opacity: "0" },
          "8%": { opacity: "1" },
          "22%": { opacity: "1" },
          "40%, 100%": { transform: "translate3d(-460px,220px,0) rotate(-24deg)", opacity: "0" },
        },
        aurora: {
          "0%, 100%": { transform: "translateX(-10%) translateY(0) scale(1)", opacity: "0.5" },
          "50%": { transform: "translateX(10%) translateY(-4%) scale(1.1)", opacity: "0.8" },
        },
        "marquee-y": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "bob-x": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(6px)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        breathe: "breathe 5s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        aurora: "aurora 14s ease-in-out infinite",
        "marquee-y": "marquee-y 40s linear infinite",
        "spin-slow": "spin-slow 60s linear infinite",
      },
    },
  },
  plugins: [],
};
