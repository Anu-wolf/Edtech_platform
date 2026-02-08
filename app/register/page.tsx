'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { saveUser } from "@/lib/user-storage"

export default function RegisterPage() {
  const router = useRouter()

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

  const handleSubmit = (e: any) => {
    e.preventDefault()
    saveUser(form)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-3 border p-6 rounded"
      >
        <h1 className="text-2xl font-bold">Create Account</h1>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="dob"
          type="date"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button className="w-full bg-black text-white p-2">
          Register
        </button>
      </form>
    </div>
  )
}
