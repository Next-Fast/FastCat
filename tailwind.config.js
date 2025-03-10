const { heroui } = require("@heroui/theme");
const tailwindcssAnimate = require("tailwindcss-animate");


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  	
  	}
  },
  plugins: [heroui(), tailwindcssAnimate()],
}

