/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,png,jpg}"],
  theme: {
    fontFamily: {
      primary: ["Mulish", "sans-serif"],
      hero: ["Work Sans", "sans-serif"],
      link: ["Karla", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        hero: "url('/src/assets/images/hero.jpg')",
      },
    },
  },
  plugins: [],
};
