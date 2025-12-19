"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  type Notification
} from "@/lib/actions/notifications"

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  isLoading: boolean
  error: string | null
  refreshNotifications: () => Promise<void>
  markAsRead: (notificationId: string) => Promise<void>
  markAllAsRead: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

/**
 * Format a timestamp into a relative time string (Indonesian)
 */
export function formatRelativeTime(timestamp: string): string {
  const now = new Date()
  const date = new Date(timestamp)
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "Baru saja"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit lalu`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} jam lalu`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays === 1) {
    return "Kemarin"
  }
  if (diffInDays < 7) {
    return `${diffInDays} hari lalu`
  }

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return `${diffInWeeks} minggu lalu`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} bulan lalu`
  }

  const diffInYears = Math.floor(diffInDays / 365)
  return `${diffInYears} tahun lalu`
}

interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const unreadCount = notifications.filter(n => !n.is_read).length

  const refreshNotifications = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    const { notifications: data, error: fetchError } = await getNotifications(20, true)

    if (fetchError) {
      setError(fetchError)
    } else {
      setNotifications(data)
    }

    setIsLoading(false)
  }, [])

  const markAsRead = useCallback(async (notificationId: string) => {
    // Optimistic update
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
    )

    const { error: updateError } = await markNotificationAsRead(notificationId)

    if (updateError) {
      // Revert on error
      await refreshNotifications()
    }
  }, [refreshNotifications])

  const markAllAsRead = useCallback(async () => {
    // Optimistic update
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))

    const { error: updateError } = await markAllNotificationsAsRead()

    if (updateError) {
      // Revert on error
      await refreshNotifications()
    }
  }, [refreshNotifications])

  // Initial fetch
  useEffect(() => {
    refreshNotifications()
  }, [refreshNotifications])

  // Optional: Poll for new notifications every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshNotifications()
    }, 60000) // 60 seconds

    return () => clearInterval(interval)
  }, [refreshNotifications])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isLoading,
        error,
        refreshNotifications,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
