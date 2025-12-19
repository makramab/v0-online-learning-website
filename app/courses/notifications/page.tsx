"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  BellOff,
  PlayCircle,
  Award,
  Users,
  Megaphone,
  CreditCard,
  CheckCheck,
  Trash2,
  Filter
} from "lucide-react"
import Link from "next/link"
import { useNotifications, formatRelativeTime } from "@/contexts/notification-context"
import { deleteNotification } from "@/lib/actions/notifications"
import type { NotificationType } from "@/lib/actions/notifications"
import type { LucideIcon } from "lucide-react"
import { useState } from "react"

// Map notification types to icons and colors (same as dashboard-header)
const notificationConfig: Record<NotificationType, { icon: LucideIcon; bgColor: string; iconColor: string; label: string }> = {
  course: { icon: PlayCircle, bgColor: "bg-blue-100", iconColor: "text-blue-600", label: "Kursus" },
  achievement: { icon: Award, bgColor: "bg-yellow-100", iconColor: "text-yellow-600", label: "Pencapaian" },
  community: { icon: Users, bgColor: "bg-purple-100", iconColor: "text-purple-600", label: "Komunitas" },
  system: { icon: Megaphone, bgColor: "bg-slate-100", iconColor: "text-slate-600", label: "Sistem" },
  payment: { icon: CreditCard, bgColor: "bg-green-100", iconColor: "text-green-600", label: "Pembayaran" },
}

type FilterType = "all" | "unread" | NotificationType

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    refreshNotifications
  } = useNotifications()

  const [filter, setFilter] = useState<FilterType>("all")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (notificationId: string) => {
    setDeletingId(notificationId)
    await deleteNotification(notificationId)
    await refreshNotifications()
    setDeletingId(null)
  }

  const handleMarkAsRead = async (notificationId: string, isRead: boolean) => {
    if (!isRead) {
      await markAsRead(notificationId)
    }
  }

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.is_read
    return notification.type === filter
  })

  // Get unique notification types for filter buttons
  const notificationTypes = Array.from(new Set(notifications.map(n => n.type)))

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 ml-64">
        <DashboardHeader />
        <main className="p-8 space-y-6 max-w-4xl">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">Notifikasi</h1>
              <p className="text-muted-foreground">
                {unreadCount > 0
                  ? `Anda memiliki ${unreadCount} notifikasi belum dibaca`
                  : "Semua notifikasi sudah dibaca"
                }
              </p>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={markAllAsRead}
                className="gap-2"
              >
                <CheckCheck className="w-4 h-4" />
                Tandai Semua Dibaca
              </Button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-[#1c9af1] hover:bg-[#1580d1]" : ""}
            >
              <Filter className="w-4 h-4 mr-1" />
              Semua
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unread")}
              className={filter === "unread" ? "bg-[#1c9af1] hover:bg-[#1580d1]" : ""}
            >
              Belum Dibaca
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2 bg-white/20">
                  {unreadCount}
                </Badge>
              )}
            </Button>
            {notificationTypes.map(type => {
              const config = notificationConfig[type]
              return (
                <Button
                  key={type}
                  variant={filter === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(type)}
                  className={filter === type ? "bg-[#1c9af1] hover:bg-[#1580d1]" : ""}
                >
                  {config.label}
                </Button>
              )
            })}
          </div>

          {/* Notifications List */}
          {isLoading ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-10 h-10 border-2 border-[#1c9af1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Memuat notifikasi...</p>
              </CardContent>
            </Card>
          ) : filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <BellOff className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Tidak Ada Notifikasi</h3>
                <p className="text-muted-foreground">
                  {filter === "all"
                    ? "Belum ada notifikasi untuk ditampilkan"
                    : filter === "unread"
                    ? "Semua notifikasi sudah dibaca"
                    : `Tidak ada notifikasi ${notificationConfig[filter as NotificationType]?.label.toLowerCase()}`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => {
                const config = notificationConfig[notification.type] || notificationConfig.system
                const Icon = config.icon
                const isDeleting = deletingId === notification.id

                return (
                  <Card
                    key={notification.id}
                    className={`transition-all ${!notification.is_read ? 'border-[#1c9af1]/30 bg-blue-50/30' : ''} ${isDeleting ? 'opacity-50' : ''}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${config.bgColor}`}>
                          <Icon className={`w-6 h-6 ${config.iconColor}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{notification.title}</h3>
                                {!notification.is_read && (
                                  <span className="w-2 h-2 bg-[#1c9af1] rounded-full"></span>
                                )}
                              </div>
                              <p className="text-muted-foreground text-sm mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>{formatRelativeTime(notification.created_at)}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {config.label}
                                </Badge>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {notification.link && (
                                <Link href={notification.link}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleMarkAsRead(notification.id, notification.is_read)}
                                  >
                                    Lihat
                                  </Button>
                                </Link>
                              )}
                              {!notification.is_read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  title="Tandai sudah dibaca"
                                >
                                  <CheckCheck className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(notification.id)}
                                disabled={isDeleting}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                title="Hapus notifikasi"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Info Card */}
          {notifications.length > 0 && (
            <Card className="bg-slate-50 border-slate-200">
              <CardContent className="p-4 flex items-center gap-3">
                <Bell className="w-5 h-5 text-slate-500" />
                <p className="text-sm text-muted-foreground">
                  Notifikasi akan otomatis diperbarui setiap 60 detik. Total {notifications.length} notifikasi.
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
