/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'flotar': 'flotar 8s infinite linear',
        'rotarrr': 'rotarrr 16s infinite linear',
        'rotar': 'rotar 4s infinite linear',
        'fn1': 'fn1 1s infinite linear',
      },
      keyframes: {
        'flotar': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
          '70%': { filter: 'brightness(1.5)'}
        },
        'rotarrr': {
          '0%': { transform: 'rotate(0deg)'},
          '100%': { transform: 'rotate(360deg)'}
        },
        'rotar': {
          '0%': { transform: 'rotate(0deg)'},
          '100%': { transform: 'rotate(360deg)'}
        },
        'fn1': {
          '50%': {
            transform: 'scaleY(1.1)',
          },
          '100%': {
              opacity: 1,
          }
        },
        screens:{
          xxs: "500px"
        },
        boxShadow: {
          '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        }
      },
      fontFamily: {
        'fira-code': ['Fira Code', 'monospace'], 
      },
    },
  },
  plugins: [],
}

