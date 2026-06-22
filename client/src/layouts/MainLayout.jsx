import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, LogOut } from "lucide-react"
import useAuthStore from "../store/useAuthStore"

const mainNav = [
  { label: "Dashboard", to: "/" },
  { label: "Transactions", to: "/transactions" },
  { label: "Budgets", to: "/budgets" },
  { label: "Reports", to: "/reports" },
]

const aiNav = [
  { label: "AI Center", to: "/ai-center" },
  { label: "Goals Hub", to: "/goals" },
]

export default function MainLayout({ children, currentPage = "Dashboard" }) {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [sidebarOpen, setOpenSidebar] = useState(false)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className={`${isDarkMode ? "theme-dark bg-[#09090b] text-white" : "theme-light bg-[#EFECE1] text-zinc-950"} min-h-screen antialiased transition-colors duration-300`}>
      {/* 🖥️ DESKTOP VIEW */}
      <div className="hidden lg:grid grid-cols-[16rem_1fr] min-h-screen w-full">
        {/* Persistent Sidebar Canvas */}
        <aside className={`${isDarkMode ? "bg-[#18181b] border-zinc-800" : "bg-[#E9E4D3] border-[#DDD6BF]"} border-r flex flex-col justify-between h-screen sticky top-0 p-6`}>
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg text-black bg-[#E0D206]">
                S
              </div>
              <div>
                <h1 className="font-sans font-bold text-lg tracking-tight">SmartSpend</h1>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 block uppercase">AI OS v1.0</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-7">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">Main</span>
                <ul className="space-y-1">
                  {mainNav.map(item => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.to === "/"}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                            isActive
                              ? "bg-[#7F7933]/15 border-l-4 border-[#7F7933]"
                              : "text-zinc-400 hover:text-white"
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">AI Engine</span>
                <ul className="space-y-1">
                  {aiNav.map(item => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                            isActive
                              ? "bg-[#7F7933]/15 border-l-4 border-[#7F7933]"
                              : "text-zinc-400 hover:text-white"
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
            <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs">
              {user?.name?.slice(0, 2).toUpperCase() || "AK"}
            </div>
            <div className="overflow-hidden flex-1">
              <h4 className="text-sm font-semibold truncate">{user?.name || "Aryan K."}</h4>
              <p className="text-[10px] text-zinc-500 truncate">Lv.{user?.level || 1}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-zinc-600 hover:text-red-400 transition-colors ml-auto"
              title="Sign out"
            >
              <LogOut size={15} />
            </button>
          </div>
        </aside>

        {/* Dynamic Inner Window Canvas */}
        <main className="p-8 space-y-6 overflow-y-auto max-h-screen">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold font-headline">{currentPage}</h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                  isDarkMode ? "bg-[#18181b] border-zinc-800" : "bg-[#E9E4D3] border-[#DDD6BF]"
                }`}
              >
                {isDarkMode ? "🌙" : "☀️"}
              </button>
            </div>
          </header>
          {children}
        </main>
      </div>

      {/* 📱 MOBILE VIEW */}
      <div className="lg:hidden flex flex-col min-h-screen w-full p-4 pb-24 space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <span className="text-xs text-zinc-500 font-mono">Good evening,</span>
            <h2 className="text-xl font-bold">{user?.name?.split(" ")[0] || "Aryan"} 👋</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 border rounded-xl flex items-center justify-center ${
                isDarkMode ? "bg-[#18181b] border-zinc-800" : "bg-[#E9E4D3] border-[#DDD6BF]"
              }`}
            >
              {isDarkMode ? "🌙" : "☀️"}
            </button>
            <button
              onClick={() => setOpenSidebar(true)}
              className={`w-9 h-9 border rounded-xl flex items-center justify-center ${
                isDarkMode ? "bg-[#18181b] border-zinc-800" : "bg-[#E9E4D3] border-[#DDD6BF]"
              }`}
            >
              <Menu size={16} />
            </button>
          </div>
        </header>

        {children}

        {/* Dock Bottom Navigation */}
        <nav
          className={`fixed bottom-0 left-0 right-0 border-t px-6 py-2 flex justify-between items-center z-50 ${
            isDarkMode ? "bg-[#18181b] border-zinc-800" : "bg-[#E9E4D3] border-[#DDD6BF]"
          }`}
        >
          <NavLink to="/" end className={({ isActive }) => `flex flex-col items-center text-[9px] font-mono ${isActive ? "text-[#E0D206]" : "text-zinc-500"}`}>
            <span>🏠</span>Home
          </NavLink>
          <NavLink to="/transactions" className={({ isActive }) => `flex flex-col items-center text-[9px] font-mono ${isActive ? "text-[#E0D206]" : "text-zinc-500"}`}>
            <span>📊</span>Logs
          </NavLink>
          <button className="w-12 h-12 rounded-full border bg-zinc-900 border-[#88D9FF] flex items-center justify-center shadow-lg -translate-y-3 text-xl">
            🎙️
          </button>
          <NavLink to="/ai-center" className={({ isActive }) => `flex flex-col items-center text-[9px] font-mono ${isActive ? "text-[#E0D206]" : "text-zinc-500"}`}>
            <span>✨</span>AI
          </NavLink>
          <NavLink to="/goals" className={({ isActive }) => `flex flex-col items-center text-[9px] font-mono ${isActive ? "text-[#E0D206]" : "text-zinc-500"}`}>
            <span>🏆</span>Goals
          </NavLink>
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setOpenSidebar(false)}
            />
            <motion.aside
              initial={{ x: -264 }}
              animate={{ x: 0 }}
              exit={{ x: -264 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`fixed left-0 top-0 h-full z-50 lg:hidden w-64 ${
                isDarkMode ? "bg-[#18181b] border-zinc-800" : "bg-[#E9E4D3] border-[#DDD6BF]"
              } border-r flex flex-col`}
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg text-black bg-[#E0D206]">
                    S
                  </div>
                  <div>
                    <h1 className="font-bold text-sm">SmartSpend</h1>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">v1.0</span>
                  </div>
                </div>
                <button onClick={() => setOpenSidebar(false)} className="text-zinc-500">
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 px-4 space-y-6 overflow-y-auto">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">Main</span>
                  <ul className="space-y-1">
                    {mainNav.map(item => (
                      <li key={item.to} onClick={() => setOpenSidebar(false)}>
                        <NavLink
                          to={item.to}
                          end={item.to === "/"}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium ${
                              isActive ? "bg-[#7F7933]/15 border-l-4 border-[#7F7933]" : "text-zinc-400"
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">AI Engine</span>
                  <ul className="space-y-1">
                    {aiNav.map(item => (
                      <li key={item.to} onClick={() => setOpenSidebar(false)}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium ${
                              isActive ? "bg-[#7F7933]/15 border-l-4 border-[#7F7933]" : "text-zinc-400"
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              <div className="flex items-center gap-3 p-6 border-t border-zinc-800">
                <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs">
                  {user?.name?.slice(0, 2).toUpperCase() || "AK"}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">{user?.name || "Aryan K."}</h4>
                </div>
                <button onClick={handleLogout} className="text-zinc-600 hover:text-red-400">
                  <LogOut size={15} />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
