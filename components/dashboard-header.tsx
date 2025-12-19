"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, Settings, LogOut, PlayCircle, Users, Award, Menu, Megaphone, BellOff, Handshake, CreditCard } from "lucide-react"
import { useSidebar } from "@/contexts/sidebar-context"
import { useUser, getUserDisplayName } from "@/contexts/user-context"
import { useNotifications, formatRelativeTime } from "@/contexts/notification-context"
import { UserAvatar } from "@/components/user-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { signOut } from "@/lib/actions/auth"
import type { NotificationType } from "@/lib/actions/notifications"
import type { LucideIcon } from "lucide-react"

// Map notification types to icons and colors
const notificationConfig: Record<NotificationType, { icon: LucideIcon; bgColor: string; iconColor: string }> = {
  course: { icon: PlayCircle, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
  achievement: { icon: Award, bgColor: "bg-yellow-100", iconColor: "text-yellow-600" },
  community: { icon: Users, bgColor: "bg-purple-100", iconColor: "text-purple-600" },
  system: { icon: Megaphone, bgColor: "bg-slate-100", iconColor: "text-slate-600" },
  payment: { icon: CreditCard, bgColor: "bg-green-100", iconColor: "text-green-600" },
}

// Get time-based greeting in Indonesian
function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 11) return "Selamat pagi"
  if (hour >= 11 && hour < 15) return "Selamat siang"
  if (hour >= 15 && hour < 18) return "Selamat sore"
  return "Selamat malam"
}

// Get user's first name
function getFirstName(fullName: string): string {
  return fullName.split(" ")[0]
}

export function DashboardHeader() {
  const { toggleMobileMenu } = useSidebar()
  const { user, isLoading } = useUser()
  const { notifications, unreadCount, isLoading: notificationsLoading, markAsRead, markAllAsRead } = useNotifications()
  const displayName = getUserDisplayName(user)

  const handleLogout = async () => {
    await signOut()
  }

  const handleNotificationClick = async (notificationId: string, isRead: boolean) => {
    if (!isRead) {
      await markAsRead(notificationId)
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search bar */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4 lg:mx-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari kursus..."
              className="pl-10 bg-muted border-0 focus-visible:ring-1 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Welcome message - hidden on mobile */}
          <div className="hidden sm:block text-sm text-muted-foreground">
            {isLoading ? (
              <div className="w-32 h-5 bg-muted animate-pulse rounded" />
            ) : (
              <span className="flex items-center gap-1.5">
                {getGreeting()}, <span className="font-medium text-foreground">{getFirstName(displayName)}</span>
                <Handshake className="w-4 h-4 text-red-600" />
              </span>
            )}
          </div>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end" forceMount>
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifikasi</span>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {unreadCount} baru
                  </Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[400px] overflow-y-auto">
                {notificationsLoading ? (
                  // Loading state
                  <div className="p-4 text-center">
                    <div className="w-8 h-8 border-2 border-[#1c9af1] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">Memuat notifikasi...</p>
                  </div>
                ) : notifications.length === 0 ? (
                  // Empty state
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                      <BellOff className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Tidak ada notifikasi</p>
                    <p className="text-xs text-muted-foreground">
                      Notifikasi baru akan muncul di sini
                    </p>
                  </div>
                ) : (
                  // Notifications list
                  notifications.map((notification) => {
                    const config = notificationConfig[notification.type] || notificationConfig.system
                    const Icon = config.icon
                    return (
                      <DropdownMenuItem key={notification.id} asChild>
                        <Link
                          href={notification.link || "/courses"}
                          className={`cursor-pointer p-3 ${!notification.is_read ? 'bg-blue-50/50' : ''}`}
                          onClick={() => handleNotificationClick(notification.id, notification.is_read)}
                        >
                          <div className="flex gap-3 w-full">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${config.bgColor}`}>
                              <Icon className={`w-5 h-5 ${config.iconColor}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold mb-0.5">{notification.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatRelativeTime(notification.created_at)}
                              </p>
                            </div>
                            {!notification.is_read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                            )}
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    )
                  })
                )}
              </div>
              {notifications.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <div className="flex items-center justify-between px-2 py-1">
                    {unreadCount > 0 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          markAllAsRead()
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Tandai semua dibaca
                      </button>
                    )}
                    <Link
                      href="/courses/notifications"
                      className="text-xs text-[#1c9af1] hover:text-[#1580d1] font-medium ml-auto"
                    >
                      Lihat Semua
                    </Link>
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Avatar Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-[3px] rounded-full bg-gradient-to-br from-[#1580d1] via-[#1c9af1] to-[#50b8f5] hover:scale-110 transition-transform duration-200 cursor-pointer">
                <UserAvatar size="md" showLoading={false} className="border-2 border-white" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {isLoading ? "Loading..." : displayName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {isLoading ? "" : user?.email || ""}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/courses/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Pengaturan</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
