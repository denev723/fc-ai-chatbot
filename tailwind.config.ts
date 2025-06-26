import type { Config } from "tailwindcss";
import colors from "./tailwind/colors";

const px0_200 = Object.fromEntries(
  Array.from({ length: 201 }, (_, i) => [i, `${i}px`])
);
const px0_25 = Object.fromEntries(
  Array.from({ length: 26 }, (_, i) => [i, `${i}px`])
);

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/presentationals/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors,
      spacing: px0_200,
      borderRadius: px0_25,
      borderWidth: px0_25,
      fontSize: px0_200,
    },
  },
  plugins: [],
};
export default config;
