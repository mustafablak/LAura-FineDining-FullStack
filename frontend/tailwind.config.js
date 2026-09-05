/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: { dark: '#050608', gold: '#d4af37' }
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
