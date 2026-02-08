"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

interface Lantern {
    id: number
    text: string
    x: number
    y: number
}

export function LanternGame() {
    const [worry, setWorry] = useState("")
    const [lanterns, setLanterns] = useState<Lantern[]>([])

    const releaseLantern = () => {
        if (!worry.trim()) return

        const newLantern: Lantern = {
            id: Date.now(),
            text: worry,
            x: Math.random() * 80 + 10, // 10% - 90%
            y: 100 // Start at bottom
        }

        setLanterns(prev => [...prev, newLantern])
        setWorry("")

        // Animate lantern floating away
        setTimeout(() => {
            setLanterns(prev => prev.filter(l => l.id !== newLantern.id))
        }, 8000)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[600px] bg-gradient-to-b from-indigo-950 to-purple-900 p-6 relative overflow-hidden text-center rounded-xl">

            {/* Stars */}
            <div className="absolute inset-0 z-0">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full opacity-70 animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3}px`,
                            height: `${Math.random() * 3}px`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="z-10 w-full max-w-md space-y-8">
                <h1 className="text-3xl font-serif text-amber-100 drop-shadow-lg">Let It Go</h1>
                <p className="text-indigo-200">
                    Write down what's troubling you, and release it into the night sky.
                </p>

                <div className="flex items-center gap-2">
                    <Input
                        value={worry}
                        onChange={(e) => setWorry(e.target.value)}
                        placeholder="I am worried about..."
                        className="bg-white/10 border-indigo-500/50 text-white placeholder:text-indigo-300 backdrop-blur-sm"
                        onKeyDown={(e) => e.key === 'Enter' && releaseLantern()}
                    />
                    <Button
                        onClick={releaseLantern}
                        className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold"
                    >
                        Release
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {lanterns.map((lantern) => (
                    <motion.div
                        key={lantern.id}
                        initial={{ opacity: 0, y: 100, scale: 0.5 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            y: -500,
                            scale: 1,
                            x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 8, ease: "easeOut" }}
                        className="absolute z-20 flex flex-col items-center"
                        style={{ left: `${lantern.x}%`, bottom: '10%' }}
                    >
                        <div className="relative w-16 h-20 bg-gradient-to-t from-orange-400 to-amber-200 rounded-t-xl rounded-b-md shadow-[0_0_30px_rgba(251,191,36,0.6)] opacity-90 animate-float flex items-center justify-center p-1">
                            <span className="text-[8px] text-amber-900 font-serif leading-tight text-center overflow-hidden line-clamp-3 w-full px-1 opacity-70">
                                {lantern.text}
                            </span>
                            <div className="absolute -bottom-1 w-full flex justify-center space-x-2">
                                <div className="w-1 h-3 bg-white blur-[2px] animate-flicker" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
