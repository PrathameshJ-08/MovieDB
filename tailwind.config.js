/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],

  theme: {
    extend: {},
    colors: {
      gray: { 100: "#808080", 200: "#323232", 300: "#212121" },
      yellow: { 100: "#fadc91", 200: "#ffc83d" },
      white: "#fff",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
