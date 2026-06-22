const CHART_PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="140" viewBox="0 0 280 140"><rect fill="#18181b" width="280" height="140"/><path d="M24 100 L70 72 L110 82 L150 48 L190 58 L256 28" stroke="#71717a" stroke-width="2" fill="none"/></svg>`
  )

const GRADIENTS = [
  "linear-gradient(160deg,#27272a,#09090b)",
  "linear-gradient(150deg,#3f3f46,#18181b)",
  "linear-gradient(165deg,#52525b,#09090b)",
  "linear-gradient(155deg,#27272a,#18181b)",
  "linear-gradient(160deg,#3f3f46,#09090b)",
  "linear-gradient(150deg,#52525b,#09090b)",
]

const BORDERS = ["#52525b", "#71717a", "#3f3f46", "#52525b", "#71717a", "#3f3f46"]

export function buildChromaAnalytics(metrics = []) {
  return metrics.map((m, i) => ({
    image: CHART_PLACEHOLDER,
    title: m.title,
    subtitle: m.subtitle,
    handle: m.handle || "",
    borderColor: BORDERS[i % BORDERS.length],
    gradient: GRADIENTS[i % GRADIENTS.length],
  }))
}
