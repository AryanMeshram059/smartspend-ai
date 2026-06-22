// SmartSpend AI Design System
// Premium AI-native financial operating system

export const DESIGN_SYSTEM = {
  // EXACT COLOR PALETTE
  colors: {
    // Primary Background - Mint Cream
    background: {
      primary: "#F3F8F2",
      secondary: "#FAFCF9",
      tertiary: "#F0F6EE",
    },
    // Accent - Shamrock (Positive actions, savings, AI)
    accent: {
      primary: "#399E5A",
      light: "#5DAF77",
      lighter: "#7FBE94",
    },
    // Text - Gunmetal (Never pure black)
    text: {
      primary: "#303633",
      secondary: "#5A5E5C",
      muted: "#8B8F8D",
      light: "#B3B7B5",
    },
    // Utility
    white: "#FFFFFF",
    success: "#399E5A",
    warning: "#F59E0B",
    danger: "#EF4444",
  },

  // TYPOGRAPHY SYSTEM (Placeholders - user to replace)
  typography: {
    display: {
      fontFamily: "var(--font-display)", // Replace with Clash Display, Satoshi, or Cabinet Grotesk
      sizes: {
        hero: "clamp(2.5rem, 8vw, 4rem)",
        title: "clamp(1.875rem, 5vw, 3rem)",
        heading: "1.75rem",
      },
    },
    body: {
      fontFamily: "var(--font-body)", // Replace with Inter, Plus Jakarta Sans, or General Sans
      sizes: {
        large: "1.125rem",
        base: "1rem",
        small: "0.875rem",
        xs: "0.75rem",
      },
    },
  },

  // CORNER RADIUS - Large, soft, rounded everywhere
  radius: {
    none: "0px",
    sm: "12px",
    base: "16px",
    lg: "24px",
    xl: "28px",
    "2xl": "32px",
    "3xl": "36px",
  },

  // SHADOW SYSTEM - Very subtle, never heavy
  shadow: {
    none: "none",
    sm: "0 2px 8px rgba(0, 0, 0, 0.04)",
    base: "0 4px 12px rgba(0, 0, 0, 0.05)",
    md: "0 8px 24px rgba(0, 0, 0, 0.06)",
    lg: "0 8px 30px rgba(0, 0, 0, 0.04)",
    xl: "0 12px 40px rgba(0, 0, 0, 0.08)",
  },

  // SPACING SCALE - Expensive through spacing
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
    "4xl": "80px",
  },

  // BREAKPOINTS
  breakpoints: {
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1600px",
  },
};

// Theme utilities for Tailwind
export const theme = {
  colors: {
    background: {
      primary: "bg-[#F3F8F2]",
      secondary: "bg-[#FAFCF9]",
      tertiary: "bg-[#F0F6EE]",
    },
    text: {
      primary: "text-[#303633]",
      secondary: "text-[#5A5E5C]",
      muted: "text-[#8B8F8D]",
    },
    accent: {
      primary: "bg-[#399E5A]",
      light: "bg-[#5DAF77]",
    },
    border: {
      subtle: "border-[#E8EFE6]",
    },
  },
  spacing: {
    card: "p-6 lg:p-8",
    container: "gap-6 lg:gap-8",
    section: "space-y-6 lg:space-y-8",
  },
  radius: "rounded-3xl",
  shadow: {
    subtle: "shadow-sm",
    card: "shadow-[0_8px_30px_rgba(0,0,0,0.04)]",
    none: "shadow-none",
  },
};

// Currency formatting
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Category colors for charts (keeping existing)
export const categoryColors = {
  food: "#10b981",
  transport: "#3b82f6",
  entertainment: "#a855f7",
  utilities: "#f59e0b",
  health: "#ef4444",
  shopping: "#ec4899",
  other: "#6b7280",
};
