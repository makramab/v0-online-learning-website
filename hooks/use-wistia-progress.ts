"use client"

import { useEffect, useRef, useCallback, useState } from 'react'

interface UseWistiaProgressOptions {
  mediaId: string
  localCourseId: number
  sectionId: string
  lessonIndex: number
  resumePosition?: number
  onComplete?: () => void
  onProgressUpdate?: (percentWatched: number) => void
  enabled?: boolean
}

interface WistiaPlayer {
  percentWatched: number
  secondsWatched: number
  currentTime: number
  duration: number
  state: string
  time: (seconds: number) => void
  play: () => void
  pause: () => void
  bind: (event: string, callback: (...args: unknown[]) => void) => void
  unbind: (event: string, callback?: (...args: unknown[]) => void) => void
}

interface WistiaWindow extends Window {
  _wq?: Array<{ id: string; onReady: (video: WistiaPlayer) => void }>
  Wistia?: {
    api: (mediaId: string) => WistiaPlayer | undefined
  }
}

declare const window: WistiaWindow

export function useWistiaProgress({
  mediaId,
  localCourseId,
  sectionId,
  lessonIndex,
  resumePosition = 0,
  onComplete,
  onProgressUpdate,
  enabled = true,
}: UseWistiaProgressOptions) {
  const playerRef = useRef<WistiaPlayer | null>(null)
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const hasCompletedRef = useRef(false)
  const lastSavedPercentRef = useRef(0)
  const isInitializedRef = useRef(false)

  const [isReady, setIsReady] = useState(false)
  const [percentWatched, setPercentWatched] = useState(0)

  // Save progress to server
  const saveProgress = useCallback(
    async (player: WistiaPlayer, force = false) => {
      if (!enabled) return

      const currentPercent = player.percentWatched || 0

      // Don't save if progress hasn't changed significantly (unless forced)
      if (!force && Math.abs(currentPercent - lastSavedPercentRef.current) < 0.01) {
        return
      }

      lastSavedPercentRef.current = currentPercent

      try {
        const response = await fetch('/api/progress/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            localCourseId,
            sectionId,
            lessonIndex,
            percentWatched: currentPercent,
            secondsWatched: Math.floor(player.secondsWatched || 0),
            lastPosition: player.currentTime || 0,
            videoDuration: player.duration || 0,
          }),
        })

        const data = await response.json()

        // Check if just completed
        if (data.justCompleted && !hasCompletedRef.current) {
          hasCompletedRef.current = true
          onComplete?.()
        }
      } catch (error) {
        console.error('Failed to save progress:', error)
      }
    },
    [enabled, localCourseId, sectionId, lessonIndex, onComplete]
  )

  // Handle player ready
  const onPlayerReady = useCallback(
    (video: WistiaPlayer) => {
      playerRef.current = video
      setIsReady(true)

      // Seek to resume position if provided
      if (resumePosition > 0 && !isInitializedRef.current) {
        isInitializedRef.current = true
        // Wait a moment for player to be fully ready
        setTimeout(() => {
          video.time(resumePosition)
        }, 500)
      }

      // Bind to percent watched change
      video.bind('percentwatchedchanged', (percent: number) => {
        setPercentWatched(percent)
        onProgressUpdate?.(percent)

        // Check for completion (90% threshold)
        if (percent >= 0.9 && !hasCompletedRef.current) {
          saveProgress(video, true)
        }
      })

      // Bind to pause event - save progress
      video.bind('pause', () => {
        saveProgress(video, true)
      })

      // Bind to end event - ensure final save
      video.bind('end', () => {
        saveProgress(video, true)
      })

      // Start periodic save interval (every 10 seconds)
      saveIntervalRef.current = setInterval(() => {
        if (video.state === 'playing') {
          saveProgress(video)
        }
      }, 10000)
    },
    [resumePosition, saveProgress, onProgressUpdate]
  )

  // Initialize Wistia player binding
  useEffect(() => {
    if (!enabled || !mediaId) return

    // Reset refs when mediaId changes
    hasCompletedRef.current = false
    lastSavedPercentRef.current = 0
    isInitializedRef.current = false
    setIsReady(false)
    setPercentWatched(0)

    // Try to get existing player
    const existingPlayer = window.Wistia?.api(mediaId)
    if (existingPlayer) {
      onPlayerReady(existingPlayer)
      return
    }

    // Queue up for when player is ready
    window._wq = window._wq || []
    window._wq.push({
      id: mediaId,
      onReady: onPlayerReady,
    })

    return () => {
      // Cleanup interval
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current)
        saveIntervalRef.current = null
      }

      // Final save on unmount if playing
      if (playerRef.current && playerRef.current.state === 'playing') {
        saveProgress(playerRef.current, true)
      }

      // Unbind events
      if (playerRef.current) {
        playerRef.current.unbind('percentwatchedchanged')
        playerRef.current.unbind('pause')
        playerRef.current.unbind('end')
      }
    }
  }, [mediaId, enabled, onPlayerReady, saveProgress])

  // Save on page unload
  useEffect(() => {
    if (!enabled) return

    const handleBeforeUnload = () => {
      if (playerRef.current) {
        // Use sendBeacon for reliable save on unload
        const data = JSON.stringify({
          localCourseId,
          sectionId,
          lessonIndex,
          percentWatched: playerRef.current.percentWatched || 0,
          secondsWatched: Math.floor(playerRef.current.secondsWatched || 0),
          lastPosition: playerRef.current.currentTime || 0,
          videoDuration: playerRef.current.duration || 0,
        })

        navigator.sendBeacon('/api/progress/update', data)
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [enabled, localCourseId, sectionId, lessonIndex])

  // Expose methods
  const seekTo = useCallback((seconds: number) => {
    if (playerRef.current) {
      playerRef.current.time(seconds)
    }
  }, [])

  const play = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.play()
    }
  }, [])

  const pause = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.pause()
    }
  }, [])

  return {
    isReady,
    percentWatched,
    seekTo,
    play,
    pause,
    player: playerRef.current,
  }
}
