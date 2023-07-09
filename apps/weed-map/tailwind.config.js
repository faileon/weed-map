const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme')


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, 'src/**/*.{js,ts,jsx,tsx,mdx}')],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#B9E4C9',
          200: '',
          300: '',
          400: '',
          500: '#37966F',
          600: '',
          700: '',
          800: '#356859',
          900: '',
        },
        secondary: {
          800: '#FD5523',
        },
        surface: '#FFFBE6',
        elevated: '#ECE9D5',
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        mono: ['Lekton', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
};
