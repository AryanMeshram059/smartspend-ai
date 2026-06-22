import { Bell, Lock, User, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../store/useAuthStore"
import { Page, Panel, SectionTitle } from "./PageComponents.jsx"

const settings = [
  {
    icon: User,
    title: "Profile",
    desc: "Name, avatar, currency, and regional preferences",
  },
  {
    icon: Bell,
    title: "Notifications",
    desc: "Budget alerts, goal reminders, and weekly reports",
  },
  {
    icon: Lock,
    title: "Security",
    desc: "Password, active sessions, and account protection",
  },
]

export default function Settings() {
  const navigate = useNavigate()
  const { signOut } = useAuthStore()

  const handleLogout = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to sign out?"
    )

    if (!confirmed) return

    try {
      await signOut()
      navigate("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <Page title="Settings" eyebrow="SMARTSPEND AI - ACCOUNT">
      <Panel>
        <SectionTitle title="Account settings" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {settings.map(({ icon: Icon, title, desc }) => (
            <button
              key={title}
              className="text-left rounded-2xl p-5 transition-colors hover:opacity-80"
              style={{
                background: "var(--ss-bg)",
                border: "1px solid var(--ss-border)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: "var(--ss-accent-subtle)",
                  color: "var(--ss-accent)",
                }}
              >
                <Icon size={17} />
              </div>

              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--ss-text-1)",
                }}
              >
                {title}
              </p>

              <p
                className="mt-2"
                style={{
                  fontSize: 13,
                  color: "var(--ss-text-2)",
                  lineHeight: 1.5,
                }}
              >
                {desc}
              </p>
            </button>
          ))}
        </div>
      </Panel>

      <Panel>
        <SectionTitle title="Preferences" />

        <div className="flex flex-col" style={{ gap: 4 }}>
          {[
            "Dark mode by default",
            "Monthly report email",
            "AI budget warnings",
          ].map((label, index) => (
            <label
              key={label}
              className="flex items-center justify-between rounded-2xl px-5"
              style={{
                height: 56,
                background: "var(--ss-bg)",
                border: "1px solid var(--ss-border)",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--ss-text-1)",
                }}
              >
                {label}
              </span>

              <input
                type="checkbox"
                defaultChecked={index !== 1}
              />
            </label>
          ))}
        </div>
      </Panel>

      <Panel>
        <SectionTitle title="Account Actions" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 rounded-2xl px-5 py-4 transition-all hover:opacity-90"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.25)",
            color: "#ef4444",
          }}
        >
          <LogOut size={18} />

          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Sign Out
          </span>
        </button>
      </Panel>
    </Page>
  )
}