import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  ArrowLeftRight,
  PieChart,
  BarChart3,
  Sparkles,
  Target,
  Settings,
  Search,
  Bell,
  Plus,
  ChevronRight,
} from "lucide-react"
import { ThemeToggle } from "../dashboard/ThemeToggle.jsx"
import useAuthStore from "@/store/useAuthStore"
import useQuickAddStore from "@/store/useQuickAddStore.js"
import QuickAddModal from "@/components/QuickAddModal.jsx"
import useOnlineStatus from "@/hooks/useOnlineStatus"
import useSyncStatus from "@/hooks/useSyncStatus"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: ArrowLeftRight, label: "Transactions", path: "/transactions" },
  { icon: PieChart, label: "Budgets", path: "/budgets" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: Sparkles, label: "AI Center", path: "/ai" },
  { icon: Target, label: "Goals", path: "/goals" },
]

const bottomItems = [
  navItems[0],
  navItems[1],
  { action: "add" },
  navItems[4],
  navItems[5],
]

function Sidebar() {
  const { user } = useAuthStore()

  const userName = user?.name || user?.email?.split("@")[0] || "Sign In"

  const initials = user
  ? userName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  :"→"

  return (
    <aside
      className="hidden md:flex flex-col w-64 xl:w-72 shrink-0 h-screen sticky top-0"
      style={{
        background: "var(--ss-sidebar)",
        borderRight: "1px solid var(--ss-border)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-6"
        style={{
          height: 80,
          borderBottom: "1px solid var(--ss-border)",
          flexShrink: 0,
        }}
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
          <span
            style={{
              fontSize: "14px",
              fontWeight: 800,
              color: "#1a1a00",
            }}
          >
            S
          </span>
        </div>

        <div>
          <p
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "var(--ss-text-1)",
              lineHeight: 1.2,
            }}
          >
            SmartSpend
          </p>

          <p
            style={{
              fontSize: "10px",
              color: "var(--ss-text-3)",
              lineHeight: 1.4,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            AI Financial OS
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        <p
          className="px-4 pb-3 uppercase"
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: "var(--ss-text-3)",
            letterSpacing: "0.10em",
          }}
        >
          Main
        </p>

        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            end={path === "/"}
            className="flex items-center gap-3 px-4 w-full transition-colors"
            style={({ isActive }) => ({
              height: 48,
              borderRadius: 12,
              background: isActive
                ? "var(--ss-accent-subtle)"
                : "transparent",
              color: isActive
                ? "var(--ss-accent)"
                : "var(--ss-text-2)",
            })}
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={16}
                  strokeWidth={isActive ? 2.5 : 2}
                />

                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  {label}
                </span>

                {isActive && (
                  <ChevronRight
                    size={13}
                    className="ml-auto opacity-60"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}

        <p
          className="px-4 pt-6 pb-3 uppercase"
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: "var(--ss-text-3)",
            letterSpacing: "0.10em",
          }}
        >
          Account
        </p>

        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 w-full transition-colors"
          style={({ isActive }) => ({
            height: 48,
            borderRadius: 12,
            background: isActive
              ? "var(--ss-accent-subtle)"
              : "transparent",
            color: isActive
              ? "var(--ss-accent)"
              : "var(--ss-text-2)",
          })}
        >
          <Settings size={16} strokeWidth={2} />

          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            Settings
          </span>
        </NavLink>
      </nav>

      {/* User Card */}
      {/* User Card */}
      <div
        className="px-4 py-5"
        style={{
          borderTop: "1px solid var(--ss-border)",
        }}
      >
        <NavLink
          to={user ? "/settings" : "/login"}
          className="flex items-center gap-3 px-3 py-3 rounded-xl transition-opacity hover:opacity-90"
          style={{
            border: "1px solid var(--ss-border)",
            textDecoration: "none",
          }}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: "#1a1a00",
              }}
            >
              {initials}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--ss-text-1)",
              }}
            >
              {userName}
            </p>

            <p
              style={{
                fontSize: "10px",
                color: "var(--ss-text-3)",
              }}
            >
              {user ? "Free Plan" : "Click to sign in"}
            </p>
          </div>
        </NavLink>
      </div>
    </aside>
  )
}

function BottomNav() {
  const {openModal}=useQuickAddStore()
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-5 pt-4 pb-5"
      style={{ background: "var(--ss-sidebar)", borderTop: "1px solid var(--ss-border)" }}
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {bottomItems.map((item) => (
          item.action === "add" ? (
            <button key="add" className="w-12 h-12 rounded-full flex items-center justify-center -mt-6 shadow-lg" style={{ background: "var(--ss-accent)" }} onClick={openModal}>
              <Plus size={22} style={{ color: "var(--ss-bg)" }} strokeWidth={2.5} />
            </button>
          ) : (
            <NavLink key={item.label} to={item.path} end={item.path === "/"} className="flex flex-col items-center gap-1 min-w-12">
              {({ isActive }) => (
                <>
                  <item.icon size={19} style={{ color: isActive ? "var(--ss-accent)" : "var(--ss-text-3)" }} />
                  <span style={{ fontSize: "10px", color: isActive ? "var(--ss-accent)" : "var(--ss-text-3)", fontWeight: isActive ? 700 : 500 }}>
                    {item.label === "Transactions" ? "Txns" : item.label.replace(" Center", "")}
                  </span>
                </>
              )}
            </NavLink>
          )
        ))}
      </div>
    </nav>
  )
}

