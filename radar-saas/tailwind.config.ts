import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17201c",
        paper: "#f7f6f2",
        mist: "#e7e3da",
        radar: {
          green: "#20a66a",
          amber: "#d7921e",
          red: "#c94b4b",
          blue: "#3973d8",
          violet: "#7b5cc4",
          teal: "#16858c"
        }
      },
      boxShadow: {
        panel: "0 16px 40px rgba(23, 32, 28, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
