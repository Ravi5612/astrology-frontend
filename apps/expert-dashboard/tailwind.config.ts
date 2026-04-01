import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../shared/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "#FF6B00",
        secondary: "#301118",
        "secondary-dark": "#1A0E05",
        brand: {
          orange: "#F25E0A",
          brown: "#4A1D1F",
          white: "#FFFFFF",
        },
        gold: "#daa23e",
        "astro-primary": "#732882",
        "astro-bg": "#fcfbf5",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;


