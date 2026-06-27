import supabase from "../lib/supabase"
import {
  getOfflineQueue,
  removeOfflineRequest,
  updateOfflineRequest,
} from "./offlineQueue"
import { isOnline } from "./cacheManager"

const API_URL =
  import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "http://localhost:5000/api"
    
const TEMP_ID_MAP_KEY = "smartspend:sync-temp-id-map"
const RETRY_DELAY_MS = 30000

let syncing = false
let status = "synced"
let lastError = ""
let retryTimer = null

const getTempIdMap = () => {
  if (typeof localStorage === "undefined") return {}

  try {
    return JSON.parse(
      localStorage.getItem(TEMP_ID_MAP_KEY) || "{}"
    )
  } catch {
    return {}
  }
}

const saveTempIdMap = (map) => {
  if (typeof localStorage === "undefined") return
  localStorage.setItem(
    TEMP_ID_MAP_KEY,
    JSON.stringify(map)
  )
}

const setStatus = (nextStatus, error = "") => {
  status = nextStatus
  lastError = error

  window.dispatchEvent(
    new CustomEvent("smartspend:sync-status", {
      detail: getSyncSnapshot(),
    })
  )
}

const emitStatus = () => {
  window.dispatchEvent(
    new CustomEvent("smartspend:sync-status", {
      detail: getSyncSnapshot(),
    })
  )
}

const getQueuedCounts = () => {
  const queue = getOfflineQueue()

  return {
    pendingCount: queue.filter(
      (item) => item.status !== "failed"
    ).length,
    failedCount: queue.filter(
      (item) => item.status === "failed"
    ).length,
  }
}

export const getSyncSnapshot = () => {
  const { pendingCount, failedCount } =
    getQueuedCounts()

  if (!isOnline()) {
    return {
      status: "offline",
      pendingCount,
      failedCount,
      lastError,
    }
  }

  if (syncing) {
    return {
      status: "syncing",
      pendingCount,
      failedCount,
      lastError,
    }
  }

  if (failedCount > 0 || status === "failed") {
    return {
      status: "failed",
      pendingCount,
      failedCount,
      lastError,
    }
  }

  return {
    status: pendingCount > 0 ? "pending" : "synced",
    pendingCount,
    failedCount,
    lastError,
  }
}

const getToken = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session?.access_token
}

const sanitizeBody = (request) => {
  if (!request.body) return undefined

  if (
    request.endpoint.startsWith("/transactions/") &&
    request.method !== "POST"
  ) {
    const allowedFields = [
      "amount",
      "type",
      "category",
      "note",
      "transaction_date",
      "is_recurring",
    ]

    const body = allowedFields.reduce((nextBody, field) => {
      if (request.body[field] !== undefined) {
        nextBody[field] = request.body[field]
      }

      return nextBody
    }, {})

    if (
      body.note === undefined &&
      request.body.description !== undefined
    ) {
      body.note = request.body.description
    }

    return body
  }

  if (
    request.endpoint.startsWith("/goals/") &&
    request.method !== "POST" &&
    request.method !== "PATCH"
  ) {
    const allowedFields = [
      "title",
      "target_amount",
      "current_amount",
      "deadline",
    ]

    return allowedFields.reduce((body, field) => {
      if (request.body[field] !== undefined) {
        body[field] = request.body[field]
      }

      return body
    }, {})
  }

  return request.body
}

const resolveEndpoint = (endpoint, idMap) =>
  Object.entries(idMap).reduce(
    (resolved, [tempId, serverId]) =>
      resolved.replace(tempId, serverId),
    endpoint
  )

const getUnresolvedTemporaryId = (endpoint) =>
  endpoint.match(/offline-[^/]+/)?.[0]

const rememberCreatedId = (request, data, idMap) => {
  const temporaryId = request.body?.id
  const serverId =
    data?.transaction?.id ||
    data?.goal?.id ||
    data?.id

  if (
    temporaryId?.startsWith?.("offline-") &&
    serverId
  ) {
    idMap[temporaryId] = String(serverId)
    saveTempIdMap(idMap)
  }
}

const isConflictStatus = (statusCode) =>
  [400, 404, 409, 410, 422].includes(statusCode)

const isConflictError = (error) =>
  isConflictStatus(error.status) ||
  /schema cache|could not find .* column|not found|deleted|0 rows|cannot coerce/i.test(
    error.message || ""
  )

const scheduleRetry = () => {
  if (retryTimer) return

  retryTimer = window.setTimeout(() => {
    retryTimer = null
    syncOfflineQueue()
  }, RETRY_DELAY_MS)
}

const replayRequest = async (request, token, idMap) => {
  const endpoint = resolveEndpoint(
    request.endpoint,
    idMap
  )

  const unresolvedTemporaryId =
    getUnresolvedTemporaryId(endpoint)

  if (unresolvedTemporaryId) {
    const error = new Error(
      `Cannot sync ${request.method} ${request.endpoint}: missing server id for ${unresolvedTemporaryId}.`
    )
    error.status = 409
    throw error
  }

  const body = sanitizeBody(request)

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: request.method,
    headers: {
      ...(body
        ? { "Content-Type": "application/json" }
        : {}),
      ...(token
        ? { Authorization: `Bearer ${token}` }
        : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response
    .json()
    .catch(() => ({}))

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `Request failed with ${response.status}`

    const error = new Error(message)
    error.status = response.status
    throw error
  }

  rememberCreatedId(request, data, idMap)
}

export const syncOfflineQueue = async () => {
  if (syncing || !isOnline()) {
    setStatus(isOnline() ? status : "offline")
    return
  }

  const queue = getOfflineQueue()

  if (queue.length === 0) {
    setStatus(
      queue.some((request) => request.status === "failed")
        ? "failed"
        : "synced"
    )
    return
  }

  if (queue[0]?.status === "failed") {
    setStatus(
      "failed",
      queue[0].error ||
        "Resolve the failed sync item before continuing."
    )
    return
  }

  syncing = true
  setStatus("syncing")

  try {
    const token = await getToken()
    const idMap = getTempIdMap()

    for (const request of queue) {
      if (request.status === "failed") {
        setStatus(
          "failed",
          request.error ||
            "Resolve the failed sync item before continuing."
        )
        return
      }

      try {
        await replayRequest(request, token, idMap)
        removeOfflineRequest(request.id)
      } catch (error) {
        if (isConflictError(error)) {
          updateOfflineRequest(request.id, {
            status: "failed",
            error: error.message,
            failedAt: new Date().toISOString(),
          })
        } else {
          scheduleRetry()
        }

        setStatus(
          "failed",
          error.message ||
            "Sync failed. SmartSpend will retry later."
        )
        return
      }
    }

    setStatus(
      getOfflineQueue().some(
        (request) => request.status === "failed"
      )
        ? "failed"
        : "synced"
    )

    window.dispatchEvent(
      new CustomEvent("smartspend:sync-complete")
    )
  } finally {
    syncing = false
    emitStatus()
  }
}

export const initBackgroundSync = () => {
  if (typeof window === "undefined") return

  const handleOnline = () => {
    syncOfflineQueue()
  }

  const handleOffline = () => {
    setStatus("offline")
  }

  window.addEventListener("online", handleOnline)
  window.addEventListener("offline", handleOffline)

  if (isOnline()) {
    syncOfflineQueue()
  } else {
    setStatus("offline")
  }

  return () => {
    window.removeEventListener("online", handleOnline)
    window.removeEventListener("offline", handleOffline)
  }
}
