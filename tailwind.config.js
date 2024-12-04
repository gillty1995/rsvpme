export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "header-bg": "#222222",
        "header-text": "#ecf0f1",
        "main-bg": "#f2f2f2",
        "footer-bg": "#222222",
        "bg-gradient": "#333333",
        "footer-text": "#ecf0f1",
        "main-text": "#333333",
        "text-dark": "#333333",
        "light-gray": "#f5f5f5",
        "button-bg": "#ff7043",
      },
      fontFamily: {
        mont: ["Montserrat", "sans-serif"],
        rale: ["Raleway", "sans-serif"],
      },
      fontWeight: {
        thin: 100,
        regular: 400,
        bold: 700,
      },
      fontSize: {
        "10xl": "10rem",
      },
    },
  },
  plugins: [],
};
