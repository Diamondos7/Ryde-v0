export interface User {
  id: string
  fullName: string
  username: string
  email: string
  phone: string
  location: string
  gender: string
  profileImage?: string
  joinDate: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
}

// Simulate user database
const USERS_KEY = "myryde_users"
const CURRENT_USER_KEY = "myryde_current_user"

export const authService = {
  // Register new user
  register: async (
    userData: Omit<User, "id" | "joinDate">,
  ): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]")

      // Check if user already exists
      const existingUser = users.find((u: User) => u.email === userData.email || u.username === userData.username)
      if (existingUser) {
        return { success: false, error: "User already exists with this email or username" }
      }

      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        joinDate: new Date().toISOString(),
      }

      users.push(newUser)
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser))

      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, error: "Registration failed" }
    }
  },

  // Login user
  login: async (
    emailOrUsername: string,
    password: string,
  ): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]")
      const user = users.find((u: User) => u.email === emailOrUsername || u.username === emailOrUsername)

      if (!user) {
        return { success: false, error: "User not found" }
      }

      // In a real app, you'd verify the password hash
      // For demo purposes, we'll assume login is successful
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
      return { success: true, user }
    } catch (error) {
      return { success: false, error: "Login failed" }
    }
  },

  // Get current user
  getCurrentUser: (): User | null => {
    try {
      const userStr = localStorage.getItem(CURRENT_USER_KEY)
      return userStr ? JSON.parse(userStr) : null
    } catch {
      return null
    }
  },

  // Update user profile
  updateProfile: async (
    userId: string,
    updates: Partial<User>,
  ): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]")
      const userIndex = users.findIndex((u: User) => u.id === userId)

      if (userIndex === -1) {
        return { success: false, error: "User not found" }
      }

      const updatedUser = { ...users[userIndex], ...updates }
      users[userIndex] = updatedUser

      localStorage.setItem(USERS_KEY, JSON.stringify(users))
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))

      return { success: true, user: updatedUser }
    } catch (error) {
      return { success: false, error: "Profile update failed" }
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY)
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(CURRENT_USER_KEY)
  },
}
