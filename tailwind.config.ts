import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/components/ArcRevealHero/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        foreground: "var(--color-text)",
        "muted-foreground": "var(--color-muted)",
        border: "var(--color-border)",
        muted: "var(--color-muted-bg)",
      },
    },
  },
};

export default config;