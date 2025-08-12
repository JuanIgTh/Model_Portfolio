/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d0d0d',
        foreground: '#f5f5f5',
        accent: '#c084fc'
      },
      fontFamily: {
        classy: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    require("tailwindcss-animation-delay"),
    require('taos/plugin')
  ],
}
