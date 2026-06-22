import { Plus } from "lucide-react"
import { Metric, Page, Panel, PrimaryButton, SectionTitle } from "./PageComponents.jsx"

const goals = [
  { name: "Emergency Fund", current: 45000, target: 100000, color: "var(--ss-negative)" },
  { name: "Vacation", current: 28000, target: 50000, color: "#3B82F6" },
  { name: "New Laptop", current: 15000, target: 100000, color: "#8B5CF6" },
  { name: "Home Investment", current: 120000, target: 500000, color: "var(--ss-accent)" },
]

export default function Goals() {
  return (
    <Page title="Goals" eyebrow="SMARTSPEND AI - PROGRESS" actions={<PrimaryButton><Plus size={14} className="inline mr-1" /> Goal</PrimaryButton>}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Metric label="Saved total" value="Rs 2.08L" tone="good" sub="Across 4 goals" />
        <Metric label="Active streak" value="7 days" tone="accent" sub="480 XP earned" />
        <Metric label="Next milestone" value="Rs 5k" tone="normal" sub="Emergency fund" />
      </div>
      <Panel>
        <SectionTitle title="Goal progress" action="View strategy" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {goals.map((goal) => {
            const pct = Math.round((goal.current / goal.target) * 100)
            return (
              <div key={goal.name} className="rounded-2xl p-5" style={{ background: "var(--ss-bg)", border: "1px solid var(--ss-border)" }}>
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ss-text-1)" }}>{goal.name}</p>
                    <p style={{ fontSize: 12, fontWeight: 500, color: "var(--ss-text-3)", marginTop: 4 }}>
                      Rs {goal.current.toLocaleString("en-IN")} saved of Rs {goal.target.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <p style={{ fontSize: 16, fontWeight: 800, color: goal.color, letterSpacing: "-0.01em" }}>{pct}%</p>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--ss-border)" }}>
                  <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: goal.color }} />
                </div>
              </div>
            )
          })}
        </div>
      </Panel>
    </Page>
  )
}
