import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/ArcRevealHero/**/*.{ts,tsx}",
    "./src/components/ui/origin-button.tsx",
    "./src/components/ui/story-scroll.tsx",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        foreground: "var(--color-text)",
        "muted-foreground": "var(--color-muted)",
        border: "var(--color-border)",
        muted: "var(--color-muted-bg)",
        card: "var(--color-bg)",
        "card-foreground": "var(--color-text)",
        ring: "var(--color-accent)",
        accent: "var(--color-muted-bg)",
        "accent-foreground": "var(--color-text)",
        input: "var(--color-border)",
        destructive: "#dc2626",
        primary: "var(--color-text)",
        secondary: "var(--color-muted)",
        "popover-foreground": "var(--color-text)",
        brand: "#0ea5e9",
        "brand-soft": "#bae6fd",
        paper: "var(--color-bg)",
      },
    },
  },
};

export default config;