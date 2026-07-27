module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // paths must match your actual file locations
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#7420E2",
    },
    //   fontFamily: {
    //     sans: ["Graphik", "sans-serif"],
    //     serif: ["Merriweather", "serif"],
    //   },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        primary: "#7420E2",
      },
    },
    // },
    // variants: {
    //   extend: {
    //     borderColor: ["focus-visible"],
    //     opacity: ["disabled"],
    //   },
  },
};
