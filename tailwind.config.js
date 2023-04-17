/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#2D389A',
      white: '#ffffff'
    },
    fontSize: {
      base: '1rem',
      xl: '2rem',
    }
  },
  plugins: [],
}
