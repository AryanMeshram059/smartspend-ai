import { TrendingUp, TrendingDown, Flame } from "lucide-react";
import useDashboardStore from "@/store/useDashboardStore";
/**
 * KPI card with a strict top-to-bottom hierarchy:
 *   Label (12px uppercase tracking) → Value (40px bold) → Trend badge
 * Uses flex-col + justify-between so every card aligns its value row
 * at the same vertical position regardless of content.
 */
function StatCard({ label, value, sub, badge, accent, streak }) {
  return (
    <div
      className="rounded-3xl flex flex-col justify-between"
      style={{
        minHeight: 180,
        padding: 24,
        background: accent ? "var(--ss-accent-subtle)" : "var(--ss-surface)",
        border: accent
          ? "1px solid color-mix(in srgb, var(--ss-accent) 30%, transparent)"
          : "1px solid var(--ss-border)",
      }}
    >
      {/* Label */}
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.09em",
          color: accent ? "var(--ss-accent)" : "var(--ss-text-3)",
        }}
      >
        {label}
      </p>

      {/* Value — anchored to the middle of the card */}
      <p
        style={{
          fontSize: 40,
          fontWeight: 800,
          color: accent ? "var(--ss-accent)" : "var(--ss-text-1)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </p>

      {/* Trend / sub-line — always at the bottom */}
      <div className="flex items-center gap-2 flex-wrap" style={{ minHeight: 24 }}>
        {badge && (
          <span
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
            style={{
              fontSize: 11,
              fontWeight: 600,
              background: badge.positive
                ? "var(--ss-positive-subtle)"
                : "var(--ss-negative-subtle)",
              color: badge.positive ? "var(--ss-positive)" : "var(--ss-negative)",
            }}
          >
            {badge.positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {badge.text}
          </span>
        )}
        {sub && (
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--ss-text-2)" }}>{sub}</p>
        )}
        {streak && (
          <div className="flex items-center gap-1.5">
            <Flame size={13} style={{ color: "var(--ss-accent)" }} />
            <p style={{ fontSize: 12, fontWeight: 500, color: "var(--ss-text-2)" }}>
              Level 4 · 480 XP
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function StatCards() {
  const { analytics } =
    useDashboardStore()

  if (!analytics) return null

  const {
    balance,
    income,
    expenses,
    streak,
  } = analytics.summary
  return (
    /* 1 col mobile → 2 col tablet → 4 col desktop */
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard
        label="Balance"
        value={`₹${balance.toLocaleString("en-IN")}`}
        badge={{ text: "+4.2% this month", positive: true }}
        accent
      />
      <StatCard label="Income" value={`₹${income.toLocaleString("en-IN")}`} sub="Salary" />
      <StatCard
        label="Expenses"
        value={`₹${expenses.toLocaleString("en-IN")}`}
        badge={{ text: "−1.9% vs last mo.", positive: false }}
      />
      <StatCard label="Streak" value={`${streak} days`} streak />
    </div>
  );
}
