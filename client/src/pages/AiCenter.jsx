import { useState, useEffect, useCallback } from "react"
import ReactMarkdown from "react-markdown"
import { Mic, MicOff, Send, Sparkles } from "lucide-react"
import {
  Metric,
  Page,
  Panel,
  SectionTitle,
} from "./PageComponents.jsx"
import { chatWithAI } from "../services/ai.service.js"
import api from "../services/api.js"
import useVoiceRecognition from "../hooks/useVoiceRecognition.js"
import useOnlineStatus from "../hooks/useOnlineStatus.js"

const prompts = [
  "Can I afford a Rs 3,000 purchase this week?",
  "Find unusual spending from the last 30 days.",
  "Create a savings plan for my laptop goal.",
]

const stripMarkdown = (text) =>
  text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/#{1,6}\s/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim()

export default function AiCenter() {
  const isOnline = useOnlineStatus()
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm SmartSpend AI. Ask me anything about your spending, savings, budgets, or goals.",
    },
  ])

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId]=useState(null)
  const [voiceStatus, setVoiceStatus] = useState("")
  const [speaking, setSpeaking] = useState(false)
  const [speechOutputSupported] = useState(
    () =>
      typeof window !== "undefined" &&
      "speechSynthesis" in window
  )

  useEffect(() => {
      if (!isOnline) {
        return
      }

      const loadSession =
        async () => {

          try {

            const { data } =
              await api.get(
                "/chat/session"
              )

            console.log(
              "Session:",
              data.sessionId
            )

            setSessionId(
              data.sessionId
            )

          } catch (error) {

            console.error(
              "Failed to load session",
              error
            )
          }
        }

      loadSession()

    }, [isOnline])

  useEffect(() => {
    return () => {
      if (
        typeof window !== "undefined" &&
        "speechSynthesis" in window
      ) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const speakResponse = useCallback(
    (text) => {
      if (
        !speechOutputSupported ||
        !text
      ) {
        return
      }

      const spokenText = stripMarkdown(text)

      if (!spokenText) return

      window.speechSynthesis.cancel()

      const utterance =
        new SpeechSynthesisUtterance(spokenText)

      utterance.lang = "en-IN"
      utterance.rate = 0.95
      utterance.pitch = 1

      utterance.onend = () =>
        setSpeaking(false)
      utterance.onerror = () =>
        setSpeaking(false)

      setSpeaking(true)
      window.speechSynthesis.speak(
        utterance
      )
    },
    [
      speechOutputSupported,
    ]
  )

  const sendMessage = useCallback(async (
    text = input,
    { speakReply = false } = {}
  ) => {
    if (!text.trim()) return

    if (!isOnline) {
      setVoiceStatus(
        "AI requires an internet connection."
      )
      return
    }

    const userMessage = {
      role: "user",
      content: text,
    }

    const updatedMessages = [
      ...messages,
      userMessage,
    ]

    if (!sessionId) {
      console.log(
        "Session not loaded yet"
      )
      setVoiceStatus(
        "AI session is still loading. Try again in a moment."
      )
      return
    }
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)
    setVoiceStatus("")

    

    try {
      const result = await chatWithAI(
        text,
        sessionId
      )

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: result.response,
        },
      ])

      if (speakReply) {
        speakResponse(result.response)
      }
    } catch (error) {
      console.error(error)

      const fallbackMessage =
        "Sorry, I couldn't process your request. Please try again."

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: fallbackMessage,
        },
      ])

      if (speakReply) {
        speakResponse(fallbackMessage)
      }
    } finally {
      setLoading(false)
    }
  }, [
    input,
    isOnline,
    messages,
    sessionId,
    speakResponse,
  ])

  const handleVoiceResult = useCallback(
    (transcript) => {
      const spokenText = transcript.trim()

      if (!spokenText) return

      if (!isOnline) {
        setVoiceStatus(
          "AI requires an internet connection."
        )
        return
      }

      setInput(spokenText)
      setVoiceStatus(
        `Heard: "${spokenText}"`
      )
      sendMessage(spokenText, {
        speakReply: true,
      })
    },
    [isOnline, sendMessage]
  )

  const handleVoiceError = useCallback(
    (error) => {
      const message =
        error === "not-allowed" ||
        error === "service-not-allowed"
          ? "Microphone permission is blocked."
          : error === "no-speech"
            ? "No speech detected. Tap the mic and try again."
            : error ===
                "Speech recognition not supported"
              ? "Voice input is not supported in this browser."
              : "Voice input stopped. Try again."

      setVoiceStatus(message)
    },
    []
  )

  const {
    listening,
    supported: voiceInputSupported,
    toggle: toggleListening,
  } = useVoiceRecognition({
    onResult: handleVoiceResult,
    onError: handleVoiceError,
  })

  return (
    <Page
      title="AI Center"
      eyebrow="SMARTSPEND AI - ASSISTANT"
    >

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4 xl:gap-6">
        <Panel className="min-h-[500px] xl:min-h-[620px] flex flex-col">
          <SectionTitle
            title="Ask SmartSpend"
            action={isOnline ? "Online" : "Offline"}
          />

          {!isOnline && (
            <div
              className="mb-3 xl:mb-4 rounded-xl xl:rounded-2xl p-3 xl:p-4"
              style={{
                background:
                  "var(--ss-ai-subtle)",
                border:
                  "1px solid color-mix(in srgb, var(--ss-ai) 30%, transparent)",
                color: "var(--ss-text-1)",
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                AI requires an internet connection.
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--ss-text-2)",
                  marginTop: 2,
                }}
              >
                Reconnect to continue using SmartSpend AI.
              </p>
            </div>
          )}

          <div className="flex-1 flex flex-col gap-2 xl:gap-3 overflow-y-auto pr-1">
            {messages.map(
              (message, index) => (
                <div
                  key={index}
                  className={`max-w-[90%] xl:max-w-[82%] rounded-xl xl:rounded-2xl p-3 xl:p-4 ${
                    message.role === "user"
                      ? "self-end"
                      : ""
                  }`}
                  style={
                    message.role ===
                    "user"
                      ? {
                          background:
                            "var(--ss-accent-subtle)",
                          border:
                            "1px solid color-mix(in srgb, var(--ss-accent) 30%, transparent)",
                        }
                      : {
                          background:
                            "var(--ss-bg)",
                          border:
                            "1px solid var(--ss-border)",
                        }
                  }
                >
                  <ReactMarkdown
                    style={{
                      fontSize: 12,
                      color:
                        "var(--ss-text-1)",
                      lineHeight: 1.5,
                      whiteSpace:
                        "pre-wrap",
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              )
            )}

            {loading && (
              <div
                className="max-w-[90%] xl:max-w-[82%] rounded-xl xl:rounded-2xl p-3 xl:p-4"
                style={{
                  background:
                    "var(--ss-bg)",
                  border:
                    "1px solid var(--ss-border)",
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    color:
                      "var(--ss-text-1)",
                  }}
                >
                  SmartSpend AI is thinking...
                </p>
              </div>
            )}
          </div>

          <div
            className="mt-3 xl:mt-4 flex flex-col gap-2 rounded-xl xl:rounded-2xl px-3 xl:px-4 py-2.5 xl:py-3"
            style={{
              background: "var(--ss-bg)",
              border:
                "1px solid var(--ss-border)",
            }}
          >
            <div className="flex items-center gap-2 xl:gap-3">
              <Sparkles
                size={14}
                style={{
                  color: "var(--ss-ai)",
                  flexShrink: 0,
                }}
              />

              <input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                disabled={!isOnline}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !loading &&
                    isOnline
                  ) {
                    sendMessage()
                  }
                }}
                className="flex-1 bg-transparent outline-none"
                placeholder={
                  listening
                    ? "Listening..."
                    : isOnline
                      ? "Ask about spending, budgets..."
                      : "Reconnect to use AI..."
                }
                style={{
                  fontSize: 12,
                  color:
                    "var(--ss-text-1)",
                }}
              />

              <button
                onClick={toggleListening}
                disabled={
                  loading ||
                  !voiceInputSupported ||
                  !isOnline
                }
                className="w-8 h-8 xl:w-9 xl:h-9 rounded-lg xl:rounded-xl flex items-center justify-center shrink-0"
                aria-label={
                  listening
                    ? "Stop voice input"
                    : "Start voice input"
                }
                title={
                  voiceInputSupported
                    ? listening
                      ? "Stop listening"
                      : "Start voice input"
                    : "Voice input is not supported"
                }
                style={{
                  background: listening
                    ? "var(--ss-ai)"
                    : "var(--ss-ai-subtle)",
                  color: listening
                    ? "var(--ss-bg)"
                    : "var(--ss-ai)",
                  opacity:
                    loading ||
                    !voiceInputSupported ||
                    !isOnline
                      ? 0.6
                      : 1,
                }}
              >
                {listening ? (
                  <MicOff size={12} />
                ) : (
                  <Mic size={12} />
                )}
              </button>

              <button
                onClick={() =>
                  sendMessage()
                }
                disabled={!isOnline || loading}
                className="w-8 h-8 xl:w-9 xl:h-9 rounded-lg xl:rounded-xl flex items-center justify-center shrink-0"
                aria-label="Send message"
                style={{
                  background:
                    "var(--ss-ai-subtle)",
                  color: "var(--ss-ai)",
                  opacity: !isOnline || loading
                    ? 0.6
                    : 1,
                }}
              >
                <Send size={12} />
              </button>
            </div>

            {(voiceStatus ||
              listening ||
              speaking) && (
              <p
                style={{
                  fontSize: 11,
                  color:
                    "var(--ss-text-3)",
                }}
              >
                {listening
                  ? "Listening for your command..."
                  : speaking
                    ? "Reading the response aloud..."
                    : voiceStatus}
              </p>
            )}
          </div>
        </Panel>

        <Panel>
          <SectionTitle title="Suggested prompts" />

          <div className="flex flex-col gap-2 xl:gap-3">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() =>
                  sendMessage(prompt)
                }
                disabled={!isOnline}
                className="text-left rounded-xl xl:rounded-2xl p-3 xl:p-4 transition-colors hover:opacity-80"
                style={{
                  background:
                    "var(--ss-bg)",
                  border:
                    "1px solid var(--ss-border)",
                  color:
                    "var(--ss-text-1)",
                  fontSize: 12,
                  lineHeight: 1.4,
                  opacity: isOnline ? 1 : 0.55,
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        </Panel>
      </div>
    </Page>
  )
}
