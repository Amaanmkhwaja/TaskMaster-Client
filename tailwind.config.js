/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      primary: "#1aac83",
      error: "#e7195a"
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        vt323: ['VT323', 'monospace'],
      },
      boxShadow: {
        'custom': '2px 2px 5px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}

