import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "📊", path: "/dashboard" },
  { id: "transactions", label: "Transactions", icon: "💳", path: "/transactions" },
  { id: "budgets", label: "Budgets", icon: "💰", path: "/budgets" },
  { id: "goals", label: "Goals", icon: "🎯", path: "/goals" },
  { id: "ai", label: "AI Center", icon: "✨", path: "/ai" },
];

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovering, setIsHovering] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation - Hidden */}
      <nav className="hidden lg:flex fixed bottom-0 left-0 right-0 z-50">
        {/* Spacer */}
      </nav>

      {/* Mobile Dock Navigation - Floating */}
      <nav
        className="fixed bottom-0 left-0 right-0 lg:hidden z-50"
        style={{
          background: "linear-gradient(to top, var(--color-bg-primary), transparent)",
          pointerEvents: "none",
        }}
      >
        <div
          className="mx-auto mb-6 px-4 flex justify-center"
          style={{ pointerEvents: "auto" }}
        >
          <div
            className="inline-flex gap-2 p-3 rounded-3xl"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "var(--shadow-lg)",
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className="relative flex flex-col items-center justify-center px-3 py-2 rounded-2xl transition-all duration-200"
                  style={{
                    backgroundColor: active
                      ? "var(--color-accent-primary)"
                      : "transparent",
                    color: active
                      ? "var(--color-white)"
                      : "var(--color-text-secondary)",
                  }}
                  title={item.label}
                >
                  <span className="text-xl mb-1">{item.icon}</span>
                  <span
                    className={`text-xs font-medium transition-opacity duration-200 ${
                      isHovering || active ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav
        className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col gap-8 p-8 z-40"
        style={{
          backgroundColor: "var(--color-white)",
          borderRight: "1px solid var(--color-bg-tertiary)",
        }}
      >
        {/* Logo/Brand */}
        <div className="space-y-2">
          <h1
            className="text-display text-2xl font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            💚 SmartSpend
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            AI Financial OS
          </p>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 space-y-2">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 text-left group"
                style={{
                  backgroundColor: active
                    ? "rgba(57, 158, 90, 0.1)"
                    : "transparent",
                  color: active
                    ? "var(--color-accent-primary)"
                    : "var(--color-text-secondary)",
                }}
              >
                <span className="text-2xl">{item.icon}</span>
                <span
                  className="font-medium group-hover:translate-x-1 transition-transform"
                >
                  {item.label}
                </span>
                {active && (
                  <div
                    className="ml-auto w-1 h-6 rounded-full"
                    style={{ backgroundColor: "var(--color-accent-primary)" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className="pt-8 border-t"
          style={{ borderColor: "var(--color-bg-tertiary)" }}
        >
          <button
            className="w-full btn btn-ghost btn-pill text-sm justify-center"
            style={{
              borderColor: "var(--color-text-light)",
              color: "var(--color-text-primary)",
            }}
          >
            ⚙️ Settings
          </button>
        </div>
      </nav>

      {/* Main content spacing for sidebar on desktop */}
      <div className="hidden lg:block w-64" />
    </>
  );
}
