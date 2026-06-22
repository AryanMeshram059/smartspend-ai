import api from "./api"

export const chatWithAI = async (
  message,
  sessionId
) => {
  const { data } = await api.post(
    "/ai/chat",
    {
      message,
      sessionId,
    }
  )

  return data
}