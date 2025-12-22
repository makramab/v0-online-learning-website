"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { WistiaPlayer } from "./wistia-player"
import { CourseLessonSidebar } from "./course-lesson-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Clock, Star, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useContinueLearning } from "@/contexts/continue-learning-context"
import type { Course } from "@/lib/courses-data"

interface CoursePlayerWithProgressProps {
  course: Course
  localCourseId: number
}

interface LessonInfo {
  sectionId: string
  lessonIndex: number
  title: string
  wistiaMediaId: string
  resumePosition: number
}

export function CoursePlayerWithProgress({ course, localCourseId }: CoursePlayerWithProgressProps) {
  const searchParams = useSearchParams()
  const { refreshLastActivity } = useContinueLearning()
  const [sidebarRefreshTrigger, setSidebarRefreshTrigger] = useState(0)
  const lastRefreshTimeRef = useRef(0)

  // Get initial lesson from URL or default to first lesson
  const getInitialLesson = useCallback((): LessonInfo => {
    const sectionParam = searchParams.get("section")
    const lessonParam = searchParams.get("lesson")

    if (sectionParam && lessonParam) {
      const sectionIndex = course.courseContent.findIndex((s) => s.id === sectionParam)
      const lessonIndex = parseInt(lessonParam)

      if (sectionIndex >= 0 && lessonIndex >= 0) {
        const section = course.courseContent[sectionIndex]
        if (section.lessons[lessonIndex]) {
          const lesson = section.lessons[lessonIndex]
          return {
            sectionId: sectionParam,
            lessonIndex,
            title: lesson.title,
            wistiaMediaId: lesson.wistiaId || course.wistiaMediaId,
            resumePosition: 0, // Will be fetched from progress
          }
        }
      }
    }

    // Default to first lesson
    const firstSection = course.courseContent[0]
    const firstLesson = firstSection?.lessons[0]
    return {
      sectionId: firstSection?.id || "01",
      lessonIndex: 0,
      title: firstLesson?.title || "",
      wistiaMediaId: firstLesson?.wistiaId || course.wistiaMediaId,
      resumePosition: 0,
    }
  }, [searchParams, course])

  const [currentLesson, setCurrentLesson] = useState<LessonInfo>(getInitialLesson)
  const [key, setKey] = useState(0) // Force re-mount of WistiaPlayer

  // Fetch resume position for initial lesson
  useEffect(() => {
    async function fetchResumePosition() {
      try {
        const response = await fetch(`/api/progress/course/${localCourseId}`)
        const data = await response.json()

        if (data.success && data.progress) {
          const progressKey = `${currentLesson.sectionId}-${currentLesson.lessonIndex}`
          const lessonProgress = data.progress[progressKey]

          if (lessonProgress?.lastPosition) {
            setCurrentLesson((prev) => ({
              ...prev,
              resumePosition: lessonProgress.lastPosition,
            }))
          }
        }
      } catch (error) {
        console.error("Failed to fetch resume position:", error)
      }
    }

    fetchResumePosition()
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle lesson selection
  const handleLessonSelect = (
    sectionId: string,
    lessonIndex: number,
    title: string,
    wistiaMediaId: string,
    resumePosition: number
  ) => {
    setCurrentLesson({
      sectionId,
      lessonIndex,
      title,
      wistiaMediaId,
      resumePosition,
    })
    setKey((prev) => prev + 1) // Force re-mount player

    // Update URL without navigation
    const url = new URL(window.location.href)
    url.searchParams.set("section", sectionId)
    url.searchParams.set("lesson", lessonIndex.toString())
    window.history.replaceState({}, "", url.toString())
  }

  // Handle progress update - refresh sidebar periodically (throttled to every 15 seconds)
  const handleProgressUpdate = useCallback((percentWatched: number) => {
    const now = Date.now()
    // Throttle refreshes to every 15 seconds
    if (now - lastRefreshTimeRef.current > 15000) {
      lastRefreshTimeRef.current = now
      setSidebarRefreshTrigger((prev) => prev + 1)
    }
  }, [])

  // Handle lesson completion
  const handleLessonComplete = useCallback(() => {
    // Refresh last activity context
    refreshLastActivity()
    // Refresh sidebar immediately on completion
    setSidebarRefreshTrigger((prev) => prev + 1)
  }, [refreshLastActivity])

  // Navigation helpers
  const getPreviousLesson = (): LessonInfo | null => {
    const currentSectionIndex = course.courseContent.findIndex((s) => s.id === currentLesson.sectionId)

    if (currentLesson.lessonIndex > 0) {
      const section = course.courseContent[currentSectionIndex]
      const lesson = section.lessons[currentLesson.lessonIndex - 1]
      return {
        sectionId: currentLesson.sectionId,
        lessonIndex: currentLesson.lessonIndex - 1,
        title: lesson.title,
        wistiaMediaId: lesson.wistiaId || course.wistiaMediaId,
        resumePosition: 0,
      }
    } else if (currentSectionIndex > 0) {
      const prevSection = course.courseContent[currentSectionIndex - 1]
      const lastLessonIndex = prevSection.lessons.length - 1
      const lesson = prevSection.lessons[lastLessonIndex]
      return {
        sectionId: prevSection.id,
        lessonIndex: lastLessonIndex,
        title: lesson.title,
        wistiaMediaId: lesson.wistiaId || course.wistiaMediaId,
        resumePosition: 0,
      }
    }

    return null
  }

  const getNextLesson = (): LessonInfo | null => {
    const currentSectionIndex = course.courseContent.findIndex((s) => s.id === currentLesson.sectionId)
    const currentSection = course.courseContent[currentSectionIndex]

    if (currentLesson.lessonIndex < currentSection.lessons.length - 1) {
      const lesson = currentSection.lessons[currentLesson.lessonIndex + 1]
      return {
        sectionId: currentLesson.sectionId,
        lessonIndex: currentLesson.lessonIndex + 1,
        title: lesson.title,
        wistiaMediaId: lesson.wistiaId || course.wistiaMediaId,
        resumePosition: 0,
      }
    } else if (currentSectionIndex < course.courseContent.length - 1) {
      const nextSection = course.courseContent[currentSectionIndex + 1]
      const lesson = nextSection.lessons[0]
      return {
        sectionId: nextSection.id,
        lessonIndex: 0,
        title: lesson.title,
        wistiaMediaId: lesson.wistiaId || course.wistiaMediaId,
        resumePosition: 0,
      }
    }

    return null
  }

  const previousLesson = getPreviousLesson()
  const nextLesson = getNextLesson()

  return (
    <main className="p-4 lg:p-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/courses" className="hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4 inline mr-1" />
          Kursus
        </Link>
        <span>/</span>
        <span>{course.category}</span>
        <span>/</span>
        <span className="text-foreground">{course.title.split(":")[0]}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1 min-w-0">
                <h1 className="text-2xl lg:text-4xl font-bold text-balance">{course.title}</h1>
                <div className="flex items-center gap-2 flex-wrap">
                  {course.tags.map((tag) => (
                    <Badge key={tag} className="bg-primary text-primary-foreground font-semibold text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{course.totalLessons} pelajaran</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span>
                  {course.rating} ({course.reviewCount} ulasan)
                </span>
              </div>
            </div>
          </div>

          {/* Current Lesson Title */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>Bagian {currentLesson.sectionId}</span>
              <span>•</span>
              <span>Pelajaran {currentLesson.lessonIndex + 1}</span>
            </div>
            <h2 className="font-semibold text-lg">{currentLesson.title}</h2>
          </div>

          {/* Video Player */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <WistiaPlayer
              key={key}
              mediaId={currentLesson.wistiaMediaId}
              trackProgress={true}
              localCourseId={localCourseId}
              sectionId={currentLesson.sectionId}
              lessonIndex={currentLesson.lessonIndex}
              resumePosition={currentLesson.resumePosition}
              onLessonComplete={handleLessonComplete}
              onProgressUpdate={handleProgressUpdate}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={() =>
                previousLesson &&
                handleLessonSelect(
                  previousLesson.sectionId,
                  previousLesson.lessonIndex,
                  previousLesson.title,
                  previousLesson.wistiaMediaId,
                  0
                )
              }
              disabled={!previousLesson}
              className="flex-1 sm:flex-none"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Sebelumnya</span>
              <span className="sm:hidden">Prev</span>
            </Button>

            <Button
              onClick={() =>
                nextLesson &&
                handleLessonSelect(
                  nextLesson.sectionId,
                  nextLesson.lessonIndex,
                  nextLesson.title,
                  nextLesson.wistiaMediaId,
                  0
                )
              }
              disabled={!nextLesson}
              className="flex-1 sm:flex-none bg-[#1c9af1] hover:bg-[#1580d1]"
            >
              <span className="hidden sm:inline">Selanjutnya</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <CourseLessonSidebar
              course={course}
              localCourseId={localCourseId}
              currentSectionId={currentLesson.sectionId}
              currentLessonIndex={currentLesson.lessonIndex}
              onLessonSelect={handleLessonSelect}
              refreshTrigger={sidebarRefreshTrigger}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
