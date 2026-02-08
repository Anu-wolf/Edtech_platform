export type User = {
  name: string
  email: string
  password?: string
  theme?: "light" | "dark" | "system"
  notifications?: boolean
}

const USER_KEY = "user"

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null

  try {
    const data = localStorage.getItem(USER_KEY)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error reading user from storage:", error)
    return null
  }
}

export const saveUser = (user: User) => {
  if (typeof window === "undefined") return
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const updateUser = (updates: Partial<User>) => {
  if (typeof window === "undefined") return

  const currentUser = getUser()
  if (!currentUser) return

  const updatedUser = { ...currentUser, ...updates }
  saveUser(updatedUser)
}

export const logoutUser = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem(USER_KEY)
}
