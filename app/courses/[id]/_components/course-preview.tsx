"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Star,
  Play,
  Lock,
  CreditCard,
  Building2,
  Wallet,
  CheckCircle2,
  User,
  Loader2,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Course } from "@/lib/courses-data"
import { useRouter, useSearchParams } from "next/navigation"

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

interface CoursePreviewProps {
  course: Course
  dbCourseId: string | null // Database course ID for enrollment
}

export function CoursePreview({ course, dbCourseId }: CoursePreviewProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dokuScriptLoaded, setDokuScriptLoaded] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check for payment result from URL params and verify with DOKU
  useEffect(() => {
    const paymentStatus = searchParams.get("payment")

    if (paymentStatus === "success" && dbCourseId && !isVerifying) {
      // Verify payment with DOKU API
      setIsVerifying(true)
      setError(null)

      fetch("/api/doku/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: dbCourseId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && (data.status === "paid" || data.status === "already_paid")) {
            // Payment confirmed, refresh to show full content
            router.refresh()
          } else if (data.status === "pending") {
            setError("Pembayaran masih diproses. Silakan tunggu beberapa saat dan refresh halaman.")
          } else if (data.status === "expired") {
            setError("Pembayaran telah kadaluarsa. Silakan coba lagi.")
          } else {
            setError(data.error || "Gagal memverifikasi pembayaran. Silakan hubungi support.")
          }
        })
        .catch((err) => {
          console.error("Verification error:", err)
          setError("Gagal memverifikasi pembayaran. Silakan refresh halaman.")
        })
        .finally(() => {
          setIsVerifying(false)
        })
    } else if (paymentStatus === "cancelled") {
      setError("Pembayaran dibatalkan. Silakan coba lagi.")
    }
  }, [searchParams, router, dbCourseId, isVerifying])

  // Load DOKU JS script
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
      setError("Gagal memuat sistem pembayaran. Silakan refresh halaman.")
    }
    document.head.appendChild(script)

    return () => {
      // Don't remove the script on cleanup as it might be needed
    }
  }, [])

  const handlePurchase = async () => {
    if (!dbCourseId) {
      setError("Kursus tidak ditemukan di database. Silakan hubungi support.")
      return
    }

    if (!dokuScriptLoaded) {
      setError("Sistem pembayaran belum siap. Silakan tunggu sebentar.")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      // Call our API to create payment
      const response = await fetch("/api/doku/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: dbCourseId,
          courseName: course.title,
          coursePrice: course.price,
          localCourseId: course.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Gagal memulai pembayaran")
      }

      // Open DOKU checkout popup
      if (window.loadJokulCheckout && data.paymentUrl) {
        window.loadJokulCheckout(data.paymentUrl)
      } else {
        // Fallback: redirect to payment URL
        window.location.href = data.paymentUrl
      }
    } catch (err) {
      console.error("Payment error:", err)
      setError(err instanceof Error ? err.message : "Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsProcessing(false)
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

  const discount = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/courses"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Kembali ke Kursus</span>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/awalbaru-logo.jpeg"
                alt="AwalBaru.com"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="font-bold text-slate-800">
                Awal<span className="text-[#1c9af1]">Baru.com</span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Preview Section */}
              <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-xl">
                {showVideo ? (
                  <iframe
                    src={`https://fast.wistia.net/embed/iframe/${course.previewWistiaMediaId}?autoPlay=true`}
                    allow="autoplay; fullscreen"
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <>
                    {/* Thumbnail with overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />

                    {/* Play Button */}
                    <button
                      onClick={() => setShowVideo(true)}
                      className="absolute inset-0 flex items-center justify-center group"
                    >
                      <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:bg-white group-hover:scale-110 transition-all">
                        <Play className="w-8 h-8 text-red-600 ml-1" />
                      </div>
                    </button>

                    {/* Preview Label */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-600 text-white">
                        <Play className="w-3 h-3 mr-1" />
                        Preview Gratis
                      </Badge>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-4 right-4">
                      <Badge variant="secondary" className="bg-black/60 text-white border-0">
                        <Clock className="w-3 h-3 mr-1" />
                        {course.duration}
                      </Badge>
                    </div>
                  </>
                )}
              </div>

              {/* Course Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm flex-wrap">
                  {course.tags.map((tag) => (
                    <Badge key={tag} className="bg-primary text-primary-foreground font-semibold text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  {course.title}
                </h1>

                <p className="text-lg text-slate-600">{course.description}</p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.totalLessons} pelajaran</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>
                      {course.rating} ({course.reviewCount} ulasan)
                    </span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-[#1c9af1] flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{course.instructor}</p>
                    <p className="text-sm text-slate-600">
                      {course.instructorBio.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* What You'll Learn */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">
                    Yang Akan Anda Pelajari
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {course.overview.learningPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Course Content Preview */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">
                    Konten Kursus
                  </h2>
                  <div className="space-y-3">
                    {course.courseContent.map((section, index) => (
                      <div
                        key={section.id}
                        className="border border-slate-200 rounded-lg overflow-hidden"
                      >
                        <div className="flex items-center justify-between p-4 bg-slate-50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-600">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">
                                {section.title}
                              </p>
                              <p className="text-sm text-slate-500">
                                {section.lessons.length} pelajaran • {section.duration}
                              </p>
                            </div>
                          </div>
                          <Lock className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 mt-4 text-center">
                    <Lock className="w-4 h-4 inline mr-1" />
                    Beli kursus untuk akses semua materi
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Purchase Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="shadow-xl border-2">
                  <CardContent className="p-6 space-y-6">
                    {/* Price */}
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-4xl font-bold text-slate-900">
                          {formatPrice(course.price)}
                        </span>
                        {discount > 0 && (
                          <Badge className="bg-red-100 text-red-600 border-0">
                            -{discount}%
                          </Badge>
                        )}
                      </div>
                      {course.originalPrice && (
                        <p className="text-slate-400 line-through mt-1">
                          {formatPrice(course.originalPrice)}
                        </p>
                      )}
                    </div>

                    {/* Verification Loading */}
                    {isVerifying && (
                      <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
                        <Loader2 className="w-4 h-4 flex-shrink-0 animate-spin" />
                        <span>Memverifikasi pembayaran...</span>
                      </div>
                    )}

                    {/* Error Message */}
                    {error && !isVerifying && (
                      <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Buy Button */}
                    <Button
                      onClick={handlePurchase}
                      disabled={isProcessing || isVerifying || !dbCourseId}
                      className="w-full h-14 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Memproses...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5 mr-2" />
                          Beli Sekarang
                        </>
                      )}
                    </Button>

                    {!dbCourseId && (
                      <p className="text-xs text-amber-600 text-center">
                        Kursus ini belum tersedia untuk pembelian.
                      </p>
                    )}

                    {/* Payment Methods */}
                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-sm text-slate-500 text-center mb-3">
                        Metode Pembayaran
                      </p>
                      <div className="flex justify-center gap-4 text-slate-400">
                        <div className="flex items-center gap-1 text-xs">
                          <CreditCard className="w-4 h-4" />
                          <span>Kartu Kredit</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Building2 className="w-4 h-4" />
                          <span>Transfer</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Wallet className="w-4 h-4" />
                          <span>E-Wallet</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="pt-4 border-t border-slate-200 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Akses selamanya</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>{course.totalLessons} video pembelajaran</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Sertifikat kelulusan</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Akses komunitas</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
