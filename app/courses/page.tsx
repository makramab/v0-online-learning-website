"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Package, CheckCircle2, Loader2, AlertCircle, X, GraduationCap, PlayCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAllCourses, type Course } from "@/lib/courses-data"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { slugToCourseId } from "@/lib/course-mapping"

// DOKU JS URL based on environment
const DOKU_JS_URL =
  process.env.NEXT_PUBLIC_DOKU_ENVIRONMENT === "production"
    ? "https://jokul.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.js"
    : "https://sandbox.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.js"

// Declare DOKU's global function
declare global {
  interface Window {
    loadJokulCheckout?: (paymentUrl: string) => void
  }
}

// Get all courses from centralized data
const allCourses = getAllCourses()

// Bundle configuration
const BUNDLE_CONFIG = {
  name: "Paket Semua Kursus",
  price: 249000,
  originalPrice: 999000,
  description: "Akses semua 9 kursus premium dengan satu pembelian. Hemat lebih dari 50%!",
  features: [
    "Akses selamanya ke semua 9 kursus",
    "Total 40+ jam konten video",
    "Sertifikat untuk setiap kursus",
    "Akses komunitas eksklusif",
    "Update materi gratis selamanya",
  ],
}

// Calculate total individual price
const totalIndividualPrice = allCourses.reduce((sum, course) => sum + course.price, 0)

