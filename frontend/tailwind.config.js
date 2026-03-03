/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E53935',
          'red-dark': '#B71C1C',
          blue: '#1565C0',
          'blue-dark': '#0D47A1',
        },
        dark: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#273549',
          600: '#334155',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
    },
  },
  plugins: [],
}

