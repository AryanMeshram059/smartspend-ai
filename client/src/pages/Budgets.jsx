import { Page, Panel } from "./PageComponents.jsx"

const budgets = [
  {
    name: "Food & Dining Pool",
    spent: 3400,
    limit: 5000,
  },
  {
    name: "Transport Budget",
    spent: 800,
    limit: 2000,
  },
  {
    name: "Entertainment",
    spent: 1200,
    limit: 1500,
  },
  {
    name: "Utilities",
    spent: 2100,
    limit: 3000,
  },
]

const formatInr = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)

export default function Budgets() {
  return (
    <Page title="Budgets">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {budgets.map((budget) => {
          const used = Math.min(
            100,
            Math.round((budget.spent / budget.limit) * 100)
          )

          return (
            <Panel key={budget.name} className="min-w-0 space-y-4">
              <div className="flex min-w-0 items-start justify-between gap-4">
                <span
                  className="min-w-0 truncate"
                  style={{
                    color: "var(--ss-text-1)",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  {budget.name}
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
                  {formatInr(budget.spent)} / {formatInr(budget.limit)}
                </span>
              </div>

              <div
                className="h-2 w-full overflow-hidden rounded-full"
                style={{ background: "var(--ss-surface-2)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${used}%`,
                    background: "var(--ss-accent)",
                  }}
                />
              </div>

              <p
                className="text-right"
                style={{ color: "var(--ss-text-3)", fontSize: 12 }}
              >
                {used}% allocated memory consumed
              </p>
            </Panel>
          )
        })}
      </div>
    </Page>
  )
}
