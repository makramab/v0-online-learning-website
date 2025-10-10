import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { CourseVideoPlayer } from "@/components/course-video-player"
import { CourseTabs } from "@/components/course-tabs"
import { CourseContentSidebar } from "@/components/course-content-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Clock, Star, Share2 } from "lucide-react"
import Link from "next/link"

export default function CourseDetailPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 ml-64">
        <DashboardHeader />
        <main className="p-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              Courses
            </Link>
            <span>/</span>
            <span>UI UX Design</span>
            <span>/</span>
            <span className="text-foreground">Figma from A to Z</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-balance">Figma from A to Z</h1>
                    <Badge variant="outline">UI / UX Design</Badge>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>38 lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>4h 30min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span>4.5 (126 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Video Player */}
              <CourseVideoPlayer />

              {/* Tabs */}
              <CourseTabs />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CourseContentSidebar />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
