import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ROUTES } from "../constants/routes"

// Pages
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Transactions from "../pages/Transactions"
import Budgets from "../pages/Budgets"
import Reports from "../pages/Reports"
import AiCenter from "../pages/AiCenter"
import Goals from "../pages/Goals"
import Settings from "../pages/Settings"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />

        {/* App Routes - Pages include MainLayout */}
        <Route path={ROUTES.HOME} element={<Dashboard />} />
        <Route path={ROUTES.TRANSACTIONS} element={<Transactions />} />
        <Route path={ROUTES.BUDGETS} element={<Budgets />} />
        <Route path={ROUTES.REPORTS} element={<Reports />} />
        <Route path={ROUTES.AI} element={<AiCenter />} />
        <Route path={ROUTES.GOALS} element={<Goals />} />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
