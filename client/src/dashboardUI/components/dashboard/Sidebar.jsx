import {
  LayoutDashboard,
  ArrowLeftRight,
  PieChart,
  BarChart3,
  Sparkles,
  Target,
  Settings,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: ArrowLeftRight, label: "Transactions" },
  { icon: PieChart, label: "Budgets" },
  { icon: BarChart3, label: "Reports" },
  { icon: Sparkles, label: "AI Center" },
  { icon: Target, label: "Goals" },
];

export function Sidebar() {
  return (
    <aside
      className="hidden md:flex flex-col w-[240px] shrink-0 h-full"
      style={{ background: "var(--ss-sidebar)", borderRight: "1px solid var(--ss-border)" }}
    >
      {/* Logo — h-20 */}
      <div
        className="flex items-center gap-3 px-6"
        style={{ height: 80, borderBottom: "1px solid var(--ss-border)", flexShrink: 0 }}
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
          <span style={{ fontSize: 13, fontWeight: 800, color: "#1a1a00" }}>S</span>
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ss-text-1)", lineHeight: 1.2 }}>
            SmartSpend
          </p>
          <p
            style={{
              fontSize: 10,
              color: "var(--ss-text-3)",
              lineHeight: 1.4,
              textTransform: "uppercase",
              letterSpacing: "0.07em",
            }}
          >
            AI
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        <p
          className="px-4 pb-3 uppercase"
          style={{ fontSize: 10, fontWeight: 700, color: "var(--ss-text-3)", letterSpacing: "0.10em" }}
        >
          Main
        </p>

        {navItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className="flex items-center gap-3 px-4 w-full text-left transition-colors cursor-pointer"
            style={{
              height: 48,
              borderRadius: 12,
              background: active ? "var(--ss-accent-subtle)" : "transparent",
              color: active ? "var(--ss-accent)" : "var(--ss-text-2)",
            }}
          >
            <Icon size={15} strokeWidth={active ? 2.5 : 2} />
            <span style={{ fontSize: 13, fontWeight: active ? 700 : 500 }}>{label}</span>
            {active && <ChevronRight size={12} className="ml-auto opacity-60" />}
          </button>
        ))}

        <p
          className="px-4 pt-6 pb-3 uppercase"
          style={{ fontSize: 10, fontWeight: 700, color: "var(--ss-text-3)", letterSpacing: "0.10em" }}
        >
          Account
        </p>
        <button
          className="flex items-center gap-3 px-4 w-full text-left transition-colors cursor-pointer"
          style={{ height: 48, borderRadius: 12, color: "var(--ss-text-2)" }}
        >
          <Settings size={15} strokeWidth={2} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>Settings</span>
        </button>
      </nav>

      {/* User card */}
      <div className="px-4 py-5" style={{ borderTop: "1px solid var(--ss-border)" }}>
        <div
          className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-colors"
          style={{ border: "1px solid var(--ss-border)" }}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
            <span style={{ fontSize: 11, fontWeight: 800, color: "#1a1a00" }}>AK</span>
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--ss-text-1)" }}>Aryan K.</p>
            <p style={{ fontSize: 10, color: "var(--ss-text-3)" }}>Free Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
