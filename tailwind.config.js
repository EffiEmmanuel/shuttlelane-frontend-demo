/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        shuttlelaneBlack: "#000",
        shuttlelanePurple: "#262471",
        shuttlelaneGold: "#E2B442",
      },
      backgroundColor: {
        shuttlelaneBlack: "#000",
        shuttlelanePurple: "#262471",
        shuttlelaneLightPurple: "#F7F6FF",
        shuttlelaneGold: "#E2B442",
      },
      borderColor: {
        shuttlelaneBlack: "#000",
        shuttlelanePurple: "#262471",
        shuttlelaneGold: "#E2B442",
      },
      backdropFilter: {
        none: "none",
        blur: "blur(20px)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "bounce-slow": "bounce 2s linear infinite",
      },
    },
  },
  plugins: [],
};
