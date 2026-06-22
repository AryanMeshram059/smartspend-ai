import { Link } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import Reveal from "../react-bits/Reveal"

const LINKS = [
  { label: "Add expense", to: ROUTES.TRANSACTIONS },
  { label: "Budgets", to: ROUTES.BUDGETS },
  { label: "Reports", to: ROUTES.REPORTS },
]

export default function QuickActions() {
  return (
    <Reveal className="flex w-full max-w-md flex-wrap justify-center gap-2 sm:gap-3">
      {LINKS.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2.5 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-100"
        >
          {item.label}
        </Link>
      ))}
    </Reveal>
  )
}
