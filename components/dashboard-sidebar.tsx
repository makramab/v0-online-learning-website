"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Home, Settings, Users, HelpCircle, GraduationCap, PlayCircle, TrendingUp } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSidebar } from "@/contexts/sidebar-context"

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

// Mock user data
const userData = {
  name: "Budi Santoso",
  initials: "BS",
  level: "Learner",
  overallProgress: 45,
  coursesEnrolled: 3,
  lastCourse: {
    id: 1,
    title: "DV Lottery Masterclass",
    image: "/courses/1-TEDDY.jpg",
    progress: 45
  }
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const { showUserCards } = useSidebar()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-background border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 pb-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-xl font-bold">
            <span className="text-foreground">goto</span>
            <span className="text-primary">america</span>
          </div>
        </Link>
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
          <div className="bg-background rounded-xl p-3 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  src={userData.lastCourse.image}
                  alt={userData.lastCourse.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Continue Learning</p>
                <p className="text-xs font-semibold truncate">{userData.lastCourse.title}</p>
              </div>
            </div>
            <Link href={`/courses/${userData.lastCourse.id}`}>
              <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                <PlayCircle className="w-3 h-3 mr-1" />
                Resume
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* User Profile Card */}
      {showUserCards && (
        <div className="px-4 pb-4">
          <div className="bg-gradient-to-br from-[#1c9af1] to-[#1580d1] rounded-xl p-4 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-12 h-12 border-2 border-white/20">
                <AvatarFallback className="bg-white/10 text-white font-semibold text-base">
                  {userData.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-sm truncate">{userData.name}</p>
                <Badge className="bg-white/20 text-white hover:bg-white/20 text-xs mt-1">
                  {userData.level}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/80">Overall Progress</span>
                <span className="font-semibold">{userData.overallProgress}%</span>
              </div>
              <Progress value={userData.overallProgress} className="h-1.5 bg-white/20" />
              <div className="flex items-center gap-4 text-xs text-white/80 pt-1">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span>{userData.coursesEnrolled} courses</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Beginner</span>
                </div>
              </div>
            </div>
          </div>
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
  )
}