export default function CoursesPage() {
  const [isProcessingBundle, setIsProcessingBundle] = useState(false)
  const [bundleError, setBundleError] = useState<string | null>(null)
  const [bundleSuccess, setBundleSuccess] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [dokuScriptLoaded, setDokuScriptLoaded] = useState(false)
  const [ownedCoursesCount, setOwnedCoursesCount] = useState<number | null>(null)
  const [ownedCourseIds, setOwnedCourseIds] = useState<Set<number>>(new Set())
  const [isLoadingEnrollments, setIsLoadingEnrollments] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check user's enrollment status
  useEffect(() => {
    const checkEnrollments = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          setOwnedCoursesCount(0)
          setOwnedCourseIds(new Set())
          setIsLoadingEnrollments(false)
          return
        }

        // Fetch paid enrollments with course info
        const { data: enrollments, error } = await supabase
          .from('enrollments')
          .select(`
            course_id,
            courses (slug)
          `)
          .eq('user_id', user.id)
          .eq('payment_status', 'paid')

        if (error) {
          console.error('Error fetching enrollments:', error)
          setOwnedCoursesCount(0)
          setOwnedCourseIds(new Set())
        } else {
          const count = enrollments?.length || 0
          setOwnedCoursesCount(count)

          // Convert course slugs to local IDs
          const localIds = new Set<number>()
          enrollments?.forEach((enrollment) => {
            const courseData = enrollment.courses as { slug: string } | null
            if (courseData?.slug) {
              const localId = slugToCourseId[courseData.slug]
              if (localId) {
                localIds.add(localId)
              }
            }
          })
          setOwnedCourseIds(localIds)
        }
      } catch (err) {
        console.error('Error checking enrollments:', err)
        setOwnedCoursesCount(0)
        setOwnedCourseIds(new Set())
      } finally {
        setIsLoadingEnrollments(false)
      }
    }

    checkEnrollments()
  }, [bundleSuccess]) // Re-check after successful bundle purchase

  // Load DOKU JS script for modal checkout
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${DOKU_JS_URL}"]`)
    if (existingScript) {
      setDokuScriptLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.src = DOKU_JS_URL
    script.async = true
    script.onload = () => {
      setDokuScriptLoaded(true)
    }
    script.onerror = () => {
      console.error("Failed to load DOKU checkout script")
    }
    document.head.appendChild(script)
  }, [])

  // Handle payment return - verify bundle payment
  useEffect(() => {
    const payment = searchParams.get("payment")
    const type = searchParams.get("type")

    if (payment === "success" && type === "bundle") {
      verifyBundlePayment()
    } else if (payment === "cancelled") {
      setBundleError("Pembayaran dibatalkan")
      // Clean up URL
      router.replace("/courses", { scroll: false })
    }
  }, [searchParams])

  const verifyBundlePayment = async () => {
    setIsVerifying(true)
    setBundleError(null)

    try {
      const response = await fetch("/api/doku/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isBundle: true }),
      })

      const data = await response.json()

      if (data.success && data.status === "paid") {
        setBundleSuccess(true)
        // Refresh the page to show updated enrollment status
        setTimeout(() => {
          router.replace("/courses", { scroll: false })
          window.location.reload()
        }, 3000)
      } else if (data.status === "already_paid") {
        setBundleSuccess(true)
        router.replace("/courses", { scroll: false })
      } else if (data.status === "pending") {
        setBundleError("Pembayaran masih dalam proses. Silakan tunggu beberapa saat.")
        router.replace("/courses", { scroll: false })
      } else {
        setBundleError(data.error || "Gagal memverifikasi pembayaran")
        router.replace("/courses", { scroll: false })
      }
    } catch (err) {
      console.error("Bundle verification error:", err)
      setBundleError("Terjadi kesalahan saat memverifikasi pembayaran")
      router.replace("/courses", { scroll: false })
    } finally {
      setIsVerifying(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleBundlePurchase = async () => {
    // Check if DOKU script is loaded
    if (!dokuScriptLoaded || !window.loadJokulCheckout) {
      setBundleError("Sistem pembayaran belum siap. Silakan tunggu sebentar dan coba lagi.")
      return
    }

    setIsProcessingBundle(true)
    setBundleError(null)

    try {
      const response = await fetch("/api/doku/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isBundle: true,
          bundlePrice: BUNDLE_CONFIG.price,
          bundleName: BUNDLE_CONFIG.name,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Gagal memulai pembayaran")
      }

      // Open DOKU checkout modal
      if (window.loadJokulCheckout && data.paymentUrl) {
        window.loadJokulCheckout(data.paymentUrl)
      } else {
        // Fallback: redirect to payment URL (shouldn't happen if script loaded)
        window.location.href = data.paymentUrl
      }
    } catch (err) {
      console.error("Bundle payment error:", err)
      setBundleError(err instanceof Error ? err.message : "Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsProcessingBundle(false)
    }
  }

  const discount = Math.round(((BUNDLE_CONFIG.originalPrice - BUNDLE_CONFIG.price) / BUNDLE_CONFIG.originalPrice) * 100)

  // Check if user owns all courses
  const ownsAllCourses = ownedCoursesCount !== null && ownedCoursesCount >= allCourses.length

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 lg:ml-64">
        <DashboardHeader />
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          {/* Verification Loading State */}
          {isVerifying && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-blue-800">Memverifikasi pembayaran paket...</span>
            </div>
          )}

          {/* Bundle Success Message */}
          {bundleSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-green-800 font-medium">Pembayaran Berhasil!</p>
                <p className="text-green-700 text-sm mt-1">
                  Selamat! Anda sekarang memiliki akses ke semua kursus. Halaman akan dimuat ulang dalam beberapa detik...
                </p>
              </div>
              <button
                onClick={() => setBundleSuccess(false)}
                className="text-green-600 hover:text-green-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Hero Section - Conditional based on ownership */}
          {isLoadingEnrollments ? (
            // Loading state
            <div className="bg-gradient-to-r from-[#1580d1] to-[#1c9af1] rounded-xl sm:rounded-2xl p-8 flex items-center justify-center min-h-[200px]">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          ) : ownsAllCourses ? (
            // Welcome Back Hero - User owns all courses
            <div className="bg-gradient-to-r from-[#1580d1] to-[#1c9af1] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 overflow-hidden relative">
              {/* Subtle decoration */}
              <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
                <div className="absolute inset-0 bg-white/20 transform rotate-12 translate-x-1/2"></div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Mobile Image */}
                <div className="lg:hidden relative z-10 flex justify-center">
                  <div className="relative w-full max-w-[300px] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
                    <Image
                      src="/landing-page-hero.jpeg"
                      alt="Selamat Datang Kembali"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-4 lg:space-y-6 relative z-10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-400 text-green-900 border-0 font-semibold">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        AKSES PENUH
                      </Badge>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                      Selamat! Anda Memiliki Akses ke Semua Kursus
                    </h1>
                  </div>

                  <p className="text-white/90 max-w-xl leading-relaxed text-sm sm:text-base">
                    Terima kasih telah bergabung dengan AwalBaru.com! Anda sekarang memiliki akses penuh ke seluruh {allCourses.length} kursus premium kami. Mulai perjalanan Anda menuju American Dream sekarang!
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <GraduationCap className="w-4 h-4 text-green-300 flex-shrink-0" />
                      <span>{allCourses.length} kursus tersedia</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <PlayCircle className="w-4 h-4 text-green-300 flex-shrink-0" />
                      <span>40+ jam konten video</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-300 flex-shrink-0" />
                      <span>Akses selamanya</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-300 flex-shrink-0" />
                      <span>Update materi gratis</span>
                    </div>
                  </div>

                </div>

                {/* Desktop Image */}
                <div className="hidden lg:block relative z-10">
                  <div className="relative w-[320px] xl:w-[380px] h-[240px] xl:h-[280px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                    <Image
                      src="/landing-page-hero.jpeg"
                      alt="Selamat Datang Kembali"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Bundle Purchase Hero - User doesn't own all courses
            <div className="bg-gradient-to-r from-[#1580d1] to-[#1c9af1] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 overflow-hidden relative">
              {/* Subtle decoration */}
              <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
                <div className="absolute inset-0 bg-white/20 transform rotate-12 translate-x-1/2"></div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Mobile Image - Shows at top on mobile only */}
                <div className="lg:hidden relative z-10 flex justify-center">
                  <div className="relative w-full max-w-[300px] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
                    <Image
                      src="/landing-page-hero.jpeg"
                      alt="Paket Semua Kursus - Orang Indonesia di Amerika"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-4 lg:space-y-6 relative z-10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-400 text-yellow-900 border-0 font-semibold">
                        <Package className="w-3 h-3 mr-1" />
                        PAKET HEMAT
                      </Badge>
                      <Badge className="bg-red-500 text-white border-0 font-semibold">
                        -{discount}%
                      </Badge>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                      {BUNDLE_CONFIG.name}
                    </h1>
                  </div>

                  <p className="text-white/90 max-w-xl leading-relaxed text-sm sm:text-base">
                    {BUNDLE_CONFIG.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {BUNDLE_CONFIG.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-white/90 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-300 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Error Message */}
                  {bundleError && (
                    <div className="flex items-start gap-2 p-3 bg-red-500/20 border border-red-300/30 rounded-lg text-white text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{bundleError}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Button
                      size="lg"
                      onClick={handleBundlePurchase}
                      disabled={isProcessingBundle}
                      className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 font-semibold shadow-xl hover:shadow-2xl transition-all"
                    >
                      {isProcessingBundle ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Memproses...
                        </>
                      ) : (
                        <>
                          <Package className="w-5 h-5 mr-2" />
                          Beli Paket Lengkap
                        </>
                      )}
                    </Button>
                    <div className="flex flex-col">
                      <div className="text-2xl sm:text-3xl font-bold text-white">
                        {formatPrice(BUNDLE_CONFIG.price)}
                      </div>
                      <div className="text-sm text-white/60 line-through">
                        {formatPrice(BUNDLE_CONFIG.originalPrice)}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-white/60">
                    * Harga normal jika beli satuan: {formatPrice(totalIndividualPrice)}
                  </p>
                </div>

                {/* Desktop Image - Shows on right side on desktop only */}
                <div className="hidden lg:block relative z-10">
                  <div className="relative w-[320px] xl:w-[380px] h-[240px] xl:h-[280px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                    <Image
                      src="/landing-page-hero.jpeg"
                      alt="Paket Semua Kursus - Orang Indonesia di Amerika"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All Courses Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Semua Kursus</h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  {allCourses.length} kursus tersedia - beli satuan atau hemat dengan paket lengkap
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {allCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'backwards'
                  }}
                >
                  <Link href={`/courses/${course.id}`}>
                    <CourseCard {...course} isOwned={ownedCourseIds.has(course.id)} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
