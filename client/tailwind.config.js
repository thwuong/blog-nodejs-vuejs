/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,png,jpg}"],
  theme: {
    fontFamily: {
      primary: ["Mulish", "sans-serif"],
      "card-title": ["Cabin", "sans-serif"],
      link: ["Karla", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
