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

const monthlyData = [
  { month: "Jan", income: 28000, expenses: 12000 },
  { month: "Feb", income: 31000, expenses: 14000 },
  { month: "Mar", income: 29000, expenses: 11000 },
  { month: "Apr", income: 32000, expenses: 15000 },
  { month: "May", income: 32000, expenses: 13760 },
];

const categoryData = [
  { name: "Food", value: 35, color: "var(--ss-accent)" },
  { name: "Transport", value: 20, color: "#8B5CF6" },
  { name: "Entertainment", value: 30, color: "#3B82F6" },
  { name: "Other", value: 15, color: "var(--ss-text-3)" },
];

const categoryColors = ["var(--ss-accent)", "#8B5CF6", "#3B82F6", "var(--ss-text-3)"];

function CustomBarTooltip({ active, payload, label }: any) {
  if (active && payload?.length) {
    return (
      <div
        className="rounded-lg p-2"
        style={{ fontSize: "11px", background: "var(--ss-surface-2)", border: "1px solid var(--ss-border)" }}
      >
        <p style={{ color: "var(--ss-text-2)", marginBottom: 4 }}>{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.fill }}>
            {p.name === "income" ? "Income" : "Expenses"}: ₹{(p.value / 1000).toFixed(0)}k
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export function MonthlyOverview() {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3"
      style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}
    >
      <div className="flex items-center justify-between">
        <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--ss-text-1)" }}>Monthly Overview</p>
        <p style={{ fontSize: "11px", color: "var(--ss-text-2)" }}>May 2025</p>
      </div>
      <div className="flex items-center gap-4 mb-1">
        <span className="flex items-center gap-1.5" style={{ fontSize: "10px", color: "var(--ss-text-2)" }}>
          <span className="w-2 h-2 rounded-sm inline-block" style={{ background: "var(--ss-accent)" }} />
          Income
        </span>
        <span className="flex items-center gap-1.5" style={{ fontSize: "10px", color: "var(--ss-text-2)" }}>
          <span className="w-2 h-2 rounded-sm bg-violet-500 inline-block" />
          Expenses
        </span>
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={monthlyData} barGap={3} barCategoryGap="30%">
          <XAxis
            dataKey="month"
            tick={{ fill: "var(--ss-text-2)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(128,128,128,0.06)" }} />
          <Bar dataKey="income" name="income" fill="var(--ss-accent)" radius={[3, 3, 0, 0]} maxBarSize={16} />
          <Bar dataKey="expenses" name="expenses" fill="#7C3AED" radius={[3, 3, 0, 0]} maxBarSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategorySplit() {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3"
      style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}
    >
      <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--ss-text-1)" }}>Category Split</p>
      <div className="flex items-center gap-4">
        <div className="shrink-0">
          <PieChart width={90} height={90}>
            <Pie
              data={categoryData}
              cx={42}
              cy={42}
              innerRadius={28}
              outerRadius={42}
              dataKey="value"
              strokeWidth={0}
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={categoryColors[index]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          {categoryData.map(({ name, value }, i) => (
            <div key={name} className="flex items-center justify-between">
              <span className="flex items-center gap-2" style={{ fontSize: "11px", color: "var(--ss-text-2)" }}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: categoryColors[i] }} />
                {name}
              </span>
              <span style={{ fontSize: "11px", color: "var(--ss-text-1)", fontWeight: 500 }}>{value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
