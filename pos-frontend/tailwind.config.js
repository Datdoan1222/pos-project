/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff5f2",
          100: "#ffe4dc",
          200: "#fecdc2",
          300: "#fdaaa0",
          400: "#f97a63",
          500: "#ee4d2d", // Shopee orange
          600: "#d73211",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },

        success: {
          50: "#f0fdf4",
          600: "#16a34a",
          700: "#15803d",
        },

        warning: {
          50: "#fff7ed",
          600: "#ea580c",
          700: "#c2410c",
        },

        error: {
          50: "#fef2f2",
          600: "#dc2626",
          700: "#b91c1c",
        },
      },
    },
  },
  plugins: [],
};
