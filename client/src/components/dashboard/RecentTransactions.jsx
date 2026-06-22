import { Link } from "react-router-dom"
import { Card } from "../ui"
import Reveal from "../react-bits/Reveal"
import { formatCurrency } from "@/utils/formatCurrency"
import { formatDate } from "@/utils/formatDate"
import { ROUTES } from "@/constants/routes"

export default function RecentTransactions({ transactions }) {
  return (
    <Reveal className="w-full max-w-2xl">
      <Card>
        <div className="mb-5 flex items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
          <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-600">Recent</h3>
          <Link to={ROUTES.TRANSACTIONS} className="text-xs text-zinc-500 hover:text-zinc-300">
            View all
          </Link>
        </div>
        <ul className="divide-y divide-zinc-800/80">
          {transactions.slice(0, 5).map((tx) => (
            <li key={tx.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div className="min-w-0 text-left">
                <p className="truncate text-sm font-medium text-zinc-100">{tx.title}</p>
                <p className="mt-0.5 text-xs text-zinc-600">
                  {formatDate(tx.transaction_date)} · {tx.category}
                </p>
              </div>
              <p className="shrink-0 text-sm font-medium tabular-nums text-zinc-300">
                {tx.type === "income" ? "+" : "−"}
                {formatCurrency(tx.amount)}
              </p>
            </li>
          ))}
        </ul>
      </Card>
    </Reveal>
  )
}
