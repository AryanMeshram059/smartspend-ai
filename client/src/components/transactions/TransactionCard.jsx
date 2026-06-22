import { Pencil, Trash2 } from "lucide-react"
import { Badge } from "../ui"
import { formatCurrency } from "@/utils/formatCurrency"
import { formatDate } from "@/utils/formatDate"

export default function TransactionCard({ transaction, onEdit, onDelete }) {
  return (
    <div className="mx-auto flex max-w-2xl items-center gap-4 rounded-2xl border border-zinc-800/90 bg-zinc-900/70 px-5 py-4 text-left backdrop-blur-sm lg:px-6">
      <div className="min-w-0 flex-1">
        <p className="font-medium text-zinc-100">{transaction.title}</p>
        <p className="mt-1 text-xs text-zinc-600">{formatDate(transaction.transaction_date)}</p>
      </div>
      <Badge variant="muted">{transaction.category}</Badge>
      <p className="min-w-[72px] text-right text-sm font-medium tabular-nums text-zinc-300">
        {transaction.type === "income" ? "+" : "−"}
        {formatCurrency(transaction.amount)}
      </p>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => onEdit(transaction)}
          className="rounded-xl p-2 text-zinc-600 hover:bg-zinc-800 hover:text-zinc-200"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(transaction.id)}
          className="rounded-xl p-2 text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
