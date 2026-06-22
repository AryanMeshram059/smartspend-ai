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
      className="hidden md:flex flex-col w-[220px] shrink-0 h-full"
      style={{ background: "var(--ss-sidebar)", borderRight: "1px solid var(--ss-border)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5" style={{ borderBottom: "1px solid var(--ss-border)" }}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a00" }}>S</span>
        </div>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--ss-text-1)", lineHeight: 1.2 }}>SmartSpend</p>
          <p style={{ fontSize: "10px", color: "var(--ss-text-2)", lineHeight: 1.2 }}>AI</p>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        <p
          className="px-3 pt-1 pb-2 uppercase"
          style={{ fontSize: "10px", fontWeight: 600, color: "var(--ss-text-3)", letterSpacing: "0.08em" }}
        >
          Main
        </p>
        {navItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className="flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left transition-colors cursor-pointer"
            style={{
              background: active ? "var(--ss-accent-subtle)" : "transparent",
              color: active ? "var(--ss-accent)" : "var(--ss-text-2)",
            }}
          >
            <Icon size={15} />
            <span style={{ fontSize: "13px", fontWeight: active ? 600 : 400 }}>{label}</span>
            {active && <ChevronRight size={12} className="ml-auto opacity-60" />}
          </button>
        ))}

        <p
          className="px-3 pt-4 pb-2 uppercase"
          style={{ fontSize: "10px", fontWeight: 600, color: "var(--ss-text-3)", letterSpacing: "0.08em" }}
        >
          Account
        </p>
        <button
          className="flex items-center gap-3 px-3 py-2 rounded-lg w-full text-left transition-colors cursor-pointer"
          style={{ color: "var(--ss-text-2)" }}
        >
          <Settings size={15} />
          <span style={{ fontSize: "13px" }}>Settings</span>
        </button>
      </nav>

      {/* User */}
      <div className="px-3 py-4" style={{ borderTop: "1px solid var(--ss-border)" }}>
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#1a1a00" }}>AK</span>
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--ss-text-1)" }}>Aryan K.</p>
            <p style={{ fontSize: "10px", color: "var(--ss-text-2)" }}>Free Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
