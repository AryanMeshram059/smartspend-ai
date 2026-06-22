import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal, Button, Input } from "../ui"
import { categories } from "@/constants/categories"

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  category: z.string().min(1, "Category is required"),
  type: z.enum(["expense", "income"]),
  transaction_date: z.string().min(1, "Date is required"),
})

export default function AddTransactionModal({ open, onClose, onSubmit, initialData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      title: "",
      amount: "",
      category: categories[0],
      type: "expense",
      transaction_date: new Date().toISOString().split("T")[0],
    },
  })

  const submit = async (data) => {
    await onSubmit(data)
    reset()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={initialData ? "Edit Transaction" : "Add Transaction"}>
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <Input label="Title" error={errors.title?.message} {...register("title")} />
        <Input label="Amount" type="number" error={errors.amount?.message} {...register("amount")} />
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">Category</label>
          <select
            {...register("category")}
            className="h-11 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 text-sm text-white outline-none focus:border-zinc-600"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-400">Type</label>
          <select
            {...register("type")}
            className="h-11 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 text-sm text-white outline-none focus:border-zinc-600"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <Input label="Date" type="date" error={errors.transaction_date?.message} {...register("transaction_date")} />
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="accent" className="flex-1" disabled={isSubmitting}>
            {initialData ? "Save" : "Add"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
