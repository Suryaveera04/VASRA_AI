/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#080809",
          900: "#0D0E10",
          850: "#131417",
          800: "#181A1F",
          700: "#22252C",
          600: "#2E333D",
        },
        gold: {
          300: "#F5E4A8",
          400: "#E5C268",
          500: "#D4AF37",
          600: "#C5A059",
          700: "#A38038",
          800: "#826325",
        },
        maroon: {
          900: "#380B12",
          800: "#58111A",
          700: "#7A1C27",
        },
        ivory: {
          100: "#FAF8F5",
          200: "#F4EFE6",
          300: "#E6DFD1",
          400: "#C4BDAD",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "'Cormorant Garamond'", "serif"],
        cinzel: ["'Cinzel'", "serif"],
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      boxShadow: {
        'gold-glow': '0 0 35px -5px rgba(212, 175, 55, 0.25)',
        'maroon-glow': '0 0 40px -5px rgba(88, 17, 26, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
