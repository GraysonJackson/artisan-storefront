/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tavern: "#f4f3eb",
        panel: "#ffffff",
        card: "#e7eee8",
        hover: "#d8e5db",
        wood: "#b6c8bc",
        brass: {
          border: "#315d45",
          DEFAULT: "#234d3c",
          light: "#234d3c",
        },
        parchment: {
          light: "#162e24",
          DEFAULT: "#19382b",
          muted: "#3f5c4b",
          faint: "#4f6356",
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "monospace"],
      },
      boxShadow: {
        brutal: "0px 4px 16px rgba(16, 48, 29, 0.06)",
        "brutal-sm": "2px 2px 0px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
