/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'txt-color-darkgray': '#2F464B',
        'gradient-start': '#2F464B', // The starting color of the gradient
        'gradient-end': '#97B2A9',   // The ending color of the gradient
      },
      backgroundImage: {
        bgGold: "linear-gradient(270deg, #b07b59 2.54%, #c2a891 100%)",
        bgRed: "linear-gradient(270deg, #5B8581 2.54%, #78B6B6 100%);",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
