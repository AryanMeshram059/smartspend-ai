import { Grid2x2, AlignJustify, Sparkles, Trophy, Plus, ShoppingBag, Car, Briefcase, TrendingUp } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { ThemeToggle } from "./ThemeToggle.jsx";
import useDashboardStore from "@/store/useDashboardStore";

const transactions = [
  { id: 1, name: "Dominos", category: "Food", amount: -380, icon: ShoppingBag, iconColor: "#EF4444", iconBg: "rgba(239,68,68,0.18)" },
  { id: 2, name: "Uber", category: "Transport", amount: -145, icon: Car, iconColor: "#8B5CF6", iconBg: "rgba(139,92,246,0.18)" },
  { id: 3, name: "Freelance", category: "Income", amount: 5000, icon: Briefcase, iconColor: "#4ADE80", iconBg: "rgba(74,222,128,0.18)" },
];

const spendingData = [
  { day: "Mon", value: 1200 },
  { day: "Tue", value: 800 },
  { day: "Wed", value: 2100 },
  { day: "Thu", value: 650 },
  { day: "Fri", value: 1800 },
  { day: "Sat", value: 3200 },
  { day: "Sun", value: 900 },
];

function CustomBarTooltip({ active, payload, label }) {
  if (active && payload?.length) {
    return (
      <div
        className="rounded-xl p-3"
        style={{
          fontSize: 12,
          background: "var(--ss-surface-2)",
          border: "1px solid var(--ss-border)",
          lineHeight: 1.6,
        }}
      >
        <p style={{ color: "var(--ss-text-2)", marginBottom: 4, fontWeight: 600 }}>{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.fill, fontWeight: 600 }}>
            {p.name === "income" ? "Income" : "Expenses"}: ₹{(p.value / 1000).toFixed(0)}k
          </p>
        ))}
      </div>
    );
  }
  return null;
}

const categories = [
  { name: "Food", pct: 35, colorVar: "var(--ss-accent)", spent: 4816 },
  { name: "Transport", pct: 20, colorVar: "#8B5CF6", spent: 2752 },
  { name: "Entertainment", pct: 30, colorVar: "#3B82F6", spent: 4128 },
  { name: "Other", pct: 15, colorVar: "var(--ss-text-3)", spent: 2064 },
];

const bottomNav = [
  { icon: Grid2x2, label: "Home", active: true },
  { icon: AlignJustify, label: "Txns", active: false },
  { icon: null, label: "", active: false },
  { icon: Sparkles, label: "AI", active: false },
  { icon: Trophy, label: "Goals", active: false },
];

