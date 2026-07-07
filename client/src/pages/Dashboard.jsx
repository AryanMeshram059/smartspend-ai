import { useEffect, useState } from "react"
import {
  BriefcaseBusiness,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import { AppShell } from "../dashboardUI/components/layout/AppShell.jsx"
import { StatCards } from "../dashboardUI/components/dashboard/StatCards.jsx"
import {
  CategorySplit,
  MonthlyOverview,
} from "../dashboardUI/components/dashboard/Charts.jsx"
import { RecentTransactions } from "../dashboardUI/components/dashboard/RecentTransactions.jsx"
import {
  AIAssistant,
  StreakCard,
} from "../dashboardUI/components/dashboard/StreakAndAI.jsx"
import useDashboardStore from "../store/useDashboardStore.js"
import { formatCurrency } from "../utils/formatCurrency.js"
import { NavLink } from "react-router-dom"

const fallbackAnalytics = {
  summary: {
    balance: 433,
    income: 600,
    expenses: 167,
    streak: 7,
  },
  monthlyOverview: [
    {
      month: "Jun",
      income: 600,
      expenses: 167,
    },
  ],
  categorySplit: [
    {
      name: "Other",
      value: 100,
    },
  ],
  recentTransactions: [
    {
      id: "mobile-1",
      note: "Amazon",
      category: "Shopping",
      type: "expense",
      amount: 24,
      transaction_date: "2026-06-01",
    },
    {
      id: "mobile-2",
      note: "Dividend",
      category: "Investments",
      type: "income",
      amount: 12,
      transaction_date: "2026-06-01",
    },
  ],
}

function MobileCard({ children, className = "", style }) {
  return (
    <section
      className={`min-w-0 rounded-[28px] ${className}`}
      style={{
        background: "var(--ss-surface)",
        border: "1px solid var(--ss-border)",
        ...style,
      }}
    >
      {children}
    </section>
  )
}

function TinyLabel({ children, accent = false }) {
  return (
    <p
      className="truncate uppercase"
      style={{
        color: accent ? "var(--ss-accent)" : "var(--ss-text-3)",
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: "0.10em",
      }}
    >
      {children}
    </p>
  )
}

function BalanceCard({ balance }) {
  return (
    <MobileCard
      className="px-7 py-8"
      style={{
        background: "var(--ss-bal-bg)",
        borderColor: "color-mix(in srgb, var(--ss-accent) 45%, transparent)",
      }}
    >
      <TinyLabel accent>Balance</TinyLabel>
      <p
        className="mt-3 max-w-full break-words"
        style={{
          color: "var(--ss-bal-amount)",
          fontSize: "clamp(44px, 15vw, 56px)",
          fontWeight: 900,
          lineHeight: 0.95,
        }}
      >
        {formatCurrency(balance)}
      </p>
      
    </MobileCard>
  )
}

function MoneyTile({ label, value, sub, tone }) {
  const positive = tone === "positive"
  return (
    <MobileCard className="flex min-h-[150px] flex-col justify-between px-6 py-6">
      <TinyLabel>{label}</TinyLabel>
      <p
        className="max-w-full break-words"
        style={{
          color: "var(--ss-text-1)",
          fontSize: "clamp(26px, 9vw, 34px)",
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        {formatCurrency(value)}
      </p>
      <div style={{ minHeight: 24 }}>
        {sub && (
          <span
            className="inline-flex max-w-full items-center gap-1.5 rounded-lg px-2.5 py-1.5"
            style={{
              background: positive
                ? "transparent"
                : "var(--ss-negative-subtle)",
              color: positive ? "var(--ss-text-3)" : "var(--ss-negative)",
              fontSize: 11,
              fontWeight: positive ? 600 : 800,
            }}
          >
            {!positive && <TrendingDown size={12} className="shrink-0" />}
            <span className="truncate">{sub}</span>
          </span>
        )}
      </div>
    </MobileCard>
  )
}

function MobileOverview({ data }) {
  const latest = data[data.length - 1] || fallbackAnalytics.monthlyOverview[0]
  const maxValue = Math.max(latest.income || 0, latest.expenses || 0, 1)
  const incomeHeight = Math.max(28, ((latest.income || 0) / maxValue) * 92)
  const expenseHeight = Math.max(28, ((latest.expenses || 0) / maxValue) * 92)

  return (
    <MobileCard className="px-6 py-6">
      <div className="flex min-w-0 items-center justify-between gap-4">
        <TinyLabel>Monthly Overview</TinyLabel>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <span className="flex items-center gap-2" style={{ fontSize: 11 }}>
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--ss-accent)" }}
          />
          Income
        </span>
        <span className="flex items-center gap-2" style={{ fontSize: 11 }}>
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "#8B5CF6" }}
          />
          Expenses
        </span>
      </div>
      <div className="mt-4 flex h-[118px] items-end justify-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-10 rounded-md"
            style={{
              height: incomeHeight,
              background: "var(--ss-accent)",
            }}
          />
          <span style={{ color: "var(--ss-text-3)", fontSize: 11 }}>
            {latest.month || "Jun"}
          </span>
        </div>
        <div
          className="w-10 rounded-md"
          style={{
            height: expenseHeight,
            background: "#8B5CF6",
            marginBottom: 22,
          }}
        />
      </div>
    </MobileCard>
  )
}

