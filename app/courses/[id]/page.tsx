import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { CoursePlayerWithProgress } from "@/components/course-player-with-progress"
import { getCourseById } from "@/lib/courses-data"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { CoursePreview } from "./_components/course-preview"
import { courseIdToSlug } from "@/lib/course-mapping"

async function checkUserEnrollment(courseSlug: string) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { isEnrolled: false, dbCourseId: null }
  }

  // Get course from database by slug
  const { data: course } = await supabase
    .from("courses")
    .select("id")
    .eq("slug", courseSlug)
    .single()

  if (!course) {
    return { isEnrolled: false, dbCourseId: null }
  }

  // Check enrollment
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", user.id)
    .eq("course_id", course.id)
    .eq("payment_status", "paid")
    .single()

  return {
    isEnrolled: !!enrollment,
    dbCourseId: course.id,
  }
}

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const courseId = parseInt(id)
  const course = getCourseById(courseId)

  if (!course) {
    notFound()
  }

  // Get the database slug for this course
  const courseSlug = courseIdToSlug[courseId]

  // Check enrollment status
  const { isEnrolled, dbCourseId } = courseSlug
    ? await checkUserEnrollment(courseSlug)
    : { isEnrolled: false, dbCourseId: null }

  // If not enrolled, show preview page
  if (!isEnrolled) {
    return <CoursePreview course={course} dbCourseId={dbCourseId} />
  }

  // If enrolled, show full course content with progress tracking
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 lg:ml-64">
        <DashboardHeader />
        <CoursePlayerWithProgress course={course} localCourseId={courseId} />
      </div>
    </div>
  )
}
