/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        shuttlelaneBlack: "#000",
        shuttlelanePurple: "#262471",
      },
      backgroundColor: {
        shuttlelaneBlack: "#000",
        shuttlelanePurple: "#262471",
      },
      borderColor: {
        shuttlelaneBlack: "#000",
        shuttlelanePurple: "#262471",
      },
      backdropFilter: {
        none: "none",
        blur: "blur(20px)",
      },
    },
  },
  plugins: [],
};
