import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        filora: {
          DEFAULT: "#5003C0",
          50: "#FAF7FF",
          100: "#F3EDFF",
          200: "#E6DAFE",
          300: "#CEB5FC",
          400: "#A97CFA",
          500: "#7E3FF2",
          600: "#5003C0", // Core brand primary
          700: "#4202A1",
          800: "#34027F",
          900: "#27025F",
          950: "#17003B",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F8F7FB",
          muted: "#F3F2F8",
          border: "#EAEAEA",
          hover: "#F3EDFF",
        },
        neutral: {
          900: "#171717",
          700: "#404040",
          600: "#666666",
          500: "#8A8A8A",
          300: "#D4D4D4",
          200: "#EAEAEA",
          100: "#F5F5F5",
          50: "#FAFAFA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
        card: "0 4px 6px -1px rgba(80, 3, 192, 0.03), 0 2px 4px -2px rgba(80, 3, 192, 0.03), 0 0 0 1px rgba(0, 0, 0, 0.04)",
        cardHover: "0 10px 25px -3px rgba(80, 3, 192, 0.08), 0 4px 6px -4px rgba(80, 3, 192, 0.04), 0 0 0 1px rgba(80, 3, 192, 0.15)",
        editor: "0 20px 40px -15px rgba(80, 3, 192, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
