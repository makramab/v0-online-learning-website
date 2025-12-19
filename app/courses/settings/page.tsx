"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Save, AlertTriangle, Loader2, Trash2, Check, X } from "lucide-react"
import { useState, useRef } from "react"
import { useUser, getUserDisplayName, getUserInitials, getUserAvatarUrl } from "@/contexts/user-context"
import { updateProfile, uploadAvatar, deleteAvatar, updatePassword } from "@/lib/actions/auth"

export default function SettingsPage() {
  const { user, isLoading: userLoading, refreshUser } = useUser()

  // Profile state
  const [name, setName] = useState("")
  const [isProfileSaving, setIsProfileSaving] = useState(false)
  const [profileMessage, setProfileMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Avatar state
  const [isAvatarUploading, setIsAvatarUploading] = useState(false)
  const [avatarMessage, setAvatarMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Password state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isPasswordSaving, setIsPasswordSaving] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Notification preferences (placeholder)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [courseUpdates, setCourseUpdates] = useState(true)
  const [communityNotifications, setCommunityNotifications] = useState(false)

  // Initialize name from user data when loaded
  const displayName = getUserDisplayName(user)
  const initials = getUserInitials(user)
  const avatarUrl = getUserAvatarUrl(user)

  // Set initial name value when user loads
  if (user && !name && displayName) {
    setName(displayName)
  }

  // Handle profile save
  const handleProfileSave = async () => {
    if (!name.trim()) {
      setProfileMessage({ type: "error", text: "Nama tidak boleh kosong" })
      return
    }

    setIsProfileSaving(true)
    setProfileMessage(null)

    const result = await updateProfile(name.trim())

    if (result.error) {
      setProfileMessage({ type: "error", text: result.error })
    } else {
      setProfileMessage({ type: "success", text: "Profil berhasil diperbarui" })
      await refreshUser()
    }

    setIsProfileSaving(false)
  }

  // Handle avatar file selection
  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      setAvatarMessage({ type: "error", text: "File harus berformat JPG, PNG, atau WebP" })
      return
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024
    if (file.size > maxSize) {
      setAvatarMessage({ type: "error", text: "Ukuran file maksimal 2MB" })
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload immediately
    handleAvatarUpload(file)
  }

  // Handle avatar upload
  const handleAvatarUpload = async (file: File) => {
    setIsAvatarUploading(true)
    setAvatarMessage(null)

    const formData = new FormData()
    formData.append("avatar", file)

    const result = await uploadAvatar(formData)

    if (result.error) {
      setAvatarMessage({ type: "error", text: result.error })
      setAvatarPreview(null)
    } else {
      setAvatarMessage({ type: "success", text: "Foto profil berhasil diperbarui" })
      await refreshUser()
    }

    setIsAvatarUploading(false)
    setAvatarPreview(null)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Handle avatar delete
  const handleAvatarDelete = async () => {
    setIsAvatarUploading(true)
    setAvatarMessage(null)

    const result = await deleteAvatar()

    if (result.error) {
      setAvatarMessage({ type: "error", text: result.error })
    } else {
      setAvatarMessage({ type: "success", text: "Foto profil berhasil dihapus" })
      await refreshUser()
    }

    setIsAvatarUploading(false)
  }

  // Handle password change
  const handlePasswordChange = async () => {
    // Validation
    if (!newPassword) {
      setPasswordMessage({ type: "error", text: "Password baru wajib diisi" })
      return
    }

    if (newPassword.length < 8) {
      setPasswordMessage({ type: "error", text: "Password minimal 8 karakter" })
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "Password tidak cocok" })
      return
    }

    setIsPasswordSaving(true)
    setPasswordMessage(null)

    const result = await updatePassword(newPassword)

    if (result.error) {
      setPasswordMessage({ type: "error", text: result.error })
    } else {
      setPasswordMessage({ type: "success", text: "Password berhasil diperbarui" })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }

    setIsPasswordSaving(false)
  }

  if (userLoading) {
    return (
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1 lg:ml-64">
          <DashboardHeader />
          <main className="p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#1c9af1]" />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 lg:ml-64">
        <DashboardHeader />
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-4xl">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold">Pengaturan</h1>
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
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-[#1c9af1]">
                    {(avatarPreview || avatarUrl) && (
                      <AvatarImage src={avatarPreview || avatarUrl || undefined} alt="Avatar" />
                    )}
                    <AvatarFallback className="bg-[#1c9af1] text-white text-2xl font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  {isAvatarUploading && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-white" />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isAvatarUploading}
                    >
                      <Camera className="w-4 h-4" />
                      Ubah Foto
                    </Button>
                    {avatarUrl && (
                      <Button
                        variant="outline"
                        className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={handleAvatarDelete}
                        disabled={isAvatarUploading}
                      >
                        <Trash2 className="w-4 h-4" />
                        Hapus
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">JPG, PNG, WebP. Maksimal 2MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleAvatarSelect}
                  />
                  {avatarMessage && (
                    <p className={`text-xs flex items-center gap-1 ${avatarMessage.type === "success" ? "text-green-600" : "text-red-600"}`}>
                      {avatarMessage.type === "success" ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      {avatarMessage.text}
                    </p>
                  )}
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              {/* Email (read-only) */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Email tidak dapat diubah untuk keamanan akun
                </p>
              </div>

              {profileMessage && (
                <div className={`p-3 rounded-md text-sm flex items-center gap-2 ${
                  profileMessage.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {profileMessage.type === "success" ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  {profileMessage.text}
                </div>
              )}

              <Button
                className="bg-[#1c9af1] hover:bg-[#1580d1] text-white"
                onClick={handleProfileSave}
                disabled={isProfileSaving}
              >
                {isProfileSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Perubahan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Password */}
          <Card>
            <CardHeader>
              <CardTitle>Keamanan</CardTitle>
              <CardDescription>Kelola password akun Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Password Baru</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Masukkan password lagi"
                />
              </div>

              {passwordMessage && (
                <div className={`p-3 rounded-md text-sm flex items-center gap-2 ${
                  passwordMessage.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {passwordMessage.type === "success" ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  {passwordMessage.text}
                </div>
              )}

              <Button
                className="bg-[#1c9af1] hover:bg-[#1580d1] text-white"
                onClick={handlePasswordChange}
                disabled={isPasswordSaving}
              >
                {isPasswordSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Ubah Password
                  </>
                )}
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <p className="font-semibold text-red-900">Hapus Akun</p>
                  <p className="text-sm text-red-700">
                    Hapus akun dan semua data Anda secara permanen
                  </p>
                </div>
                <Button variant="destructive" className="w-full sm:w-auto">
                  Hapus Akun
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
