/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        ivory: "#F9F3E9",
        cream: "#FBF2E6",
        sand: "#E8DAC9",
        terracotta: "#C96E40",
        saffron: "#D99128",
        gold: "#C4974C",
        brown: "#4A2E20",
        cocoa: "#5E382D",
        forest: "#5C6B5B",
        slate: "#5B5A57",
        maroon: "#7B2F24",
        'maroon-deep': "#4A1C18",
        surface: "#FFFFFF",
        'surface-soft': "#FBF4EB",
        'text-muted': "#6B5A4F",
        accent: "#D99128",
        'accent-soft': "#F2D8B1",
        highlight: "#C96E40",
        green: "#5E7A56",
        card: "#FFFFFF",
        border: "#E7D6C5",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1.25rem",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(76, 40, 20, 0.08)",
        lift: "0 10px 30px rgba(76, 40, 20, 0.08)",
        luxury: "0 30px 80px rgba(76, 40, 20, 0.12)",
      },
    },
  },

  plugins: [],
}