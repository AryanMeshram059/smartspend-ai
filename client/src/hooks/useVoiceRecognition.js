import { useState, useEffect, useCallback, useRef } from "react"

export default function useVoiceRecognition({ onResult, onError } = {}) {
  const [listening, setListening] = useState(false)
  const [supported] = useState(() => {
    if (typeof window === "undefined") return false
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
  })
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (!supported) return
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-IN"

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      onResult?.(transcript)
      setListening(false)
    }

    recognition.onerror = (event) => {
      onError?.(event.error)
      setListening(false)
    }

    recognition.onend = () => setListening(false)
    recognitionRef.current = recognition
  }, [supported, onResult, onError])

  const toggle = useCallback(() => {
    if (!recognitionRef.current) {
      onError?.("Speech recognition not supported")
      return
    }
    if (listening) {
      recognitionRef.current.stop()
      setListening(false)
    } else {
      recognitionRef.current.start()
      setListening(true)
    }
  }, [listening, onError])

  return { listening, supported, toggle }
}
