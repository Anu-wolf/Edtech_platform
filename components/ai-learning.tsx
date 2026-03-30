"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import ReactMarkdown from "react-markdown"

export function AILearning() {
    const [stress, setStress] = useState(40)
    const [hours, setHours] = useState(4)
    const [confidence, setConfidence] = useState(50)
    const [result, setResult] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const generatePlan = async () => {
        setIsLoading(true)
        setResult(null)
        try {
            const res = await fetch("/api/generate-plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ stress, hours, confidence }),
            });

            if (res.ok) {
                const data = await res.json();
                setResult(data.plan);
            } else {
                setResult("Error generating plan. Make sure you are logged in.");
            }
        } catch (error) {
            setResult("Failed to connect to AI server.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="max-w-xl mx-auto border-border">
            <CardHeader>
                <CardTitle>AI Learning Path Generator</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                <div>
                    <p className="text-sm font-medium mb-2 flex justify-between">
                        <span>Stress Level</span>
                        <span className={stress > 70 ? "text-destructive" : ""}>{stress}%</span>
                    </p>
                    <Slider
                        defaultValue={[stress]}
                        max={100}
                        step={1}
                        onValueChange={(v) => setStress(v[0])}
                    />
                </div>

                <div>
                    <p className="text-sm font-medium mb-2 flex justify-between">
                        <span>Study Time</span>
                        <span>{hours} Hours</span>
                    </p>
                    <Slider
                        defaultValue={[hours]}
                        max={10}
                        step={1}
                        onValueChange={(v) => setHours(v[0])}
                    />
                </div>

                <div>
                    <p className="text-sm font-medium mb-2 flex justify-between">
                        <span>Confidence in Topic</span>
                        <span>{confidence}%</span>
                    </p>
                    <Slider
                        defaultValue={[confidence]}
                        max={100}
                        step={1}
                        onValueChange={(v) => setConfidence(v[0])}
                    />
                </div>

                <Button 
                    className="w-full bg-secondary hover:bg-secondary/90 text-primary-foreground" 
                    onClick={generatePlan} 
                    disabled={isLoading}
                >
                    {isLoading ? "Generating your perfect plan..." : "Generate AI Learning Plan"}
                </Button>

                {result && (
                    <div className="p-5 rounded-lg bg-card border text-sm prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-strong:text-secondary">
                        <ReactMarkdown>{result}</ReactMarkdown>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
