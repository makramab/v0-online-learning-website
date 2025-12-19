'use server'

import { createClient } from '@/lib/supabase/server'
import { slugToCourseId } from '@/lib/course-mapping'
import { getCourseById, coursesData } from '@/lib/courses-data'

export interface EnrolledCourseWithProgress {
  id: number // Local course ID
  title: string
  instructor: string
  progress: number // 0-100
  enrolledDate: string
  lastAccessed: string // Relative time string
  completedLessons: number
  totalLessons: number
  estimatedTimeRemaining: string
  lastLesson: string
  status: 'in-progress' | 'completed'
  image: string
  certificateAvailable: boolean
  resumeLink: string
}

interface LessonProgress {
  section_id: string
  lesson_index: number
  is_completed: boolean
  percent_watched: string
  last_position: string
  updated_at: string
}

/**
 * Format relative time in Indonesian
 */
function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffWeeks = Math.floor(diffDays / 7)

  if (diffMins < 1) return 'Baru saja'
  if (diffMins < 60) return `${diffMins} menit lalu`
  if (diffHours < 24) return `${diffHours} jam lalu`
  if (diffDays === 1) return 'Kemarin'
  if (diffDays < 7) return `${diffDays} hari lalu`
  if (diffWeeks === 1) return '1 minggu lalu'
  if (diffWeeks < 4) return `${diffWeeks} minggu lalu`

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Parse duration string to minutes (e.g., "6 jam" -> 360)
 */
function parseDurationToMinutes(duration: string): number {
  const hoursMatch = duration.match(/(\d+(?:\.\d+)?)\s*jam/i)
  const minsMatch = duration.match(/(\d+)\s*menit/i)

  let totalMinutes = 0
  if (hoursMatch) totalMinutes += parseFloat(hoursMatch[1]) * 60
  if (minsMatch) totalMinutes += parseInt(minsMatch[1], 10)

  return totalMinutes
}

/**
 * Format minutes to Indonesian time string
 */
function formatMinutesToTime(minutes: number): string {
  if (minutes <= 0) return '0 menit'

  const hours = Math.floor(minutes / 60)
  const mins = Math.round(minutes % 60)

  if (hours > 0 && mins > 0) {
    return `${hours} jam ${mins} menit`
  }
  if (hours > 0) {
    return `${hours} jam`
  }
  return `${mins} menit`
}

/**
 * Get all enrolled courses with progress for the current user
 */
