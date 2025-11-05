"use client"

import { LandingHeader } from "@/components/landing-header"
import { LandingFooter } from "@/components/landing-footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HargaPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const pricingPlans = [
    {
      name: "GRATIS",
      price: 0,
      period: "Selamanya",
      description: "Mulai eksplorasi tanpa biaya",
      features: [
        "Akses kursus pengenalan",
        "Resource & panduan dasar",
        "Akses forum komunitas",
        "Tips mingguan via email",
      ],
      notIncluded: ["Kursus premium", "Q&A dengan Tedchay", "Sertifikat", "Support prioritas"],
      cta: "Mulai Gratis",
      popular: false,
      highlight: false,
    },
    {
      name: "BASIC",
      price: 299000,
      period: "per kursus",
      description: "Beli kursus yang Anda butuhkan",
      features: [
        "Pilih kursus individual",
        "Akses selamanya per kursus",
        "Materi bisa diunduh",
        "Sertifikat penyelesaian",
        "Update konten gratis",
      ],
      notIncluded: ["Akses semua kursus", "Q&A dengan Tedchay", "Support prioritas"],
      cta: "Lihat Kursus",
      popular: false,
      highlight: false,
    },
    {
      name: "PREMIUM",
      price: 1999000,
      period: "per tahun",
      description: "Untuk yang serius pindah ke Amerika",
      features: [
        "Akses SEMUA kursus unlimited",
        "Q&A bulanan dengan Tedchay",
        "Komunitas eksklusif premium",
        "Support prioritas",
        "Semua resource & template",
        "Update kursus baru gratis",
        "Webinar eksklusif",
        "Diskon 50% konsultasi",
      ],
      notIncluded: [],
      cta: "Mulai Premium",
      popular: true,
      highlight: true,
    },
    {
      name: "PLATINUM",
      price: 4999000,
      period: "per tahun",
      description: "Pendampingan lengkap & personal",
      features: [
        "Semua fitur PREMIUM",
        "1-on-1 coaching (4x/tahun)",
        "Roadmap personal khusus",
        "WhatsApp support langsung",
        "Review dokumen & aplikasi",
        "Akses konten sebelum rilis",
        "Networking dengan alumni",
        "Konsultasi unlimited",
      ],
      notIncluded: [],
      cta: "Hubungi Kami",
      popular: false,
      highlight: false,
    },
  ]

  const comparisonFeatures = [
    { feature: "Kursus Pengenalan", gratis: true, basic: true, premium: true, platinum: true },
    { feature: "Akses Forum Komunitas", gratis: true, basic: true, premium: true, platinum: true },
    { feature: "Kursus Individual", gratis: false, basic: "Per kursus", premium: true, platinum: true },
    { feature: "Akses Semua Kursus", gratis: false, basic: false, premium: true, platinum: true },
    { feature: "Q&A dengan Tedchay", gratis: false, basic: false, premium: "Bulanan", platinum: "Unlimited" },
    { feature: "Sertifikat Penyelesaian", gratis: false, basic: true, premium: true, platinum: true },
    { feature: "Support Prioritas", gratis: false, basic: false, premium: true, platinum: true },
    { feature: "1-on-1 Coaching", gratis: false, basic: false, premium: false, platinum: "4x/tahun" },
    { feature: "WhatsApp Support", gratis: false, basic: false, premium: false, platinum: true },
    { feature: "Review Dokumen", gratis: false, basic: false, premium: false, platinum: true },
  ]

  const faqs = [
    {
      question: "Metode pembayaran apa saja yang diterima?",
      answer:
        "Kami menerima transfer bank, GoPay, OVO, Dana, kartu kredit/debit, dan PayPal untuk pembayaran internasional.",
    },
    {
      question: "Apakah ada garansi uang kembali?",
      answer:
        "Ya! Kami memberikan garansi 30 hari uang kembali jika Anda tidak puas dengan kursus yang dibeli. Untuk paket Premium dan Platinum, garansi berlaku 14 hari.",
    },
    {
      question: "Berapa lama akses kursus berlaku?",
      answer:
        "Untuk pembelian kursus individual (Basic), akses berlaku selamanya. Paket Premium dan Platinum berlaku selama 1 tahun dan dapat diperpanjang.",
    },
    {
      question: "Apakah sertifikat diakui resmi?",
      answer:
        "Sertifikat penyelesaian kami menunjukkan komitmen belajar Anda. Meskipun bukan sertifikat resmi pemerintah, sertifikat ini berguna untuk portfolio dan menunjukkan persiapan Anda.",
    },
    {
      question: "Bisa upgrade dari Basic ke Premium?",
      answer:
        "Tentu! Anda bisa upgrade kapan saja dan kami akan menghitung kredit dari pembelian kursus Basic sebelumnya untuk paket Premium Anda.",
    },
  ]

  const formatPrice = (price: number) => {
    if (price === 0) return "Gratis"
    if (price >= 1000000) {
      return `Rp ${(price / 1000000).toFixed(1).replace(".0", "")}jt`
    }
    return `Rp ${(price / 1000).toFixed(0)}rb`
  }

  return (
    <main className="min-h-screen">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-block">
              <Badge className="bg-primary/20 text-primary border-primary px-4 py-2 text-sm font-semibold">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Diskon 50% untuk 100 pendaftar pertama
              </Badge>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Investasi untuk
              <br />
              <span className="text-primary">American Dream</span> Anda
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Pilih paket yang sesuai dengan kebutuhan dan budget Anda. Semua paket dirancang untuk membantu Anda
              selangkah lebih dekat dengan impian hidup di Amerika.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`
                  relative rounded-2xl p-8 border-2 transition-all duration-500 bg-card
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                  ${plan.highlight ? "border-primary shadow-2xl shadow-primary/20 scale-105 lg:scale-110" : "border-border"}
                  hover:scale-105 hover:shadow-2xl
                  ${plan.highlight ? "bg-gradient-to-br from-primary/5 to-background" : ""}
                `}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-black font-bold px-4 py-1 animate-pulse">
                      ⭐ PALING POPULER
                    </Badge>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-primary">{formatPrice(plan.price)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{plan.period}</p>
                  </div>

                  <Link href="/courses">
                    <Button
                      className={`w-full font-semibold ${
                        plan.highlight
                          ? "bg-primary text-black hover:bg-primary/90 animate-bounce"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>

                  <div className="space-y-3">
                    <p className="text-sm font-semibold">Yang Anda dapatkan:</p>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.length > 0 && (
                      <>
                        <div className="border-t pt-3 mt-3">
                          <p className="text-sm font-semibold text-muted-foreground mb-3">Tidak termasuk:</p>
                          {plan.notIncluded.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3 mb-2">
                              <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Perbandingan Detail</h2>
            <p className="text-muted-foreground text-lg">Lihat fitur lengkap setiap paket</p>
          </div>

          <div className="max-w-6xl mx-auto overflow-x-auto">
            <table className="w-full bg-card rounded-xl border">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-bold">Fitur</th>
                  <th className="text-center p-4 font-bold">Gratis</th>
                  <th className="text-center p-4 font-bold">Basic</th>
                  <th className="text-center p-4 font-bold bg-primary/10">Premium</th>
                  <th className="text-center p-4 font-bold">Platinum</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((item, index) => (
                  <tr key={index} className="border-b last:border-b-0 hover:bg-muted/50">
                    <td className="p-4">{item.feature}</td>
                    <td className="text-center p-4">
                      {typeof item.gratis === "boolean" ? (
                        item.gratis ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <span className="text-sm">{item.gratis}</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {typeof item.basic === "boolean" ? (
                        item.basic ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <span className="text-sm">{item.basic}</span>
                      )}
                    </td>
                    <td className="text-center p-4 bg-primary/5">
                      {typeof item.premium === "boolean" ? (
                        item.premium ? (
                          <Check className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <span className="text-sm font-semibold text-primary">{item.premium}</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {typeof item.platinum === "boolean" ? (
                        item.platinum ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <span className="text-sm">{item.platinum}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-muted-foreground text-lg">Masih ada pertanyaan? Kami siap membantu!</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">Tidak Yakin Paket Mana yang Tepat?</h2>
            <p className="text-xl text-gray-400">
              Tim kami siap membantu Anda memilih paket yang paling sesuai dengan kebutuhan dan situasi Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button size="lg" className="bg-primary text-black hover:bg-primary/90 font-semibold px-8">
                  Konsultasi Gratis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/tentang">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-black border-2 border-primary text-white hover:bg-primary hover:text-black"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  )
}
