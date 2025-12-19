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
import { useState } from "react"
import { useRouter } from "next/navigation"
import { requestPasswordReset } from "@/lib/actions/auth"
import { Loader2, Mail, ArrowLeft } from "lucide-react"

export default function LupaPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!email.trim()) {
      setError("Email wajib diisi")
      setIsLoading(false)
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Format email tidak valid")
      setIsLoading(false)
      return
    }

    const result = await requestPasswordReset(email)

    if (result?.error) {
      setError(result.error)
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
          <p className="text-muted-foreground mt-2">Reset password Anda</p>
        </div>

        <Card className="border-t-4 border-t-[#1c9af1]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Lupa Password?</CardTitle>
            <CardDescription>
              Masukkan email Anda dan kami akan mengirimkan link untuk reset password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Reset Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  "Kirim Link Reset Password"
                )}
              </Button>
            </form>

            {/* Back to Login Link */}
            <div className="text-center">
              <Link
                href="/masuk"
                className="inline-flex items-center text-sm text-[#1c9af1] hover:text-red-600 font-semibold hover:underline"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Kembali ke halaman login
              </Link>
            </div>
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
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">
              Email Terkirim!
            </DialogTitle>
            <DialogDescription className="text-center">
              Kami telah mengirimkan link reset password ke{" "}
              <span className="font-semibold text-foreground">{email}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                Silakan cek inbox email Anda dan klik link untuk reset password.
                Jika tidak menemukan email, periksa folder spam.
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={handleModalClose}
              className="w-full sm:w-auto bg-[#1c9af1] hover:bg-[#1a8cd8]"
            >
              Mengerti, Kembali ke Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
