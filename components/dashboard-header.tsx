"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, Trophy, Crown, User, Settings, LogOut, CheckCheck, PlayCircle, Users, Award } from "lucide-react"
import { useSidebar } from "@/contexts/sidebar-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock user data
const userData = {
  name: "Budi Santoso",
  email: "budi.santoso@email.com",
  initials: "BS",
}

// Mock notifications
const notifications = [
  {
    id: 1,
    type: "course",
    icon: PlayCircle,
    title: "Pelajaran Baru Ditambahkan",
    message: "DV Lottery Masterclass - Lesson 6 tersedia",
    time: "5 menit lalu",
    unread: true,
    link: "/courses/1"
  },
  {
    id: 2,
    type: "achievement",
    icon: Award,
    title: "Selamat! Sertifikat Tersedia",
    message: "Anda telah menyelesaikan Tourist Visa to USA",
    time: "1 jam lalu",
    unread: true,
    link: "/courses/my-courses"
  },
  {
    id: 3,
    type: "community",
    icon: Users,
    title: "Balasan Baru di Komunitas",
    message: "Andi Wijaya membalas diskusi Anda",
    time: "3 jam lalu",
    unread: false,
    link: "/courses/community"
  },
  {
    id: 4,
    type: "course",
    icon: CheckCheck,
    title: "Progress Update",
    message: "Anda telah mencapai 50% di Beasiswa Fullbright",
    time: "Yesterday",
    unread: false,
    link: "/courses/3"
  }
]

export function DashboardHeader() {
  const { toggleUserCards } = useSidebar()
  const router = useRouter()

  const handleLogout = () => {
    // TODO: Implement actual logout logic here (clear auth tokens, etc.)
    console.log("Logout clicked - redirecting to home page")
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari kursus atau topik..."
              className="pl-10 bg-muted border-0 focus-visible:ring-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleUserCards}
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors cursor-pointer"
          >
            <Trophy className="w-5 h-5 text-primary" />
            <span>12 Kursus Selesai</span>
          </button>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end" forceMount>
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifikasi</span>
                {notifications.filter(n => n.unread).length > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {notifications.filter(n => n.unread).length} baru
                  </Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.map((notification) => {
                  const Icon = notification.icon
                  return (
                    <DropdownMenuItem key={notification.id} asChild>
                      <Link
                        href={notification.link}
                        className={`cursor-pointer p-3 ${notification.unread ? 'bg-blue-50/50' : ''}`}
                      >
                        <div className="flex gap-3 w-full">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            notification.type === 'course' ? 'bg-blue-100' :
                            notification.type === 'achievement' ? 'bg-yellow-100' :
                            'bg-purple-100'
                          }`}>
                            <Icon className={`w-5 h-5 ${
                              notification.type === 'course' ? 'text-blue-600' :
                              notification.type === 'achievement' ? 'text-yellow-600' :
                              'text-purple-600'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold mb-0.5">{notification.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/courses/notifications" className="cursor-pointer text-center justify-center text-[#1c9af1] font-medium">
                  Lihat Semua Notifikasi
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Avatar Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-[#1c9af1] text-white font-semibold">{userData.initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userData.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userData.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/courses/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="bg-red-600 text-white hover:bg-red-700 font-semibold gap-2 shadow-md">
            <Crown className="w-4 h-4" />
            Premium
          </Button>
        </div>
      </div>
    </header>
  )
}
