/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { brand: { DEFAULT: "#0ea5e9", 600:"#0284c7" } },
      boxShadow: { soft: "0 10px 25px -10px rgba(2,132,199,.25)" }
    },
  },
  plugins: [],
}
