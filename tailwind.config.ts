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
      }
    }
  },
  plugins: []
};

export default config;
