import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "2rem",
        xl: "2.5rem"
      }
    },
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      colors: {
        hc: {
          bg: "#000000",
          text: "#FAFAFA",
          muted: "#D9D9D9",
          yellow: "#F1BF00",
          red: "#AA151B"
        }
      },
      borderRadius: {
        "hc-md": "0.75rem",
        "hc-lg": "1rem"
      },
      boxShadow: {
        "hc-card": "0 18px 50px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
