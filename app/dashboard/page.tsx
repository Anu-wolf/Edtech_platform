"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Dashboard } from "@/components/dashboard"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  // If not logged in → show entry screen
  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <h1 className="text-3xl font-bold">Welcome to Learnly</h1>
          <p className="text-muted-foreground">
            Start your stress-aware learning journey.
          </p>

          <div className="flex flex-col gap-3">
            <Link href="/login">
              <Button className="w-full">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="w-full">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Dashboard />

      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <Link href="/dashboard/mental">
          <Button className="rounded-full shadow-lg">
            Relax Mode
          </Button>
        </Link>

        <Link href="/dashboard/ai-learning">
          <Button variant="secondary" className="rounded-full shadow-lg">
            AI Learning
          </Button>
        </Link>

        <Link href="/dashboard/companion">
          <Button variant="outline" className="rounded-full shadow-lg">
            AI Companion
          </Button>
        </Link>
      </div>
    </div>
  )
}
