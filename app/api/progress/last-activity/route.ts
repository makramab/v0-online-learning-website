import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { slugToCourseId } from '@/lib/course-mapping'
import { getCourseById } from '@/lib/courses-data'

/**
 * Get user's last learning activity
 *
 * GET /api/progress/last-activity
 *
 * Returns the most recently watched lesson for the "Continue Learning" sidebar.
 *
 * Response:
 * {
 *   lastActivity: {
 *     localCourseId: number,
 *     courseTitle: string,
 *     courseImage: string,
 *     sectionId: string,
 *     lessonIndex: number,
 *     lessonTitle: string,
 *     lastPosition: number,
 *     percentWatched: number,
 *     updatedAt: string,
 *     resumeLink: string,
 *   } | null
 * }
 */
export async function GET() {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Fetch the most recently updated lesson progress
    const { data: lastProgress, error: progressError } = await supabase
      .from('lesson_progress')
      .select(
        `
        *,
        courses:course_id (
          id,
          slug,
          title
        )
      `
      )
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()

    if (progressError) {
      // No progress found is not an error, just return null
      if (progressError.code === 'PGRST116') {
        return NextResponse.json({
          success: true,
          lastActivity: null,
        })
      }

      console.error('Failed to fetch last activity:', progressError)
      return NextResponse.json(
        { error: 'Failed to fetch last activity' },
        { status: 500 }
      )
    }

    if (!lastProgress) {
      return NextResponse.json({
        success: true,
        lastActivity: null,
      })
    }

    // Get local course ID from slug
    const course = lastProgress.courses as { id: string; slug: string; title: string }
    const localCourseId = slugToCourseId[course.slug]

    if (!localCourseId) {
      // Course mapping not found
      return NextResponse.json({
        success: true,
        lastActivity: null,
      })
    }

    // Get local course data for lesson info and image
    const localCourseData = getCourseById(localCourseId)
    if (!localCourseData) {
      return NextResponse.json({
        success: true,
        lastActivity: null,
      })
    }

    // Find lesson title from local data
    const section = localCourseData.courseContent.find(
      (s) => s.id === lastProgress.section_id
    )
    const lesson = section?.lessons[lastProgress.lesson_index]
    const lessonTitle = lesson?.title || 'Unknown Lesson'

    // Build resume link with section and lesson query params
    const resumeLink = `/courses/${localCourseId}?section=${lastProgress.section_id}&lesson=${lastProgress.lesson_index}`

    return NextResponse.json({
      success: true,
      lastActivity: {
        localCourseId,
        courseTitle: localCourseData.title,
        courseImage: localCourseData.image,
        sectionId: lastProgress.section_id,
        lessonIndex: lastProgress.lesson_index,
        lessonTitle,
        lastPosition: parseFloat(lastProgress.last_position) || 0,
        percentWatched: parseFloat(lastProgress.percent_watched) || 0,
        isCompleted: lastProgress.is_completed || false,
        updatedAt: lastProgress.updated_at,
        resumeLink,
      },
    })
  } catch (error) {
    console.error('Last activity error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
