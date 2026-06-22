import { Pencil, Trash2 } from "lucide-react"
import { Card } from "../ui"
import { Badge } from "../ui"
import { formatCurrency } from "@/utils/formatCurrency"
import { formatDate } from "@/utils/formatDate"

export default function TransactionRow({ transaction, onEdit, onDelete }) {
  return (
    <Card className="text-left">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="min-w-0 flex-1">
          <p className="font-medium text-zinc-100">{transaction.title}</p>
          <p className="mt-1 text-xs text-zinc-600">{formatDate(transaction.transaction_date)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Badge variant="muted">{transaction.category}</Badge>
          <p className="text-sm font-semibold tabular-nums text-zinc-200">
            {transaction.type === "income" ? "+" : "−"}
            {formatCurrency(transaction.amount)}
          </p>
          <div className="flex gap-1">
            <button
              type="button"
              aria-label="Edit"
              onClick={() => onEdit(transaction)}
              className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Delete"
              onClick={() => onDelete(transaction.id)}
              className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}
