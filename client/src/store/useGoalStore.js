import { create } from "zustand"
import goalService from "../services/goalService"
import {
  CACHE_KEYS,
  isOnline,
  updateCachedData,
} from "../pwa/cacheManager"
import { addOfflineRequest } from "../pwa/offlineQueue"

const createOfflineId = () =>
  `offline-goal-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`

const normalizeGoal = (goal) => ({
  ...goal,
  id: goal.id || createOfflineId(),
  current_amount: Number(goal.current_amount || 0),
  target_amount: Number(goal.target_amount || 0),
})

const withPendingSync = (goal) => ({
  ...normalizeGoal(goal),
  pendingSync: true,
})

const shouldQueueOffline = (error) =>
  !isOnline() ||
  error instanceof TypeError ||
  /failed to fetch|networkerror|load failed/i.test(
    error?.message || ""
  )

const saveGoalsCache = (goals) => {
  updateCachedData(CACHE_KEYS.goals, (cached) => ({
    ...(cached || {}),
    goals,
  }))
}

const queueCreateGoal = (set, goal) => {
  const pendingGoal =
    withPendingSync(goal)

  addOfflineRequest({
    endpoint: "/goals",
    method: "POST",
    body: goal,
  })

  set((state) => {
    const goals = [
      pendingGoal,
      ...state.goals,
    ]

    saveGoalsCache(goals)

    return { goals }
  })

  return {
    goal: pendingGoal,
    offline: true,
  }
}

const queueUpdateGoal = (set, id, updates) => {
  addOfflineRequest({
    endpoint: `/goals/${id}`,
    method: "PUT",
    body: updates,
  })

  set((state) => {
    const goals = state.goals.map((goal) =>
      goal.id === id
        ? withPendingSync({
            ...goal,
            ...updates,
            id,
          })
        : goal
    )

    saveGoalsCache(goals)

    return { goals }
  })
}

const queueAddSavings = (set, id, amount) => {
  addOfflineRequest({
    endpoint: `/goals/${id}/add`,
    method: "PATCH",
    body: { amount },
  })

  set((state) => {
    const goals = state.goals.map((goal) =>
      goal.id === id
        ? withPendingSync({
            ...goal,
            current_amount:
              Number(goal.current_amount || 0) +
              Number(amount || 0),
          })
        : goal
    )

    saveGoalsCache(goals)

    return { goals }
  })
}

const queueDeleteGoal = (set, id) => {
  addOfflineRequest({
    endpoint: `/goals/${id}`,
    method: "DELETE",
    body: null,
  })

  set((state) => {
    const goals = state.goals.filter(
      (goal) => goal.id !== id
    )

    saveGoalsCache(goals)

    return { goals }
  })
}

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
    const normalizedGoal = normalizeGoal(goal)

    if (!isOnline()) {
      return queueCreateGoal(set, normalizedGoal)
    }

    let data

    try {
      data =
        await goalService.createGoal(normalizedGoal)
    } catch (error) {
      if (shouldQueueOffline(error)) {
        return queueCreateGoal(set, normalizedGoal)
      }

      throw error
    }

    set((state) => {
      const goals = [
        data.goal,
        ...state.goals,
      ]

      saveGoalsCache(goals)

      return { goals }
    })

    return data
  },

  updateGoal: async (
    id,
    updates
  ) => {
    if (!isOnline()) {
      queueUpdateGoal(set, id, updates)
      return
    }

    let data

    try {
      data =
        await goalService.updateGoal(
          id,
          updates
        )
    } catch (error) {
      if (shouldQueueOffline(error)) {
        queueUpdateGoal(set, id, updates)
        return
      }

      throw error
    }

    set((state) => {
      const goals = state.goals.map((goal) =>
        goal.id === id
          ? data.goal
          : goal
      )

      saveGoalsCache(goals)

      return { goals }
    })
  },

  addSavings: async (
    id,
    amount
  ) => {
    if (!isOnline()) {
      queueAddSavings(set, id, amount)
      return
    }

    let data

    try {
      data =
        await goalService.addSavings(
          id,
          amount
        )
    } catch (error) {
      if (shouldQueueOffline(error)) {
        queueAddSavings(set, id, amount)
        return
      }

      throw error
    }

    set((state) => {
      const goals = state.goals.map((goal) =>
        goal.id === id
          ? data.goal
          : goal
      )

      saveGoalsCache(goals)

      return { goals }
    })
  },

  deleteGoal: async (id) => {
    if (!isOnline()) {
      queueDeleteGoal(set, id)
      return
    } else {
      try {
        await goalService.deleteGoal(id)
      } catch (error) {
        if (shouldQueueOffline(error)) {
          queueDeleteGoal(set, id)
          return
        }

        throw error
      }
    }

    set((state) => {
      const goals = state.goals.filter(
        (goal) => goal.id !== id
      )

      saveGoalsCache(goals)

      return { goals }
    })
  },
}))

export default useGoalStore
