import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0b",
          900: "#0a0a0b",
          800: "#111114",
          700: "#17171b",
        },
        // Accento Consortium — rosso, su tema scuro.
        // DEFAULT = Rosso Consortium; soft = variante chiara (glow/hover);
        // deep = variante scura (profondità nei gradienti).
        accent: {
          DEFAULT: "#E0362F",
          soft: "#FF6B66",
          deep: "#B0231D",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        "grid-white":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
        "chrome-text":
          "linear-gradient(180deg, #ffffff 0%, #e9eef5 40%, #9aa7b8 75%, #d7dee8 100%)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 0 40px -8px rgba(224,54,47,0.35)",
        "glow-accent": "0 0 60px -12px rgba(255,107,102,0.45)",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "border-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "border-spin": "border-spin 6s linear infinite",
        float: "float 8s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "fade-up": "fade-up 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
