import { Card, Badge } from "../ui"
import { CountUp } from "../react-bits"
import { formatCurrency } from "@/utils/formatCurrency"

export default function GoalCard({ goal }) {
  const percent = Math.min(100, Math.round((goal.current / goal.target) * 100))

  return (
    <Card className="max-w-md w-full text-left">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-medium text-zinc-100">{goal.title}</h3>
          <p className="mt-1 text-xs text-zinc-600">{new Date(goal.deadline).toLocaleDateString()}</p>
        </div>
        <Badge variant="muted">
          <CountUp to={percent} duration={0.8} />%
        </Badge>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-zinc-800">
        <div className="h-full rounded-full bg-zinc-500" style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-3 flex justify-between text-sm text-zinc-500">
        <span>{formatCurrency(goal.current)}</span>
        <span>{formatCurrency(goal.target)}</span>
      </div>
    </Card>
  )
}
