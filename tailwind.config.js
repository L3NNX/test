/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f6fb',    // Very light blue hint
          100: '#e4e9f6',
          200: '#c2c8e3',
          300: '#99a2cd',
          400: '#6f7cb5',
          500: '#47579a',
          600: '#182256',    // Australian blue – base
          700: '#141c48',
          800: '#10173a',
          900: '#0c112c',
        },
        secondary: {
          50: '#f5fffa',
          100: '#e6fff0',
          200: '#c6ffdd',
          300: '#9dffbb',
          400: '#74ff8a',
          500: '#4cff59',
          600: '#228B22', // Australian green
          700: '#1a7d1a',
          800: '#156415',
          900: '#104c10',
        },
        accent: {
          50: '#fff8f5',
          100: '#ffeee6',
          200: '#ffd6c6',
          300: '#ffb79d',
          400: '#ff9874',
          500: '#ff794c',
          600: '#D2691E', // Australian ochre
          700: '#b34d15',
          800: '#8c3c11',
          900: '#662d0d',
        },
        success: {
          500: '#10B981',
          600: '#059669',
        },
        warning: {
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
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
      },
    },
  },
  plugins: [],
};