import { Search } from "lucide-react"
import { categories } from "@/constants/categories"
import { Card } from "../ui"

const fieldClass =
  "h-11 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm text-white outline-none focus:border-zinc-600"

export default function TransactionFilters({ search, onSearch, category, onCategory, type, onType }) {
  return (
    <Card className="w-full">
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto]">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search…"
            className={`${fieldClass} pl-10`}
          />
        </div>
        <select value={category} onChange={(e) => onCategory(e.target.value)} className={fieldClass}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select value={type} onChange={(e) => onType(e.target.value)} className={fieldClass}>
          <option value="">All types</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
    </Card>
  )
}
