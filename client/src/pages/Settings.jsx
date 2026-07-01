import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Bell,
  LogIn,
  LogOut,
  Moon,
  Shield,
  Sun,
  User,
} from "lucide-react"
import { Page, Panel, PrimaryButton, SectionTitle } from "./PageComponents.jsx"
import useAuthStore from "../store/useAuthStore.js"
import useThemeStore from "../store/useThemeStore.js"

function SecondaryButton({ children, onClick, tone = "normal" }) {
  const danger = tone === "danger"

  return (
    <button
      onClick={onClick}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-85"
      style={{
        background: danger ? "rgba(239,68,68,0.10)" : "var(--ss-surface-2)",
        border: danger
          ? "1px solid rgba(239,68,68,0.28)"
          : "1px solid var(--ss-border)",
        color: danger ? "var(--ss-negative)" : "var(--ss-text-1)",
      }}
    >
      {children}
    </button>
  )
}

function ToggleRow({ label, description, checked, onChange, icon: Icon }) {
  return (
    <label
      className="flex min-w-0 items-center justify-between gap-4 rounded-2xl p-4"
      style={{
        background: "var(--ss-bg)",
        border: "1px solid var(--ss-border)",
      }}
    >
      <span className="flex min-w-0 items-start gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
          style={{
            background: "var(--ss-accent-subtle)",
            color: "var(--ss-accent)",
          }}
        >
          <Icon size={16} />
        </span>
        <span className="min-w-0">
          <span
            className="block"
            style={{ color: "var(--ss-text-1)", fontSize: 14, fontWeight: 700 }}
          >
            {label}
          </span>
          <span
            className="block"
            style={{ color: "var(--ss-text-2)", fontSize: 12, lineHeight: 1.45 }}
          >
            {description}
          </span>
        </span>
      </span>

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 shrink-0 accent-[#E0D206]"
      />
    </label>
  )
}

export default function Settings() {
  const navigate = useNavigate()
  const { user, signOut } = useAuthStore()
  const { isDark, toggleTheme } = useThemeStore()
  const [budgetAlerts, setBudgetAlerts] = useState(true)
  const [weeklyReports, setWeeklyReports] = useState(false)
  const [syncOnWifi, setSyncOnWifi] = useState(true)
  const [currency, setCurrency] = useState("INR")

  const userName = user?.name || user?.email?.split("@")[0] || "Guest user"
  const userEmail = user?.email || "Not signed in"

  const handleLogout = async () => {
    await signOut()
    navigate("/login")
  }

  return (
    <Page title="Settings">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)]">
        <div className="flex flex-col gap-5">
          <Panel className="space-y-6">
            <SectionTitle title="Account" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl"
                  style={{
                    background: "var(--ss-accent-subtle)",
                    color: "var(--ss-accent)",
                  }}
                >
                  <User size={20} />
                </div>
                <div className="min-w-0">
                  <p
                    className="truncate"
                    style={{
                      color: "var(--ss-text-1)",
                      fontSize: 16,
                      fontWeight: 800,
                    }}
                  >
                    {userName}
                  </p>
                  <p
                    className="truncate"
                    style={{ color: "var(--ss-text-2)", fontSize: 13 }}
                  >
                    {userEmail}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {user ? (
                  <SecondaryButton onClick={handleLogout} tone="danger">
                    <LogOut size={16} />
                    Logout
                  </SecondaryButton>
                ) : (
                  <>
                    <PrimaryButton onClick={() => navigate("/login")}>
                      <span className="inline-flex items-center gap-2">
                        <LogIn size={16} />
                        Login
                      </span>
                    </PrimaryButton>
                    <SecondaryButton onClick={() => navigate("/signup")}>
                      Create account
                    </SecondaryButton>
                  </>
                )}
              </div>
            </div>
          </Panel>

          <Panel className="space-y-5">
            <SectionTitle title="Preferences" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block space-y-3">
                <span
                  className="block uppercase"
                  style={{
                    color: "var(--ss-text-3)",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                  }}
                >
                  Currency
                </span>
                <select
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                  className="w-full rounded-xl px-4 py-3 outline-none"
                  style={{
                    background: "var(--ss-surface-2)",
                    border: "1px solid var(--ss-border)",
                    color: "var(--ss-text-1)",
                    fontSize: 13,
                  }}
                >
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </label>

              <div className="space-y-3">
                <span
                  className="block uppercase"
                  style={{
                    color: "var(--ss-text-3)",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                  }}
                >
                  Display mode
                </span>
                <button
                  onClick={toggleTheme}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left"
                  style={{
                    background: "var(--ss-surface-2)",
                    border: "1px solid var(--ss-border)",
                    color: "var(--ss-text-1)",
                  }}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    {isDark ? <Moon size={16} /> : <Sun size={16} />}
                    {isDark ? "Dark mode" : "Light mode"}
                  </span>
                  <span
                    style={{
                      color: "var(--ss-accent)",
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    Change
                  </span>
                </button>
              </div>
            </div>
          </Panel>
        </div>

        <div className="flex flex-col gap-5">
          <Panel className="space-y-4">
            <SectionTitle title="Notifications" />
            <ToggleRow
              icon={Bell}
              label="Budget alerts"
              description="Warn me when a category is close to its monthly limit."
              checked={budgetAlerts}
              onChange={setBudgetAlerts}
            />
            <ToggleRow
              icon={Bell}
              label="Weekly report"
              description="Send a weekly summary of spending and savings."
              checked={weeklyReports}
              onChange={setWeeklyReports}
            />
          </Panel>

          <Panel className="space-y-4">
            <SectionTitle title="Privacy & Sync" />
            <ToggleRow
              icon={Shield}
              label="Wi-Fi sync preferred"
              description="Queue heavier updates until a stable connection is available."
              checked={syncOnWifi}
              onChange={setSyncOnWifi}
            />

            <div
              className="rounded-2xl p-4"
              style={{
                background: "var(--ss-bg)",
                border: "1px solid var(--ss-border)",
              }}
            >
              <p
                style={{ color: "var(--ss-text-1)", fontSize: 14, fontWeight: 700 }}
              >
                Session status
              </p>
              <p
                className="mt-1"
                style={{ color: "var(--ss-text-2)", fontSize: 12, lineHeight: 1.45 }}
              >
                {user
                  ? "Your account is active on this device."
                  : "Login to sync data across devices."}
              </p>
            </div>
          </Panel>
        </div>
      </div>
    </Page>
  )
}
