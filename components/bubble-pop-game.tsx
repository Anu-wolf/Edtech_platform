"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

interface Bubble {
    id: number
    x: number
    y: number
    size: number
    color: string
    speed: number
}

export function BubblePopGame() {
    const [score, setScore] = useState(0)
    const [bubbles, setBubbles] = useState<Bubble[]>([])
    const containerRef = useRef<HTMLDivElement>(null)

    const colors = [
        "bg-blue-300", "bg-purple-300", "bg-pink-300", "bg-green-300", "bg-yellow-300"
    ]

    // Spawn bubbles
    useEffect(() => {
        const interval = setInterval(() => {
            spawnBubble()
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    // Update bubble positions
    useEffect(() => {
        const animationFrame = requestAnimationFrame(() => {
            setBubbles(prev =>
                prev
                    .map(b => ({ ...b, y: b.y - b.speed })) // Move up
                    .filter(b => b.y + b.size > -50) // Remove if off screen
            )
        })
        return () => cancelAnimationFrame(animationFrame)
    }) // Run on every render

    const spawnBubble = () => {
        if (!containerRef.current) return
        const width = containerRef.current.clientWidth

        const newBubble: Bubble = {
            id: Date.now() + Math.random(),
            x: Math.random() * (width - 60), // Keep within bounds
            y: 500, // Start below view
            size: Math.random() * 40 + 40, // 40-80px
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 1.5 + 0.5
        }

        setBubbles(prev => [...prev, newBubble])
    }

    const popBubble = (id: number) => {
        // Play sound effect (optional)
        // const audio = new Audio('/pop.mp3')
        // audio.play().catch(() => {}) 

        setScore(s => s + 1)
        setBubbles(prev => prev.filter(b => b.id !== id))
    }

    return (
        <div className="flex flex-col items-center gap-6 p-6 h-screen max-h-[800px] overflow-hidden">
            <div className="text-center z-10">
                <h2 className="text-3xl font-bold text-primary">Stress Release Bubbles</h2>
                <p className="text-muted-foreground">Pop the bubbles to release tension.</p>
                <div className="mt-2 text-2xl font-mono bg-white/50 px-4 py-1 rounded-full shadow-sm inline-block">
                    Popped: {score}
                </div>
            </div>

            <div
                ref={containerRef}
                className="relative w-full max-w-2xl h-[500px] border-2 border-sky-100 bg-sky-50/30 rounded-3xl overflow-hidden shadow-lg"
            >
                {bubbles.map(bubble => (
                    <div
                        key={bubble.id}
                        onClick={() => popBubble(bubble.id)}
                        className={`absolute rounded-full cursor-pointer shadow-md active:scale-95 transition-transform hover:brightness-110 flex items-center justify-center opacity-80 ${bubble.color}`}
                        style={{
                            left: bubble.x,
                            top: bubble.y,
                            width: bubble.size,
                            height: bubble.size,
                        }}
                    >
                        <div className="w-[20%] h-[20%] bg-white/40 rounded-full absolute top-[15%] left-[20%]" />
                    </div>
                ))}

                {bubbles.length === 0 && (
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        Wait for bubbles...
                    </p>
                )}
            </div>

            <Button variant="outline" onClick={() => setScore(0)}>Reset Counter</Button>
        </div>
    )
}
