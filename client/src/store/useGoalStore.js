import { create } from "zustand"
import goalService from "../services/goalService"

const useGoalStore = create((set) => ({
  goals: [],
  loading: false,

  fetchGoals: async () => {
    set({ loading: true })

    try {
      const data =
        await goalService.getGoals()

      set({
        goals: data.goals || [],
      })
    } catch (error) {
      console.error(error)
    } finally {
      set({ loading: false })
    }
  },

  createGoal: async (goal) => {
    const data =
      await goalService.createGoal(goal)

    set((state) => ({
      goals: [
        data.goal,
        ...state.goals,
      ],
    }))

    return data
  },

  updateGoal: async (
    id,
    updates
  ) => {
    const data =
      await goalService.updateGoal(
        id,
        updates
      )

    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === id
          ? data.goal
          : goal
      ),
    }))
  },

  addSavings: async (
    id,
    amount
  ) => {
    const data =
      await goalService.addSavings(
        id,
        amount
      )

    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === id
          ? data.goal
          : goal
      ),
    }))
  },

  deleteGoal: async (id) => {
    await goalService.deleteGoal(id)

    set((state) => ({
      goals: state.goals.filter(
        (goal) => goal.id !== id
      ),
    }))
  },
}))

export default useGoalStore