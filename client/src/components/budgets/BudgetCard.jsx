import { Card, Badge } from "../ui"
import { CountUp } from "../react-bits"
import { formatCurrency } from "@/utils/formatCurrency"

export default function BudgetCard({ budget }) {
  const percent = Math.min(100, Math.round((budget.spent / budget.limit) * 100))
  const high = percent >= 85

  return (
    <Card className="max-w-md w-full text-left">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-medium text-zinc-100">{budget.category}</h3>
        <Badge variant={high ? "active" : "muted"}>
          <CountUp to={percent} duration={0.8} />%
        </Badge>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-zinc-800">
        <div className="h-full rounded-full bg-zinc-400 transition-all" style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-3 flex justify-between text-sm text-zinc-500">
        <span>{formatCurrency(budget.spent)}</span>
        <span>{formatCurrency(budget.limit)}</span>
      </div>
    </Card>
  )
}
