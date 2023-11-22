/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "40%, 60%, 80%": { transform: "rotate(-12deg)" },
          "30%, 50%, 70%, 90%": { transform: "rotate(12deg)" },
          "0%, 10%, 20%, 100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      screens: {
        xs: "375px",
      },
      colors: {
        active: {
          blue: "#008ae6",
          red: "#cb2431",
        },
        bodyBg: "#101010",
        containerBg: "#1d1d1d",
        black: "#2d2e32",
        lightGray: "#f1f4f8",
        primary: {
          light: "#338EF7",
          main: "#006FEE",
          dark: "#005BC4",
        },
        success: {
          light: "#74DFA2",
          main: "#17C964",
          dark: "#12A150",
        },
        error: {
          light: "#F871A0",
          main: "#F31260",
          dark: "#C20E4D",
        },
        warning: {
          light: "#F9C97C",
          main: "#F5A524",
          dark: "#C4841D",
        },
      },
    },
  },
  plugins: [],
};
