'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setError("")
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid credentials")
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-3 border p-6 rounded bg-card">
        <h1 className="text-2xl font-bold">Login</h1>
        {error && <p className="text-destructive text-sm">{error}</p>}
        <input
          placeholder="Email"
          className="w-full border p-2 bg-background rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 bg-background rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-primary-foreground p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  )
}
