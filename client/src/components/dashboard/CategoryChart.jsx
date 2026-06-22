import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Card } from "../ui"
import { AnimatedContent } from "../react-bits"
import InteractiveSurface from "../common/InteractiveSurface"

export default function CategoryChart({ data }) {
  return (
    <AnimatedContent distance={32} duration={0.5} delay={0.05}>
      <InteractiveSurface magnetStrength={3} padding={50}>
        <Card>
          <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-600">Categories</h3>
          <div className="mt-8 h-60 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 4, right: 8 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#71717a"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  width={76}
                />
                <Tooltip
                  cursor={{ fill: "#27272a" }}
                  contentStyle={{
                    background: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "12px",
                    fontSize: "12px",
                    color: "#fafafa",
                  }}
                />
                <Bar dataKey="value" fill="#52525b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </InteractiveSurface>
    </AnimatedContent>
  )
}
