

export default function FinancialOverviewCards({
  balance = 42000,
  onAddExpense,
  onAddIncome,
  onAskAI,
}) {
  return (
    <section className="space-y-6 md:space-y-8">
      {/* Large Balance Card */}
      <div
        className="card w-full overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--color-white) 0%, var(--color-bg-secondary) 100%)",
        }}
      >
        <div className="space-y-6">
          <div>
            <p
              className="text-sm font-medium uppercase tracking-wider mb-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              Cash Balance
            </p>
            <h2
              className="text-display text-5xl md:text-6xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              ₹{new Intl.NumberFormat("en-IN").format(balance)}
            </h2>
          </div>

          {/* Action Pills */}
          <div className="pill-group pt-4 border-t border-[var(--color-bg-tertiary)]">
            <button
              onClick={onAddExpense}
              className="btn btn-secondary btn-pill"
              style={{
                backgroundColor: "var(--color-bg-tertiary)",
                color: "var(--color-text-primary)",
              }}
            >
              <span>➖</span> Add Expense
            </button>
            <button
              onClick={onAddIncome}
              className="btn btn-secondary btn-pill"
              style={{
                backgroundColor: "var(--color-bg-tertiary)",
                color: "var(--color-text-primary)",
              }}
            >
              <span>➕</span> Add Income
            </button>
            <button
              onClick={onAskAI}
              className="btn btn-secondary btn-pill"
              style={{
                backgroundColor: "var(--color-bg-tertiary)",
                color: "var(--color-text-primary)",
              }}
            >
              <span>✨</span> Ask AI
            </button>
          </div>
        </div>
      </div>

      {/* Three Column Cards - Income, Expenses, Savings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Income Card */}
        <div
          className="card"
          style={{
            background: "linear-gradient(135deg, rgba(57, 158, 90, 0.05) 0%, rgba(57, 158, 90, 0.02) 100%)",
          }}
        >
          <p
            className="text-xs font-medium uppercase tracking-wider mb-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            Total Income
          </p>
          <h3
            className="text-display text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "var(--color-accent-primary)" }}
          >
            ₹<span>85,000</span>
          </h3>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            This month
          </p>
        </div>

        {/* Expenses Card */}
        <div
          className="card"
          style={{
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.02) 100%)",
          }}
        >
          <p
            className="text-xs font-medium uppercase tracking-wider mb-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            Total Expenses
          </p>
          <h3
            className="text-display text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "var(--color-danger)" }}
          >
            ₹<span>32,000</span>
          </h3>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            This month
          </p>
        </div>

        {/* Savings Card */}
        <div
          className="card"
          style={{
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%)",
          }}
        >
          <p
            className="text-xs font-medium uppercase tracking-wider mb-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            Net Savings
          </p>
          <h3
            className="text-display text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "var(--color-warning)" }}
          >
            ₹<span>53,000</span>
          </h3>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            +18% from last month
          </p>
        </div>
      </div>
    </section>
  );
}
