import AppRoutes from "./routes/AppRoutes"
import { useEffect } from "react"
import useAuthStore from "./store/useAuthStore"

export default function App() {
  const {loadUser}=useAuthStore()
  useEffect(()=>{loadUser()}, [loadUser])
  return <AppRoutes />
}
