import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#09090b",
          2: "#0d0d10",
        },
        // Warm off-white "paper" — the brightest text tone.
        paper: "#f1f0ea",
        // Accento Consortium — Borgogna (sostituisce il vecchio rosso).
        accent: {
          DEFAULT: "#7c2a3b",
          soft: "#a83b52",
          deep: "#5a1e2b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
    },
  },
  plugins: [],
};

export default config;
