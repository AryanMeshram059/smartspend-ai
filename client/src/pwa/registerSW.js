import { registerSW } from "virtual:pwa-register"

export const updateSW = registerSW({
  immediate: true,

  onRegistered(registration) {
    console.log("SmartSpend service worker registered", registration)
  },

  onOfflineReady() {
    console.log("SmartSpend is ready for offline usage.")
  },

  onNeedRefresh() {
    console.log("New SmartSpend version available.")
  },
})
