import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { courseIdToSlug } from '@/lib/course-mapping'

/**
 * Update lesson progress
 *
 * This endpoint is called periodically (every 10 seconds) and on pause
 * to save the user's progress watching a lesson video.
 *
 * POST /api/progress/update
 *
 * Request body:
 * {
 *   localCourseId: number,     // Local course ID (1-9)
 *   sectionId: string,         // Section ID (e.g., "01")
 *   lessonIndex: number,       // 0-based lesson index
 *   percentWatched: number,    // 0.0 to 1.0
 *   secondsWatched: number,    // Unique seconds watched
 *   lastPosition: number,      // Current playback position
 *   videoDuration: number,     // Total video duration
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const {
      localCourseId,
      sectionId,
      lessonIndex,
      percentWatched,
      secondsWatched,
      lastPosition,
      videoDuration,
    } = body

    // Validate required fields
    if (
      localCourseId === undefined ||
      !sectionId ||
      lessonIndex === undefined
    ) {
      return NextResponse.json(
        { error: 'Missing required fields: localCourseId, sectionId, lessonIndex' },
        { status: 400 }
      )
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

    // Check if lesson is already completed
    const { data: existingProgress } = await supabase
      .from('lesson_progress')
      .select('is_completed, percent_watched')
      .eq('user_id', user.id)
      .eq('course_id', course.id)
      .eq('section_id', sectionId)
      .eq('lesson_index', lessonIndex)
      .single()

    // Determine if this should mark as completed (90% threshold)
    const shouldComplete = percentWatched >= 0.9
    const wasAlreadyCompleted = existingProgress?.is_completed === true

    // Build update data
    const progressData: Record<string, unknown> = {
      user_id: user.id,
      course_id: course.id,
      section_id: sectionId,
      lesson_index: lessonIndex,
      percent_watched: Math.max(
        percentWatched || 0,
        existingProgress?.percent_watched || 0
      ),
      seconds_watched: secondsWatched || 0,
      last_position: lastPosition || 0,
      video_duration: videoDuration || 0,
    }

    // Only set completed if not already completed
    if (shouldComplete && !wasAlreadyCompleted) {
      progressData.is_completed = true
      progressData.completed_at = new Date().toISOString()
    }

    // Upsert the progress record
    const { data: progress, error: upsertError } = await supabase
      .from('lesson_progress')
      .upsert(progressData, {
        onConflict: 'user_id,course_id,section_id,lesson_index',
      })
      .select()
      .single()

    if (upsertError) {
      console.error('Failed to update progress:', upsertError)
      return NextResponse.json(
        { error: 'Failed to update progress' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      progress: {
        id: progress.id,
        percentWatched: progress.percent_watched,
        isCompleted: progress.is_completed,
        lastPosition: progress.last_position,
      },
      justCompleted: shouldComplete && !wasAlreadyCompleted,
    })
  } catch (error) {
    console.error('Progress update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
