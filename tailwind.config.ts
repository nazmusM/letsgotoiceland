import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: 'var(--color-orange)',
        orangeTransparent: 'var(--color-orangeTransparent)',
        darkGray: 'var(--color-darkGray)',
        lightGray: 'var(--color-lightGray)',
        borderGray: 'var(--color-borderGray)',
        tooltip: 'var(--color-tooltip)',
        gray_900: 'var(--color-gray_900)',
        black_333: 'var(--color-black_333)',
        orangeBanner: "#FFBE6E",
        white_80: 'var(--color-white-80)',
        white_60: 'var(--color-white-80)',
        
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        xs: ["12px", "18px"],
        sm: ["14px", "21px"],
        base: ["16px", "24px"],
        lg: ["18px", "27px"],
        xl: ["20px", "30px"],
        "2xl": ["22px", "26.4px"],
        "3xl": ["24px", "28.8px"],
        "4xl": ["24px", "28.8px"],
        "5xl": ["32px", "38.4px"],
        "6xl": ["42px", "50.4px"],
        "7xl": ["56px", "67.2px"],
        "8xl": ["72px", "86.4px"], 
      },
      letterSpacing: {
        deskLetterSpacing: "0.5px",
        mobLetterSpacing: "0.5px",
        letterSpacing024: "0.24px",
      },
      height: {
        "32": "32px",
      },
      aspectRatio: {
        square: "1 / 1",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
