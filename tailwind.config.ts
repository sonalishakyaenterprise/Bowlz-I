import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bowlz-I brand palette
        forest: {
          50: "#f0f7f2",
          100: "#d6ece0",
          200: "#aed9c1",
          300: "#7dbfa0",
          400: "#4fa07d",
          500: "#2d8c58",
          600: "#1a5c3a",
          700: "#154d31",
          800: "#103d27",
          900: "#0a2d1d",
        },
        cream: {
          50: "#fdfcf8",
          100: "#f9f5ec",
          200: "#f5f0e8",
          300: "#ede6d6",
          400: "#ddd4bc",
          500: "#c9bc9e",
        },
        bark: {
          100: "#6b4f2a",
          200: "#4d3820",
          300: "#3d2d12",
          400: "#2a1f0e",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-med": "float 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-soft": "pulse 3s ease-in-out infinite",
        "slide-up": "slideUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "draw-line": "drawLine 1.5s ease forwards",
        "count-up": "countUp 0.4s ease forwards",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(3deg)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(32px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        drawLine: {
          from: { "stroke-dashoffset": "1000" },
          to: { "stroke-dashoffset": "0" },
        },
        marquee: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "noise-texture":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
