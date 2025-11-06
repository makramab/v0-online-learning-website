"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAllCourses, type Course } from "@/lib/courses-data"

// Get all courses from centralized data
const allCourses = getAllCourses()

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export default function CoursesPage() {
  const [displayedCourses, setDisplayedCourses] = useState<typeof allCourses>([])
  const [showAll, setShowAll] = useState(false)

  // Featured course (always Course #1)
  const featuredCourse = allCourses[0]

  // Random selection on mount
  useEffect(() => {
    // Get courses #2-9 (exclude course #1)
    const availableCourses = allCourses.slice(1)
    // Shuffle and take first 4
    const shuffled = shuffleArray(availableCourses)
    const selected = shuffled.slice(0, 4)
    setDisplayedCourses(selected)
  }, [])

  // Toggle between showing 4 random or all courses
  const handleToggleShowAll = () => {
    if (!showAll) {
      // Show all courses (excluding featured)
      setDisplayedCourses(allCourses.slice(1))
    } else {
      // Show 4 random courses
      const availableCourses = allCourses.slice(1)
      const shuffled = shuffleArray(availableCourses)
      const selected = shuffled.slice(0, 4)
      setDisplayedCourses(selected)
    }
    setShowAll(!showAll)
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 ml-64">
        <DashboardHeader />
        <main className="p-8 space-y-8">
          {/* Hero Section - Featured Course #1 */}
          <div className="bg-gradient-to-r from-[#1580d1] to-[#1c9af1] rounded-2xl p-8 flex items-center justify-between overflow-hidden relative">
            {/* Subtle flag stripes decoration */}
            <div className="absolute top-0 right-0 w-1/4 h-full opacity-5">
              <div className="h-full flex flex-col">
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-red-600"></div>
              </div>
            </div>

            <div className="flex-1 space-y-6 relative z-10">
              <div className="space-y-2">
                <div className="text-sm text-white/70 font-medium">
                  {featuredCourse.visaType} • {featuredCourse.level}
                </div>
                <h1 className="text-4xl font-bold text-balance text-white leading-tight">
                  {featuredCourse.title}
                </h1>
              </div>

              <p className="text-white/90 max-w-2xl leading-relaxed text-base">
                {featuredCourse.description}
              </p>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-white">
                    <div className="text-sm font-semibold">{featuredCourse.instructor}</div>
                    <div className="text-xs text-white/70">{featuredCourse.duration} pembelajaran</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link href={`/courses/${featuredCourse.id}`}>
                  <Button
                    size="lg"
                    className="bg-red-600 text-white hover:bg-red-700 font-semibold shadow-xl hover:shadow-2xl transition-all"
                  >
                    Mulai Belajar Gratis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                {featuredCourse.tags.includes("GRATIS") && (
                  <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                    100% GRATIS
                  </div>
                )}
              </div>
            </div>

            <div className="hidden lg:block relative z-10">
              <div className="relative w-[320px] h-[320px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src={featuredCourse.image}
                  alt={featuredCourse.instructor}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Courses Section - Random 4 from #2-9 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Kursus Populer Lainnya</h2>
                <p className="text-slate-600 text-sm mt-1">
                  {showAll
                    ? `Menampilkan semua ${displayedCourses.length} kursus dari koleksi kami`
                    : "Dipilih secara acak dari koleksi success stories kami"
                  }
                </p>
              </div>
              <Button
                variant="ghost"
                className="text-[#1c9af1] font-semibold border border-transparent hover:border-[#1c9af1] hover:bg-transparent hover:text-[#1c9af1]"
                onClick={handleToggleShowAll}
              >
                {showAll ? "Tampilkan Lebih Sedikit" : "Lihat Semua"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {displayedCourses.length > 0 ? (
              <div
                key={showAll ? 'all' : 'limited'}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500"
              >
                {displayedCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="animate-in fade-in slide-in-from-bottom-4"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'backwards'
                    }}
                  >
                    <Link href={`/courses/${course.id}`}>
                      <CourseCard {...course} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-slate-100 rounded-2xl h-[400px] animate-pulse"
                  ></div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
