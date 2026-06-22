import { Flame, Send, Sparkles } from "lucide-react";
import { useState } from "react";

export function StreakCard() {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3"
      style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}
    >
      <div className="flex items-center gap-2">
        <Flame size={16} style={{ color: "var(--ss-accent)" }} />
        <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--ss-text-1)" }}>7 Day Streak</p>
        <span
          style={{
            fontSize: "10px",
            color: "var(--ss-accent)",
            background: "var(--ss-accent-subtle)",
            padding: "1px 6px",
            borderRadius: 4,
          }}
        >
          Keep logging daily!
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span style={{ fontSize: "10px", color: "var(--ss-text-2)" }}>XP: 0</span>
          <span style={{ fontSize: "10px", color: "var(--ss-text-2)" }}>Level 5 → 1000 XP</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--ss-border)" }}>
          <div
            className="h-full rounded-full"
            style={{ width: "48%", background: "var(--ss-accent)" }}
          />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span style={{ fontSize: "10px", color: "var(--ss-text-2)" }}>Level 4 • 480 XP</span>
          <button
            style={{
              fontSize: "10px",
              fontWeight: 500,
              background: "var(--ss-accent-subtle)",
              color: "var(--ss-accent)",
              border: "1px solid color-mix(in srgb, var(--ss-accent) 30%, transparent)",
              borderRadius: 6,
              padding: "2px 8px",
              cursor: "pointer",
            }}
          >
            Continue
          </button>
          <span style={{ fontSize: "10px", color: "var(--ss-text-2)" }}>Pioneer</span>
        </div>
      </div>
    </div>
  );
}

export function AIAssistant() {
  const [value, setValue] = useState("");

  return (
    <div
      className="rounded-xl p-3 flex items-center gap-2"
      style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}
    >
      <Sparkles size={13} style={{ color: "var(--ss-ai)", flexShrink: 0 }} />
      <input
        type="text"
        placeholder="Ask AI anything..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 bg-transparent outline-none"
        style={{ fontSize: "12px", color: "var(--ss-text-1)" }}
      />
      <button
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-opacity hover:opacity-80 cursor-pointer"
        style={{ background: "var(--ss-ai-subtle)" }}
      >
        <Send size={12} style={{ color: "var(--ss-ai)" }} />
      </button>
    </div>
  );
}
