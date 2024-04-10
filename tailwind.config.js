/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        kohSantepheabBold: ["KohSantepheabBold"],
        kohSantepheabLight: ["KohSantepheabLight"],
        kohSantepheabThin: ["KohSantepheabThin"],
        kohSantepheabRegular: ["KohSantepheabRegular"],
        krasarBold: ["KrasarBold"],
        krasarLight: ["KrasarLight"],
        krasarExtraLight: ["KrasarExtraLight"],
        krasarMeduim: ["KrasarMeduim"],
        krasarRegular: ["KrasarRegular"],
        krasarThin: ["KrasarThin"],
        moulRegular: ["MoulRegular"],
        nokora: ["Nokora"]
      },
      colors: {
        custom: {
          blue: "#014F99", //primary
          orange: "#EF7C00", //secondary
          white: "#FFFFFF",
          black: "#212121",
        },
      },
    },
  },
  darkMode: "class",
  corePlugins: {
    preflight: false,
  },
};
