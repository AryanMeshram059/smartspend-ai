import { cn } from "@/lib/utils"

export default function PageContainer({ children, className = "", narrow = false }) {
  return (
    <div
      className={cn(
        "page-container mx-auto w-full space-y-10 text-center",
        narrow ? "max-w-2xl" : "max-w-5xl",
        className
      )}
    >
      {children}
    </div>
  )
}

export function PageSection({ children, className = "" }) {
  return <section className={cn("space-y-6", className)}>{children}</section>
}
