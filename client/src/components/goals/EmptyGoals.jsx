import React from "react"

export default function EmptyGoals({
  onCreate,
}) {
  return (
    <div className="border border-dashed border-zinc-800 rounded-2xl py-20 flex flex-col items-center">

      <div className="text-5xl mb-4">
        🎯
      </div>

      <h2 className="text-xl font-semibold">
        No Goals Yet
      </h2>

      <p className="text-zinc-500 mt-2">
        Start saving for something
        exciting.
      </p>

      <button
        onClick={onCreate}
        className="mt-6 bg-[#E0D206] text-black px-5 py-2 rounded-xl font-medium hover:brightness-110"
      >
        Create Goal
      </button>

    </div>
  )
}