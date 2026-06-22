import { cn } from "@/lib/utils"
import Reveal from "../react-bits/Reveal"
import BlurText from "../BlurText"

export function Page({ children, className = "" }) {
  return <div className={cn("page-stack w-full", className)}>{children}</div>
}

export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <header className="page-head w-full">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-3">
        {eyebrow && (
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-600">{eyebrow}</p>
        )}
        {title && (
          <BlurText text={title} className="text-2xl font-semibold text-white sm:text-3xl" delay={25} />
        )}
        {description && (
          <p className="max-w-md text-sm leading-relaxed text-zinc-500">{description}</p>
        )}
        {action && <div className="pt-2">{action}</div>}
      </Reveal>
    </header>
  )
}

export function Section({ children, className = "", title, subtitle }) {
  return (
    <section className={cn("section-stack w-full", className)}>
      {(title || subtitle) && (
        <div className="w-full max-w-2xl text-center">
          {title && <h2 className="text-base font-semibold text-zinc-200 sm:text-lg">{title}</h2>}
          {subtitle && <p className="mt-1.5 text-sm text-zinc-500">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  )
}
