import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { X } from "lucide-react"
import { categories } from "../../constants/categories"

export default function TransactionModal({ open, onClose, onSubmit, initial, loading }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    if (open) {
      reset(initial || {
        type: "expense",
        category: "Food",
        is_recurring: false,
        transaction_date: new Date().toISOString().split("T")[0],
      })
    }
  }, [open, initial, reset])

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold">{initial?.id ? "Edit Transaction" : "Add Custom Log"}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">Type</label>
            <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E0D206]/50 cursor-pointer transition-colors"
              {...register("type", { required: true })}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">Amount (₹)</label>
            <input type="number" placeholder="0"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E0D206]/50 transition-colors"
              {...register("amount", { required: "Amount required", min: { value: 1, message: "Must be > 0" } })} />
            {errors.amount && <p className="text-xs text-red-400 mt-1 font-mono">{errors.amount.message}</p>}
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">Category</label>
            <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E0D206]/50 cursor-pointer transition-colors"
              {...register("category", { required: true })}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">Note (optional)</label>
            <input placeholder="e.g. Lunch at Zomato"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E0D206]/50 transition-colors"
              {...register("note")} />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">Date</label>
            <input type="date"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E0D206]/50 transition-colors"
              {...register("transaction_date", { required: "Date required" })} />
            {errors.transaction_date && <p className="text-xs text-red-400 mt-1 font-mono">{errors.transaction_date.message}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="recurring" className="accent-[#E0D206]" {...register("is_recurring")} />
            <label htmlFor="recurring" className="text-xs font-mono text-zinc-400">Recurring transaction</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-sm text-zinc-300 hover:text-white transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 px-4 py-2.5 bg-[#7F7933] hover:bg-[#E0D206] text-white hover:text-black rounded-xl text-sm font-medium transition-all disabled:opacity-50">
              {loading ? "Saving..." : initial?.id ? "Save changes" : "Add Log"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
