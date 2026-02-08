"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

export function ZenGardenGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [pattern, setPattern] = useState<'smooth' | 'ripple' | 'rake'>('smooth')
    const [stones, setStones] = useState<{ x: number; y: number }[]>([])

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d')
            if (ctx) {
                ctx.fillStyle = '#f3e5ab' // Sand color
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            }
        }
    }, [])

    const startRaking = (e: React.MouseEvent | React.TouchEvent) => {
        // Only raking functionality for now
        rake(e)
    }

    const rake = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const rect = canvas.getBoundingClientRect()
        let x, y

        if ('touches' in e) {
            x = e.touches[0].clientX - rect.left
            y = e.touches[0].clientY - rect.top
        } else {
            // Determine if mouse is pressed
            if ((e as React.MouseEvent).buttons !== 1) return
            x = (e as React.MouseEvent).nativeEvent.offsetX
            y = (e as React.MouseEvent).nativeEvent.offsetY
        }

        ctx.strokeStyle = '#e6d593'
        ctx.lineWidth = 15
        ctx.lineCap = 'round'

        if (pattern === 'rake') {
            ctx.setLineDash([5, 15])
        } else if (pattern === 'ripple') {
            // Simple ripple effect simulation
            ctx.beginPath()
            ctx.arc(x, y, 20, 0, Math.PI * 2)
            ctx.stroke()
            return
        } else {
            ctx.setLineDash([])
        }

        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
    }

    const placeStone = () => {
        // Place a random stone
        setStones([...stones, { x: Math.random() * 500 + 50, y: Math.random() * 300 + 50 }])
    }

    const clearSand = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.fillStyle = '#f3e5ab'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        setStones([])
    }

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <h2 className="text-2xl font-bold">Zen Sand Garden</h2>

            <div className="flex gap-4">
                <Button
                    variant={pattern === 'smooth' ? "default" : "outline"}
                    onClick={() => setPattern('smooth')}
                >
                    Smooth Rake
                </Button>
                <Button
                    variant={pattern === 'rake' ? "default" : "outline"}
                    onClick={() => setPattern('rake')}
                >
                    Detailed Rake
                </Button>
                <Button
                    variant={pattern === 'ripple' ? "default" : "outline"}
                    onClick={() => setPattern('ripple')}
                >
                    Ripple
                </Button>
            </div>

            <div className="relative border-4 border-stone-300 rounded-lg shadow-inner overflow-hidden">
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    className="cursor-pointer touch-none"
                    onMouseDown={startRaking}
                    onMouseMove={rake}
                    onTouchStart={startRaking}
                    onTouchMove={rake}
                />
                {stones.map((stone, i) => (
                    <div
                        key={i}
                        className="absolute w-8 h-8 bg-stone-500 rounded-full shadow-lg"
                        style={{ left: stone.x, top: stone.y }}
                    />
                ))}
            </div>

            <div className="flex gap-4">
                <Button onClick={placeStone}>Add Stone</Button>
                <Button variant="destructive" onClick={clearSand}>Smooth Sand</Button>
            </div>
        </div>
    )
}
