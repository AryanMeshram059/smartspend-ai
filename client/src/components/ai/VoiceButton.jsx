import { Mic, MicOff } from "lucide-react"

export default function VoiceButton({ listening, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={listening ? "Stop listening" : "Start voice input"}
      className={`fixed right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:right-6 ${
        listening
          ? "border-zinc-500 bg-zinc-800 text-white"
          : "border-zinc-700 bg-zinc-900/95 text-zinc-400 hover:border-zinc-600"
      } bottom-[5.25rem] lg:bottom-8`}
    >
      {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
    </button>
  )
}
