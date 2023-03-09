/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        cbBlue: "#2A9FF3",
        cbDarkBlue: "#0E64B0",
        cbGreen: "#44B081",
        cbOrange: "#F1A51F",
        cbPink: "#EF7FC0",
        cbRed: "#CA550C",
        cbYellow: "#FFF260",
        wsBlue: "#024FE8",
      },
    },
  },
}