function OfflineBanner() {
  const isOnline = useOnlineStatus()

  if (isOnline) return null

  return (
    <div
      className="px-8 md:px-10 xl:px-12 2xl:px-16 py-3"
      style={{
        background: "rgba(224,210,6,0.14)",
        borderBottom:
          "1px solid color-mix(in srgb, var(--ss-accent) 35%, transparent)",
        color: "var(--ss-text-1)",
      }}
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <p style={{ fontSize: 13, fontWeight: 700 }}>
          Offline Mode
        </p>
        <p style={{ fontSize: 12, color: "var(--ss-text-2)" }}>
          Viewing cached data. Changes will sync automatically when internet is available.
        </p>
      </div>
    </div>
  )
}

function SyncStatusIndicator() {
  const {
    status,
    pendingCount,
    failedCount,
    retryFailed,
    discardFailed,
  } = useSyncStatus()

  const label =
    status === "offline"
      ? "Offline"
      : status === "syncing"
        ? "Syncing..."
        : status === "failed"
          ? "Sync Failed"
          : status === "pending"
            ? "Pending Sync"
            : "Synced"

  const detail =
    failedCount > 0
      ? `${failedCount} failed`
      : pendingCount > 0
        ? `${pendingCount} queued`
        : ""

  const color =
    status === "failed"
      ? "var(--ss-negative)"
      : status === "offline"
        ? "var(--ss-accent)"
        : status === "syncing" ||
            status === "pending"
          ? "var(--ss-ai)"
          : "var(--ss-positive)"

  return (
    <div
      className="flex items-center gap-2 rounded-xl px-3 py-2"
      style={{
        background: "var(--ss-surface)",
        border: "1px solid var(--ss-border)",
        color,
        fontSize: 12,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
      title={detail || label}
    >
      <span>{label}</span>
      {detail && (
        <span
          style={{
            color: "var(--ss-text-3)",
            fontWeight: 600,
          }}
        >
          {detail}
        </span>
      )}
      {status === "failed" && (
        <>
          <button
            onClick={retryFailed}
            className="rounded-lg px-2 py-1"
            style={{
              background:
                "var(--ss-accent-subtle)",
              color: "var(--ss-accent)",
            }}
          >
            Retry
          </button>
          <button
            onClick={discardFailed}
            className="rounded-lg px-2 py-1"
            style={{
              background:
                "var(--ss-surface-2)",
              color: "var(--ss-text-2)",
            }}
          >
            Discard
          </button>
        </>
      )}
    </div>
  )
}

export function AppShell({ title, actions, children }) {
  return (
    <div className="min-h-screen flex" style={{ background: "var(--ss-bg)", color: "var(--ss-text-1)" }}>
      <Sidebar />

      {/* Right column: header + scrollable content */}
      <div className="flex-1 min-w-0 flex flex-col overflow-x-hidden">

        {/* ── Sticky header ── */}
        <header
          className="sticky top-0 z-30 w-full"
          style={{
            height: 72,
            background: "var(--ss-bg)",
            borderBottom: "1px solid var(--ss-border)",
            flexShrink: 0,
          }}
        >
          {/* Inner wrapper — same max-w + px as content so title aligns with cards */}
          <div className="mx-auto w-full max-w-[1600px] h-full flex items-center gap-4 px-8 md:px-10 xl:px-12 2xl:px-16">
            <p style={{ fontSize: "28px", fontWeight: 800, color: "var(--ss-text-1)", lineHeight: 1.1 }}>
              {title}
            </p>

            <div className="flex-1" />

            {/* Search */}
            <div
              className="hidden lg:flex items-center gap-2.5 rounded-xl px-4 py-2.5 w-60"
              style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}
            >
              <Search size={13} style={{ color: "var(--ss-text-3)", flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none flex-1"
                style={{ fontSize: "13px", color: "var(--ss-text-1)" }}
              />
            </div>

            {actions}
            <SyncStatusIndicator />
            <ThemeToggle />

            <button
              className="hidden sm:flex items-center justify-center rounded-xl shrink-0"
              style={{ width: 40, height: 40, background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}
            >
              <Bell size={15} style={{ color: "var(--ss-text-2)" }} />
            </button>
          </div>
        </header>

        {/* ── Page content ── */}
        <OfflineBanner />

        <main className="flex-1 w-full">
          {/* PageContainer — every page's content lives inside this wrapper */}
          <div className="mx-auto w-full max-w-[1600px] px-8 md:px-10 xl:px-12 2xl:px-16 py-8 pb-28 md:pb-10">
            {children}
          </div>
        </main>

      </div>
      <>
          <BottomNav/>
          <QuickAddModal/>
      </>
    </div>
  )
}
