"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = {
    role: "user" | "ai"
    text: string
}

export function AICompanion() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "ai", text: "Hey, how are you feeling today?" },
    ])
    const [input, setInput] = useState("")

    const generateReply = (text: string) => {
        const lower = text.toLowerCase()

        if (lower.includes("stress") || lower.includes("tired")) {
            return "That sounds tough. Maybe a short breathing session could help."
        }
        if (lower.includes("exam") || lower.includes("study")) {
            return "You're doing your best. Want a quick focus session plan?"
        }
        if (lower.includes("sad")) {
            return "I'm here with you. Want to try a calming activity together?"
        }

        return "I’m here for you. Tell me more."
    }

    const sendMessage = () => {
        if (!input) return

        const userMsg: Message = { role: "user", text: input }
        const aiMsg: Message = {
            role: "ai",
            text: generateReply(input),
        }

        setMessages([...messages, userMsg, aiMsg])
        setInput("")
    }

    return (
        <div className="max-w-xl mx-auto p-4 space-y-4">
            <div className="border rounded-xl p-4 h-96 overflow-y-auto space-y-3">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`p-3 rounded-lg text-sm max-w-[80%] ${msg.role === "ai"
                                ? "bg-secondary/10"
                                : "bg-primary/10 ml-auto"
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
                    placeholder="Type how you're feeling..."
                />
                <Button onClick={sendMessage}>Send</Button>
            </div>
        </div>
    )
}
