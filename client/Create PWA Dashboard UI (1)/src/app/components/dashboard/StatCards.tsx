import { TrendingUp, TrendingDown, Flame } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  badge?: { text: string; positive: boolean };
  accent?: boolean;
  streak?: boolean;
}

function StatCard({ label, value, sub, badge, accent, streak }: StatCardProps) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-2"
      style={{
        background: accent ? "var(--ss-accent-subtle)" : "var(--ss-surface)",
        border: accent ? "1px solid color-mix(in srgb, var(--ss-accent) 30%, transparent)" : "1px solid var(--ss-border)",
      }}
    >
      <p style={{ fontSize: "11px", color: "var(--ss-text-2)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </p>
      <p style={{ fontSize: "22px", fontWeight: 700, color: accent ? "var(--ss-accent)" : "var(--ss-text-1)", lineHeight: 1.1 }}>
        {value}
      </p>
      <div className="flex items-center gap-2 mt-auto">
        {badge && (
          <span
            className="flex items-center gap-1 px-1.5 py-0.5 rounded-md"
            style={{
              fontSize: "10px",
              fontWeight: 600,
              background: badge.positive ? "var(--ss-positive-subtle)" : "var(--ss-negative-subtle)",
              color: badge.positive ? "var(--ss-positive)" : "var(--ss-negative)",
            }}
          >
            {badge.positive ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
            {badge.text}
          </span>
        )}
        {sub && <p style={{ fontSize: "11px", color: "var(--ss-text-2)" }}>{sub}</p>}
        {streak && (
          <div className="flex items-center gap-1.5">
            <Flame size={13} style={{ color: "var(--ss-accent)" }} />
            <p style={{ fontSize: "11px", color: "var(--ss-text-2)" }}>Level 4 • 480 XP</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function StatCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard label="Balance" value="₹18,240" badge={{ text: "+4.2% this month", positive: true }} accent />
      <StatCard label="Income" value="₹32,000" sub="Salary" />
      <StatCard label="Expenses" value="₹13,760" badge={{ text: "-1.9% vs last mo.", positive: false }} />
      <StatCard label="Streak" value="7 days" streak />
    </div>
  );
}
