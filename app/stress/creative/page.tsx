'use client'

import { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CreativeRelaxPage() {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [drawing, setDrawing] = useState(false)
  const [color, setColor] = useState("#6B8EFF")
  const [brush, setBrush] = useState(6)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }, [])

  const startDraw = (e: any) => {
    setDrawing(true)
    draw(e)
  }

  const endDraw = () => setDrawing(false)

  const draw = (e: any) => {
    if (!drawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    ctx.strokeStyle = color
    ctx.lineWidth = brush
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="fixed inset-0 bg-[#0f1220] text-white">
      
      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between bg-white/10 backdrop-blur-lg rounded-xl px-4 py-3">
        <p className="text-sm opacity-80">
          Create freely. There is no right or wrong here.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30"
        >
          Exit Calmly
        </button>
      </div>

      {/* Tools */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-4 bg-white/10 backdrop-blur-lg rounded-2xl px-5 py-3">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8 rounded-full border-none"
        />

        <input
          type="range"
          min={2}
          max={20}
          value={brush}
          onChange={(e) => setBrush(Number(e.target.value))}
        />

        <button
          onClick={clearCanvas}
          className="text-sm bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30"
        >
          Clear
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onMouseDown={startDraw}
        onMouseUp={endDraw}
        onMouseMove={draw}
        onMouseLeave={endDraw}
      />
    </div>
  )
}
