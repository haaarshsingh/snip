/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        alert: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      fontFamily: {
        sans: ['Inter'],
        mono: ['Fira Code'],
      },
      colors: {
        gray: {
          0: '#F6F6F6',
          100: '#fafafa',
          200: '#eaeaea',
          300: '#999999',
          400: '#888888',
          500: '#666666',
          600: '#444444',
          700: '#333333',
          800: '#222222',
          900: '#161616',
        },
      },
      boxShadow: {
        custom: '0px 10px 50px 0px #00000010',
      },
      width: {
        40: '40vw',
        60: '60vw',
        70: '70vw',
        90: '90vw',
      },
      maxWidth: { 800: '800px' },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
        '2xl': '1600px',
      },
    },
  },
}
