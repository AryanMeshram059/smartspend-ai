import { create } from "zustand"
import { getGoals, createGoal, updateGoal, deleteGoal, getAchievements, getXpLogs } from "../services/goalService"

const useGoalStore = create((set) => ({
  goals: [],
  achievements: [],
  xpLogs: [],
  loading: false,

  fetchGoals: async () => {
    set({ loading: true })
    try {
      const res = await getGoals()
      set({ goals: res.data.data || res.data, loading: false })
    } catch {
      set({ loading: false })
    }
  },

  addGoal: async (data) => {
    const res = await createGoal(data)
    const newGoal = res.data.data || res.data
    set((state) => ({ goals: [...state.goals, newGoal] }))
    return newGoal
  },

  editGoal: async (id, data) => {
    const res = await updateGoal(id, data)
    const updated = res.data.data || res.data
    set((state) => ({
      goals: state.goals.map((g) => (g.id === id ? updated : g)),
    }))
  },

  removeGoal: async (id) => {
    await deleteGoal(id)
    set((state) => ({ goals: state.goals.filter((g) => g.id !== id) }))
  },

  fetchAchievements: async () => {
    const res = await getAchievements()
    set({ achievements: res.data.data || res.data })
  },

  fetchXpLogs: async () => {
    const res = await getXpLogs()
    set({ xpLogs: res.data.data || res.data })
  },
}))

export default useGoalStore
