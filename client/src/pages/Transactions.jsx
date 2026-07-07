import {
  ArrowDownLeft,
  ArrowUpRight,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react"
import { useEffect, useState } from "react"
import useTransactionStore from "../store/useTransactionStore"
import useQuickAddStore from "@/store/useQuickAddStore"
import TransactionModal from "../components/transactions/TransactionModal"
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
    updateTransaction,
    deleteTransaction,
  } = useTransactionStore()

  const [showModal, setShowModal] =
    useState(false)

  const [filterType, setFilterType] =
    useState("All")

  const [form, setForm] = useState({
    amount: "",
    description: "",
  })
  const [
    editingTransaction,
    setEditingTransaction,
  ] = useState(null)

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

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

      setForm({
        amount: "",
        description: "",
      })

      setShowModal(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSaveTransaction = async (data) => {
    const payload = {
      ...data,
      amount: Number(data.amount),
    }

    try {
      if (editingTransaction?.id) {
        await updateTransaction(
          editingTransaction.id,
          payload
        )
      } else {
        await addTransaction(payload)
      }

      setEditingTransaction(null)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteTransaction = async (tx) => {
    const confirmed = window.confirm(
      `Delete "${tx.note || tx.category || "transaction"}"?`
    )

    if (!confirmed) return

    await deleteTransaction(tx.id)
  }

  const expenses = transactions.filter(
    (tx) => tx && tx.type === "expense"
  )

  const incomeTransactions =
    transactions.filter(
      (tx) => tx && tx.type === "income"
    )

  const visibleTransactions =
    transactions.filter((tx) => {
      if (!tx) return false
      
      if (filterType === "All") {
        return true
      }
      
      if (filterType === "Income") {
        return tx.type === "income"
      }
      
      if (filterType === "Expense") {
        return tx.type === "expense"
      }
      
      return false
    })

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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
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
          sub={`${incomeTransactions.length} income`}
        />

        <Metric
          label="Avg Spend"
          value={`Rs ${avgDailySpend.toLocaleString(
            "en-IN"
          )}`}
          tone="accent"
          sub="Per expense"
        />
      </div>

      <Panel>
        <SectionTitle
          title="Recent activity"
          action=""
        />

        <div className="flex items-center gap-2 mb-4 overflow-x-auto">
          {[
            "All",
            "Income",
            "Expense",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setFilterType(item)}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors"
              style={{
                background:
                  item === filterType
                    ? "var(--ss-accent-subtle)"
                    : "var(--ss-surface-2)",
                color:
                  item === filterType
                    ? "var(--ss-accent)"
                    : "var(--ss-text-2)",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {visibleTransactions.length === 0 ? (
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
            style={{ gap: 3 }}
          >
            {visibleTransactions.map((tx) => {
              const income =
                tx.type === "income"

              const Icon = income
                ? ArrowDownLeft
                : ArrowUpRight

              return (
                <div
                  key={tx.id}
                  className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 rounded-xl sm:rounded-2xl transition-colors"
                  style={{
                    background:
                      "var(--ss-bg)",
                    border:
                      "1px solid var(--ss-border)",
                  }}
                >
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: income
                        ? "var(--ss-positive-subtle)"
                        : "var(--ss-negative-subtle)",
                      color: income
                        ? "var(--ss-positive)"
                        : "var(--ss-negative)",
                    }}
                  >
                    <Icon size={14} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="truncate"
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color:
                          "var(--ss-text-1)",
                      }}
                    >
                      {tx.note ||
                        tx.category}
                    </p>

                    <p
                      className="truncate"
                      style={{
                        fontSize: 11,
                        color:
                          "var(--ss-text-3)",
                      }}
                    >
                      {tx.category}
                    </p>
                  </div>

                  <p
                    className="shrink-0"
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: income
                        ? "var(--ss-positive)"
                        : "var(--ss-negative)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {income ? "+" : "−"}Rs{" "}
                    {Number(
                      tx.amount
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                    <button
                      onClick={() =>
                        setEditingTransaction(tx)
                      }
                      className="rounded-lg p-1.5 sm:p-2"
                      aria-label="Edit transaction"
                      style={{
                        color:
                          "var(--ss-text-2)",
                      }}
                    >
                      <Pencil size={12} />
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteTransaction(tx)
                      }
                      className="rounded-lg p-1.5 sm:p-2"
                      aria-label="Delete transaction"
                      style={{
                        color:
                          "var(--ss-negative)",
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Panel>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4"
          style={{
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            className="w-full max-w-md rounded-t-3xl sm:rounded-3xl p-4 sm:p-6"
            style={{
              background: "var(--ss-surface)",
              border: "1px solid var(--ss-border)",
              maxHeight: "85vh",
              overflowY: "auto",
            }}
          >
            <div className="mb-4 sm:mb-6">
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "var(--ss-text-1)",
                }}
              >
                Quick Add
              </h2>

              <p
                style={{
                  fontSize: 12,
                  color: "var(--ss-text-3)",
                  marginTop: 4,
                }}
              >
                Record a transaction in seconds.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-3 sm:space-y-4"
            >
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
                required
                className="w-full rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent outline-none text-sm sm:text-base"
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
                className="w-full rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent outline-none text-sm sm:text-base"
                style={{
                  border:
                    "1px solid var(--ss-border)",
                  color: "var(--ss-text-1)",
                }}
              />

              <div className="flex gap-2 sm:gap-3 pt-1 sm:pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="flex-1 rounded-xl py-2.5 sm:py-3 text-sm sm:text-base"
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
                  className="flex-1 rounded-xl py-2.5 sm:py-3 font-semibold text-sm sm:text-base"
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
      <TransactionModal
        open={Boolean(editingTransaction)}
        onClose={() =>
          setEditingTransaction(null)
        }
        onSubmit={handleSaveTransaction}
        initial={editingTransaction}
        loading={false}
      />
    </Page>
  )
}
