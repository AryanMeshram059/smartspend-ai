import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { Send, Sparkles } from "lucide-react"
import {
  Metric,
  Page,
  Panel,
  SectionTitle,
} from "./PageComponents.jsx"
import { chatWithAI } from "../services/ai.service.js"
import api from "../services/api.js"

const prompts = [
  "Can I afford a Rs 3,000 purchase this week?",
  "Find unusual spending from the last 30 days.",
  "Create a savings plan for my laptop goal.",
]

export default function AiCenter() {
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
  useEffect(() => {

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

    }, [])

  const sendMessage = async (
    text = input
  ) => {
    if (!text.trim()) return

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
      return
    }
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    

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
    } catch (error) {
      console.error(error)

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't process your request. Please try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page
      title="AI Center"
      eyebrow="SMARTSPEND AI - ASSISTANT"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Metric
          label="Monthly insight"
          value="Rs 2.4k"
          tone="good"
          sub="Potential savings found"
        />
        <Metric
          label="Budget risks"
          value="2"
          tone="bad"
          sub="Food and entertainment"
        />
        <Metric
          label="Confidence"
          value="86%"
          tone="accent"
          sub="Based on recent data"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
        <Panel className="min-h-[420px] flex flex-col">
          <SectionTitle
            title="Ask SmartSpend"
            action="Online"
          />

          <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2">
            {messages.map(
              (message, index) => (
                <div
                  key={index}
                  className={`max-w-[82%] rounded-2xl p-4 ${
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
                      fontSize: 13,
                      color:
                        "var(--ss-text-1)",
                      lineHeight: 1.6,
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
                className="max-w-[82%] rounded-2xl p-4"
                style={{
                  background:
                    "var(--ss-bg)",
                  border:
                    "1px solid var(--ss-border)",
                }}
              >
                <p
                  style={{
                    fontSize: 13,
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
            className="mt-4 flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{
              background: "var(--ss-bg)",
              border:
                "1px solid var(--ss-border)",
            }}
          >
            <Sparkles
              size={15}
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
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !loading
                ) {
                  sendMessage()
                }
              }}
              className="flex-1 bg-transparent outline-none"
              placeholder="Ask about spending, budgets, or goals..."
              style={{
                fontSize: 13,
                color:
                  "var(--ss-text-1)",
              }}
            />

            <button
              onClick={() =>
                sendMessage()
              }
              disabled={loading}
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background:
                  "var(--ss-ai-subtle)",
                color: "var(--ss-ai)",
                opacity: loading
                  ? 0.6
                  : 1,
              }}
            >
              <Send size={14} />
            </button>
          </div>
        </Panel>

        <Panel>
          <SectionTitle title="Suggested prompts" />

          <div className="flex flex-col gap-3">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() =>
                  sendMessage(prompt)
                }
                className="text-left rounded-2xl p-4 transition-colors hover:opacity-80"
                style={{
                  background:
                    "var(--ss-bg)",
                  border:
                    "1px solid var(--ss-border)",
                  color:
                    "var(--ss-text-1)",
                  fontSize: 13,
                  lineHeight: 1.5,
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