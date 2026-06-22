import { StatCards } from "./components/dashboard/StatCards.jsx"
import {
  MonthlyOverview,
  CategorySplit,
} from "./components/dashboard/Charts.jsx"
import { RecentTransactions } from "./components/dashboard/RecentTransactions.jsx"
import {
  StreakCard,
  AIAssistant,
} from "./components/dashboard/StreakAndAI.jsx"
import { AppShell } from "./components/layout/AppShell.jsx"
import { useEffect } from "react"
import useDashboardStore from "@/store/useDashboardStore.js"

import "./styles/index.css"

export default function App() {
  const {
    fetchDashboard,
    loading,
  } = useDashboardStore()

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  if (loading) {
    return (
      <AppShell
        title="Dashboard"
        eyebrow="SMARTSPEND AI - DASHBOARD"
      >
        <div
          className="flex items-center justify-center"
          style={{ minHeight: 400 }}
        >
          Loading dashboard...
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell
      title="Dashboard"
      eyebrow="SMARTSPEND AI - DASHBOARD"
    >
      <div className="flex flex-col gap-8">
        <StatCards />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3">
            <MonthlyOverview />
          </div>

          <div className="xl:col-span-2">
            <CategorySplit />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3">
            <RecentTransactions />
          </div>

          <div className="xl:col-span-2 flex flex-col gap-6">
            <StreakCard />
            <AIAssistant />
          </div>
        </div>
      </div>
    </AppShell>
  )
}