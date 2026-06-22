import { AppShell } from "../dashboardUI/components/layout/AppShell.jsx"

export function Page({ title, eyebrow, children, actions }) {
  return (
    <AppShell title={title} eyebrow={eyebrow} actions={actions}>
      <div className="flex flex-col gap-8">{children}</div>
    </AppShell>
  )
}

/** Base card shell — rounded-3xl, consistent 24px padding, design-token bg/border. */
export function Panel({ children, className = "", style }) {
  return (
    <section
      className={`rounded-3xl p-6 ${className}`}
      style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)", ...style }}
    >
      {children}
    </section>
  )
}

/** Section header row inside a Panel. */
export function SectionTitle({ title, action }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <p style={{ fontSize: 16, fontWeight: 700, color: "var(--ss-text-1)" }}>{title}</p>
      {action && (
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ss-accent)" }}>
          {action}
        </span>
      )}
    </div>
  )
}

/**
 * KPI metric card — matches the StatCards on the Dashboard exactly.
 * Layout: label (top) → value (middle) → sub (bottom), flex-col justify-between.
 * Min-height 180px so all cards in a row align their values at the same Y.
 */
export function Metric({ label, value, tone = "normal", sub }) {
  const color =
    tone === "good"    ? "var(--ss-positive)"
    : tone === "bad"   ? "var(--ss-negative)"
    : tone === "accent"? "var(--ss-accent)"
    :                    "var(--ss-text-1)"

  return (
    <Panel
      className="flex flex-col justify-between"
      style={{ minHeight: 180 }}
    >
      {/* Label */}
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.09em",
          color: "var(--ss-text-3)",
        }}
      >
        {label}
      </p>

      {/* Value */}
      <p
        style={{
          fontSize: 40,
          fontWeight: 800,
          color,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </p>

      {/* Sub-line */}
      {sub && (
        <p style={{ fontSize: 13, fontWeight: 500, color: "var(--ss-text-2)" }}>{sub}</p>
      )}
    </Panel>
  )
}

/** Accent action button — consistent across all pages. */
export function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl px-5 py-2.5 text-sm font-semibold shrink-0"
      style={{ background: "var(--ss-accent)", color: "var(--ss-bg)" }}
    >
      {children}
    </button>
  )
}
