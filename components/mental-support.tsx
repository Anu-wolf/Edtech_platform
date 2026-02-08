"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const responses = [
  "That sounds like a lot. I'm here with you.",
  "It's okay to feel this way. Want to try a short breathing exercise?",
  "You’ve been putting in effort, and that matters.",
  "Maybe a small break could help reset your focus.",
  "You're not alone in this. Let’s take one step at a time."
]

export function MentalSupport() {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (!input.trim()) return

    const reply =
      responses[Math.floor(Math.random() * responses.length)]

    setMessages([
      ...messages,
      { role: "user", text: input },
      { role: "ai", text: reply }
    ])

    setInput("")
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Your AI Companion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-64 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-primary text-white ml-auto w-fit"
                    : "bg-muted w-fit"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="How are you feeling?"
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
