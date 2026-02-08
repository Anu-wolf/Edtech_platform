"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Eraser, Paintbrush, RotateCcw, Download } from "lucide-react"

export function ColoringGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [color, setColor] = useState("#ff7eb3")
    const [isDrawing, setIsDrawing] = useState(false)
    const [brushSize, setBrushSize] = useState(5)
    const [tool, setTool] = useState<'brush' | 'eraser'>('brush')

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d')
            if (ctx) {
                ctx.lineCap = 'round'
                ctx.lineJoin = 'round'
                // Fill white background initially
                ctx.fillStyle = '#ffffff'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            }
        }
    }, [])

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDrawing(true)
        draw(e)
    }

    const stopDrawing = () => {
        setIsDrawing(false)
        const ctx = canvasRef.current?.getContext('2d')
        if (ctx) ctx.beginPath()
    }

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const rect = canvas.getBoundingClientRect()
        let x, y

        if ('touches' in e) {
            x = e.touches[0].clientX - rect.left
            y = e.touches[0].clientY - rect.top
        } else {
            x = (e as React.MouseEvent).nativeEvent.offsetX
            y = (e as React.MouseEvent).nativeEvent.offsetY
        }

        ctx.lineWidth = brushSize
        ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color

        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const downloadCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const link = document.createElement('a')
        link.download = 'my-art.png'
        link.href = canvas.toDataURL()
        link.click()
    }

    const colors = [
        "#ff7eb3", "#ff758f", "#fa5252", // Pinks/Reds
        "#ff922b", "#fab005", "#fcc419", // Oranges/Yellows
        "#82c91e", "#51cf66", "#40c057", // Greens
        "#22b8cf", "#15aabf", "#12b886", // Teals
        "#4dabf7", "#339af0", "#228be6", // Blues
        "#be4bdb", "#da77f2", "#e599f7", // Purples
        "#000000", "#868e96", "#fa5252"  // Grays/Black
    ]

    return (
        <div className="flex flex-col items-center gap-6 p-4 max-w-4xl mx-auto w-full">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-primary">Mindful Coloring</h2>
                <p className="text-muted-foreground">Express yourself freely. No mistakes, just flow.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
                {/* Controls */}
                <div className="flex flex-col gap-6 p-4 bg-card rounded-xl border shadow-sm w-full lg:w-48">

                    <div className="space-y-3">
                        <label className="text-sm font-medium">Tools</label>
                        <div className="flex gap-2">
                            <Button
                                variant={tool === 'brush' ? "default" : "outline"}
                                size="icon"
                                onClick={() => setTool('brush')}
                                title="Brush"
                            >
                                <Paintbrush h-4 w-4 />
                            </Button>
                            <Button
                                variant={tool === 'eraser' ? "default" : "outline"}
                                size="icon"
                                onClick={() => setTool('eraser')}
                                title="Eraser"
                            >
                                <Eraser h-4 w-4 />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium">Size: {brushSize}px</label>
                        <Slider
                            value={[brushSize]}
                            onValueChange={(v) => setBrushSize(v[0])}
                            max={50}
                            min={1}
                            step={1}
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium">Actions</label>
                        <div className="flex flex-col gap-2">
                            <Button variant="outline" onClick={clearCanvas} className="justify-start">
                                <RotateCcw className="mr-2 h-4 w-4" /> Clear All
                            </Button>
                            <Button variant="outline" onClick={downloadCanvas} className="justify-start">
                                <Download className="mr-2 h-4 w-4" /> Save Art
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 flex flex-col items-center gap-4 w-full">
                    <div className="relative w-full aspect-[4/3] max-w-[600px] border-2 border-dashed rounded-xl overflow-hidden bg-white shadow-sm touch-none">
                        <canvas
                            ref={canvasRef}
                            width={600}
                            height={450}
                            className="w-full h-full cursor-crosshair touch-none"
                            onMouseDown={startDrawing}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onMouseMove={draw}
                            onTouchStart={startDrawing}
                            onTouchEnd={stopDrawing}
                            onTouchMove={draw}
                        />
                    </div>

                    {/* Color Palette */}
                    <div className="flex flex-wrap justify-center gap-2 p-4 bg-card rounded-xl border max-w-[600px]">
                        {colors.map((c) => (
                            <button
                                key={c}
                                onClick={() => {
                                    setColor(c);
                                    setTool('brush');
                                }}
                                style={{ background: c }}
                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${color === c && tool === 'brush' ? 'border-primary ring-2 ring-primary/30 scale-110' : 'border-transparent'}`}
                                aria-label={`Color ${c}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
