import { useEffect, useState } from "react"
import {
  discardFailedRequests,
  retryFailedRequests,
} from "../pwa/offlineQueue"
import {
  getSyncSnapshot,
  syncOfflineQueue,
} from "../pwa/syncEngine"

export default function useSyncStatus() {
  const [snapshot, setSnapshot] = useState(
    getSyncSnapshot
  )

  useEffect(() => {
    const refresh = () =>
      setSnapshot(getSyncSnapshot())

    window.addEventListener(
      "smartspend:sync-status",
      refresh
    )
    window.addEventListener(
      "smartspend:queue-changed",
      refresh
    )
    window.addEventListener("online", refresh)
    window.addEventListener("offline", refresh)

    refresh()

    return () => {
      window.removeEventListener(
        "smartspend:sync-status",
        refresh
      )
      window.removeEventListener(
        "smartspend:queue-changed",
        refresh
      )
      window.removeEventListener("online", refresh)
      window.removeEventListener("offline", refresh)
    }
  }, [])

  const retryFailed = () => {
    retryFailedRequests()
    syncOfflineQueue()
  }

  const discardFailed = () => {
    discardFailedRequests()
    syncOfflineQueue()
  }

  return {
    ...snapshot,
    retryFailed,
    discardFailed,
  }
}
