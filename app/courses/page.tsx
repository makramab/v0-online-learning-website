"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

// Complete course data from all 9 instructor images
const allCourses = [
  {
    id: 1,
    title: "DV Lottery Masterclass: Cara Menang & Persiapan Interview",
    description:
      "Panduan lengkap memenangkan DV Lottery dan persiapan interview dari pemenang langsung. Pelajari strategi, tips, dan pengalaman nyata bekerja sebagai Jr. Executive Sous Chef di Sofitel New York, USA.",
    instructor: "Teddy Cahyadi",
    duration: "6 jam",
    level: "Pemula",
    price: 0,
    originalPrice: 499000,
    tags: ["GRATIS", "POPULER", "PEMULA"],
    image: "/courses/1-TEDDY.jpg",
    visaType: "Diversity/Lottery Visa",
  },
  {
    id: 2,
    title: "Tourist Visa to USA: Panduan Liburan & Aplikasi Visa",
    description:
      "Panduan lengkap mengurus Tourist Visa ke Amerika. Pelajari cara aplikasi, tips interview, dan explore destinasi wisata populer di USA dari pengalaman nyata.",
    instructor: "Riko Nugraha",
    duration: "3 jam",
    level: "Pemula",
    price: 199000,
    originalPrice: 399000,
    tags: ["DISKON", "PEMULA"],
    image: "/courses/2-RIKO.jpg",
    visaType: "Tourist Visa",
  },
  {
    id: 3,
    title: "Beasiswa Fullbright: Raih Master di Amerika",
    description:
      "Strategi mendapatkan beasiswa Fullbright untuk program Master di universitas top Amerika. Pengalaman kuliah di Rutgers University dan tips aplikasi beasiswa.",
    instructor: "Mutiara Indah Puspita Sari, S.Ars",
    duration: "8 jam",
    level: "Menengah",
    price: 599000,
    originalPrice: 999000,
    tags: ["POPULER", "BEASISWA"],
    image: "/courses/3-MUTT.jpg",
    visaType: "J1 Visa",
  },
  {
    id: 4,
    title: "Au Pair Program: Kerja & Tinggal di Amerika",
    description:
      "Panduan lengkap program Au Pair untuk bekerja dan tinggal di Amerika. Pelajari proses aplikasi, kehidupan sebagai Au Pair, dan pengalaman nyata di USA.",
    instructor: "Miftakhul Ma'rifah, S.Pd",
    duration: "5 jam",
    level: "Pemula",
    price: 399000,
    originalPrice: 599000,
    tags: ["KERJA", "PEMULA"],
    image: "/courses/4-MITA.jpg",
    visaType: "J1 Visa",
  },
  {
    id: 5,
    title: "Hotel & Culinary Career di New York",
    description:
      "Membangun karir di industri kuliner dan hospitality New York. Pengalaman bekerja sebagai Hotel Line Cook dan tips masuk industri restoran Amerika.",
    instructor: "Marcello Josua S",
    duration: "6 jam",
    level: "Menengah",
    price: 449000,
    originalPrice: 699000,
    tags: ["KARIR", "KULINER"],
    image: "/courses/5-MARCELLO.jpg",
    visaType: "J1 Visa",
  },
  {
    id: 6,
    title: "Accounting Career di Amerika: J1 Visa Path",
    description:
      "Panduan membangun karir sebagai Accountant di Amerika melalui J1 Visa. Pengalaman kerja di New Jersey dan tips masuk industri akuntansi USA.",
    instructor: "Grace Gevani Aritonang, S.Ak",
    duration: "7 jam",
    level: "Menengah",
    price: 549000,
    originalPrice: 899000,
    tags: ["KARIR", "PROFESIONAL"],
    image: "/courses/6-GRACE.jpg",
    visaType: "J1 Visa",
  },
  {
    id: 7,
    title: "LPDP Scholarship: Master di New York University",
    description:
      "Strategi mendapatkan beasiswa LPDP untuk kuliah Master di NYU. Pengalaman kuliah Industrial Engineering dan tips aplikasi beasiswa pemerintah Indonesia.",
    instructor: "Fauzan Rahman",
    duration: "8 jam",
    level: "Menengah",
    price: 599000,
    originalPrice: 999000,
    tags: ["BEASISWA", "POPULER"],
    image: "/courses/7-FAUZAN.jpg",
    visaType: "J1 Visa",
  },
  {
    id: 8,
    title: "F1 Visa: Kuliah S1 di CUNY Baruch College",
    description:
      "Panduan lengkap kuliah S1 di Amerika dengan F1 Visa. Pengalaman di CUNY Baruch College, public university terbaik, dan tips aplikasi universitas USA.",
    instructor: "Eric Salim Marlie",
    duration: "6 jam",
    level: "Pemula",
    price: 499000,
    originalPrice: 799000,
    tags: ["KULIAH", "F1 VISA"],
    image: "/courses/8-ERIC.jpg",
    visaType: "F1 Visa",
  },
  {
    id: 9,
    title: "PhD & Postdoc Research Fellow di Amerika",
    description:
      "Panduan lengkap menempuh PhD dan menjadi Postdoctoral Research Fellow di Amerika. Strategi riset, publikasi, dan membangun karir akademik di USA.",
    instructor: "Endin Nokik Stuyanna, MD, PhD",
    duration: "10 jam",
    level: "Lanjutan",
    price: 799000,
    originalPrice: 1299000,
    tags: ["PhD", "RISET", "LANJUTAN"],
    image: "/courses/9-ENDIN.jpg",
    visaType: "J1/F1 Visa",
  },
]

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
                <Button
                  size="lg"
                  className="bg-red-600 text-white hover:bg-red-700 font-semibold shadow-xl hover:shadow-2xl transition-all"
                >
                  Mulai Belajar Gratis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
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
                  Dipilih secara acak dari koleksi success stories kami
                </p>
              </div>
              <Button variant="ghost" className="text-[#1c9af1] hover:text-red-600 font-semibold">
                Lihat Semua
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {displayedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
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
