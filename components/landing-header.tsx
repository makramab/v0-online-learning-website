"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Apple } from "lucide-react"

export function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              <span className="text-slate-800">Awal</span>
              <span className="text-primary">Baru.com</span>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/courses" className="text-slate-600 hover:text-primary transition-colors text-base font-medium">
              Kursus
            </Link>
            <Link href="/tentang" className="text-slate-600 hover:text-primary transition-colors text-base font-medium">
              Tentang Tedchay
            </Link>
            <Link href="/harga" className="text-slate-600 hover:text-primary transition-colors text-base font-medium">
              Harga
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/masuk"
              className="text-slate-600 hover:text-primary transition-colors text-base font-medium hidden sm:block"
            >
              Masuk
            </Link>
            <Link href="/daftar">
              <Button
                variant="default"
                className="bg-red-600 text-white hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
              >
                Daftar Gratis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
