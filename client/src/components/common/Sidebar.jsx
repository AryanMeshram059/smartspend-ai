import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  BarChart3,
  Sparkles,
  Target,
  Settings,
  X,
  Zap,
} from "lucide-react"
import { ROUTES } from "@/constants/routes"
import useUiStore from "@/store/useUiStore"
import useAuthStore from "@/store/useAuthStore"
import { DEMO_USER } from "@/constants/demoData"
import { FadeContent } from "../react-bits"
import { cn } from "@/lib/utils"

const navItems = [
  { to: ROUTES.HOME, label: "Dashboard", icon: LayoutDashboard },
  { to: ROUTES.TRANSACTIONS, label: "Transactions", icon: ArrowLeftRight },
  { to: ROUTES.BUDGETS, label: "Budgets", icon: Wallet },
  { to: ROUTES.REPORTS, label: "Reports", icon: BarChart3 },
  { to: ROUTES.AI, label: "AI Center", icon: Sparkles, accent: true },
  { to: ROUTES.GOALS, label: "Goals", icon: Target },
  { to: ROUTES.SETTINGS, label: "Settings", icon: Settings },
]

export default function Sidebar() {
  const { sidebarOpen, closeSidebar } = useUiStore()
  const user = useAuthStore((s) => s.user) || DEMO_USER

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={closeSidebar} />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-zinc-800 bg-zinc-950 transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-zinc-800 px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">SmartSpend</span>
          </div>
          <button onClick={closeSidebar} className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-900 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? item.accent
                      ? "bg-violet-500/10 text-violet-400"
                      : "bg-zinc-900 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                )
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <FadeContent className="border-t border-zinc-800 p-4">
          <NavLink
            to={ROUTES.AI}
            onClick={closeSidebar}
            className="mb-4 flex items-center gap-3 rounded-2xl border border-violet-500/20 bg-violet-500/5 px-4 py-3 text-sm text-violet-300 transition-colors hover:bg-violet-500/10"
          >
            <Sparkles className="h-4 w-4" />
            Ask AI Assistant
          </NavLink>

          <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-sm font-semibold text-white">
              {user.name?.charAt(0) || "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="truncate text-xs text-zinc-500">{user.email}</p>
            </div>
          </div>
        </FadeContent>
      </aside>
    </>
  )
}
