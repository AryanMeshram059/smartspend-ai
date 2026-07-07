import { create } from "zustand"
import { getDashboardData }
from "../services/dashboardService"
import { CACHE_KEYS, updateCachedData } from "../pwa/cacheManager"

const useDashboardStore = create(
  (set) => ({
    analytics: null,
    loading: false,

    fetchDashboard:
      async () => {
        set({
          loading: true,
        })

        try {
          const data =
            await getDashboardData()

          // Log monthly data for debugging
          console.log("Dashboard data received:", {
            monthlyOverview: data.analytics?.monthlyOverview,
            categorySplit: data.analytics?.categorySplit,
          })

          set({
            analytics:
              data.analytics,
          })
        } catch (error) {
          console.error(error)
        } finally {
          set({
            loading: false,
          })
        }
      },

    // Clear cache to force fresh data
    clearCache: async () => {
      try {
        updateCachedData(CACHE_KEYS.dashboard, () => null)
        // Re-fetch dashboard data
        const { fetchDashboard } = useDashboardStore.getState()
        await fetchDashboard()
      } catch (error) {
        console.error("Failed to clear cache", error)
      }
    },
  })
)

export default useDashboardStore