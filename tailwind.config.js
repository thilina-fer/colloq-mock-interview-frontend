/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#F9FAFB",
          surface: "#FFFFFF",
          border: "#E5E7EB",
          "text-primary": "#111827",
          "text-muted": "#6B7280",
          "gray-100": "#F3F4F6",
          "gray-200": "#E5E7EB",
          "gray-300": "#D1D5DB",
          "gray-400": "#9CA3AF",
        },
      },
      fontFamily: {
        sans: [
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
        ],
      },
    },
  },
  plugins: [],
};
