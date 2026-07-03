import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        piyo: "#C9E8C5",
        piyodeep: "#6FAE6A",
        cocoa: "#4A3728",
        sora: "#5BB8D4",
        shu: "#D94F3D",
        cream: "#FFFDF5",
      },
      fontFamily: {
        maru: ["\"Zen Maru Gothic\"", "sans-serif"],
        body: ["\"Noto Sans JP\"", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
