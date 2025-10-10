"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Apple } from "lucide-react"

export function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-white">
              Tedchay <span className="text-primary">Academy</span>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/courses" className="text-white hover:text-primary transition-colors text-base font-medium">
              Courses
            </Link>
            <Link href="/tutorials" className="text-white hover:text-primary transition-colors text-base font-medium">
              Tutorials
            </Link>
            <Link href="/pricing" className="text-white hover:text-primary transition-colors text-base font-medium">
              Pricing
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-white hover:text-primary transition-colors text-base font-medium hidden sm:block"
            >
              Log In
            </Link>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black transition-all bg-transparent"
            >
              <Apple className="w-4 h-4 mr-2" />
              Download App
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
