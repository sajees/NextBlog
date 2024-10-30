import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Define font weights for your project
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      lineHeight: {
        zero: "0",
        none: "1",
        tight: "1.15",
        xxl: "76.8px",
      },
      fontSize: {
        xxs: ".625rem", //10px
        xs: ".75rem", // 12px
        sm: ".875rem", // 14px
        md: "18px",
        xxl: "64px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dark_blue: "#041D37",
        white_10: "rgba(255,255,255,0.1)"
      },
      // Define custom background images
      backgroundImage: {
        "btn-gradient": "linear-gradient(71.51deg, #009845 29.29%, #10CFC9 120.23%)",
      },
      borderRadius: {
        none: "0",
        xs: "6px",
        sm: "8px",
        md: "10px",
        lg: "16px",
        xl: "20px",
        xxl: "30px",
        full: "100%",
      },
    },
  },
  plugins: [],
};
export default config;
