import React, { useState, useEffect } from "react"
import useGoalStore from "../../store/useGoalStore"

export default function AddSavingsModal({
  isOpen,
  onClose,
  goal,
}) {
  const { addSavings } = useGoalStore()

  const [amount, setAmount] = useState("")

  useEffect(() => {
    if (isOpen) {
      setAmount("")
    }
  }, [isOpen])

  if (!isOpen || !goal) return null

  const handleSubmit = async (e) => {
    e.preventDefault()

    const value = Number(amount)

    if (!value || value <= 0) return

    await addSavings(goal.id, value)

    onClose()
  }

  const progress = Math.min(
    (Number(goal.current_amount) /
      Number(goal.target_amount)) *
      100,
    100
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{
          background: "var(--ss-surface)",
          border: "1px solid var(--ss-border)",
        }}
      >
        <h2
          className="text-xl font-bold"
          style={{
            color: "var(--ss-text-1)",
          }}
        >
          Add Savings
        </h2>

        <p
          className="mt-2 text-sm"
          style={{
            color: "var(--ss-text-3)",
          }}
        >
          {goal.title}
        </p>

        <div className="mt-6">

          <div
            className="h-2 rounded-full overflow-hidden"
            style={{
              background: "var(--ss-border)",
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "var(--ss-accent)",
              }}
            />
          </div>

          <div
            className="flex justify-between mt-3 text-sm"
            style={{
              color: "var(--ss-text-2)",
            }}
          >
            <span>
              ₹{Number(goal.current_amount).toLocaleString()}
            </span>

            <span>
              ₹{Number(goal.target_amount).toLocaleString()}
            </span>
          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6"
        >

          <label
            className="block mb-2 text-sm"
            style={{
              color: "var(--ss-text-2)",
            }}
          >
            Amount
          </label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full rounded-xl px-4 py-3 outline-none"
            style={{
              background: "var(--ss-bg)",
              border:
                "1px solid var(--ss-border)",
              color: "var(--ss-text-1)",
            }}
          />

          <div className="flex justify-end gap-3 mt-8">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl"
              style={{
                background: "var(--ss-bg)",
                border:
                  "1px solid var(--ss-border)",
                color: "var(--ss-text-2)",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl font-semibold"
              style={{
                background:
                  "var(--ss-accent)",
                color:
                  "var(--ss-bg)",
              }}
            >
              Add Savings
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}  