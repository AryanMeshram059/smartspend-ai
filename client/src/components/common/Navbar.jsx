import { Link } from "react-router-dom"
import { User } from "lucide-react"
import { ROUTES } from "@/constants/routes"
import useAuthStore from "@/store/useAuthStore"
import { DEMO_USER } from "@/constants/demoData"

export default function Navbar() {
  const user = useAuthStore((s) => s.user) || DEMO_USER

  return (
    <header className="relative z-[97] border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-4 pt-[env(safe-area-inset-top)]">
        <Link to={ROUTES.HOME} className="text-sm font-semibold tracking-tight text-white">
          SmartSpend
        </Link>
        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            to={ROUTES.LOGIN}
            className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            Login
          </Link>
          <Link
            to={ROUTES.SETTINGS}
            className="flex max-w-[7rem] items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-2 text-sm text-zinc-200"
          >
            <User className="h-4 w-4 shrink-0" />
            <span className="truncate">{user.name?.split(" ")[0]}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