export async function getEnrolledCoursesWithProgress(): Promise<{
  courses: EnrolledCourseWithProgress[]
  error: string | null
}> {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { courses: [], error: 'Not authenticated' }
    }

    // Get paid enrollments with course info
    const { data: enrollments, error: enrollmentsError } = await supabase
      .from('enrollments')
      .select(
        `
        id,
        course_id,
        purchased_at,
        courses:course_id (
          id,
          slug,
          title
        )
      `
      )
      .eq('user_id', user.id)
      .eq('payment_status', 'paid')
      .order('purchased_at', { ascending: false })

    if (enrollmentsError) {
      console.error('Failed to fetch enrollments:', enrollmentsError)
      return { courses: [], error: 'Failed to fetch enrollments' }
    }

    if (!enrollments || enrollments.length === 0) {
      return { courses: [], error: null }
    }

    // Get all course IDs for progress lookup
    const courseIds = enrollments.map((e) => e.course_id)

    // Fetch all progress records for enrolled courses
    const { data: progressRecords, error: progressError } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', user.id)
      .in('course_id', courseIds)

    if (progressError) {
      console.error('Failed to fetch progress:', progressError)
    }

    // Group progress by course
    const progressByCourse: Record<string, LessonProgress[]> = {}
    for (const record of progressRecords || []) {
      if (!progressByCourse[record.course_id]) {
        progressByCourse[record.course_id] = []
      }
      progressByCourse[record.course_id].push(record)
    }

    // Build enrolled courses with progress
    const coursesWithProgress: EnrolledCourseWithProgress[] = []

    for (const enrollment of enrollments) {
      const course = enrollment.courses as {
        id: string
        slug: string
        title: string
      }

      // Get local course ID from slug
      const localCourseId = slugToCourseId[course.slug]
      if (!localCourseId) continue

      // Get local course data
      const localCourse = getCourseById(localCourseId)
      if (!localCourse) continue

      // Calculate progress stats
      const courseProgress = progressByCourse[course.id] || []

      // Calculate total lessons
      const totalLessons = localCourse.courseContent.reduce(
        (total, section) => total + section.lessons.length,
        0
      )

      // Calculate completed lessons
      const completedLessons = courseProgress.filter((p) => p.is_completed).length

      // Calculate overall progress percentage
      const progressPercent =
        totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

      // Find the most recent progress
      const sortedProgress = [...courseProgress].sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      const lastProgressRecord = sortedProgress[0]

      // Get last accessed time
      const lastAccessedDate = lastProgressRecord
        ? new Date(lastProgressRecord.updated_at)
        : enrollment.purchased_at
        ? new Date(enrollment.purchased_at)
        : new Date()

      // Get last lesson title
      let lastLessonTitle = 'Belum dimulai'
      let resumeLink = `/courses/${localCourseId}`

      if (lastProgressRecord) {
        const section = localCourse.courseContent.find(
          (s) => s.id === lastProgressRecord.section_id
        )
        const lesson = section?.lessons[lastProgressRecord.lesson_index]
        if (lesson) {
          lastLessonTitle = lesson.title
          resumeLink = `/courses/${localCourseId}?section=${lastProgressRecord.section_id}&lesson=${lastProgressRecord.lesson_index}`
        }
      }

      // If course is completed
      if (progressPercent === 100) {
        lastLessonTitle = 'Selesai'
      }

      // Calculate estimated time remaining
      const totalDurationMinutes = parseDurationToMinutes(localCourse.duration)
      const remainingMinutes = Math.round(
        totalDurationMinutes * ((100 - progressPercent) / 100)
      )
      const estimatedTimeRemaining = formatMinutesToTime(remainingMinutes)

      // Determine status
      const status: 'in-progress' | 'completed' =
        progressPercent >= 100 ? 'completed' : 'in-progress'

      coursesWithProgress.push({
        id: localCourseId,
        title: localCourse.title,
        instructor: localCourse.instructor,
        progress: progressPercent,
        enrolledDate: enrollment.purchased_at || new Date().toISOString(),
        lastAccessed: formatRelativeTime(lastAccessedDate),
        completedLessons,
        totalLessons,
        estimatedTimeRemaining,
        lastLesson: lastLessonTitle,
        status,
        image: localCourse.image,
        certificateAvailable: status === 'completed',
        resumeLink,
      })
    }

    // Sort: in-progress first (by last accessed), then completed
    coursesWithProgress.sort((a, b) => {
      if (a.status === 'in-progress' && b.status === 'completed') return -1
      if (a.status === 'completed' && b.status === 'in-progress') return 1
      return 0
    })

    return { courses: coursesWithProgress, error: null }
  } catch (error) {
    console.error('Error fetching enrolled courses:', error)
    return { courses: [], error: 'An unexpected error occurred' }
  }
}

/**
 * Get overall learning stats for the user
 */
export async function getLearningStats(): Promise<{
  totalCourses: number
  inProgressCount: number
  completedCount: number
  overallProgress: number
  totalLessonsCompleted: number
  totalLessons: number
  error: string | null
}> {
  const { courses, error } = await getEnrolledCoursesWithProgress()

  if (error) {
    return {
      totalCourses: 0,
      inProgressCount: 0,
      completedCount: 0,
      overallProgress: 0,
      totalLessonsCompleted: 0,
      totalLessons: 0,
      error,
    }
  }

  const totalCourses = courses.length
  const inProgressCount = courses.filter((c) => c.status === 'in-progress').length
  const completedCount = courses.filter((c) => c.status === 'completed').length

  const totalLessonsCompleted = courses.reduce(
    (sum, c) => sum + c.completedLessons,
    0
  )
  const totalLessons = courses.reduce((sum, c) => sum + c.totalLessons, 0)

  const overallProgress =
    totalCourses > 0
      ? Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / totalCourses)
      : 0

  return {
    totalCourses,
    inProgressCount,
    completedCount,
    overallProgress,
    totalLessonsCompleted,
    totalLessons,
    error: null,
  }
}
