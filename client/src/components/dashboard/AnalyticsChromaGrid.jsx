import ChromaGrid from "../ChromaGrid"
import { buildChromaAnalytics } from "@/utils/buildChromaAnalytics"
import Reveal from "../react-bits/Reveal"

export default function AnalyticsChromaGrid({ metrics }) {
  const items = buildChromaAnalytics(metrics)

  return (
    <Reveal className="w-full">
      <div className="mx-auto w-full max-w-6xl px-0.5 [&_article]:!w-full [&_article]:!max-w-full sm:[&_article]:!max-w-[17rem] lg:[&_article]:!max-w-[18rem]">
        <ChromaGrid
          items={items}
          className="!grid !w-full !grid-cols-1 !justify-items-center !gap-3 sm:!grid-cols-2 sm:!gap-4 lg:!flex lg:!flex-wrap lg:!justify-center lg:!gap-5"
          radius={220}
          damping={0.55}
        />
      </div>
    </Reveal>
  )
}
