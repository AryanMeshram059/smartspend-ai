import { useEffect, useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  BarChart3,
  Target,
  Settings,
} from "lucide-react"
import { CardNav, Dock } from "../react-bits"
import { ROUTES } from "@/constants/routes"

const LOGO =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="28" viewBox="0 0 128 28"><text x="0" y="21" fill="#fafafa" font-family="Inter,sans-serif" font-size="15" font-weight="600">SmartSpend</text></svg>`
  )

const CARD_NAV_ITEMS = [
  {
    label: "Overview",
    bgColor: "#18181b",
    textColor: "#fafafa",
    links: [
      { label: "Dashboard", href: ROUTES.HOME, ariaLabel: "Dashboard" },
      { label: "Transactions", href: ROUTES.TRANSACTIONS, ariaLabel: "Transactions" },
    ],
  },
  {
    label: "Planning",
    bgColor: "#27272a",
    textColor: "#fafafa",
    links: [
      { label: "Budgets", href: ROUTES.BUDGETS, ariaLabel: "Budgets" },
      { label: "Goals", href: ROUTES.GOALS, ariaLabel: "Goals" },
    ],
  },
  {
    label: "Insights",
    bgColor: "#3f3f46",
    textColor: "#fafafa",
    links: [
      { label: "Reports", href: ROUTES.REPORTS, ariaLabel: "Reports" },
      { label: "Settings", href: ROUTES.SETTINGS, ariaLabel: "Settings" },
    ],
  },
]

const DOCK_ITEMS = [
  { path: ROUTES.HOME, label: "Home", icon: LayoutDashboard },
  { path: ROUTES.TRANSACTIONS, label: "Txns", icon: ArrowLeftRight },
  { path: ROUTES.BUDGETS, label: "Budgets", icon: Wallet },
  { path: ROUTES.REPORTS, label: "Reports", icon: BarChart3 },
  { path: ROUTES.GOALS, label: "Goals", icon: Target },
  { path: ROUTES.SETTINGS, label: "Settings", icon: Settings },
]

export function DesktopCardNav() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const root = document.querySelector(".ss-card-nav")
    if (!root) return
    const links = root.querySelectorAll(".nav-card-link")
    const clean = []
    links.forEach((el) => {
      const fn = (e) => {
        e.preventDefault()
        const href = el.getAttribute("href")
        if (href) navigate(href)
      }
      el.addEventListener("click", fn)
      clean.push(() => el.removeEventListener("click", fn))
    })
    return () => clean.forEach((f) => f())
  }, [navigate, location.pathname])

  return (
    <div className="ss-card-nav pointer-events-none fixed inset-x-0 top-0 z-[99] hidden h-0 lg:block">
      <style>{`
        .ss-card-nav .card-nav-cta-button { display: none !important; }
        .ss-card-nav .card-nav-container { pointer-events: auto; max-width: 56rem; }
      `}</style>
      <CardNav
        logo={LOGO}
        items={CARD_NAV_ITEMS}
        baseColor="#18181b"
        menuColor="#e4e4e7"
        buttonBgColor="#27272a"
        buttonTextColor="#fafafa"
      />
    </div>
  )
}

export function MobileDockNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const items = useMemo(
    () =>
      DOCK_ITEMS.map((item) => ({
        label: item.label,
        icon: (
          <item.icon
            className={`h-[18px] w-[18px] ${location.pathname === item.path ? "text-white" : "text-zinc-500"}`}
          />
        ),
        className:
          location.pathname === item.path
            ? "!border-zinc-600 !bg-zinc-800"
            : "!border-zinc-800 !bg-zinc-900/95",
        onClick: () => navigate(item.path),
      })),
    [navigate, location.pathname]
  )

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="pointer-events-none h-20 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
      <Dock
        items={items}
        panelHeight={52}
        baseItemSize={40}
        magnification={50}
        distance={90}
        className="!border-zinc-800 !bg-zinc-950/95 !px-2 !pb-[max(0.75rem,env(safe-area-inset-bottom))] !backdrop-blur-lg"
      />
    </div>
  )
}
