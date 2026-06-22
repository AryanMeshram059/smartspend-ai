import { Sparkles, User } from "lucide-react"

export default function AiMessage({ message }) {
  const user = message.role === "user"

  return (
    <div className={`flex w-full gap-3 ${user ? "flex-row-reverse" : ""}`}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
        {user ? <User className="h-3.5 w-3.5 text-zinc-500" /> : <Sparkles className="h-3.5 w-3.5 text-zinc-400" />}
      </div>
      <div
        className={`max-w-[88%] rounded-xl border px-4 py-3 text-sm leading-relaxed ${
          user ? "border-zinc-800 bg-zinc-900 text-zinc-200" : "border-zinc-800/80 bg-zinc-900/60 text-zinc-300"
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}
