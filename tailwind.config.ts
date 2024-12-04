import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        burgundy: {
          50: "#f9ebed",
          100: "#f2d6db",
          200: "#e6acb7",
          300: "#d98094",
          400: "#cd5470",
          500: "#b33b57",
          600: "#8c2e45",
          700: "#662232",
          800: "#3f151f",
          900: "#19070d",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
