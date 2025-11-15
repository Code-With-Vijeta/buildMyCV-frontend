/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        secondary: '#f3f4f6', // you can change this to any light gray or desired color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // optional modern font
      }
    },
  },
  plugins: [],
}
