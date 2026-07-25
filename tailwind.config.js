/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#f8f5f0',
        'clay': '#d8b384',
        'accent': '#8b5a2b',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};