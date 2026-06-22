import { Search, Bell, Plus } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Sidebar } from "./components/dashboard/Sidebar";
import { StatCards } from "./components/dashboard/StatCards";
import { MonthlyOverview, CategorySplit } from "./components/dashboard/Charts";
import { RecentTransactions } from "./components/dashboard/RecentTransactions";
import { StreakCard, AIAssistant } from "./components/dashboard/StreakAndAI";
import { MobileView } from "./components/dashboard/MobileView";
import { ThemeToggle } from "./components/dashboard/ThemeToggle";

function DashboardApp() {
  return (
    /* MARKER-MAKE-KIT-INVOKED */
    <div className="size-full flex overflow-hidden" style={{ background: "var(--ss-bg)", color: "var(--ss-text-1)" }}>
      {/* ── Desktop Layout ── */}
      <div className="hidden md:flex w-full h-full">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Topbar */}
          <header
            className="flex items-center gap-3 px-6 py-4 shrink-0"
            style={{ borderBottom: "1px solid var(--ss-border)" }}
          >
            <div>
              <p style={{ fontSize: "18px", fontWeight: 600, color: "var(--ss-text-1)", lineHeight: 1 }}>Dashboard</p>
              <p style={{ fontSize: "10px", color: "var(--ss-text-3)", marginTop: 2 }}>SMARTSPEND AI — DASHBOARD</p>
            </div>
            <div className="flex-1" />

            {/* Search */}
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 w-48"
              style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}
            >
              <Search size={13} style={{ color: "var(--ss-text-3)", flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none flex-1"
                style={{ fontSize: "12px", color: "var(--ss-text-1)" }}
              />
            </div>

            <ThemeToggle />

            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
              style={{ background: "var(--ss-surface)", border: "1px solid var(--ss-border)" }}
            >
              <Bell size={14} style={{ color: "var(--ss-text-2)" }} />
            </button>
            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
              style={{ background: "var(--ss-accent-subtle)", border: "1px solid color-mix(in srgb, var(--ss-accent) 30%, transparent)" }}
            >
              <Plus size={14} style={{ color: "var(--ss-accent)" }} />
            </button>
          </header>

          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
            <StatCards />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-3"><MonthlyOverview /></div>
              <div className="lg:col-span-2"><CategorySplit /></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 pb-2">
              <div className="lg:col-span-3"><RecentTransactions /></div>
              <div className="lg:col-span-2 flex flex-col gap-4">
                <StreakCard />
                <AIAssistant />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ── Mobile Layout ── */}
      <div className="flex md:hidden w-full h-full overflow-hidden">
        <MobileView />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <DashboardApp />
    </ThemeProvider>
  );
}
