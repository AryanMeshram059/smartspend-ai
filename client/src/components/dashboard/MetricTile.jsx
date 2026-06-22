import { Card } from "../ui"
import { CountUp } from "../react-bits"

export default function MetricTile({ label, value, prefix = "₹", suffix = "" }) {
  const numeric = typeof value === "number" ? value : parseFloat(value) || 0
  const isNumber = typeof value === "number" || !Number.isNaN(numeric)

  return (
    <Card className="max-w-sm text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-600">{label}</p>
      <p className="mt-3 text-2xl font-semibold tabular-nums text-white sm:text-3xl">
        {prefix}
        {isNumber ? <CountUp to={numeric} duration={1.1} separator="," /> : value}
        {suffix}
      </p>
    </Card>
  )
}
