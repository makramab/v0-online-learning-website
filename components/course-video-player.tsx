"use client"

import { Play } from "lucide-react"
import Image from "next/image"

export function CourseVideoPlayer() {
  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted shadow-lg group cursor-pointer">
      <Image src="/instructor-teaching-figma-design.jpg" alt="Course video" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
        <button className="w-20 h-20 rounded-full bg-primary hover:bg-primary/90 transition-all flex items-center justify-center shadow-2xl group-hover:scale-110">
          <Play className="w-8 h-8 text-primary-foreground fill-current ml-1" />
        </button>
      </div>
    </div>
  )
}
