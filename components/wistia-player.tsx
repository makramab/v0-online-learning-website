"use client"

import { useEffect, useRef } from "react"

interface WistiaPlayerProps {
  mediaId: string
  className?: string
}

export function WistiaPlayer({ mediaId, className = "" }: WistiaPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

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
    <div ref={containerRef} className={className}>
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
