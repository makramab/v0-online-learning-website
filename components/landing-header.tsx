"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/awalbaru-logo.jpeg"
              alt="AwalBaru.com Logo"
              width={40}
              height={40}
              className="object-contain rounded-md sm:w-[50px] sm:h-[50px]"
              priority
            />
            <div className="text-lg sm:text-xl font-bold">
              <span className="text-slate-800">Awal</span>
              <span className="text-primary">Baru.com</span>
            </div>
          </Link>

          {/* Center Navigation - Desktop */}
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

          {/* Right Actions - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/masuk"
              className="text-slate-600 hover:text-primary transition-colors text-base font-medium"
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-primary"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/courses"
              className="text-slate-600 hover:text-primary transition-colors text-base font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kursus
            </Link>
            <Link
              href="/tentang"
              className="text-slate-600 hover:text-primary transition-colors text-base font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tentang Tedchay
            </Link>
            <Link
              href="/harga"
              className="text-slate-600 hover:text-primary transition-colors text-base font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Harga
            </Link>
            <Link
              href="/masuk"
              className="text-slate-600 hover:text-primary transition-colors text-base font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Masuk
            </Link>
            <Link href="/daftar" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="default"
                className="w-full bg-red-600 text-white hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
              >
                Daftar Gratis
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
