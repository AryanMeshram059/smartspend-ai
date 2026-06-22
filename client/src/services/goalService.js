import api from "./api"

export const getGoals = () => api.get("/goals")
export const createGoal = (data) => api.post("/goals", data)
export const updateGoal = (id, data) => api.put(`/goals/${id}`, data)
export const deleteGoal = (id) => api.delete(`/goals/${id}`)
export const getAchievements = () => api.get("/goals/achievements")
export const getXpLogs = () => api.get("/goals/xp-logs")
