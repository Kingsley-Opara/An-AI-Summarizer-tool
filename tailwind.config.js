/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './**/*.{jsx,js},',
    './src/*.{jsx,js}',
    './index.html',
    './src/**/*.{jsx,js},',

   
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

