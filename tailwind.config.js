/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: "class",
  theme: {
    extend: {},
    screens: {
      tiny: { max: "319px" },
      xxs: "320px",
      sxs: "380px",
      nsxs: { max: "379px" },
      xs: "480px",
      nxs: { max: "479px" },
      sm: "640px",
      nsm: { max: "639px" },
      md: "748px",
      nmd: { max: "748px" },
      lmd: "860px",
      nlmd: { max: "859px" },
      lg: "1024px",
      nlg: { max: "1023px" },
      xl: "1280px",
      nxl: { max: "1279px" },
      "2xl": "1536px",
      n2xl: { max: "1535px" },
    },
  },
  plugins: [],
};
