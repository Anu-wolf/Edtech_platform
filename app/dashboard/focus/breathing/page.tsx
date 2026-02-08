"use client"

import { useEffect, useState } from "react"

export default function BreathingPage() {
  const [time, setTime] = useState(60)
  const [videoSrc, setVideoSrc] = useState("")

  // Pick random video on load
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 10) + 1
    setVideoSrc(`/video${randomNumber}.mp4`)
  }, [])

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(timer)
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">
      {/* Background video */}
      {videoSrc && (
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Timer UI */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Breathe Slowly
        </h1>
        <p className="text-6xl font-bold">{time}s</p>
      </div>
    </div>
  )
}
