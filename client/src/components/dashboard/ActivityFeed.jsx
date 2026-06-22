import { useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";

const CATEGORY_EMOJIS = {
  food: "🍔",
  groceries: "🛒",
  transport: "🚗",
  entertainment: "🎬",
  utilities: "💡",
  health: "🏥",
  shopping: "🛍️",
  subscriptions: "📱",
  other: "💰",
};

const CATEGORY_COLORS = {
  food: "#10b981",
  groceries: "#06b6d4",
  transport: "#3b82f6",
  entertainment: "#a855f7",
  utilities: "#f59e0b",
  health: "#ec4899",
  shopping: "#f43f5e",
  subscriptions: "#8b5cf6",
  other: "#6b7280",
};

function TransactionItem({ transaction, index }) {
  const emoji = CATEGORY_EMOJIS[transaction.category] || "💰";
  const color = CATEGORY_COLORS[transaction.category] || "#6b7280";

  return (
    <div
      className="group"
      style={{
        animation: `slideUp 0.4s ease-out ${index * 0.05}s both`,
      }}
    >
      <div
        className="px-4 py-4 rounded-2xl transition-all duration-200 cursor-pointer hover:shadow-md"
        style={{
          backgroundColor: "var(--color-white)",
          borderBottom: "1px solid var(--color-bg-tertiary)",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left - Icon & Description */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
              style={{
                backgroundColor: `rgba(${color}, 0.1)`,
              }}
            >
              {emoji}
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="font-semibold text-sm md:text-base truncate"
                style={{ color: "var(--color-text-primary)" }}
              >
                {transaction.title}
              </p>
              <p
                className="text-xs md:text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {transaction.date}
              </p>
            </div>
          </div>

          {/* Right - Amount & Badge */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <p
                className="font-bold text-sm md:text-base"
                style={{
                  color: transaction.type === "expense" ? "#EF4444" : "#399E5A",
                }}
              >
                {transaction.type === "expense" ? "-" : "+"}
                {formatCurrency(transaction.amount)}
              </p>
              <span
                className="badge text-xs"
                style={{
                  backgroundColor:
                    transaction.type === "expense"
                      ? "rgba(239, 68, 68, 0.1)"
                      : "rgba(57, 158, 90, 0.1)",
                  color:
                    transaction.type === "expense" ? "#EF4444" : "#399E5A",
                }}
              >
                {transaction.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default function ActivityFeed({
  transactions = [
    {
      id: 1,
      title: "Swiggy",
      category: "food",
      amount: 420,
      type: "expense",
      date: "Yesterday",
    },
    {
      id: 2,
      title: "Salary Deposit",
      category: "income",
      amount: 85000,
      type: "income",
      date: "2 days ago",
    },
    {
      id: 3,
      title: "Uber",
      category: "transport",
      amount: 250,
      type: "expense",
      date: "2 days ago",
    },
    {
      id: 4,
      title: "Netflix",
      category: "subscriptions",
      amount: 199,
      type: "expense",
      date: "3 days ago",
    },
    {
      id: 5,
      title: "Grocery Bazar",
      category: "groceries",
      amount: 1850,
      type: "expense",
      date: "4 days ago",
    },
    {
      id: 6,
      title: "Movie Tickets",
      category: "entertainment",
      amount: 600,
      type: "expense",
      date: "5 days ago",
    },
  ],
  onViewAll,
}) {
  const [filter, setFilter] = useState("all");

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  return (
    <section className="space-y-4 md:space-y-6">
      {/* Header with Title and Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2
            className="text-display text-3xl md:text-4xl font-bold mb-1"
            style={{ color: "var(--color-text-primary)" }}
          >
            Recent Activity
          </h2>
          <p
            className="text-sm md:text-base"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Your transaction history
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 flex-wrap">
          {["all", "expense", "income"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn btn-pill text-xs md:text-sm px-4 py-2 transition-all ${
                filter === f ? "btn-primary" : "btn-secondary"
              }`}
              style={{
                backgroundColor:
                  filter === f ? "var(--color-accent-primary)" : "var(--color-bg-tertiary)",
                color:
                  filter === f ? "var(--color-white)" : "var(--color-text-primary)",
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "var(--color-bg-secondary)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div className="divide-y" style={{ borderColor: "var(--color-bg-tertiary)" }}>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, idx) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                index={idx}
              />
            ))
          ) : (
            <div className="px-4 py-12 text-center">
              <p
                className="text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                No transactions found
              </p>
            </div>
          )}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center pt-4">
        <button
          onClick={onViewAll}
          className="btn btn-ghost btn-pill text-sm md:text-base"
          style={{
            borderColor: "var(--color-text-light)",
            color: "var(--color-text-primary)",
          }}
        >
          View All Transactions →
        </button>
      </div>
    </section>
  );
}
