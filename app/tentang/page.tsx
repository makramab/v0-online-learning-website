import { LandingHeader } from "@/components/landing-header"
import { LandingFooter } from "@/components/landing-footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Users, BookOpen, Heart, CheckCircle2, Home, Trophy, Ticket, Plane, Building2, Sparkles, Video, Star, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function TentangPage() {
  const journeySteps = [
    {
      year: "1990-an",
      title: "Tumbuh di Indonesia",
      description: "Dibesarkan di Indonesia dengan mimpi untuk mencapai kesuksesan dan membuat keluarga bangga.",
      icon: Home,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      year: "2010-an",
      title: "Master Chef Indonesia",
      description:
        "Berkompetisi di Master Chef Indonesia, membuktikan kemampuan kuliner dan mental yang kuat di panggung nasional.",
      icon: Trophy,
      gradient: "from-cyan-500 to-blue-400"
    },
    {
      year: "2015",
      title: "Mencoba DV Lottery",
      description:
        "Memutuskan untuk mencoba peruntungan di DV Lottery Program, dengan harapan bisa membuka peluang baru di Amerika.",
      icon: Ticket,
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      year: "2016",
      title: "Menang DV Lottery!",
      description:
        "Menerima kabar gembira - terpilih sebagai pemenang DV Lottery. Perjalanan baru dimulai dengan proses visa dan persiapan.",
      icon: Award,
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      year: "2017",
      title: "Pindah ke Amerika Serikat",
      description:
        "Akhirnya menginjakkan kaki di tanah Amerika, memulai kehidupan baru dengan tantangan dan peluang yang berbeda.",
      icon: Plane,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      year: "2020-an",
      title: "Membangun AwalBaru.com",
      description:
        "Setelah beradaptasi dan sukses di Amerika, memutuskan untuk membantu orang Indonesia lain meraih American Dream mereka melalui platform AwalBaru.com.",
      icon: Building2,
      gradient: "from-pink-500 to-rose-500"
    },
  ]

  const credentials = [
    { icon: Award, title: "Kontestan Master Chef Indonesia", description: "Pengalaman berkompetisi di tingkat nasional" },
    { icon: CheckCircle2, title: "DV Lottery Winner", description: "Berhasil memenangkan dan menyelesaikan proses" },
    { icon: Users, title: "YouTuber & Content Creator", description: "Ribuan subscriber dan followers setia" },
    { icon: BookOpen, title: "Instruktur Berpengalaman", description: "Mengajar berdasarkan pengalaman nyata" },
  ]

  const impactStats = [
    { number: "1000+", label: "Siswa Terdaftar", icon: Users },
    { number: "50+", label: "Video Pembelajaran", icon: Video },
    { number: "150+", label: "Success Stories", icon: Sparkles },
    { number: "4.9/5", label: "Rating Rata-rata", icon: Star },
  ]

  return (
    <main className="min-h-screen">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative bg-background pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Tentang Pendiri
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Dari Master Chef Indonesia
                <br />
                ke <span className="text-primary">American Dream</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hai, saya Tedchay! Saya adalah mantan kontestan Master Chef Indonesia yang kini tinggal di Amerika
                Serikat. Perjalanan saya dari Indonesia ke Amerika melalui DV Lottery bukan hal yang mudah, tapi sangat
                mungkin dicapai. Kini, saya ingin membantu Anda meraih impian yang sama.
              </p>
              <div className="flex gap-4">
                <Link href="/courses">
                  <Button size="lg" className="bg-primary text-black hover:bg-primary/90 font-semibold">
                    Lihat Kursus Saya
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="https://www.youtube.com/@tedchay" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-black">
                    YouTube Channel
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative h-[500px] lg:h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl"></div>
              <Image
                src="https://i.imgur.com/7mBrsxk.png"
                alt="Tedchay"
                fill
                className="object-cover rounded-3xl"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Perjalanan Saya</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Dari Indonesia hingga Amerika Serikat, setiap langkah adalah pembelajaran yang ingin saya bagikan kepada
              Anda.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {journeySteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shrink-0 shadow-lg`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      {index < journeySteps.length - 1 && (
                        <div className="w-0.5 h-full bg-gradient-to-b from-primary/50 to-primary/20 group-last:hidden mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="bg-card border rounded-xl p-6 hover:shadow-xl hover:border-primary/30 transition-all">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="text-sm text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">
                            {step.year}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background border-t">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Kenapa Saya Membuat AwalBaru.com?</h2>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-transparent border-2 border-primary/20 rounded-2xl p-8 lg:p-12 space-y-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Heart className="w-7 h-7 text-primary" />
                </div>
                <p className="text-lg leading-relaxed">
                  Setelah berhasil melalui proses DV Lottery dan beradaptasi di Amerika, saya menyadari betapa banyak
                  orang Indonesia yang bermimpi sama seperti saya dulu. Namun, informasi yang tersedia seringkali tidak
                  lengkap, membingungkan, atau bahkan menyesatkan.
                </p>
              </div>
              <p className="text-lg leading-relaxed pl-18">
                AwalBaru.com lahir dari keinginan saya untuk membagikan pengalaman nyata - bukan teori dari buku,
                tapi langkah-langkah praktis yang saya sendiri jalani. Saya ingin memastikan bahwa setiap orang
                Indonesia yang punya mimpi untuk hidup di Amerika memiliki panduan yang jelas, jujur, dan dapat
                dipercaya.
              </p>
              <div className="pl-18 bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg">
                <p className="text-lg leading-relaxed font-semibold text-primary italic">
                  "Jika saya bisa, kalian juga pasti bisa. Yang Anda butuhkan hanya panduan yang tepat dan tekad yang
                  kuat."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Kredensial & Pengalaman</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Kombinasi pengalaman kuliner, perjalanan imigrasi, dan passion berbagi pengetahuan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {credentials.map((cred, index) => {
              const Icon = cred.icon
              return (
                <div
                  key={index}
                  className="bg-card border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{cred.title}</h3>
                  <p className="text-sm text-muted-foreground">{cred.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-background border-t">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Dampak yang Telah Kami Ciptakan</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Membantu ribuan orang Indonesia selangkah lebih dekat dengan American Dream mereka.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-5xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10 border-t">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">Siap Memulai Perjalanan Anda?</h2>
            <p className="text-xl text-muted-foreground">
              Bergabunglah dengan ribuan orang Indonesia lainnya yang telah memulai perjalanan mereka menuju American
              Dream.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button size="lg" className="bg-primary text-black hover:bg-primary/90 font-semibold px-8">
                  Mulai Belajar Sekarang
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-black"
                >
                  Kembali ke Beranda
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
