import { Trophy, Lock } from "lucide-react"
import { Card } from "../ui"

export default function AchievementCard({ achievement }) {
  return (
    <Card
      className={`max-w-md w-full text-left ${!achievement.unlocked ? "opacity-55" : ""}`}
      spotlight={achievement.unlocked}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950">
          {achievement.unlocked ? (
            <Trophy className="h-4 w-4 text-zinc-400" />
          ) : (
            <Lock className="h-4 w-4 text-zinc-600" />
          )}
        </div>
        <div>
          <p className="font-medium text-zinc-200">{achievement.title}</p>
          <p className="mt-0.5 text-sm text-zinc-600">{achievement.description}</p>
        </div>
      </div>
    </Card>
  )
}
