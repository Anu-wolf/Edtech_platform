"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export function AILearning() {
    const [stress, setStress] = useState(40)
    const [hours, setHours] = useState(4)
    const [confidence, setConfidence] = useState(50)
    const [result, setResult] = useState<string | null>(null)

    const generatePlan = () => {
        if (stress > 70) {
            setResult("Light Study Mode: Short sessions + daily relaxation exercises.")
        } else if (confidence < 40) {
            setResult("Concept Builder Mode: Focus on basics with guided lessons.")
        } else if (hours < 3) {
            setResult("Micro-Learning Mode: 20-minute focused sessions.")
        } else {
            setResult("Deep Work Mode: 90-minute distraction-free study blocks.")
        }
    }

    return (
        <Card className="max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>AI Learning Path Generator</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Stress */}
                <div>
                    <p className="text-sm mb-2">Stress Level: {stress}%</p>
                    <Slider
                        defaultValue={[stress]}
                        max={100}
                        step={1}
                        onValueChange={(v) => setStress(v[0])}
                    />
                </div>

                {/* Study hours */}
                <div>
                    <p className="text-sm mb-2">Study Hours per Day: {hours}</p>
                    <Slider
                        defaultValue={[hours]}
                        max={10}
                        step={1}
                        onValueChange={(v) => setHours(v[0])}
                    />
                </div>

                {/* Confidence */}
                <div>
                    <p className="text-sm mb-2">Confidence: {confidence}%</p>
                    <Slider
                        defaultValue={[confidence]}
                        max={100}
                        step={1}
                        onValueChange={(v) => setConfidence(v[0])}
                    />
                </div>

                <Button className="w-full" onClick={generatePlan}>
                    Generate Learning Plan
                </Button>

                {result && (
                    <div className="p-4 rounded-lg bg-secondary/10 text-sm">
                        {result}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
