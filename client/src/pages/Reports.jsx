import { Metric, Page, Panel, SectionTitle } from "./PageComponents.jsx"

const categories = [
  {
    name: "Food & Dining",
    amount: 8450,
    percent: 26,
    width: 100,
  },
  {
    name: "Transport",
    amount: 5200,
    percent: 16,
    width: 61,
  },
  {
    name: "Entertainment",
    amount: 4100,
    percent: 13,
    width: 48,
  },
  {
    name: "Utilities",
    amount: 6800,
    percent: 21,
    width: 80,
  },
]

const formatInr = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)

export default function Reports() {
  return (
    <Page title="Reports">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
        <Metric
          label="Total Income"
          value={formatInr(45230)}
          tone="good"
          sub="This period"
        />
        <Metric
          label="Total Expenses"
          value={formatInr(32150)}
          tone="bad"
          sub="This period"
        />
        <Metric
          label="Net Savings"
          value={formatInr(13080)}
          tone="accent"
          sub="Net income"
        />
        <Metric label="Savings Rate" value="28.9%" sub="Healthy rate" />
      </div>

      <Panel>
        <SectionTitle title="Top Spending Categories" />
        <div className="flex flex-col gap-5">
          {categories.map((category) => (
            <div key={category.name} className="min-w-0">
              <div className="mb-2 flex min-w-0 items-center justify-between gap-3">
                <span
                  className="min-w-0 truncate"
                  style={{
                    color: "var(--ss-text-1)",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {category.name}
                </span>
                <span
                  className="shrink-0 whitespace-nowrap"
                  style={{
                    color: "var(--ss-text-2)",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "clamp(11px, 3vw, 13px)",
                    fontWeight: 600,
                  }}
                >
                  {formatInr(category.amount)} ({category.percent}%)
                </span>
              </div>
              <div
                className="h-2 w-full overflow-hidden rounded-full"
                style={{ background: "var(--ss-surface-2)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${category.width}%`,
                    background: "var(--ss-accent)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </Page>
  )
}
