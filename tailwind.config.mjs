/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF7E9',
          100: '#F5EAC7',
          200: '#E8D292',
          300: '#D4B55D',
          400: '#C19835',
          500: '#A37E2C',
          600: '#8A6824',
          700: '#71531D',
          800: '#583F16',
          900: '#3F2C0F',
        },
        green: {
          50: '#E6F5EF',
          100: '#CCEADF',
          200: '#99D5BF',
          300: '#66C09F',
          400: '#33AB7F',
          500: '#006039',
          600: '#004D2E',
          700: '#003A23',
          800: '#002718',
          900: '#00130C',
        },
        white: '#FFFFFF',
        cream: {
          50: '#FFFFFF',
          100: '#FEFEFE',
          200: '#FAFAFA',
          300: '#F5F5F5',
          400: '#EFEFEF',
          500: '#E5E5E5',
          600: '#CCCCCC',
          700: '#B3B3B3',
          800: '#999999',
          900: '#808080',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-up': 'scaleUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config
