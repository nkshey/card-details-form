/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Space Grotesk", "sans-serif"],
    },

    colors: {
      "light-purple": "hsl(249, 99%, 64%)",
      "dark-purple": "hsl(278, 94%, 30%)",

      red: "hsl(0, 100%, 66%)",
      white: "hsl(0, 0%, 100%)",
      "light-violet": "hsl(270, 3%, 87%)",
      "dark-violet": "hsl(279, 6%, 55%)",
      "very-dark-violet": "hsl(278, 68%, 11%)",
    },

    screens: {
      xxs: { max: "285px" },
      xs: { max: "317px" },

      "322px": { max: "322px" },
      sm: "768px",
      md: { min: "900px", max: "1023px" },
      lg: "1025px",

      xxl: "2200px",
    },

    extend: {
      backgroundImage: {
        "mobile-pattern": "url('/images/bg-main-mobile.png')",
        "desktop-pattern": "url('/images/bg-main-desktop.png')",
        "card-front": "url('./images/bg-card-front.png')",
        "card-back": "url('./images/bg-card-back.png')",
      },

      aspectRatio: {
        custom: "447 / 245",
        big: "245 / 447",
      },
    },
  },
  plugins: [],
};
