import { ArrowDownLeft, ArrowUpRight, Filter, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import useTransactionStore from "../store/useTransactionStore"
import useQuickAddStore from "@/store/useQuickAddStore"
import {
  Metric,
  Page,
  Panel,
  PrimaryButton,
  SectionTitle,
} from "./PageComponents.jsx"

export default function Transactions() {
  const {openModal}=useQuickAddStore()
  const {
    transactions,
    loading,
    fetchTransactions,
    addTransaction,
  } = useTransactionStore()

  const [showModal, setShowModal] =
    useState(false)

  const [form, setForm] = useState({
    amount: "",
    description: "",
  })

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.amount || !form.description) {
      return
    }

    try {
      await addTransaction({
        amount: Number(form.amount),
        description: form.description,
      })

      await fetchTransactions()

      setForm({
        amount: "",
        description: "",
      })

      setShowModal(false)
    } catch (error) {
      console.error(error)
    }
  }

  const expenses = transactions.filter(
    (tx) => tx.type === "expense"
  )

  const incomeTransactions =
    transactions.filter(
      (tx) => tx.type === "income"
    )

  const totalExpenses = expenses.reduce(
    (sum, tx) =>
      sum + Number(tx.amount || 0),
    0
  )

  const totalIncome =
    incomeTransactions.reduce(
      (sum, tx) =>
        sum + Number(tx.amount || 0),
      0
    )

  const avgDailySpend =
    expenses.length > 0
      ? Math.round(
          totalExpenses / expenses.length
        )
      : 0

  if (loading) {
    return (
      <Page
        title="Transactions"
        eyebrow="SMARTSPEND AI - MONEY LOG"
      >
        <Panel>
          <div
            className="flex items-center justify-center"
            style={{
              height: 200,
              color: "var(--ss-text-2)",
            }}
          >
            Loading transactions...
          </div>
        </Panel>
      </Page>
    )
  }

  return (
    <Page
      title="Transactions"
      eyebrow="SMARTSPEND AI - MONEY LOG"
      actions={
        <PrimaryButton
          onClick={openModal}
        >
          <Plus
            size={14}
            className="inline mr-1"
          />
          Add
        </PrimaryButton>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Metric
          label="Total Expenses"
          value={`Rs ${totalExpenses.toLocaleString(
            "en-IN"
          )}`}
          tone="bad"
          sub={`${expenses.length} expenses`}
        />

        <Metric
          label="Income Logged"
          value={`Rs ${totalIncome.toLocaleString(
            "en-IN"
          )}`}
          tone="good"
          sub={`${incomeTransactions.length} income entries`}
        />

        <Metric
          label="Average Spend"
          value={`Rs ${avgDailySpend.toLocaleString(
            "en-IN"
          )}`}
          tone="accent"
          sub="Based on recorded expenses"
        />
      </div>

      <Panel>
        <SectionTitle
          title="Recent activity"
          action="Export CSV"
        />

        <div className="flex items-center gap-2 mb-4 overflow-x-auto">
          {[
            "All",
            "Income",
            "Expense",
            "Recurring",
          ].map((item) => (
            <button
              key={item}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold"
              style={{
                background:
                  item === "All"
                    ? "var(--ss-accent-subtle)"
                    : "var(--ss-surface-2)",
                color:
                  item === "All"
                    ? "var(--ss-accent)"
                    : "var(--ss-text-2)",
              }}
            >
              {item}
            </button>
          ))}

          <button
            className="ml-auto rounded-lg p-2"
            style={{
              background:
                "var(--ss-surface-2)",
              color: "var(--ss-text-2)",
            }}
          >
            <Filter size={14} />
          </button>
        </div>

        {transactions.length === 0 ? (
          <div
            className="text-center py-12"
            style={{
              color: "var(--ss-text-2)",
            }}
          >
            No transactions yet.
          </div>
        ) : (
          <div
            className="flex flex-col"
            style={{ gap: 4 }}
          >
            {transactions.map((tx) => {
              const income =
                tx.type === "income"

              const Icon = income
                ? ArrowDownLeft
                : ArrowUpRight

              return (
                <div
                  key={tx.id}
                  className="flex items-center gap-4 px-4 rounded-2xl transition-colors"
                  style={{
                    height: 64,
                    background:
                      "var(--ss-bg)",
                    border:
                      "1px solid var(--ss-border)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: income
                        ? "var(--ss-positive-subtle)"
                        : "var(--ss-negative-subtle)",
                      color: income
                        ? "var(--ss-positive)"
                        : "var(--ss-negative)",
                    }}
                  >
                    <Icon size={16} />
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
                      {tx.note ||
                        tx.category}
                    </p>

                    <p
                      style={{
                        fontSize: 12,
                        color:
                          "var(--ss-text-3)",
                      }}
                    >
                      {tx.category} ·{" "}
                      {
                        tx.transaction_date
                      }
                    </p>
                  </div>

                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: income
                        ? "var(--ss-positive)"
                        : "var(--ss-negative)",
                    }}
                  >
                    {income ? "+" : "−"}Rs{" "}
                    {Number(
                      tx.amount
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </Panel>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            className="w-full max-w-md rounded-3xl p-6"
            style={{
              background: "var(--ss-surface)",
              border: "1px solid var(--ss-border)",
            }}
          >
            <div className="mb-6">
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--ss-text-1)",
                }}
              >
                Quick Add
              </h2>

              <p
                style={{
                  fontSize: 13,
                  color: "var(--ss-text-3)",
                  marginTop: 6,
                }}
              >
                Record a transaction in seconds.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
                required
                className="w-full rounded-xl px-4 py-3 bg-transparent outline-none"
                style={{
                  border:
                    "1px solid var(--ss-border)",
                  color: "var(--ss-text-1)",
                }}
              />

              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Dominos pizza"
                required
                className="w-full rounded-xl px-4 py-3 bg-transparent outline-none"
                style={{
                  border:
                    "1px solid var(--ss-border)",
                  color: "var(--ss-text-1)",
                }}
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="flex-1 rounded-xl py-3"
                  style={{
                    background:
                      "var(--ss-surface-2)",
                    color:
                      "var(--ss-text-1)",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl py-3 font-semibold"
                  style={{
                    background:
                      "var(--ss-accent)",
                    color: "#111",
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}       
    </Page>
  )
}