function MobileSplit({ data }) {
  const top = data[0] || fallbackAnalytics.categorySplit[0]
  const value = Number(top.value || 0)

  return (
    <MobileCard className="flex min-h-[170px] flex-col px-5 py-5">
      <TinyLabel>Split</TinyLabel>
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <div
          className="grid h-[74px] w-[74px] place-items-center rounded-full"
          style={{
            background: `conic-gradient(var(--ss-accent) ${value}%, var(--ss-border) 0)`,
          }}
        >
          <div
            className="grid h-[49px] w-[49px] place-items-center rounded-full"
            style={{ background: "var(--ss-surface)" }}
          >
            <span
              style={{
                color: "var(--ss-text-1)",
                fontSize: 13,
                fontWeight: 900,
              }}
            >
              {value}%
            </span>
          </div>
        </div>
        <span
          className="max-w-full truncate"
          style={{ color: "var(--ss-text-3)", fontSize: 11 }}
        >
          {top.name}
        </span>
      </div>
    </MobileCard>
  )
}

function MobileRecent({ transactions }) {
  return (
    <MobileCard className="min-h-[170px] px-5 py-5">
      <div className="flex items-center justify-between gap-3">
        <TinyLabel>Recent</TinyLabel>
        <NavLink
          to={"/transactions"}
          className="shrink-0 uppercase"
          style={{ color: "var(--ss-accent)", fontSize: 11, fontWeight: 900 }}
        >
          View all
        </NavLink>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {transactions.slice(0, 2).map((tx) => {
          const income = tx.type === "income"
          const Icon = income ? BriefcaseBusiness : ShoppingBag

          return (
            <div key={tx.id} className="flex min-w-0 items-center gap-3">
              <div
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
                style={{ background: "var(--ss-surface-2)" }}
              >
                <Icon size={14} style={{ color: "var(--ss-text-3)" }} />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="truncate"
                  style={{
                    color: "var(--ss-text-1)",
                    fontSize: 12,
                    fontWeight: 800,
                    lineHeight: 1.2,
                  }}
                >
                  {tx.note || tx.title || tx.category}
                </p>
                <p
                  className="truncate"
                  style={{
                    color: "var(--ss-text-3)",
                    fontSize: 10,
                    lineHeight: 1.3,
                  }}
                >
                  {tx.category}
                </p>
              </div>
              <p
                className="shrink-0"
                style={{
                  color: income ? "var(--ss-positive)" : "var(--ss-negative)",
                  fontSize: 12,
                  fontWeight: 900,
                }}
              >
                {income ? "+" : "-"}
                {formatCurrency(Number(tx.amount || 0))}
              </p>
            </div>
          )
        })}
      </div>
    </MobileCard>
  )
}

function MobileDashboard({ analytics }) {
  const summary = analytics.summary || fallbackAnalytics.summary

  return (
    <div className="flex flex-col gap-4 md:hidden">
      <BalanceCard balance={summary.balance || 0} />

      <div className="grid grid-cols-2 gap-4">
        <MoneyTile
          label="Income"
          value={summary.income || 0}
        />
        <MoneyTile
          label="Expenses"
          value={summary.expenses || 0}
        />
      </div>

      <MobileOverview data={analytics.monthlyOverview || []} />

      <div className="grid grid-cols-[minmax(0,0.82fr)_minmax(0,1.25fr)] gap-3">
        <MobileSplit data={analytics.categorySplit || []} />
        <MobileRecent transactions={analytics.recentTransactions || []} />
      </div>
      <StreakCard/>
    </div>
  )
}

function DesktopDashboard() {
  return (
    <div className="hidden flex-col gap-8 md:flex">
      <StatCards />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <MonthlyOverview />
        </div>
        <div className="xl:col-span-2">
          <CategorySplit />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <RecentTransactions />
        </div>
        <div className="flex flex-col gap-6 xl:col-span-2">
          <StreakCard />
        </div>
      </div>
    </div>
  )
}

function useDesktopDashboard() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined"
      ? true
      : window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")
    const update = () => setIsDesktop(mediaQuery.matches)

    update()
    mediaQuery.addEventListener("change", update)

    return () => {
      mediaQuery.removeEventListener("change", update)
    }
  }, [])

  return isDesktop
}

export default function Dashboard() {
  const { analytics, fetchDashboard, loading } = useDashboardStore()
  const resolvedAnalytics = analytics || fallbackAnalytics
  const isDesktop = useDesktopDashboard()

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  return (
    <AppShell title="Dashboard">
      {loading && !analytics ? (
        <div
          className="flex min-h-[360px] items-center justify-center"
          style={{ color: "var(--ss-text-2)" }}
        >
          Loading dashboard...
        </div>
      ) : (
        <>
          {isDesktop ? (
            <DesktopDashboard />
          ) : (
            <MobileDashboard analytics={resolvedAnalytics} />
          )}
        </>
      )}
    </AppShell>
  )
}
