import { create } from "zustand"
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../services/budgetService"

const useBudgetStore = create((set) => ({
  budgets: [],
  loading: false,
  error: null,

  fetchBudgets: async (params) => {
    set({ loading: true, error: null })
    try {
      const res = await getBudgets(params)
      set({ budgets: res.data.data || res.data, loading: false })
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

  addBudget: async (data) => {
    const res = await createBudget(data)
    const newBudget = res.data.data || res.data
    set((state) => ({ budgets: [...state.budgets, newBudget] }))
    return newBudget
  },

  editBudget: async (id, data) => {
    const res = await updateBudget(id, data)
    const updated = res.data.data || res.data
    set((state) => ({
      budgets: state.budgets.map((b) => (b.id === id ? updated : b)),
    }))
  },

  removeBudget: async (id) => {
    await deleteBudget(id)
    set((state) => ({
      budgets: state.budgets.filter((b) => b.id !== id),
    }))
  },
}))

export default useBudgetStore
