import { Flame } from "lucide-react"
import { Card } from "../ui"
import { CountUp } from "../react-bits"

export default function StreakCard({ streak }) {
  return (
    <Card className="max-w-md w-full text-left">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950">
          <Flame className="h-5 w-5 text-zinc-500" />
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-600">Streak</p>
          <p className="mt-1 text-2xl font-semibold text-white">
            <CountUp to={streak} duration={0.9} /> <span className="text-base font-normal text-zinc-500">days</span>
          </p>
        </div>
      </div>
    </Card>
  )
}
