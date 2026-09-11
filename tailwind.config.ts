import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Brand system — clean white, cool blue, metallic silver, charcoal accent.
        white: "#FFFFFF",
        ice: "#DCEFF7",
        brand: {
          50: "#EAF6FB",
          100: "#DCEFF7",
          300: "#8FC7DE",
          500: "#3B9BC2", // primary blue
          700: "#0E6E93",
          900: "#075A7D", // deep lake blue
        },
        silver: {
          light: "#E9EEF1",
          DEFAULT: "#B8C2C8",
          dark: "#8A969C",
        },
        charcoal: "#151A1D",
        ink: "#080B0D",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(8,11,13,0.04), 0 8px 24px rgba(7,90,125,0.08)",
      },
      borderRadius: {
        DEFAULT: "6px",
      },
    },
  },
  plugins: [],
};
export default config;
