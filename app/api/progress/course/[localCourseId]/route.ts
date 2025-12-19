import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { courseIdToSlug } from '@/lib/course-mapping'
import { getCourseById } from '@/lib/courses-data'

/**
 * Get all lesson progress for a course
 *
 * GET /api/progress/course/[localCourseId]
 *
 * Returns:
 * {
 *   progress: {
 *     [sectionId-lessonIndex]: {
 *       percentWatched: number,
 *       isCompleted: boolean,
 *       lastPosition: number,
 *     }
 *   },
 *   stats: {
 *     totalLessons: number,
 *     completedLessons: number,
 *     overallProgress: number,
 *     lastWatchedLesson: { sectionId, lessonIndex, lastPosition } | null,
 *   }
 * }
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ localCourseId: string }> }
) {
  try {
    const { localCourseId: localCourseIdStr } = await params
    const localCourseId = parseInt(localCourseIdStr, 10)

    if (isNaN(localCourseId)) {
      return NextResponse.json(
        { error: 'Invalid course ID' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Get database course ID from local course ID
    const courseSlug = courseIdToSlug[localCourseId]
    if (!courseSlug) {
      return NextResponse.json(
        { error: 'Invalid course ID' },
        { status: 400 }
      )
    }

    // Get course UUID from slug
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('id')
      .eq('slug', courseSlug)
      .single()

    if (courseError || !course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    // Get local course data to calculate total lessons
    const localCourseData = getCourseById(localCourseId)
    if (!localCourseData) {
      return NextResponse.json(
        { error: 'Course data not found' },
        { status: 404 }
      )
    }

    // Calculate total lessons from local data
    const totalLessons = localCourseData.courseContent.reduce(
      (total, section) => total + section.lessons.length,
      0
    )

    // Fetch all progress for this course
    const { data: progressRecords, error: progressError } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('course_id', course.id)
      .order('updated_at', { ascending: false })

    if (progressError) {
      console.error('Failed to fetch progress:', progressError)
      return NextResponse.json(
        { error: 'Failed to fetch progress' },
        { status: 500 }
      )
    }

    // Build progress map
    const progressMap: Record<
      string,
      {
        percentWatched: number
        isCompleted: boolean
        lastPosition: number
        updatedAt: string
      }
    > = {}

    let completedLessons = 0
    let lastWatchedLesson: {
      sectionId: string
      lessonIndex: number
      lastPosition: number
      lessonTitle: string
    } | null = null

    for (const record of progressRecords || []) {
      const key = `${record.section_id}-${record.lesson_index}`
      progressMap[key] = {
        percentWatched: parseFloat(record.percent_watched) || 0,
        isCompleted: record.is_completed || false,
        lastPosition: parseFloat(record.last_position) || 0,
        updatedAt: record.updated_at,
      }

      if (record.is_completed) {
        completedLessons++
      }

      // Track the most recently watched lesson (first in the ordered results)
      if (!lastWatchedLesson && record.last_position > 0) {
        // Find the lesson title from local data
        const section = localCourseData.courseContent.find(
          (s) => s.id === record.section_id
        )
        const lesson = section?.lessons[record.lesson_index]

        lastWatchedLesson = {
          sectionId: record.section_id,
          lessonIndex: record.lesson_index,
          lastPosition: parseFloat(record.last_position) || 0,
          lessonTitle: lesson?.title || 'Unknown Lesson',
        }
      }
    }

    // Calculate overall progress
    const overallProgress =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0

    return NextResponse.json({
      success: true,
      progress: progressMap,
      stats: {
        totalLessons,
        completedLessons,
        overallProgress,
        lastWatchedLesson,
      },
    })
  } catch (error) {
    console.error('Progress fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
