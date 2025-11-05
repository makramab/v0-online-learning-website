"use client"

import { Play } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface CourseVideoPlayerProps {
  youtubeVideoId: string
}

export function CourseVideoPlayer({ youtubeVideoId }: CourseVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`

  if (isPlaying) {
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
        <iframe
          src={embedUrl}
          title="Course video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  return (
    <div
      className="relative aspect-video rounded-2xl overflow-hidden bg-muted shadow-lg group cursor-pointer"
      onClick={() => setIsPlaying(true)}
    >
      <Image
        src={thumbnailUrl}
        alt="Course video thumbnail"
        fill
        className="object-cover"
        unoptimized
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
        <button className="w-20 h-20 rounded-full bg-primary hover:bg-primary/90 transition-all flex items-center justify-center shadow-2xl group-hover:scale-110">
          <Play className="w-8 h-8 text-primary-foreground fill-current ml-1" />
        </button>
      </div>
    </div>
  )
}
