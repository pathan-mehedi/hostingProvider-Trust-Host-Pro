"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AuthStorage } from "@/lib/auth-storage"

interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  user_type: "client" | "admin"
  created_at: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Initialize default admin on app start
    AuthStorage.initialize()

    // Check for existing user on mount
    const currentUser = AuthStorage.getCurrentUser()
    setUser(currentUser)
    setLoading(false)

    // Redirect logic based on authentication state
    if (currentUser) {
      // If user is logged in and on auth pages, redirect to dashboard
      if (pathname === "/auth/login" || pathname === "/auth/register") {
        const dashboardPath = currentUser.user_type === "admin" ? "/dashboard/admin" : "/dashboard/client"
        router.push(dashboardPath)
      }
    } else {
      // If user is not logged in and on protected pages, redirect to login
      if (pathname.startsWith("/dashboard")) {
        router.push("/auth/login")
      }
    }
  }, [pathname, router])

  const signIn = async (email: string, password: string) => {
    try {
      const result = AuthStorage.loginUser(email, password)

      if (result.success && result.user) {
        setUser(result.user)
        AuthStorage.setCurrentUser(result.user)

        // Redirect to appropriate dashboard
        const dashboardPath = result.user.user_type === "admin" ? "/dashboard/admin" : "/dashboard/client"
        router.push(dashboardPath)

        return { error: null }
      } else {
        return { error: { message: result.error || "Login failed" } }
      }
    } catch (error) {
      return { error: { message: "An unexpected error occurred" } }
    }
  }

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    try {
      const result = AuthStorage.registerUser(email, password, userData)

      if (result.success && result.user) {
        setUser(result.user)
        AuthStorage.setCurrentUser(result.user)

        // Redirect to client dashboard (new users are always clients)
        router.push("/dashboard/client")

        return { error: null }
      } else {
        return { error: { message: result.error || "Registration failed" } }
      }
    } catch (error) {
      return { error: { message: "An unexpected error occurred" } }
    }
  }

  const signOut = async () => {
    setUser(null)
    AuthStorage.setCurrentUser(null)
    router.push("/auth/login")
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) {
      return { error: { message: "No user logged in" } }
    }

    try {
      const result = AuthStorage.updateUser(user.id, updates)

      if (result.success && result.user) {
        setUser(result.user)
        return { error: null }
      } else {
        return { error: { message: result.error || "Update failed" } }
      }
    } catch (error) {
      return { error: { message: "An unexpected error occurred" } }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
