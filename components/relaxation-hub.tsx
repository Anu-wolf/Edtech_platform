"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const activities = [
  "Deep Breathing",
  "Guided Meditation",
  "Muscle Relaxation",
  "Calm Focus",
  "Mindful Listening",
]

export function RelaxationHub() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [videoSrc, setVideoSrc] = useState("")
  const [breathScale, setBreathScale] = useState(1)

  // Random background video
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 10) + 1
    // Assuming videos are in public folder as video1.mp4, video2.mp4...
    setVideoSrc(`/video${randomNumber}.mp4`)
  }, [])

  // Timer
  useEffect(() => {
    let interval: any
    if (isRunning) {
      interval = setInterval(() => {
        setTime((t) => t + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  // Breathing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathScale((s) => (s === 1 ? 1.4 : 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = () => {
    const mins = Math.floor(time / 60)
    const secs = time % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background video */}
      {videoSrc && (
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center">
        <h1 className="text-3xl font-bold">Relaxation Mode</h1>

        {/* Breathing Circle */}
        <div
          className="h-40 w-40 rounded-full bg-secondary/70 transition-all duration-[4000ms]"
          style={{ transform: `scale(${breathScale})` }}
        />

        <p className="text-muted-foreground">
          Breathe in… and out slowly.
        </p>

        {/* Timer */}
        <div className="text-4xl font-mono">{formatTime()}</div>

        <div className="flex gap-4">
          <Button onClick={() => setIsRunning(true)}>Start</Button>
          <Button variant="outline" onClick={() => setIsRunning(false)}>
            Pause
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              setTime(0)
              setIsRunning(false)
            }}
          >
            Reset
          </Button>
        </div>

        {/* Activities */}
        <div className="grid gap-3 sm:grid-cols-2">
          {activities.map((activity, i) => (
            <div
              key={i}
              className="rounded-xl border bg-card px-6 py-4 shadow-sm"
            >
              {activity}
            </div>
          ))}
        </div>

        {/* Mini Relax Game */}
        <div className="mt-6">
          <p className="mb-2 text-sm text-muted-foreground">
            Tap the calm bubble
          </p>
          <BubbleGame />
        </div>
      </div>
    </div>
  )
}

function BubbleGame() {
  const [score, setScore] = useState(0)
  const [pos, setPos] = useState({ x: 50, y: 50 })

  const moveBubble = () => {
    setScore((s) => s + 1)
    setPos({
      x: Math.random() * 80,
      y: Math.random() * 80,
    })
  }

  return (
    <div className="relative h-40 w-40 border rounded-xl overflow-hidden">
      <div
        onClick={moveBubble}
        className="absolute h-10 w-10 cursor-pointer rounded-full bg-secondary"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
        }}
      />
      <p className="absolute bottom-1 left-1 text-xs">
        Score: {score}
      </p>
    </div>
  )
}
