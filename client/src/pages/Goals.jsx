import React, { useEffect, useState } from "react"
import { Plus } from "lucide-react"

import { AppShell } from "../dashboardUI/components/layout/AppShell" // <-- Change path if needed

import useGoalStore from "../store/useGoalStore"

import GoalCard from "../components/goals/GoalCard"
import EmptyGoals from "../components/goals/EmptyGoals"
import GoalModal from "../components/goals/GoalModal"
import AddSavingsModal from "../components/goals/AddSavingsModal"

export default function Goals() {
  const {
    goals,
    fetchGoals,
    deleteGoal,
  } = useGoalStore()

  const [showGoalModal, setShowGoalModal] =
    useState(false)

  const [showSavingsModal, setShowSavingsModal] =
    useState(false)

  const [selectedGoal, setSelectedGoal] =
    useState(null)

  useEffect(() => {
    fetchGoals()
  }, [])

  const handleCreate = () => {
    setSelectedGoal(null)
    setShowGoalModal(true)
  }

  const handleEdit = (goal) => {
    setSelectedGoal(goal)
    setShowGoalModal(true)
  }

  const handleSavings = (goal) => {
    setSelectedGoal(goal)
    setShowSavingsModal(true)
  }

  const handleDelete = async (goal) => {
    const confirmed = window.confirm(
      `Delete "${goal.title}"?`
    )

    if (!confirmed) return

    await deleteGoal(goal.id)
  }

  return (
    <AppShell
      title="Goals"
      actions={
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all hover:opacity-90"
          style={{
            background:
              "var(--ss-accent)",
            color:
              "var(--ss-bg)",
          }}
        >
          <Plus size={18} />
          New Goal
        </button>
      }
    >
      {goals.length === 0 ? (
        <EmptyGoals
          onCreate={handleCreate}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddSavings={
                handleSavings
              }
            />
          ))}

        </div>
      )}

      <GoalModal
        isOpen={showGoalModal}
        onClose={() =>
          setShowGoalModal(false)
        }
        goal={selectedGoal}
      />

      <AddSavingsModal
        isOpen={showSavingsModal}
        onClose={() =>
          setShowSavingsModal(false)
        }
        goal={selectedGoal}
      />

    </AppShell>
  )
}