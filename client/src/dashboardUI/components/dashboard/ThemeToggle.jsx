import { Sun, Moon } from "lucide-react"
import useThemeStore from "@/store/useThemeStore.js"

export function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeStore()

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center rounded-full transition-colors cursor-pointer shrink-0"
      style={{
        width: 52,
        height: 26,
        background: isDark ? "var(--ss-surface-2)" : "var(--ss-surface)",
        border: "1px solid var(--ss-border)",
        padding: "3px",
      }}
      aria-label="Toggle theme"
    >
      <Sun
        size={11}
        style={{ position: "absolute", left: 7, color: isDark ? "var(--ss-text-3)" : "var(--ss-accent)" }}
      />
      <Moon
        size={11}
        style={{ position: "absolute", right: 7, color: isDark ? "var(--ss-accent)" : "var(--ss-text-3)" }}
      />
      <span
        className="absolute rounded-full transition-all duration-200"
        style={{
          width: 18,
          height: 18,
          background: "var(--ss-accent)",
          left: isDark ? "calc(100% - 21px)" : "3px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
    </button>
  )
}
