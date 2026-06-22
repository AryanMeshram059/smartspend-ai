import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card } from "../ui"
import { AnimatedContent } from "../react-bits"
import InteractiveSurface from "../common/InteractiveSurface"

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm shadow-lg">
      <p className="text-zinc-500">{label}</p>
      <p className="mt-0.5 font-medium text-zinc-100">₹{payload[0].value?.toLocaleString()}</p>
    </div>
  )
}

export default function SpendingChart({ data }) {
  return (
    <AnimatedContent distance={32} duration={0.5}>
      <InteractiveSurface magnetStrength={3} padding={50}>
        <Card>
          <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-600">Spending</h3>
          <div className="mt-8 h-60 w-full lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="monoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a1a1aa" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#a1a1aa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="month" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="amount" stroke="#a1a1aa" strokeWidth={1.5} fill="url(#monoGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </InteractiveSurface>
    </AnimatedContent>
  )
}
