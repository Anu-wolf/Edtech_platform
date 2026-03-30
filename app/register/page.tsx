'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError("")

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });

    if (res.ok) {
      router.push("/login")
    } else {
      const data = await res.json();
      setError(data.message || "Something went wrong")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-3 border p-6 rounded bg-card"
      >
        <h1 className="text-2xl font-bold">Create Account</h1>
        {error && <p className="text-destructive text-sm">{error}</p>}

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-2 bg-background rounded"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 bg-background rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 bg-background rounded"
        />

        <input
          name="phone"
          placeholder="Phone (Optional)"
          onChange={handleChange}
          className="w-full border p-2 bg-background rounded"
        />

        <input
          name="dob"
          type="date"
          onChange={handleChange}
          className="w-full border p-2 bg-background text-muted-foreground rounded"
        />

        <button className="w-full bg-primary text-primary-foreground p-2 rounded">
          Register
        </button>
      </form>
    </div>
  )
}
