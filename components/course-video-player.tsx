"use client"

import { WistiaPlayer } from "./wistia-player"

interface CourseVideoPlayerProps {
  wistiaMediaId: string
}

export function CourseVideoPlayer({ wistiaMediaId }: CourseVideoPlayerProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg">
      <WistiaPlayer mediaId={wistiaMediaId} />
    </div>
  )
}
