/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // 覆盖Tailwind的默认值
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },
    extend: {
      // 在Tailwind的默认值基础上增加新的参数
      fontSize: {
        huge: ["80rem", { lineHeight: "1" }],
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
