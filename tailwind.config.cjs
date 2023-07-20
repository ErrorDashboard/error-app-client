/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './*.html'],
  darkMode: 'media',
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: 'green',
        secondary: '#7ee285',
        'secondary-light': '#f3fff4'
      },
      fontFamily: {
        sans: ['Merriweather'],
      },
      fontSize: {
        'xs': '.75rem'
      },
      screens: {
        'xs': '240px',
      },
      backgroundColors: {
        primary: 'var(--colors-primary)',
      },
      textColors: {
        primary: 'var(--colors-primary)',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['primary'],
      textColor: ['primary'],
    },
  },
};
