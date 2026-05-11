/** @type {import('tailwindcss').Config} */
export default {
  // Tell Tailwind which files to scan for class usage
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Custom font family
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      // Custom color palette for the app
      colors: {
        primary: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          900: "#312e81",
        },
      },
    },
  },
  plugins: [],
};
