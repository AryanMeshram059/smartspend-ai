import { Card, Badge } from "../ui"
import { CountUp } from "../react-bits"

export default function XpProgress({ xp, level }) {
  const progress = (xp % 500) / 5

  return (
    <Card className="max-w-md w-full text-left">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-600">Level</p>
          <p className="mt-1 text-2xl font-semibold text-white">
            <CountUp to={level} duration={0.8} />
          </p>
        </div>
        <Badge variant="muted">
          <CountUp to={xp} duration={1.1} separator="," /> XP
        </Badge>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-zinc-800">
        <div className="h-full rounded-full bg-zinc-500" style={{ width: `${progress}%` }} />
      </div>
    </Card>
  )
}
