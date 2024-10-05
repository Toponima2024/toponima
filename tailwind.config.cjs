/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBg: '#f0fafb',
      },
      fontFamily: {
        ProximaNovaRegular: ['ProximaNovaRegular'],
        ProximaNovaLight: ['ProximaNovaLight'],
        ProximaNovaBold: ['ProximaNovaBold'],
        FreightTextProLightRegular: ['FreightTextProLightRegular'],
        FreightTextProBoldRegular: ['FreightTextProBoldRegular'],
      },
    },
  },
  plugins: [],
});
