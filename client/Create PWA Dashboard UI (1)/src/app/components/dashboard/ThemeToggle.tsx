import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-16 h-8 rounded-full" style={{ background: "var(--ss-surface)" }} />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
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
      {/* track icons */}
      <Sun
        size={11}
        style={{ position: "absolute", left: 7, color: isDark ? "var(--ss-text-3)" : "var(--ss-accent)", transition: "color 0.2s" }}
      />
      <Moon
        size={11}
        style={{ position: "absolute", right: 7, color: isDark ? "var(--ss-accent)" : "var(--ss-text-3)", transition: "color 0.2s" }}
      />
      {/* thumb */}
      <span
        className="absolute rounded-full transition-all duration-200"
        style={{
          width: 18,
          height: 18,
          background: "var(--ss-accent)",
          left: isDark ? "calc(100% - 21px)" : "3px",
          top: "50%",
          transform: "translateY(-50%)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  );
}
