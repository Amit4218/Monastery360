/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        monastery: {
          50: '#fef7ed',
          100: '#fdebd5',
          200: '#fbd3aa',
          300: '#f8b574',
          400: '#f4903c',
          500: '#f17216',
          600: '#e2580c',
          700: '#bb410c',
          800: '#953411',
          900: '#782c12',
          950: '#411407',
        },
        prayer: {
          blue: '#1e40af',
          white: '#ffffff',
          red: '#dc2626',
          green: '#16a34a',
          yellow: '#eab308',
        },
        tibetan: {
          gold: '#d4af37',
          burgundy: '#800020',
          saffron: '#f4c430',
          turquoise: '#40e0d0',
          crimson: '#dc143c',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'tibetan': ['Noto Sans Tibetan', 'sans-serif'],
        'devanagari': ['Noto Sans Devanagari', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'slide-left': 'slideLeft 0.4s ease-out',
        'slide-right': 'slideRight 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'prayer-wheel': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gradient-shift': 'gradientShift 4s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(-5px) rotate(-1deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        'monastery-pattern': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"2\" fill=\"%23d4af37\" opacity=\"0.1\"/></svg>')",
        'prayer-flags': 'linear-gradient(90deg, #1e40af 20%, #ffffff 20% 40%, #dc2626 40% 60%, #16a34a 60% 80%, #eab308 80%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23d4af37\" fill-opacity=\"0.05\"><circle cx=\"30\" cy=\"30\" r=\"4\"/></g></g></svg>')",
      },
      backdropBlur: {
        'xs': '2px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'monastery': '0 10px 25px -3px rgba(212, 175, 55, 0.1), 0 4px 6px -2px rgba(212, 175, 55, 0.05)',
        'monastery-lg': '0 20px 40px -4px rgba(212, 175, 55, 0.15), 0 8px 16px -4px rgba(212, 175, 55, 0.1)',
        'glow': '0 0 20px rgba(212, 175, 55, 0.4)',
        'glow-lg': '0 0 40px rgba(212, 175, 55, 0.6)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(212, 175, 55, 0.1)',
      },
      dropShadow: {
        'glow': '0 0 10px rgba(212, 175, 55, 0.5)',
        'glow-lg': '0 0 20px rgba(212, 175, 55, 0.7)',
      },
      blur: {
        'xs': '2px',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}