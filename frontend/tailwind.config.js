/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display :["Fredoka","Poppins"]
    },
    extend: {
      colors:{
        primary:"#058603",
        secandoey:"#EF863E"
      }
    },
  },
  plugins: [],
}