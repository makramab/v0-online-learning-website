"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

interface LastActivity {
  localCourseId: number
  courseTitle: string
  courseImage: string
  sectionId: string
  lessonIndex: number
  lessonTitle: string
  lastPosition: number
  percentWatched: number
  isCompleted: boolean
  updatedAt: string
  resumeLink: string
}

interface ContinueLearningContextType {
  lastActivity: LastActivity | null
  isLoading: boolean
  error: string | null
  refreshLastActivity: () => Promise<void>
}

const ContinueLearningContext = createContext<ContinueLearningContextType | undefined>(undefined)

export function ContinueLearningProvider({ children }: { children: ReactNode }) {
  const [lastActivity, setLastActivity] = useState<LastActivity | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLastActivity = useCallback(async () => {
    try {
      const response = await fetch("/api/progress/last-activity")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch last activity")
      }

      setLastActivity(data.lastActivity)
      setError(null)
    } catch (err) {
      console.error("Failed to fetch last activity:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch")
      setLastActivity(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fetch on mount
  useEffect(() => {
    fetchLastActivity()
  }, [fetchLastActivity])

  // Refresh function for external use
  const refreshLastActivity = useCallback(async () => {
    setIsLoading(true)
    await fetchLastActivity()
  }, [fetchLastActivity])

  return (
    <ContinueLearningContext.Provider
      value={{
        lastActivity,
        isLoading,
        error,
        refreshLastActivity,
      }}
    >
      {children}
    </ContinueLearningContext.Provider>
  )
}

export function useContinueLearning() {
  const context = useContext(ContinueLearningContext)
  if (context === undefined) {
    throw new Error("useContinueLearning must be used within a ContinueLearningProvider")
  }
  return context
}
