"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function RelaxGame() {
  const [score, setScore] = useState(0)

  const bubbles = Array.from({ length: 12 })

  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold mb-4">Pop the Bubbles</h2>
      <p className="mb-6 text-muted-foreground">
        A simple relaxing activity.
      </p>

      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {bubbles.map((_, i) => (
          <Button
            key={i}
            className="h-16 rounded-full"
            onClick={() => setScore(score + 1)}
          >
            •
          </Button>
        ))}
      </div>

      <p className="mt-6 text-lg">Score: {score}</p>
    </div>
  )
}
