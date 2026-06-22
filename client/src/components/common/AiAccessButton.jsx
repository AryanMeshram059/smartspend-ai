import { Link, useLocation } from "react-router-dom"
import { Sparkles } from "lucide-react"
import { ROUTES } from "@/constants/routes"
import { cn } from "@/lib/utils"

export default function AiAccessButton() {
  const { pathname } = useLocation()
  const active = pathname === ROUTES.AI

  return (
    <Link
      to={ROUTES.AI}
      className={cn(
        "fixed z-[98] flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-medium backdrop-blur-md transition-colors",
        "right-3 top-[3.625rem] sm:right-4 sm:top-[3.75rem] lg:right-6 lg:top-[5.25rem]",
        active
          ? "border-zinc-500 bg-zinc-800 text-white"
          : "border-zinc-800 bg-zinc-900/90 text-zinc-300 hover:border-zinc-600 hover:text-white"
      )}
    >
      <Sparkles className="h-4 w-4 shrink-0" />
      <span className="sr-only sm:not-sr-only sm:inline">AI</span>
    </Link>
  )
}
