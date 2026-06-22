import { Plus } from "lucide-react"
import { Metric, Page, Panel, PrimaryButton, SectionTitle } from "./PageComponents.jsx"

const budgets = [
  { name: "Food", spent: 4816, limit: 7000, color: "var(--ss-accent)" },
  { name: "Transport", spent: 2752, limit: 4500, color: "#8B5CF6" },
  { name: "Entertainment", spent: 4128, limit: 5000, color: "#3B82F6" },
  { name: "Subscriptions", spent: 1180, limit: 1800, color: "var(--ss-ai)" },
]

export default function Budgets() {
  return (
    <Page title="Budgets" eyebrow="SMARTSPEND AI - LIMITS" actions={<PrimaryButton><Plus size={14} className="inline mr-1" /> Budget</PrimaryButton>}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Metric label="Total limit" value="Rs 18,300" tone="accent" sub="4 active categories" />
        <Metric label="Used" value="Rs 12,876" tone="bad" sub="70% of planned spend" />
        <Metric label="Remaining" value="Rs 5,424" tone="good" sub="9 days left this month" />
      </div>
      <Panel>
        <SectionTitle title="Category budgets" action="Auto-adjust" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {budgets.map((budget) => {
            const pct = Math.round((budget.spent / budget.limit) * 100)
            return (
              <div key={budget.name} className="rounded-2xl p-5" style={{ background: "var(--ss-bg)", border: "1px solid var(--ss-border)" }}>
                <div className="flex items-center justify-between mb-4 gap-3">
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ss-text-1)" }}>{budget.name}</p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: "var(--ss-text-3)" }}>
                    Rs {budget.spent.toLocaleString("en-IN")} / Rs {budget.limit.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--ss-border)" }}>
                  <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: budget.color }} />
                </div>
                <p className="mt-3" style={{ fontSize: 12, fontWeight: 600, color: pct > 80 ? "var(--ss-negative)" : "var(--ss-text-3)" }}>
                  {pct}% used
                </p>
              </div>
            )
          })}
        </div>
      </Panel>
    </Page>
  )
}
