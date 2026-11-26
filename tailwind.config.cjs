/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        raised: "var(--surface-raised)",
        ink: "var(--ink)",
        muted: "var(--ink-muted)",
        faint: "var(--ink-faint)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-soft": "var(--accent-soft)",
        "accent-line": "var(--accent-line)",
        "accent-ink": "var(--accent-ink)",
        "hover-fill": "var(--hover-fill)",
        danger: "var(--danger)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: [
          "clamp(3.25rem, 10.5vw, 9rem)",
          { lineHeight: "0.86", letterSpacing: "-0.045em", fontWeight: "600" },
        ],
        h1: [
          "clamp(2.5rem, 6vw, 4.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.035em", fontWeight: "600" },
        ],
        h2: [
          "clamp(1.9rem, 3.6vw, 3rem)",
          { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "600" },
        ],
        h3: [
          "clamp(1.25rem, 1.8vw, 1.6rem)",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        label: [
          "0.6875rem",
          { lineHeight: "1.2", letterSpacing: "0.18em", fontWeight: "500" },
        ],
        "label-lg": [
          "0.8125rem",
          { lineHeight: "1.2", letterSpacing: "0.14em", fontWeight: "500" },
        ],
      },
      maxWidth: {
        shell: "1400px",
      },
      screens: {
        xs: "450px",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translate3d(-50%, 0, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-reverse": "marquee-reverse 44s linear infinite",
      },
    },
  },
  plugins: [],
};
