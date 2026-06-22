import { create } from "zustand"
import { getDashboardData }
from "../services/dashboardService"

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
  })
)

export default useDashboardStore