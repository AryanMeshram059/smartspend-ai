import { ShoppingBag, Car, Briefcase, Coffee } from "lucide-react";

const transactions = [
  { id: 1, name: "Dominos", sub: "Daily Dine", amount: -380, icon: ShoppingBag, color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
  { id: 2, name: "Uber", sub: "Transport · Yesterday", amount: -145, icon: Car, color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
  { id: 3, name: "Freelance", sub: "Payment received", amount: 5000, icon: Briefcase, color: "#4ADE80", bg: "rgba(74,222,128,0.12)" },
  { id: 4, name: "Starbucks", sub: "Coffee", amount: -220, icon: Coffee, color: "var(--ss-accent)", bg: "var(--ss-accent-subtle)" },
];

export function RecentTransactions() {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3"
      style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}
    >
      <div className="flex items-center justify-between">
        <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--ss-text-1)" }}>Recent Transactions</p>
        <button style={{ fontSize: "11px", color: "var(--ss-accent)" }} className="hover:opacity-80 transition-opacity cursor-pointer">
          View all
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {transactions.map(({ id, name, sub, amount, icon: Icon, color, bg }) => (
          <div key={id} className="flex items-center gap-3 py-1">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: bg }}>
              <Icon size={14} style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--ss-text-1)" }}>{name}</p>
              <p style={{ fontSize: "10px", color: "var(--ss-text-2)" }}>{sub}</p>
            </div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: amount > 0 ? "var(--ss-positive)" : "var(--ss-negative)" }}>
              {amount > 0 ? "+" : ""}₹{Math.abs(amount).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
