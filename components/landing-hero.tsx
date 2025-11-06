"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function LandingHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1580d1] via-[#1c9af1] to-[#50b8f5] text-white pt-32 pb-16 overflow-hidden">
      {/* Subtle American flag stripes decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <div className="h-full flex flex-col">
          <div className="flex-1 bg-red-600"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-red-600"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-red-600"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="relative inline-block">
                  <span className="relative z-10 text-white">WUJUDKAN</span>
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                </span>
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-white">IMPIAN HIDUP DI </span>
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                </span>
                <span className="relative inline-block">
                  <span className="relative z-10 text-white">AMERIKA</span>
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                </span>
              </h1>
            </div>

            <p className="text-lg text-white/80 max-w-xl leading-relaxed">
              Bergabunglah dengan gotoamerica — platform pembelajaran yang membantu orang Indonesia mewujudkan impian tinggal dan berkembang di Amerika Serikat. Dipandu langsung oleh Tedchay yang telah merasakan perjalanan ini.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/daftar">
                <Button
                  size="lg"
                  className="bg-red-600 text-white hover:bg-red-700 font-semibold text-base px-8 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all"
                >
                  Mulai Belajar
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/10 border-2 border-white/30 font-semibold text-base"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Tonton Cerita Tedchay
              </Button>
            </div>
          </div>

          {/* Right Column - Tedchay Hero Image */}
          <div className="relative h-[750px] hidden lg:flex items-center justify-end">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-white/5 rounded-3xl blur-3xl"></div>

              {/* Tedchay Image */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <div className="relative w-[625px] h-[700px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                  <Image
                    src="/tedchay-hero.png"
                    alt="Tedchay - Jr. Sous Chef in New York, USA"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-10 -right-10 bg-red-600 text-white px-8 py-4 rounded-xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform">
                  <div className="text-base font-bold">✓ DV Lottery Winner</div>
                  <div className="text-sm opacity-90">Living the American Dream</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
