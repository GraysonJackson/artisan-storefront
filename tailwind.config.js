/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tavern: "#181614",
        panel: "#221f1c",
        card: "#2a2622",
        hover: "#332f2a",
        wood: "#3d3731",
        brass: {
          border: "#b48c48",
          DEFAULT: "#d4a359",
          light: "#f3d498",
        },
        parchment: {
          light: "#faf6ee",
          DEFAULT: "#f5f2eb",
          muted: "#a8a096",
          faint: "#756d64",
        },
      },
      fontFamily: {
        display: ['"Cinzel"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "monospace"],
      },
      boxShadow: {
        brutal: "4px 4px 0px rgba(0, 0, 0, 0.4)",
        "brutal-sm": "2px 2px 0px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
