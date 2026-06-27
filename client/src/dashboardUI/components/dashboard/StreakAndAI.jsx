import { Flame, Send, Sparkles } from "lucide-react"
import { useState } from "react"
import useDashboardStore from "@/store/useDashboardStore"
import useOnlineStatus from "@/hooks/useOnlineStatus"

export function StreakCard() {
  const { analytics } =
    useDashboardStore()

  if (!analytics) return null

  const {
    level,
    xp,
    nextLevelXp,
  } = analytics.gamification
  return (
    <div
      className="rounded-3xl flex flex-col"
      style={{
        padding: 24,
        background: "var(--ss-surface)",
        border: "1px solid var(--ss-border)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <Flame size={18} style={{ color: "var(--ss-accent)", flexShrink: 0 }} />
        <p style={{ fontSize: 16, fontWeight: 700, color: "var(--ss-text-1)" }}>
          {analytics.summary.streak} Day Streak
        </p>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "var(--ss-accent)",
            background: "var(--ss-accent-subtle)",
            padding: "3px 10px",
            borderRadius: 20,
            marginLeft: "auto",
          }}
        >
          Keep logging daily
        </span>
      </div>

      {/* XP progress — mt-6 gap from header */}
      <div className="flex flex-col gap-3 mt-6">
        <div className="flex items-center justify-between">
          <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ss-text-2)" }}>
            Level {level} — {xp} XP
          </span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ss-text-3)" }}>
            {nextLevelXp} XP to Level {level + 1}
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ background: "var(--ss-border)" }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${Math.min((xp / nextLevelXp) * 100,100)}%`, background: "var(--ss-accent)" }}
          />
        </div>

        {/* Footer row */}
        <div className="flex items-center gap-3 mt-1">
          <span style={{ fontSize: 12, color: "var(--ss-text-3)" }}>Pioneer</span>
          <button
            style={{
              fontSize: 12,
              fontWeight: 600,
              background: "var(--ss-accent-subtle)",
              color: "var(--ss-accent)",
              border: "1px solid color-mix(in srgb, var(--ss-accent) 30%, transparent)",
              borderRadius: 8,
              padding: "5px 14px",
              cursor: "pointer",
              marginLeft: "auto",
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export function AIAssistant() {
  const [value, setValue] = useState("")
  const isOnline = useOnlineStatus()

  return (
    <div
      className="rounded-3xl flex items-center gap-3"
      style={{
        padding: "14px 20px",
        background: "var(--ss-surface)",
        border: "1px solid var(--ss-border)",
      }}
    >
      <Sparkles size={15} style={{ color: "var(--ss-ai)", flexShrink: 0 }} />
      <input
        type="text"
        placeholder={isOnline ? "Ask AI anything..." : "AI is offline"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!isOnline}
        className="flex-1 bg-transparent outline-none"
        style={{ fontSize: 14, color: "var(--ss-text-1)" }}
      />
      <button
        disabled={!isOnline}
        className="flex items-center justify-center rounded-xl shrink-0 transition-opacity hover:opacity-80 cursor-pointer"
        style={{
          width: 36,
          height: 36,
          background: "var(--ss-ai-subtle)",
          flexShrink: 0,
          opacity: isOnline ? 1 : 0.55,
        }}
      >
        <Send size={14} style={{ color: "var(--ss-ai)" }} />
      </button>
    </div>
  )
}
