/**
 * Global theme store — single source of truth for dark/light mode.
 * Persists to localStorage so the chosen theme survives page navigation,
 * refreshes, and React remounts. Defaults to dark if no preference saved.
 */
import { create } from "zustand"

function applyTheme(isDark) {
  document.documentElement.classList.toggle("dark", isDark)
}

const saved = localStorage.getItem("ss-theme")
const initialDark = saved !== null ? saved === "dark" : true
applyTheme(initialDark)

const useThemeStore = create((set) => ({
  isDark: initialDark,

  toggleTheme: () =>
    set((state) => {
      const next = !state.isDark
      applyTheme(next)
      localStorage.setItem("ss-theme", next ? "dark" : "light")
      return { isDark: next }
    }),
}))

export default useThemeStore
