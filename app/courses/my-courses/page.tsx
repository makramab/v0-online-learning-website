"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, Clock, BookOpen, Award, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  getEnrolledCoursesWithProgress,
  getLearningStats,
  type EnrolledCourseWithProgress,
} from "@/lib/actions/my-courses"

type FilterType = "all" | "in-progress" | "completed"

export default function MyCoursesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [courses, setCourses] = useState<EnrolledCourseWithProgress[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Stats
  const [stats, setStats] = useState({
    totalCourses: 0,
    inProgressCount: 0,
    completedCount: 0,
    overallProgress: 0,
    totalLessonsCompleted: 0,
    totalLessons: 0,
  })

  // Fetch enrolled courses and stats
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const [coursesResult, statsResult] = await Promise.all([
          getEnrolledCoursesWithProgress(),
          getLearningStats(),
        ])

        if (coursesResult.error) {
          setError(coursesResult.error)
        } else {
          setCourses(coursesResult.courses)
        }

        if (!statsResult.error) {
          setStats({
            totalCourses: statsResult.totalCourses,
            inProgressCount: statsResult.inProgressCount,
            completedCount: statsResult.completedCount,
            overallProgress: statsResult.overallProgress,
            totalLessonsCompleted: statsResult.totalLessonsCompleted,
            totalLessons: statsResult.totalLessons,
          })
        }
      } catch (err) {
        setError("Gagal memuat data kursus")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter courses based on active filter
  const filteredCourses = courses.filter((course) => {
    if (activeFilter === "all") return true
    if (activeFilter === "in-progress") return course.status === "in-progress"
    if (activeFilter === "completed") return course.status === "completed"
    return true
  })

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 lg:ml-64">
        <DashboardHeader />
        <main className="p-4 lg:p-8 space-y-8">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-bold">Kursus Saya</h1>
            <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-sm lg:text-base text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{stats.inProgressCount} kursus aktif</span>
              </div>
              <span className="hidden lg:inline">•</span>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{stats.completedCount} selesai</span>
              </div>
              <span className="hidden lg:inline">•</span>
              <span>{stats.overallProgress}% progress keseluruhan</span>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <Card className="p-12">
              <div className="flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-[#1c9af1]" />
                <p className="text-muted-foreground">Memuat kursus Anda...</p>
              </div>
            </Card>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <Card className="p-12 border-red-200 bg-red-50">
              <div className="text-center space-y-4">
                <p className="text-red-600">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-100"
                >
                  Coba Lagi
                </Button>
              </div>
            </Card>
          )}

          {/* Main Content */}
          {!isLoading && !error && (
            <>
              {/* Overall Progress Bar */}
              {stats.totalCourses > 0 && (
                <Card className="border-l-4 border-l-[#1c9af1]">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-2 gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Progress Keseluruhan</p>
                        <p className="text-2xl font-bold text-[#1c9af1]">{stats.overallProgress}%</p>
                      </div>
                      <div className="text-left lg:text-right text-sm text-muted-foreground">
                        <p>
                          {stats.totalLessonsCompleted} / {stats.totalLessons} total pelajaran
                        </p>
                        <p className="text-xs mt-1">Terus semangat! 🎯</p>
                      </div>
                    </div>
                    <Progress value={stats.overallProgress} className="h-3" />
                  </CardContent>
                </Card>
              )}

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 border-b overflow-x-auto">
                <Button
                  variant="ghost"
                  onClick={() => setActiveFilter("all")}
                  className={`rounded-none border-b-2 whitespace-nowrap ${
                    activeFilter === "all"
                      ? "border-b-primary text-primary"
                      : "border-b-transparent text-muted-foreground"
                  }`}
                >
                  Semua ({stats.totalCourses})
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveFilter("in-progress")}
                  className={`rounded-none border-b-2 whitespace-nowrap ${
                    activeFilter === "in-progress"
                      ? "border-b-primary text-primary"
                      : "border-b-transparent text-muted-foreground"
                  }`}
                >
                  Sedang Belajar ({stats.inProgressCount})
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveFilter("completed")}
                  className={`rounded-none border-b-2 whitespace-nowrap ${
                    activeFilter === "completed"
                      ? "border-b-primary text-primary"
                      : "border-b-transparent text-muted-foreground"
                  }`}
                >
                  Selesai ({stats.completedCount})
                </Button>
              </div>

              {/* Course List */}
              <div className="space-y-4">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                          {/* Course Thumbnail */}
                          <div className="relative w-full lg:w-64 h-48 lg:h-40 flex-shrink-0">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                            {course.status === "completed" && (
                              <div className="absolute top-3 left-3">
                                <Badge className="bg-green-600 text-white">Selesai</Badge>
                              </div>
                            )}
                          </div>

                          {/* Course Info */}
                          <div className="flex-1 p-4 lg:py-4 lg:px-0">
                            <div className="space-y-3">
                              <div>
                                <h3 className="font-bold text-lg lg:text-xl line-clamp-2 mb-1">
                                  {course.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  Oleh {course.instructor}
                                </p>
                              </div>

                              {/* Progress Section */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Progress</span>
                                  <span className="font-semibold text-[#1c9af1]">
                                    {course.progress}%
                                  </span>
                                </div>
                                <Progress value={course.progress} className="h-2" />
                              </div>

                              {/* Stats Row */}
                              <div className="flex flex-wrap items-center gap-3 lg:gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <BookOpen className="w-4 h-4" />
                                  <span>
                                    {course.completedLessons} / {course.totalLessons} pelajaran
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  <span>~{course.estimatedTimeRemaining} tersisa</span>
                                </div>
                              </div>

                              {/* Last Activity */}
                              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between text-xs text-muted-foreground gap-1">
                                <span>Terakhir: {course.lastLesson}</span>
                                <span>Diakses {course.lastAccessed}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="p-4 lg:pr-6 lg:pl-0 flex flex-col gap-3">
                            {course.status === "completed" ? (
                              <>
                                {course.certificateAvailable && (
                                  <Button className="bg-yellow-600 text-white hover:bg-yellow-700 w-full lg:w-40">
                                    <Award className="w-4 h-4 mr-2" />
                                    Unduh Sertifikat
                                  </Button>
                                )}
                                <Link href={`/courses/${course.id}`}>
                                  <Button variant="outline" className="w-full lg:w-40">
                                    Review Materi
                                  </Button>
                                </Link>
                              </>
                            ) : (
                              <Link href={course.resumeLink}>
                                <Button className="bg-red-600 text-white hover:bg-red-700 w-full lg:w-40">
                                  <PlayCircle className="w-4 h-4 mr-2" />
                                  Lanjutkan
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  // Empty State
                  <Card className="p-8 lg:p-12">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
                        <BookOpen className="w-10 h-10 lg:w-12 lg:h-12 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold mb-2">Belum ada kursus</h3>
                        <p className="text-muted-foreground">
                          {activeFilter === "all"
                            ? "Anda belum mendaftar kursus apapun"
                            : activeFilter === "in-progress"
                            ? "Tidak ada kursus yang sedang dipelajari"
                            : "Belum ada kursus yang diselesaikan"}
                        </p>
                      </div>
                      <Link href="/courses">
                        <Button className="bg-red-600 text-white hover:bg-red-700">
                          Jelajahi Kursus
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                )}
              </div>

              {/* Browse More Courses CTA */}
              {filteredCourses.length > 0 && (
                <Card className="bg-gradient-to-r from-[#1580d1] to-[#1c9af1] border-0">
                  <CardContent className="p-6 lg:p-8 text-center text-white">
                    <h3 className="text-xl lg:text-2xl font-bold mb-2">Ingin belajar lebih banyak?</h3>
                    <p className="text-white/90 mb-4">
                      Jelajahi kursus lainnya untuk meraih American Dream
                    </p>
                    <Link href="/courses">
                      <Button size="lg" className="bg-white text-[#1c9af1] hover:bg-white/90">
                        Jelajahi Semua Kursus
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
