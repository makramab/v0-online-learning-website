"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Home, Lightbulb, Settings, Users, HelpCircle, GraduationCap } from "lucide-react"

const mainNavItems = [
  { href: "/courses", icon: Home, label: "Overview" },
  { href: "/courses", icon: BookOpen, label: "Course" },
  { href: "/courses/my-courses", icon: GraduationCap, label: "My Course" },
  { href: "/courses/progress", icon: Lightbulb, label: "Learning Progress" },
  { href: "/courses/community", icon: Users, label: "Community" },
]

const workspaceNavItems = [
  { href: "/courses/workspace", icon: Home, label: "Overview", badge: "NEW" },
  { href: "/courses/workspace/progress", icon: Lightbulb, label: "Learning Progress" },
  { href: "/courses/workspace/my-course", icon: GraduationCap, label: "My Course" },
  { href: "/courses/workspace/community", icon: Users, label: "Community", badge: "BETA" },
]

const bottomNavItems = [
  { href: "/courses/settings", icon: Settings, label: "Settings" },
  { href: "/courses/support", icon: HelpCircle, label: "Support" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-muted border-r border-border flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-xl font-bold">
            <span className="text-foreground">goto</span>
            <span className="text-primary">america</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-8 overflow-y-auto">
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

        <div className="space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Workspace
          </div>
          {workspaceNavItems.map((item) => {
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
                {item.badge && (
                  <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>

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
