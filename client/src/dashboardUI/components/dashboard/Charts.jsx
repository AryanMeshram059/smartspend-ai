import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import useDashboardStore from "@/store/useDashboardStore";

const categoryColors = [
  "var(--ss-accent)",
  "#8B5CF6",
  "#3B82F6",
  "#6B7280",
  "#10B981",
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

export function MonthlyOverview() {
  const { analytics } =
    useDashboardStore()

  if (!analytics) return null

  let monthlyData =
    analytics.monthlyOverview || []

  // Ensure data is an array
  if (!Array.isArray(monthlyData)) {
    monthlyData = [];
  }

  // Filter out months with 0 income and 0 expenses (empty months)
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Ensure all 12 months exist in order, fill missing ones with zeros
  const completeMonthlyData = Array.from(
    { length: 12 },
    (_, i) => {
      const existingMonth = monthlyData.find(
        (m) => monthNames.indexOf(m.month) === i
      );
      return (
        existingMonth || {
          month: monthNames[i],
          income: 0,
          expenses: 0,
        }
      );
    }
  );

  // Check if data is empty or invalid
  if (completeMonthlyData.every((m) => m.income === 0 && m.expenses === 0)) {
    return (
      <div
        className="rounded-3xl flex flex-col h-full items-center justify-center"
        style={{
          padding: 24,
          background: "var(--ss-surface)",
          border: "1px solid var(--ss-border)",
          minHeight: 280,
        }}
      >
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ss-text-3)" }}>
          No monthly data available
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl flex flex-col h-full"
      style={{
        padding: 24,
        background: "var(--ss-surface)",
        border: "1px solid var(--ss-border)",
      }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between">
        <p style={{ fontSize: 16, fontWeight: 700, color: "var(--ss-text-1)" }}>
          Monthly Overview
        </p>
        <p style={{ fontSize: 12, fontWeight: 500, color: "var(--ss-text-3)" }}>
          {completeMonthlyData[new Date().getMonth()]?.month || "Jun"} 2025
        </p>
      </div>

      {/* Legend — separated from title by 24px gap */}
      <div className="flex items-center gap-5 mt-6">
        <span className="flex items-center gap-2" style={{ fontSize: 12, color: "var(--ss-text-2)" }}>
          <span
            className="w-2.5 h-2.5 rounded-sm inline-block"
            style={{ background: "var(--ss-accent)" }}
          />
          Income
        </span>
        <span className="flex items-center gap-2" style={{ fontSize: 12, color: "var(--ss-text-2)" }}>
          <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: "#7C3AED" }} />
          Expenses
        </span>
      </div>

      {/* Chart — mt-4 separates legend from bars, never touches card edges */}
      <div className="mt-4 flex-1" style={{ minHeight: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={completeMonthlyData} barGap={3} barCategoryGap="32%">
            <XAxis
              dataKey="month"
              tick={{ fill: "var(--ss-text-3)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              content={<CustomBarTooltip />}
              cursor={{ fill: "rgba(128,128,128,0.05)" }}
            />
            <Bar
              dataKey="income"
              name="income"
              fill="var(--ss-accent)"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
            <Bar
              dataKey="expenses"
              name="expenses"
              fill="#7C3AED"
              radius={[6, 6, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function CategorySplit() {
  const { analytics } =
    useDashboardStore()

  if (!analytics) return null

  const categoryData =
    analytics.categorySplit || []

  // Check if data is empty or invalid
  if (!Array.isArray(categoryData) || categoryData.length === 0) {
    return (
      <div
        className="rounded-3xl flex flex-col h-full items-center justify-center"
        style={{
          padding: 24,
          background: "var(--ss-surface)",
          border: "1px solid var(--ss-border)",
          minHeight: 280,
        }}
      >
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ss-text-3)" }}>
          No category data available
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl flex flex-col h-full"
      style={{
        padding: 24,
        background: "var(--ss-surface)",
        border: "1px solid var(--ss-border)",
      }}
    >
      {/* Card header */}
      <p style={{ fontSize: 16, fontWeight: 700, color: "var(--ss-text-1)" }}>
        Category Split
      </p>

      {/* Chart area — separated from title by 24px */}
      <div className="mt-6 flex flex-col sm:flex-row xl:flex-col 2xl:flex-row items-center gap-6 flex-1">
        {/* Donut */}
        <div className="shrink-0 flex items-center justify-center">
          <PieChart width={148} height={148}>
            <Pie
              data={categoryData}
              cx={72}
              cy={72}
              innerRadius={45}
              outerRadius={68}
              dataKey="value"
              strokeWidth={0}
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Legend list */}
        <div className="flex flex-col gap-3 flex-1 w-full">
          {categoryData.map(({ name, value }, i) => (
            <div key={name} className="flex items-center justify-between">
              <span
                className="flex items-center gap-2.5"
                style={{ fontSize: 13, color: "var(--ss-text-2)" }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: categoryColors[i % categoryColors.length] }}
                />
                {name}
              </span>
              <span
                style={{ fontSize: 13, fontWeight: 700, color: "var(--ss-text-1)" }}
              >
                {value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
