import { useState } from "react"
import useQuickAddStore from "../store/useQuickAddStore"
import useTransactionStore from "../store/useTransactionStore"

export default function QuickAddModal() {
  const { isOpen, closeModal } =
    useQuickAddStore()

  const {
    addTransaction,
    fetchTransactions,
  } = useTransactionStore()

  const [form, setForm] = useState({
    amount: "",
    description: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !form.amount ||
      !form.description
    ) {
      return
    }

    try {
      await addTransaction({
        amount: Number(
          form.amount
        ),
        description:
          form.description,
      })

      await fetchTransactions()

      setForm({
        amount: "",
        description: "",
      })

      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background:
          "rgba(0,0,0,0.65)",
        backdropFilter:
          "blur(8px)",
      }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-6"
        style={{
          background:
            "var(--ss-surface)",
          border:
            "1px solid var(--ss-border)",
        }}
      >
        <div className="mb-6">
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color:
                "var(--ss-text-1)",
            }}
          >
            Quick Add
          </h2>

          <p
            style={{
              fontSize: 13,
              color:
                "var(--ss-text-3)",
              marginTop: 6,
            }}
          >
            Record a transaction
            in seconds.
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
            onChange={
              handleChange
            }
            placeholder="Amount"
            required
            className="w-full rounded-xl px-4 py-3 bg-transparent outline-none"
            style={{
              border:
                "1px solid var(--ss-border)",
              color:
                "var(--ss-text-1)",
            }}
          />

          <input
            type="text"
            name="description"
            value={
              form.description
            }
            onChange={
              handleChange
            }
            placeholder="Dominos pizza"
            required
            className="w-full rounded-xl px-4 py-3 bg-transparent outline-none"
            style={{
              border:
                "1px solid var(--ss-border)",
              color:
                "var(--ss-text-1)",
            }}
          />

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={
                closeModal
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
  )
}