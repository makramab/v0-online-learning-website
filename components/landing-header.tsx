"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, Settings, LogOut, LayoutDashboard, User as UserIcon } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { signOut } from "@/lib/actions/auth"
import type { User } from "@supabase/supabase-js"

// Helper function to get user display name
function getUserDisplayName(user: User | null): string {
  if (!user) return ""
  return user.user_metadata?.full_name || user.email?.split("@")[0] || "User"
}

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    // Get initial user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await signOut()
  }

  const displayName = getUserDisplayName(user)

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
            {isLoading ? (
              // Loading state
              <div className="w-20 h-9 bg-slate-100 animate-pulse rounded-md" />
            ) : user ? (
              // Logged in state - Pill button with icon + text
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors duration-200 cursor-pointer">
                    <UserIcon className="w-5 h-5 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">Akun Saya</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/courses" className="cursor-pointer font-medium text-[#1c9af1]">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/courses/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Pengaturan</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Logged out state
              <>
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
                    Daftar
                  </Button>
                </Link>
              </>
            )}
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

            {isLoading ? (
              // Loading state
              <div className="w-full h-10 bg-slate-100 animate-pulse rounded-md" />
            ) : user ? (
              // Logged in state - Mobile
              <>
                <div className="flex items-center gap-3 py-3 border-t border-slate-100 mt-2 pt-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{displayName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Link
                  href="/courses"
                  className="flex items-center gap-2 text-[#1c9af1] hover:text-[#1580d1] transition-colors text-base font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  href="/courses/settings"
                  className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors text-base font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  Pengaturan
                </Link>
                <button
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors text-base font-medium py-2 w-full text-left"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    handleLogout()
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              // Logged out state - Mobile
              <>
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
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
