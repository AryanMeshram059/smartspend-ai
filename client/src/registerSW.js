import { registerSW } from "virtual:pwa-register"

export const updateSW = registerSW({
  immediate: true,

  onRegistered(registration) {
    console.log("✅ Service Worker registered", registration)
  },

  onOfflineReady() {
    console.log("📦 SmartSpend is ready for offline usage.")
  },

  onNeedRefresh() {
    console.log("🔄 New SmartSpend version available.")
  },
})