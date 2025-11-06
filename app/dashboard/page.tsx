"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CourseCard } from "@/components/course-card"
import { BookOpen, Clock, Award, TrendingUp, ArrowRight, PlayCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { getAllCourses } from "@/lib/courses-data"

// Placeholder data for demo
const userName = "Budi"
const userStats = {
  coursesEnrolled: 3,
  overallProgress: 45,
  hoursThisWeek: 8,
  certificatesEarned: 1
}

const continueLearningSample = [
  {
    id: 1,
    title: "DV Lottery Masterclass: Cara Menang & Persiapan Interview",
    instructor: "Teddy Cahyadi",
    progress: 45,
    image: "/courses/1-TEDDY.jpg",
    lastLesson: "Lesson 5: Form DS-260 Step by Step"
  },
  {
    id: 3,
    title: "Beasiswa Fullbright: Raih Master di Amerika",
    instructor: "Mutiara Indah Puspita Sari, S.Ars",
    progress: 30,
    image: "/courses/3-MUTT.jpg",
    lastLesson: "Lesson 3: Choosing the Right Program"
  },
  {
    id: 4,
    title: "Au Pair Program: Kerja & Tinggal di Amerika",
    instructor: "Miftakhul Ma'rifah, S.Pd",
    progress: 15,
    image: "/courses/4-MITA.jpg",
    lastLesson: "Lesson 2: Finding & Contacting Agencies"
  }
]

const recentActivity = [
  {
    type: "completed",
    text: "Menyelesaikan: Form DS-260 Step by Step",
    course: "DV Lottery Masterclass",
    time: "2 jam lalu"
  },
  {
    type: "started",
    text: "Memulai kursus: Au Pair Program",
    course: "Au Pair Program",
    time: "Kemarin"
  },
  {
    type: "certificate",
    text: "Mendapat sertifikat: Tourist Visa Basics",
    course: "Tourist Visa to USA",
    time: "3 hari lalu"
  },
  {
    type: "completed",
    text: "Menyelesaikan: University Application Process",
    course: "Beasiswa Fullbright",
    time: "5 hari lalu"
  }
]

export default function DashboardPage() {
  // Get all courses for recommendations
  const allCourses = getAllCourses()
  const recommendedCourses = allCourses.slice(4, 8) // Courses 5-8 as recommendations

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 ml-64">
        <DashboardHeader />
        <main className="p-8 space-y-8">
          {/* Welcome Hero Section */}
          <div className="bg-gradient-to-r from-[#1580d1] to-[#1c9af1] rounded-2xl p-8 relative overflow-hidden">
            {/* Subtle flag stripes decoration */}
            <div className="absolute top-0 right-0 w-1/4 h-full opacity-5">
              <div className="h-full flex flex-col">
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-red-600"></div>
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <h1 className="text-4xl font-bold text-white">
                Selamat Datang, {userName}! 👋
              </h1>
              <p className="text-white/90 text-lg">
                Lanjutkan perjalanan menuju American Dream Anda
              </p>
              <div className="flex items-center gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{userStats.coursesEnrolled} Kursus Aktif</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>{userStats.overallProgress}% Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{userStats.hoursThisWeek} Jam Minggu Ini</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 - Courses */}
            <Card className="border-t-4 border-t-[#1c9af1] shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#1c9af1] to-[#50b8f5] rounded-xl flex items-center justify-center shadow-lg">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Kursus Terdaftar</p>
                  <p className="text-4xl font-bold text-[#1c9af1] mt-2 mb-1">{userStats.coursesEnrolled}</p>
                  <p className="text-xs text-green-600 font-medium">+1 minggu ini</p>
                </div>
              </CardContent>
            </Card>

            {/* Card 2 - Progress */}
            <Card className="border-t-4 border-t-green-500 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br from-white to-green-50/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-400 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Progress Keseluruhan</p>
                  <p className="text-4xl font-bold text-green-600 mt-2 mb-1">{userStats.overallProgress}%</p>
                  <p className="text-xs text-green-600 font-medium">+5% dari minggu lalu</p>
                </div>
              </CardContent>
            </Card>

            {/* Card 3 - Hours */}
            <Card className="border-t-4 border-t-orange-500 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br from-white to-orange-50/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Jam Belajar Minggu Ini</p>
                  <p className="text-4xl font-bold text-orange-600 mt-2 mb-1">{userStats.hoursThisWeek}h</p>
                  <p className="text-xs text-green-600 font-medium">+2 jam dari target</p>
                </div>
              </CardContent>
            </Card>

            {/* Card 4 - Certificates */}
            <Card className="border-t-4 border-t-purple-500 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br from-white to-purple-50/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-400 rounded-xl flex items-center justify-center shadow-lg">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Sertifikat Didapat</p>
                  <p className="text-4xl font-bold text-purple-600 mt-2 mb-1">{userStats.certificatesEarned}</p>
                  <p className="text-xs text-muted-foreground font-medium">Total diperoleh</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Continue Learning & Recommendations */}
            <div className="lg:col-span-2 space-y-8">
              {/* Continue Learning Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Lanjutkan Belajar</h2>
                  <Link href="/courses/my-courses">
                    <Button variant="ghost" className="text-[#1c9af1] hover:text-red-600">
                      Lihat Semua
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {continueLearningSample.map((course) => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-4">
                          <div className="relative w-32 h-32 flex-shrink-0">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 py-4 pr-4">
                            <h3 className="font-bold text-lg line-clamp-1 mb-1">{course.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">Oleh {course.instructor}</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-semibold text-[#1c9af1]">{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                              <p className="text-xs text-muted-foreground">Terakhir: {course.lastLesson}</p>
                            </div>
                          </div>
                          <div className="pr-4">
                            <Link href={`/courses/${course.id}`}>
                              <Button className="bg-red-600 text-white hover:bg-red-700">
                                <PlayCircle className="w-4 h-4 mr-2" />
                                Lanjutkan
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recommended Courses */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Rekomendasi Untuk Anda</h2>
                  <Link href="/courses">
                    <Button variant="ghost" className="text-[#1c9af1] hover:text-red-600">
                      Lihat Semua
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendedCourses.map((course) => (
                    <Link key={course.id} href={`/courses/${course.id}`}>
                      <CourseCard {...course} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Progress Overview & Activity */}
            <div className="lg:col-span-1 space-y-6">
              {/* Circular Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress Overview</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center py-6">
                  <div className="relative w-40 h-40">
                    {/* SVG Circular Progress */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#E2E8F0"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#1c9af1"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 70}`}
                        strokeDashoffset={`${2 * Math.PI * 70 * (1 - userStats.overallProgress / 100)}`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-[#1c9af1]">{userStats.overallProgress}%</span>
                      <span className="text-sm text-muted-foreground">Completed</span>
                    </div>
                  </div>
                  <div className="mt-6 w-full space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Pelajaran</span>
                      <span className="font-semibold">45 / 100</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Jam Belajar Total</span>
                      <span className="font-semibold">32 jam</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Rata-rata per Minggu</span>
                      <span className="font-semibold">8 jam</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Aktivitas Terbaru</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'completed' ? 'bg-green-100' :
                        activity.type === 'certificate' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        {activity.type === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                        {activity.type === 'certificate' && <Award className="w-4 h-4 text-yellow-600" />}
                        {activity.type === 'started' && <PlayCircle className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.text}</p>
                        <p className="text-xs text-muted-foreground">{activity.course}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
