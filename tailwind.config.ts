import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "public-sans": "'Public Sans', sans-serif",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
