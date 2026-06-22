import { Card } from "../ui"

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <Card className="mx-auto max-w-md text-center">
      {Icon && (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950">
          <Icon className="h-5 w-5 text-zinc-500" />
        </div>
      )}
      <h3 className="text-base font-medium text-white">{title}</h3>
      {description && <p className="mt-2 text-sm text-zinc-500">{description}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </Card>
  )
}
