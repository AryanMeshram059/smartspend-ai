const QUEUE_KEY = "smartspend:offline-request-queue"

const readQueue = () => {
  if (typeof localStorage === "undefined") return []

  const raw = localStorage.getItem(QUEUE_KEY)
  if (!raw) return []

  try {
    return JSON.parse(raw)
  } catch (error) {
    console.warn("Failed to read SmartSpend offline queue", error)
    return []
  }
}

const writeQueue = (queue) => {
  if (typeof localStorage === "undefined") return
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue))
  window.dispatchEvent(
    new CustomEvent("smartspend:queue-changed", {
      detail: queue,
    })
  )
}

export const addOfflineRequest = ({ endpoint, method, body }) => {
  const request = {
    id: `offline-request-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`,
    endpoint,
    method,
    body,
    timestamp: new Date().toISOString(),
    status: "pending",
  }

  const queue = [...readQueue(), request]
  writeQueue(queue)
  return request
}

export const getOfflineQueue = () => readQueue()

export const clearOfflineQueue = () => writeQueue([])

export const removeOfflineRequest = (id) => {
  const queue = readQueue().filter(
    (request) => request.id !== id
  )

  writeQueue(queue)
  return queue
}

export const updateOfflineRequest = (id, updates) => {
  const queue = readQueue().map((request) =>
    request.id === id
      ? {
          ...request,
          ...updates,
          updatedAt: new Date().toISOString(),
        }
      : request
  )

  writeQueue(queue)
  return queue
}

export const retryFailedRequests = () => {
  const queue = readQueue().map((request) =>
    request.status === "failed"
      ? {
          ...request,
          status: "pending",
          error: undefined,
          failedAt: undefined,
          updatedAt: new Date().toISOString(),
        }
      : request
  )

  writeQueue(queue)
  return queue
}

export const discardFailedRequests = () => {
  const queue = readQueue().filter(
    (request) => request.status !== "failed"
  )

  writeQueue(queue)
  return queue
}
