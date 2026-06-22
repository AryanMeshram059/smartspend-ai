export default function PromptSuggestions({ suggestions, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {suggestions.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200"
        >
          {prompt}
        </button>
      ))}
    </div>
  )
}