export function MobileView() {
  const [aiQuery, setAiQuery] = useState("");
  const { analytics } = useDashboardStore();

  // Use store data if available, otherwise use fallback
  const monthlyData = analytics?.monthlyOverview || [
    { month: "Jan", income: 32000, expenses: 13760 },
    { month: "Feb", income: 28000, expenses: 12500 },
    { month: "Mar", income: 35000, expenses: 14200 },
    { month: "Apr", income: 31000, expenses: 13100 },
    { month: "May", income: 32000, expenses: 13760 },
  ];

  return (
    <div
      className="flex flex-col w-full h-full overflow-y-auto pb-24"
      style={{ background: "var(--ss-bg)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-8 pb-6">
        <div>
          <p style={{ fontSize: 13, color: "var(--ss-text-3)", fontWeight: 500, letterSpacing: "0.02em" }}>
            Good evening,
          </p>
          <p style={{ fontSize: 24, fontWeight: 800, color: "var(--ss-text-1)", lineHeight: 1.2, marginTop: 2 }}>
            Aryan 👋
          </p>
        </div>
        <div className="pt-1">
          <ThemeToggle />
        </div>
      </div>

      {/* Total Balance Card */}
      <div
        className="mx-4 rounded-3xl px-6 py-6 mb-4"
        style={{ background: "var(--ss-bal-bg)", border: "1px solid var(--ss-border)" }}
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "var(--ss-text-3)",
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Total Balance
        </p>
        <p
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: "var(--ss-bal-amount)",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginTop: 8,
          }}
        >
          ₹18,240
        </p>
        <p style={{ fontSize: 12, color: "var(--ss-bal-sub)", textAlign: "center", marginTop: 6, fontWeight: 500 }}>
          ↑ ₹1,200 from last month
        </p>
      </div>

      {/* Income / Spent row */}
      <div className="grid grid-cols-2 gap-3 mx-4 mb-6">
        <div className="rounded-2xl px-4 py-4" style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "var(--ss-text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
            Income
          </p>
          <p style={{ fontSize: 20, fontWeight: 800, color: "var(--ss-positive)", letterSpacing: "-0.01em" }}>₹32,000</p>
        </div>
        <div className="rounded-2xl px-4 py-4" style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "var(--ss-text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
            Spent
          </p>
          <p style={{ fontSize: 20, fontWeight: 800, color: "var(--ss-negative)", letterSpacing: "-0.01em" }}>₹13,760</p>
        </div>
      </div>

      {/* ── Analytics ── */}
      <div className="px-4 mb-6">
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--ss-text-3)",
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Analytics
        </p>

        {/* Weekly spending bar chart */}
        <div className="rounded-3xl px-5 pt-5 pb-3 mb-4" style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ss-text-1)" }}>Weekly Spending</p>
            <span
              className="flex items-center gap-1"
              style={{ fontSize: 11, fontWeight: 600, color: "var(--ss-negative)", background: "var(--ss-negative-subtle)", padding: "3px 10px", borderRadius: 20 }}
            >
              <TrendingUp size={10} />
              +12% vs last week
            </span>
          </div>
          <ResponsiveContainer width="100%" height={90}>
            <BarChart data={spendingData} barCategoryGap="30%">
              <XAxis dataKey="day" tick={{ fill: "var(--ss-text-3)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Bar dataKey="value" radius={[5, 5, 0, 0]} maxBarSize={20}>
                {spendingData.map((entry, i) => (
                  <Cell
                    key={`cell-${i}`}
                    fill={entry.day === "Sat" ? "var(--ss-accent)" : "var(--ss-accent-subtle)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Overview */}
        <div className="rounded-3xl px-5 pt-5 pb-3 mb-4" style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ss-text-1)" }}>Monthly Overview</p>
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ss-text-3)" }}>
              {(() => {
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                return monthNames[new Date().getMonth()];
              })()}
            </span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="flex items-center gap-2" style={{ fontSize: 11, color: "var(--ss-text-2)" }}>
              <span className="w-2 h-2 rounded-sm" style={{ background: "var(--ss-accent)" }} />
              Income
            </span>
            <span className="flex items-center gap-2" style={{ fontSize: 11, color: "var(--ss-text-2)" }}>
              <span className="w-2 h-2 rounded-sm" style={{ background: "#7C3AED" }} />
              Expenses
            </span>
          </div>
          {(() => {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const currentMonthName = monthNames[new Date().getMonth()];
            const currentMonthData = monthlyData.find((m) => m.month === currentMonthName);
            
            if (!currentMonthData) {
              return (
                <p style={{ color: "var(--ss-text-3)", fontSize: 12, textAlign: "center", padding: "16px 0" }}>
                  No data for {currentMonthName} yet
                </p>
              );
            }

            const maxValue = Math.max(currentMonthData.income || 0, currentMonthData.expenses || 0, 1);
            const incomeHeight = Math.max(28, ((currentMonthData.income || 0) / maxValue) * 92);
            const expenseHeight = Math.max(28, ((currentMonthData.expenses || 0) / maxValue) * 92);

            return (
              <div className="flex h-[100px] items-end justify-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-8 rounded-md"
                    style={{
                      height: incomeHeight,
                      background: "var(--ss-accent)",
                    }}
                  />
                  <span style={{ color: "var(--ss-text-3)", fontSize: 10 }}>Income</span>
                </div>
                <div
                  className="w-8 rounded-md"
                  style={{
                    height: expenseHeight,
                    background: "#7C3AED",
                  }}
                />
              </div>
            );
          })()}
        </div>

        {/* Savings rate */}
        <div className="rounded-3xl px-5 py-5 mb-4" style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ss-text-1)" }}>Savings Rate</p>
            <span style={{ fontSize: 16, fontWeight: 800, color: "var(--ss-positive)", letterSpacing: "-0.01em" }}>57%</span>
          </div>
          <div className="h-2 rounded-full mb-3" style={{ background: "var(--ss-border)" }}>
            <div className="h-full rounded-full" style={{ width: "57%", background: "var(--ss-positive)" }} />
          </div>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 11, color: "var(--ss-text-3)", fontWeight: 500 }}>Saved ₹18,240</span>
            <span style={{ fontSize: 11, color: "var(--ss-text-3)", fontWeight: 500 }}>Target ₹32,000</span>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="rounded-3xl px-5 py-5" style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ss-text-1)" }}>Top Categories</p>
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ss-accent)" }}>May 2025</span>
          </div>
          <div className="flex flex-col gap-4">
            {categories.map(({ name, pct, colorVar, spent }) => (
              <div key={name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2" style={{ fontSize: 13, color: "var(--ss-text-2)" }}>
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: colorVar }} />
                    {name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: 12, color: "var(--ss-text-3)" }}>₹{spent.toLocaleString()}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ss-text-1)" }}>{pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "var(--ss-border)" }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: colorVar }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="rounded-2xl px-4 py-4" style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--ss-text-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
              Avg Daily Spend
            </p>
            <p style={{ fontSize: 18, fontWeight: 800, color: "var(--ss-text-1)", letterSpacing: "-0.01em" }}>₹458</p>
            <span className="flex items-center gap-1 mt-1.5" style={{ fontSize: 11, color: "var(--ss-negative)", fontWeight: 500 }}>
              <TrendingUp size={9} /> +8% vs Apr
            </span>
          </div>
          <div className="rounded-2xl px-4 py-4" style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--ss-text-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
              Largest Expense
            </p>
            <p style={{ fontSize: 18, fontWeight: 800, color: "var(--ss-text-1)", letterSpacing: "-0.01em" }}>₹5,000</p>
            <span style={{ fontSize: 11, color: "var(--ss-text-3)", fontWeight: 500 }}>Freelance Tools</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-4">
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--ss-text-3)",
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Recent
        </p>
        <div className="flex flex-col" style={{ gap: 4 }}>
          {transactions.map(({ id, name, category, amount, icon: Icon, iconColor, iconBg }) => (
            <div
              key={id}
              className="flex items-center gap-3 rounded-2xl px-4 transition-colors"
              style={{ height: 64, background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: iconBg }}
              >
                <Icon size={15} style={{ color: iconColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ss-text-1)", lineHeight: 1.2 }}>{name}</p>
                <p style={{ fontSize: 11, color: "var(--ss-text-3)", lineHeight: 1.2, marginTop: 2 }}>{category}</p>
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: amount > 0 ? "var(--ss-positive)" : "var(--ss-negative)" }}>
                {amount > 0 ? "+" : "−"}₹{Math.abs(amount).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Ask Bar */}
      <div
        className="mx-4 mt-6 flex items-center gap-3 rounded-3xl px-5 py-4"
        style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}
      >
        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "var(--ss-ai)" }} />
        <input
          type="text"
          placeholder={`Ask AI — "How much did I spend?"`}
          value={aiQuery}
          onChange={(e) => setAiQuery(e.target.value)}
          className="flex-1 bg-transparent outline-none"
          style={{ fontSize: 13, color: "var(--ss-text-1)" }}
        />
      </div>

      {/* Bottom Nav */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-6 md:hidden"
        style={{ height: 64, background: "var(--ss-sidebar)", borderTop: "1px solid var(--ss-border)" }}
      >
        {bottomNav.map(({ icon: Icon, label, active }, i) => {
          if (i === 2) {
            return (
              <button
                key="add"
                className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer -mt-6 shadow-lg"
                style={{ background: "var(--ss-accent)", flexShrink: 0 }}
              >
                <Plus size={22} style={{ color: "var(--ss-bg)" }} strokeWidth={2.5} />
              </button>
            );
          }
          return (
            <button key={label} className="flex flex-col items-center gap-1 cursor-pointer" style={{ minWidth: 44 }}>
              {Icon && <Icon size={20} style={{ color: active ? "var(--ss-accent)" : "var(--ss-text-3)" }} />}
              <span
                style={{
                  fontSize: 10,
                  color: active ? "var(--ss-accent)" : "var(--ss-text-3)",
                  fontWeight: active ? 700 : 500,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
