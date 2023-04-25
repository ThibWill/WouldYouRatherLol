/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        layout: "64rem",
      },
    },
    colors: {
      "blue-primary": "#2D389A",
      "blue-secondary": "#EBF0FF",
      white: "#ffffff",
    },
    fontSize: {
      base: "1rem",
      xl: "2rem",
    },
  },
  plugins: [],
};
