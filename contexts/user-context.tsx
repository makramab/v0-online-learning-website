"use client"

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface UserContextType {
  user: User | null
  isLoading: boolean
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const fetchUser = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    } catch (error) {
      console.error("Error fetching user:", error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [supabase.auth])

  const refreshUser = useCallback(async () => {
    setIsLoading(true)
    await fetchUser()
  }, [fetchUser])

  useEffect(() => {
    fetchUser()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          setUser(session?.user ?? null)
        } else if (event === "SIGNED_OUT") {
          setUser(null)
        } else if (event === "USER_UPDATED") {
          // Refetch to get latest user_metadata
          await fetchUser()
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [fetchUser, supabase.auth])

  return (
    <UserContext.Provider value={{ user, isLoading, refreshUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

// Helper function to get user display name
export function getUserDisplayName(user: User | null): string {
  if (!user) return ""
  return user.user_metadata?.full_name || user.email?.split("@")[0] || "User"
}

// Helper function to get user initials
export function getUserInitials(user: User | null): string {
  if (!user) return "?"

  const fullName = user.user_metadata?.full_name
  if (fullName) {
    const names = fullName.trim().split(" ")
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return fullName.substring(0, 2).toUpperCase()
  }

  // Fallback to email
  const email = user.email
  if (email) {
    return email.substring(0, 2).toUpperCase()
  }

  return "U"
}

// Helper function to get avatar URL
export function getUserAvatarUrl(user: User | null): string | null {
  if (!user) return null
  return user.user_metadata?.avatar_url || null
}
