"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown, ChevronUp, Play, Star, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import type { Course } from "@/lib/courses-data"

interface CourseContentSidebarProps {
  course: Course
}

export function CourseContentSidebar({ course }: CourseContentSidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string>("01")

  // Format price for button
  const formatPrice = (price: number) => {
    if (price === 0) return "GRATIS"
    if (price >= 1000000) {
      return `Rp ${(price / 1000000).toFixed(1).replace(".0", "")}jt`
    }
    if (price >= 1000) {
      return `Rp ${(price / 1000).toFixed(0)}rb`
    }
    return `Rp ${price.toLocaleString("id-ID")}`
  }

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Konten Kursus</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {course.courseContent.map((section) => {
            const isExpanded = expandedSection === section.id
            return (
              <div key={section.id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedSection(isExpanded ? "" : section.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">
                      {section.id}: {section.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{section.duration}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isExpanded && section.lessons.length > 0 && (
                  <div className="border-t bg-muted/20">
                    {section.lessons.map((lesson, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 cursor-pointer border-b last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          {lesson.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Play className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="text-sm">{lesson.title}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Narasumber</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-12 h-12">
              <AvatarFallback>{getInitials(course.instructor)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{course.instructor}</h4>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="font-medium">({course.rating})</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{course.instructorBio.title}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {course.instructorBio.bio[0].substring(0, 150)}...
          </p>
        </CardContent>
      </Card>

      <Button className="w-full bg-red-600 text-white hover:bg-red-700 font-semibold py-6">
        {course.price === 0 ? "Daftar Sekarang - GRATIS" : `Daftar Sekarang - ${formatPrice(course.price)}`}
      </Button>
    </div>
  )
}
