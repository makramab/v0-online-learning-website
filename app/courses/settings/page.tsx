"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Save, AlertTriangle } from "lucide-react"
import { useState } from "react"

// Mock user data
const userData = {
  name: "Budi Santoso",
  email: "budi.santoso@email.com",
  initials: "BS",
}

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [courseUpdates, setCourseUpdates] = useState(true)
  const [communityNotifications, setCommunityNotifications] = useState(false)

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 ml-64">
        <DashboardHeader />
        <main className="p-8 space-y-8 max-w-4xl">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Pengaturan</h1>
            <p className="text-muted-foreground">Kelola profil dan preferensi akun Anda</p>
          </div>

          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Profil</CardTitle>
              <CardDescription>Informasi pribadi dan foto profil Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24 border-4 border-[#1c9af1]">
                  <AvatarFallback className="bg-[#1c9af1] text-white text-2xl font-semibold">
                    {userData.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="gap-2">
                    <Camera className="w-4 h-4" />
                    Ubah Foto
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG. Max 2MB</p>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" defaultValue={userData.name} />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={userData.email} />
              </div>

              <Button className="bg-[#1c9af1] hover:bg-[#1580d1] text-white">
                <Save className="w-4 h-4 mr-2" />
                Simpan Perubahan
              </Button>
            </CardContent>
          </Card>

          {/* Password */}
          <Card>
            <CardHeader>
              <CardTitle>Keamanan</CardTitle>
              <CardDescription>Kelola password dan keamanan akun Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Password Saat Ini</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Password Baru</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button className="bg-[#1c9af1] hover:bg-[#1580d1] text-white">
                <Save className="w-4 h-4 mr-2" />
                Ubah Password
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notifikasi</CardTitle>
              <CardDescription>Pilih notifikasi yang ingin Anda terima</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notifikasi Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Terima email tentang aktivitas akun Anda
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="course-updates">Update Kursus</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifikasi ketika ada pelajaran atau konten baru
                  </p>
                </div>
                <Switch
                  id="course-updates"
                  checked={courseUpdates}
                  onCheckedChange={setCourseUpdates}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="community-notifications">Notifikasi Komunitas</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifikasi balasan dan mention di komunitas
                  </p>
                </div>
                <Switch
                  id="community-notifications"
                  checked={communityNotifications}
                  onCheckedChange={setCommunityNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Preferensi</CardTitle>
              <CardDescription>Sesuaikan pengalaman belajar Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Bahasa</Label>
                <Select defaultValue="id">
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="video-quality">Kualitas Video Default</Label>
                <Select defaultValue="auto">
                  <SelectTrigger id="video-quality">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Otomatis</SelectItem>
                    <SelectItem value="1080p">1080p (HD)</SelectItem>
                    <SelectItem value="720p">720p</SelectItem>
                    <SelectItem value="480p">480p</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Zona Berbahaya
              </CardTitle>
              <CardDescription>Tindakan permanen yang tidak dapat dibatalkan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <p className="font-semibold text-red-900">Hapus Akun</p>
                  <p className="text-sm text-red-700">
                    Hapus akun dan semua data Anda secara permanen
                  </p>
                </div>
                <Button variant="destructive">Hapus Akun</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
