import { Send, Mic } from "lucide-react"
import { Button } from "../ui"

export default function ChatInput({ value, onChange, onSubmit, onVoice, loading }) {
  const submit = (e) => {
    e.preventDefault()
    if (value.trim()) onSubmit(value.trim())
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-950/90 p-3 sm:flex-row sm:items-end">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask about spending, budgets, or add an expense…"
          rows={2}
          className="min-h-[44px] flex-1 resize-none bg-transparent px-1 text-sm text-white placeholder:text-zinc-600 outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              submit(e)
            }
          }}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onVoice} className="!px-3" aria-label="Voice">
            <Mic className="h-4 w-4" />
          </Button>
          <Button type="submit" variant="accent" size="sm" disabled={loading || !value.trim()} className="!px-3" aria-label="Send">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  )
}
