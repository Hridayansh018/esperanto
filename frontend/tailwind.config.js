/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#058603",
        secandoey:"#EF863E"
      },
      backgroundImage:{
        'login-bg-img':"url('./src/assets/island1.jpg')",
        'signup-bg-img':"url('./src/assets/island2.jpg')"
      }
    },
  },
  plugins: [],
}