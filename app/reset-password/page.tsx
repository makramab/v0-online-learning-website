"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { updatePassword } from "@/lib/actions/auth"
import { createClient } from "@/lib/supabase/client"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Check if we have a valid session from the reset link
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        setIsValidSession(true)
      } else {
        setIsValidSession(false)
      }
    }

    checkSession()
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!password) {
      newErrors.password = "Password wajib diisi"
    } else if (password.length < 8) {
      newErrors.password = "Password minimal 8 karakter"
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    const result = await updatePassword(password)

    if (result?.error) {
      setErrors({ general: result.error })
      setIsLoading(false)
    } else if (result?.success) {
      setShowSuccessModal(true)
      setIsLoading(false)
    }
  }

  const handleModalClose = () => {
    setShowSuccessModal(false)
    router.push('/masuk')
  }

  // Loading state while checking session
  if (isValidSession === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#1c9af1] mx-auto mb-4" />
          <p className="text-muted-foreground">Memverifikasi link reset password...</p>
        </div>
      </div>
    )
  }

  // Invalid or expired session
  if (isValidSession === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
        <div className="w-full max-w-md">
          <Card className="border-t-4 border-t-red-500">
            <CardHeader className="space-y-1 text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Link Tidak Valid</CardTitle>
              <CardDescription>
                Link reset password sudah kadaluarsa atau tidak valid.
                Silakan minta link reset password baru.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/lupa-password" className="block">
                <Button className="w-full bg-[#1c9af1] hover:bg-[#1a8cd8]">
                  Minta Link Baru
                </Button>
              </Link>
              <div className="text-center">
                <Link
                  href="/masuk"
                  className="text-sm text-muted-foreground hover:text-[#1c9af1]"
                >
                  Kembali ke halaman login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="text-3xl font-bold">
              <span className="text-foreground">Awal</span>
              <span className="text-[#1c9af1]">Baru.com</span>
            </div>
          </Link>
          <p className="text-muted-foreground mt-2">Buat password baru</p>
        </div>

        <Card className="border-t-4 border-t-[#1c9af1]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>
              Masukkan password baru Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Reset Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {errors.general}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password Baru</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) {
                      setErrors({ ...errors, password: "" })
                    }
                  }}
                  className={errors.password ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Masukkan password lagi"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (errors.confirmPassword) {
                      setErrors({ ...errors, confirmPassword: "" })
                    }
                  }}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Password Baru"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-[#1c9af1]"
          >
            ← Kembali ke beranda
          </Link>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={handleModalClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">
              Password Berhasil Diubah!
            </DialogTitle>
            <DialogDescription className="text-center">
              Password Anda telah berhasil diperbarui. Silakan login dengan password baru Anda.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                Anda sekarang dapat menggunakan password baru untuk login ke akun Anda.
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={handleModalClose}
              className="w-full sm:w-auto bg-[#1c9af1] hover:bg-[#1a8cd8]"
            >
              Lanjut ke Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
