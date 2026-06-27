import React, { useEffect, useState } from "react"
import useGoalStore from "../../store/useGoalStore"

export default function GoalModal({
  isOpen,
  onClose,
  goal = null,
}) {
  const { createGoal, updateGoal } =
    useGoalStore()

  const [formData, setFormData] =
    useState({
      title: "",
      target_amount: "",
      current_amount: "",
      deadline: "",
    })

  useEffect(() => {
    if (goal) {
      setFormData({
        title: goal.title || "",
        target_amount:
          goal.target_amount || "",
        current_amount:
          goal.current_amount || "",
        deadline: goal.deadline || "",
      })
    } else {
      setFormData({
        title: "",
        target_amount: "",
        current_amount: 0,
        deadline: "",
      })
    }
  }, [goal, isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim())
      return

    if (goal) {
      await updateGoal(goal.id, {
        ...formData,
        target_amount: Number(
          formData.target_amount
        ),
        current_amount: Number(
          formData.current_amount
        ),
      })
    } else {
      await createGoal({
        ...formData,
        target_amount: Number(
          formData.target_amount
        ),
        current_amount: Number(
          formData.current_amount
        ),
      })
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">

      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{
          background:
            "var(--ss-surface)",
          border:
            "1px solid var(--ss-border)",
        }}
      >
        <h2
          className="text-xl font-bold mb-6"
          style={{
            color:
              "var(--ss-text-1)",
          }}
        >
          {goal
            ? "Edit Goal"
            : "Create Goal"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label
              className="block text-sm mb-2"
              style={{
                color:
                  "var(--ss-text-2)",
              }}
            >
              Goal Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl px-4 py-3 outline-none"
              style={{
                background:
                  "var(--ss-bg)",
                border:
                  "1px solid var(--ss-border)",
                color:
                  "var(--ss-text-1)",
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm mb-2"
              style={{
                color:
                  "var(--ss-text-2)",
              }}
            >
              Target Amount
            </label>

            <input
              type="number"
              name="target_amount"
              value={
                formData.target_amount
              }
              onChange={handleChange}
              required
              className="w-full rounded-xl px-4 py-3 outline-none"
              style={{
                background:
                  "var(--ss-bg)",
                border:
                  "1px solid var(--ss-border)",
                color:
                  "var(--ss-text-1)",
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm mb-2"
              style={{
                color:
                  "var(--ss-text-2)",
              }}
            >
              Current Amount
            </label>

            <input
              type="number"
              name="current_amount"
              value={
                formData.current_amount
              }
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-3 outline-none"
              style={{
                background:
                  "var(--ss-bg)",
                border:
                  "1px solid var(--ss-border)",
                color:
                  "var(--ss-text-1)",
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm mb-2"
              style={{
                color:
                  "var(--ss-text-2)",
              }}
            >
              Deadline
            </label>

            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full rounded-xl px-4 py-3 outline-none"
              style={{
                background:
                  "var(--ss-bg)",
                border:
                  "1px solid var(--ss-border)",
                color:
                  "var(--ss-text-1)",
              }}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl"
              style={{
                background:
                  "var(--ss-bg)",
                border:
                  "1px solid var(--ss-border)",
                color:
                  "var(--ss-text-2)",
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
              {goal
                ? "Update Goal"
                : "Create Goal"}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}