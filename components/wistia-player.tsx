"use client"

import { useEffect, useRef } from "react"
import { useWistiaProgress } from "@/hooks/use-wistia-progress"

interface WistiaPlayerProps {
  mediaId: string
  className?: string
  // Progress tracking props (optional)
  trackProgress?: boolean
  localCourseId?: number
  sectionId?: string
  lessonIndex?: number
  resumePosition?: number
  onLessonComplete?: () => void
  onProgressUpdate?: (percentWatched: number) => void
}

export function WistiaPlayer({
  mediaId,
  className = "",
  trackProgress = false,
  localCourseId,
  sectionId,
  lessonIndex,
  resumePosition = 0,
  onLessonComplete,
  onProgressUpdate,
}: WistiaPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Use progress tracking hook if enabled
  const { isReady, percentWatched, seekTo } = useWistiaProgress({
    mediaId,
    localCourseId: localCourseId || 0,
    sectionId: sectionId || "",
    lessonIndex: lessonIndex || 0,
    resumePosition,
    onComplete: onLessonComplete,
    onProgressUpdate,
    enabled: trackProgress && !!localCourseId && !!sectionId && lessonIndex !== undefined,
  })

  useEffect(() => {
    // Load Wistia player script
    const playerScript = document.createElement("script")
    playerScript.src = "https://fast.wistia.com/player.js"
    playerScript.async = true
    document.head.appendChild(playerScript)

    // Load Wistia embed script for this specific media
    const embedScript = document.createElement("script")
    embedScript.src = `https://fast.wistia.com/embed/${mediaId}.js`
    embedScript.async = true
    embedScript.type = "module"
    document.head.appendChild(embedScript)

    // Cleanup function
    return () => {
      // Remove scripts on unmount to prevent duplicates
      if (playerScript.parentNode) {
        playerScript.parentNode.removeChild(playerScript)
      }
      if (embedScript.parentNode) {
        embedScript.parentNode.removeChild(embedScript)
      }
    }
  }, [mediaId])

  return (
    <div ref={containerRef} className={className} data-progress-ready={isReady} data-percent-watched={percentWatched}>
      <style dangerouslySetInnerHTML={{
        __html: `
          wistia-player[media-id='${mediaId}']:not(:defined) {
            background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
            display: block;
            filter: blur(5px);
            padding-top: 56.25%;
          }
        `
      }} />
      <wistia-player media-id={mediaId} aspect="1.7777777777777777"></wistia-player>
    </div>
  )
}

// Export types for external use
export type { WistiaPlayerProps }
