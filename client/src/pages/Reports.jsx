import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { Metric, Page, Panel, SectionTitle } from "./PageComponents.jsx"

const data = [
  { month: "Jan", saved: 16000, spent: 12000 },
  { month: "Feb", saved: 17000, spent: 14000 },
  { month: "Mar", saved: 18000, spent: 11000 },
  { month: "Apr", saved: 17000, spent: 15000 },
  { month: "May", saved: 18240, spent: 13760 },
]

export default function Reports() {
  return (
    <Page title="Reports" eyebrow="SMARTSPEND AI - INSIGHTS">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Metric label="Savings rate" value="57%" tone="good" sub="+6% from April" />
        <Metric label="Burn rate" value="Rs 458/day" tone="accent" sub="Projected Rs 14.2k" />
        <Metric label="Risk alerts" value="2" tone="bad" sub="Food and entertainment" />
      </div>
      <Panel>
        <SectionTitle title="Cashflow trend" action="May 2026" />
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} barGap={6}>
            <XAxis dataKey="month" tick={{ fill: "var(--ss-text-2)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: "rgba(128,128,128,0.08)" }} />
            <Bar dataKey="saved" fill="var(--ss-accent)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="spent" fill="#7C3AED" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {["Food spend is 18% above target", "Subscriptions are stable", "Weekend spending is trending up"].map((item) => (
          <Panel key={item}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ss-text-1)" }}>{item}</p>
            <p className="mt-3" style={{ fontSize: 13, color: "var(--ss-text-2)", lineHeight: 1.6 }}>
              AI generated from recent transactions and monthly budget behavior.
            </p>
          </Panel>
        ))}
      </div>
    </Page>
  )
}
