"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, ChevronUp, Play, Star, CheckCircle2, Loader2, Circle } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { Course } from "@/lib/courses-data"

interface LessonProgress {
  percentWatched: number
  isCompleted: boolean
  lastPosition: number
  updatedAt: string
}

interface CourseProgress {
  [key: string]: LessonProgress
}

interface CourseStats {
  totalLessons: number
  completedLessons: number
  overallProgress: number
  lastWatchedLesson: {
    sectionId: string
    lessonIndex: number
    lastPosition: number
    lessonTitle: string
  } | null
}

interface CourseLessonSidebarProps {
  course: Course
  localCourseId: number
  currentSectionId: string
  currentLessonIndex: number
  onLessonSelect: (sectionId: string, lessonIndex: number, lessonTitle: string, wistiaMediaId: string, resumePosition: number) => void
  refreshTrigger?: number // Increment this to trigger a refresh
}

export function CourseLessonSidebar({
  course,
  localCourseId,
  currentSectionId,
  currentLessonIndex,
  onLessonSelect,
  refreshTrigger = 0,
}: CourseLessonSidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string>(currentSectionId)
  const [progress, setProgress] = useState<CourseProgress>({})
  const [stats, setStats] = useState<CourseStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch progress on mount, when localCourseId changes, or when refreshTrigger changes
  useEffect(() => {
    let isMounted = true

    async function fetchProgress() {
      try {
        const response = await fetch(`/api/progress/course/${localCourseId}`)
        const data = await response.json()

        if (isMounted && data.success) {
          setProgress(data.progress || {})
          setStats(data.stats || null)
        }
      } catch (error) {
        console.error("Failed to fetch progress:", error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchProgress()

    return () => {
      isMounted = false
    }
  }, [localCourseId, refreshTrigger])

  // Update expanded section when current section changes
  useEffect(() => {
    setExpandedSection(currentSectionId)
  }, [currentSectionId])

  const getProgressKey = (sectionId: string, lessonIndex: number) => `${sectionId}-${lessonIndex}`

  const getLessonProgress = (sectionId: string, lessonIndex: number): LessonProgress | undefined => {
    return progress[getProgressKey(sectionId, lessonIndex)]
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  const handleLessonClick = (sectionId: string, lessonIndex: number, lesson: { title: string; wistiaId?: string }) => {
    const lessonProgress = getLessonProgress(sectionId, lessonIndex)
    const resumePosition = lessonProgress?.lastPosition || 0
    const wistiaMediaId = lesson.wistiaId || course.wistiaMediaId

    onLessonSelect(sectionId, lessonIndex, lesson.title, wistiaMediaId, resumePosition)
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview Card */}
      <Card className="border-l-4 border-l-[#1c9af1]">
        <CardContent className="p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Progress Kursus</span>
                <span className="text-lg font-bold text-[#1c9af1]">
                  {stats?.overallProgress || 0}%
                </span>
              </div>
              <Progress value={stats?.overallProgress || 0} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{stats?.completedLessons || 0} dari {stats?.totalLessons || course.totalLessons} pelajaran</span>
                <span>selesai</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Course Content */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Konten Kursus</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {course.courseContent.map((section) => {
            const isExpanded = expandedSection === section.id

            // Calculate section progress
            const sectionLessons = section.lessons.length
            const completedInSection = section.lessons.filter((_, idx) => {
              const lessonProgress = getLessonProgress(section.id, idx)
              return lessonProgress?.isCompleted
            }).length

            return (
              <div key={section.id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedSection(isExpanded ? "" : section.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      {completedInSection === sectionLessons && sectionLessons > 0 ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <div className="relative w-5 h-5">
                          <Circle className="w-5 h-5 text-muted-foreground" />
                          {completedInSection > 0 && (
                            <div
                              className="absolute inset-0 rounded-full border-2 border-[#1c9af1]"
                              style={{
                                clipPath: `polygon(0 0, 100% 0, 100% ${(completedInSection / sectionLessons) * 100}%, 0 ${(completedInSection / sectionLessons) * 100}%)`,
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                    <span className="font-semibold text-sm truncate">
                      {section.id}: {section.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      {completedInSection}/{sectionLessons}
                    </span>
                    <span className="text-xs text-muted-foreground">{section.duration}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isExpanded && section.lessons.length > 0 && (
                  <div className="border-t bg-muted/20">
                    {section.lessons.map((lesson, index) => {
                      const lessonProgress = getLessonProgress(section.id, index)
                      const isCompleted = lessonProgress?.isCompleted || false
                      const isCurrentLesson = section.id === currentSectionId && index === currentLessonIndex
                      const watchedPercent = lessonProgress?.percentWatched || 0

                      return (
                        <button
                          key={index}
                          onClick={() => handleLessonClick(section.id, index, lesson)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors border-b last:border-b-0 text-left",
                            isCurrentLesson && "bg-[#1c9af1]/10 border-l-2 border-l-[#1c9af1]"
                          )}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                            ) : watchedPercent > 0 ? (
                              <div className="relative w-4 h-4 flex-shrink-0">
                                <Circle className="w-4 h-4 text-[#1c9af1]" />
                                <div
                                  className="absolute inset-0.5 rounded-full bg-[#1c9af1]"
                                  style={{
                                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin(watchedPercent * 2 * Math.PI)}% ${50 - 50 * Math.cos(watchedPercent * 2 * Math.PI)}%, 50% 50%)`,
                                  }}
                                />
                              </div>
                            ) : isCurrentLesson ? (
                              <Play className="w-4 h-4 text-[#1c9af1] flex-shrink-0" />
                            ) : (
                              <Play className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            )}
                            <span className={cn(
                              "text-sm truncate",
                              isCurrentLesson && "font-medium text-[#1c9af1]"
                            )}>
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                            {lesson.duration}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Instructor Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Narasumber</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="flex items-start gap-4">
            <Avatar className="w-12 h-12">
              <AvatarFallback>{getInitials(course.instructor)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
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
    </div>
  )
}
