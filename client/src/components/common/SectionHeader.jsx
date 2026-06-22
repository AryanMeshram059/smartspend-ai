export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4">
      <div>
        <h2 className="text-xl font-semibold text-white sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-2 text-sm leading-relaxed text-zinc-500">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
