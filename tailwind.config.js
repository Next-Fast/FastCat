import tailwindcssAnimate from "tailwindcss-animate";
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"],
  plugins: [heroui(), tailwindcssAnimate],
};

