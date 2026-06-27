import AppRoutes from "./routes/AppRoutes"
import { useEffect } from "react"
import useAuthStore from "./store/useAuthStore"
import useDashboardStore from "./store/useDashboardStore"
import useGoalStore from "./store/useGoalStore"
import useTransactionStore from "./store/useTransactionStore"
import { initBackgroundSync } from "./pwa/syncEngine"

export default function App() {
  const {loadUser}=useAuthStore()
  const { fetchDashboard } = useDashboardStore()
  const { fetchGoals } = useGoalStore()
  const { fetchTransactions } = useTransactionStore()

  useEffect(()=>{
    loadUser().catch((error) => {
      console.error("Failed to load user", error)
    })
  }, [loadUser])

  useEffect(() => {
    return initBackgroundSync()
  }, [])

  useEffect(() => {
    const refreshSyncedData = () => {
      fetchDashboard()
      fetchGoals()
      fetchTransactions()
    }

    window.addEventListener(
      "smartspend:sync-complete",
      refreshSyncedData
    )

    return () => {
      window.removeEventListener(
        "smartspend:sync-complete",
        refreshSyncedData
      )
    }
  }, [
    fetchDashboard,
    fetchGoals,
    fetchTransactions,
  ])

  return <AppRoutes />
}
