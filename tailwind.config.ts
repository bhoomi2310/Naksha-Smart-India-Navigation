import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Fraunces", "Instrument Serif", "Georgia", "serif"],
        heading: ["Fraunces", "Instrument Serif", "Georgia", "serif"],
        serif: ["Fraunces", "Instrument Serif", "Georgia", "serif"],
        sans: ["Manrope", "Inter", "sans-serif"],
        body: ["Manrope", "Inter", "sans-serif"],
        devanagari: ["Tiro Devanagari Hindi", "Hind", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        paper: {
          DEFAULT: "#F6EFE3",
          light: "#FFFDF9",
          card: "#FAF5EC",
          border: "#E6DCCB",
          muted: "#EDE4D5",
        },
        ink: {
          DEFAULT: "#14121F",
          light: "#231F33",
          muted: "#524C61",
          subtle: "#787287",
        },
        marigold: {
          DEFAULT: "#F2A31B",
          light: "#FBD47D",
          dark: "#C98109",
        },
        vermilion: {
          DEFAULT: "#D8472B",
          light: "#EA6349",
          dark: "#B8341B",
        },
        teal: {
          DEFAULT: "#1F6F6B",
          light: "#2F8E8A",
          dark: "#144B48",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
          dark: "hsl(var(--primary-dark))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          light: "hsl(var(--secondary-light))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          light: "hsl(var(--success-light))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      boxShadow: {
        "hard-sm": "2px 2px 0 #14121F",
        "hard": "3px 3px 0 #14121F",
        "hard-md": "4px 4px 0 #14121F",
        "hard-lg": "6px 6px 0 #14121F",
        "hard-marigold": "4px 4px 0 #F2A31B",
        "hard-vermilion": "4px 4px 0 #D8472B",
        "hard-teal": "4px 4px 0 #1F6F6B",
      },
      borderWidth: {
        "1.5": "1.5px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "route-draw": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "route-draw": "route-draw 3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
