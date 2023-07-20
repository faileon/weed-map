const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, 'src/**/*.{js,ts,jsx,tsx,mdx}')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#daf1e3',
          200: '#b8e2cc',
          300: '#89ccac',
          400: '#58af88',
          500: '#37966F',
          600: '#267557',
          700: '#1e5e47',
          800: '#1a4b39',
          900: '#163e30',
          950: '#0b231b',
        },
        secondary: {
          50: '#fff4ed',
          100: '#ffe5d4',
          200: '#ffc7a9',
          300: '#ffa172',
          400: '#fe6e39',
          500: '#fd5523',
          600: '#ee2e08',
          700: '#c51e09',
          800: '#9c1a10',
          900: '#7e1810',
          950: '#440806',
        },
        surface: '#FFFBE6',
        elevated: '#ECE9D5',
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        mono: ['Lekton', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
