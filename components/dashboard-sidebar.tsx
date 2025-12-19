"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Home, Settings, Users, HelpCircle, GraduationCap, PlayCircle, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/contexts/sidebar-context"
import { useContinueLearning } from "@/contexts/continue-learning-context"

const mainNavItems = [
  { href: "/dashboard", icon: Home, label: "Overview" },
  { href: "/courses", icon: BookOpen, label: "Course" },
  { href: "/courses/my-courses", icon: GraduationCap, label: "My Course" },
  { href: "/courses/community", icon: Users, label: "Community" },
]

const bottomNavItems = [
  { href: "/courses/settings", icon: Settings, label: "Settings" },
  { href: "/courses/support", icon: HelpCircle, label: "Support" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { showUserCards, mobileMenuOpen, setMobileMenuOpen } = useSidebar()
  const { lastActivity, isLoading: isLoadingActivity } = useContinueLearning()

  const handleLinkClick = () => {
    // Close mobile menu when a link is clicked
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-screen w-64 bg-background border-r border-border flex flex-col z-50 transition-transform duration-300",
        // Mobile: hidden by default, shown when mobileMenuOpen
        "max-lg:-translate-x-full",
        mobileMenuOpen && "max-lg:translate-x-0",
        // Desktop: always visible
        "lg:translate-x-0"
      )}>
      {/* Logo with close button for mobile */}
      <div className="p-6 pb-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={handleLinkClick}>
          <div className="text-xl font-bold">
            <span className="text-foreground">Awal</span>
            <span className="text-primary">Baru.com</span>
          </div>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Divider */}
      <div className="mb-4 border-t-2 border-[#1c9af1]"></div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto">
        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative",
                  isActive
                    ? "text-foreground bg-background before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary before:rounded-r"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50",
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Continue Learning Card */}
      {showUserCards && (
        <div className="px-4 pb-4">
          {isLoadingActivity ? (
            <div className="bg-background rounded-xl p-3 border border-border">
              <div className="flex items-center justify-center py-2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          ) : lastActivity ? (
            <div className="bg-background rounded-xl p-3 border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={lastActivity.courseImage}
                    alt={lastActivity.courseTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Continue Learning</p>
                  <p className="text-xs font-semibold truncate">{lastActivity.courseTitle}</p>
                </div>
              </div>
              <Link href={lastActivity.resumeLink} onClick={handleLinkClick}>
                <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <PlayCircle className="w-3 h-3 mr-1" />
                  Resume
                </Button>
              </Link>
            </div>
          ) : null}
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="p-4 space-y-1 border-t border-border">
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "text-foreground bg-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50",
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </aside>
    </>
  )
}
