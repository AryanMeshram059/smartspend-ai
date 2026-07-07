import { ShoppingBag, Car, Briefcase, Coffee } from "lucide-react";
import useDashboardStore from "@/store/useDashboardStore";
import { NavLink } from "react-router-dom";



export function RecentTransactions() {
  const { analytics } =
    useDashboardStore()

  if (!analytics) return null

  const transactions =
    analytics.recentTransactions

  return (
    <div
      className="rounded-3xl flex flex-col"
      style={{
        padding: 24,
        background: "var(--ss-surface)",
        border: "1px solid var(--ss-border)",
      }}
    >
      {/* Section header */}
      <div className="flex items-center justify-between">
        <p style={{ fontSize: 16, fontWeight: 700, color: "var(--ss-text-1)" }}>
          Recent Transactions
        </p>
        <NavLink
          to={"/transactions"}
          style={{ fontSize: 13, fontWeight: 600, color: "var(--ss-accent)" }}
          className="hover:opacity-75 transition-opacity cursor-pointer"
        >
          View all
        </NavLink>
      </div>

      {/* Transaction rows — mt-6 separates from header */}
      <div className="mt-6 flex flex-col" style={{ gap: 4 }}>
        {transactions.map((tx) => {
          const Icon =
            tx.type === "income"
              ? Briefcase
              : ShoppingBag

          const color =
            tx.type === "income"
              ? "#4ADE80"
              : "#EF4444"

          const bg =
            tx.type === "income"
              ? "rgba(74,222,128,0.12)"
              : "rgba(239,68,68,0.12)"

          return (
            <div
              key={tx.id}
              className="flex items-center gap-4 px-4 rounded-2xl transition-colors cursor-default"
              style={{
                height: 64,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "color-mix(in srgb, var(--ss-border) 60%, transparent)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "transparent"
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: bg }}
              >
                <Icon
                  size={16}
                  style={{ color }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color:
                      "var(--ss-text-1)",
                  }}
                >
                  {tx.note}
                </p>

                <p
                  style={{
                    fontSize: 12,
                    color:
                      "var(--ss-text-3)",
                  }}
                >
                  {tx.category} ·{" "}
                  {tx.transaction_date}
                </p>
              </div>

              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color:
                    tx.type === "income"
                      ? "var(--ss-positive)"
                      : "var(--ss-negative)",
                }}
              >
                {tx.type === "income"
                  ? "+"
                  : "−"}
                ₹
                {Number(
                  tx.amount
                ).toLocaleString("en-IN")}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  );
}
