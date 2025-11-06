"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, Clock, BookOpen, Award, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock enrolled courses data
const enrolledCourses = [
  {
    id: 1,
    title: "DV Lottery Masterclass: Cara Menang & Persiapan Interview",
    instructor: "Teddy Cahyadi",
    progress: 45,
    enrolledDate: "2025-01-01",
    lastAccessed: "2 jam lalu",
    completedLessons: 12,
    totalLessons: 24,
    estimatedTimeRemaining: "6 jam",
    lastLesson: "Lesson 5: Form DS-260 Step by Step",
    status: "in-progress",
    image: "/courses/1-TEDDY.jpg",
    certificateAvailable: false
  },
  {
    id: 3,
    title: "Beasiswa Fullbright: Raih Master di Amerika",
    instructor: "Mutiara Indah Puspita Sari, S.Ars",
    progress: 30,
    enrolledDate: "2025-01-03",
    lastAccessed: "Yesterday",
    completedLessons: 10,
    totalLessons: 32,
    estimatedTimeRemaining: "5.6 jam",
    lastLesson: "Lesson 3: Choosing the Right Program",
    status: "in-progress",
    image: "/courses/3-MUTT.jpg",
    certificateAvailable: false
  },
  {
    id: 4,
    title: "Au Pair Program: Kerja & Tinggal di Amerika",
    instructor: "Miftakhul Ma'rifah, S.Pd",
    progress: 15,
    enrolledDate: "2025-01-10",
    lastAccessed: "3 hari lalu",
    completedLessons: 3,
    totalLessons: 20,
    estimatedTimeRemaining: "4.2 jam",
    lastLesson: "Lesson 2: Finding & Contacting Agencies",
    status: "in-progress",
    image: "/courses/4-MITA.jpg",
    certificateAvailable: false
  },
  {
    id: 2,
    title: "Tourist Visa to USA: Panduan Liburan & Aplikasi Visa",
    instructor: "Riko Nugraha",
    progress: 100,
    enrolledDate: "2024-12-15",
    lastAccessed: "1 minggu lalu",
    completedLessons: 15,
    totalLessons: 15,
    estimatedTimeRemaining: "0 jam",
    lastLesson: "Selesai",
    status: "completed",
    image: "/courses/2-RIKO.jpg",
    certificateAvailable: true
  }
]

type FilterType = "all" | "in-progress" | "completed"

export default function MyCoursesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")

  // Filter courses based on active filter
  const filteredCourses = enrolledCourses.filter((course) => {
    if (activeFilter === "all") return true
    if (activeFilter === "in-progress") return course.status === "in-progress"
    if (activeFilter === "completed") return course.status === "completed"
    return true
  })

  // Calculate stats
  const totalCourses = enrolledCourses.length
  const inProgressCount = enrolledCourses.filter(c => c.status === "in-progress").length
  const completedCount = enrolledCourses.filter(c => c.status === "completed").length
  const overallProgress = Math.round(
    enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / totalCourses
  )

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 ml-64">
        <DashboardHeader />
        <main className="p-8 space-y-8">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Kursus Saya</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{inProgressCount} kursus aktif</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{completedCount} selesai</span>
              </div>
              <span>•</span>
              <span>{overallProgress}% progress keseluruhan</span>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <Card className="border-l-4 border-l-[#1c9af1]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm text-muted-foreground">Progress Keseluruhan</p>
                  <p className="text-2xl font-bold text-[#1c9af1]">{overallProgress}%</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{enrolledCourses.reduce((acc, c) => acc + c.completedLessons, 0)} / {enrolledCourses.reduce((acc, c) => acc + c.totalLessons, 0)} total pelajaran</p>
                  <p className="text-xs mt-1">Terus semangat! 🎯</p>
                </div>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </CardContent>
          </Card>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 border-b">
            <Button
              variant="ghost"
              onClick={() => setActiveFilter("all")}
              className={`rounded-none border-b-2 ${
                activeFilter === "all"
                  ? "border-b-primary text-primary"
                  : "border-b-transparent text-muted-foreground"
              }`}
            >
              Semua ({totalCourses})
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveFilter("in-progress")}
              className={`rounded-none border-b-2 ${
                activeFilter === "in-progress"
                  ? "border-b-primary text-primary"
                  : "border-b-transparent text-muted-foreground"
              }`}
            >
              Sedang Belajar ({inProgressCount})
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveFilter("completed")}
              className={`rounded-none border-b-2 ${
                activeFilter === "completed"
                  ? "border-b-primary text-primary"
                  : "border-b-transparent text-muted-foreground"
              }`}
            >
              Selesai ({completedCount})
            </Button>
          </div>

          {/* Course List */}
          <div className="space-y-4">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-6">
                      {/* Course Thumbnail */}
                      <div className="relative w-64 h-40 flex-shrink-0">
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
                      <div className="flex-1 py-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-bold text-xl line-clamp-1 mb-1">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">Oleh {course.instructor}</p>
                          </div>

                          {/* Progress Section */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-semibold text-[#1c9af1]">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>

                          {/* Stats Row */}
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              <span>{course.completedLessons} / {course.totalLessons} pelajaran</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>~{course.estimatedTimeRemaining} tersisa</span>
                            </div>
                          </div>

                          {/* Last Activity */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Terakhir: {course.lastLesson}</span>
                            <span>Diakses {course.lastAccessed}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pr-6 flex flex-col gap-3">
                        {course.status === "completed" ? (
                          <>
                            {course.certificateAvailable && (
                              <Button className="bg-yellow-600 text-white hover:bg-yellow-700 w-40">
                                <Award className="w-4 h-4 mr-2" />
                                Unduh Sertifikat
                              </Button>
                            )}
                            <Link href={`/courses/${course.id}`}>
                              <Button variant="outline" className="w-40">
                                Review Materi
                              </Button>
                            </Link>
                          </>
                        ) : (
                          <Link href={`/courses/${course.id}`}>
                            <Button className="bg-red-600 text-white hover:bg-red-700 w-40">
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
              <Card className="p-12">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <BookOpen className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Belum ada kursus</h3>
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
              <CardContent className="p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-2">Ingin belajar lebih banyak?</h3>
                <p className="text-white/90 mb-4">Jelajahi kursus lainnya untuk meraih American Dream</p>
                <Link href="/courses">
                  <Button size="lg" className="bg-white text-[#1c9af1] hover:bg-white/90">
                    Jelajahi Semua Kursus
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
