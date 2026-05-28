import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b1220",
        ocean: "#1264ff",
        cyanline: "#00c2ff",
        mint: "#14b8a6",
        porcelain: "#f7fbff"
      },
      boxShadow: {
        "soft-xl": "0 24px 80px rgba(18, 100, 255, 0.14)",
        "panel": "0 18px 48px rgba(15, 23, 42, 0.08)"
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        }
      }
    }
  },
  plugins: []
};

export default config;
