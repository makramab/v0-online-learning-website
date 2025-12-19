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
import { signIn } from "@/lib/actions/auth"
import { Loader2, Mail } from "lucide-react"

export default function MasukPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showUnverifiedModal, setShowUnverifiedModal] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    const result = await signIn(formData)

    if (result?.error) {
      // Check if the error is about email not being confirmed
      if (result.error.toLowerCase().includes('email not confirmed') ||
        result.error.toLowerCase().includes('email belum dikonfirmasi')) {
        setShowUnverifiedModal(true)
      } else {
        setError(result.error)
      }
      setIsLoading(false)
    }
    // If successful, the signIn action will redirect to /courses
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth login
    console.log("Login with Google")
    alert("Google login akan segera tersedia")
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
          <p className="text-muted-foreground mt-2">Masuk ke akun Anda</p>
        </div>

        <Card className="border-t-4 border-t-[#1c9af1]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Masuk</CardTitle>
            <CardDescription>
              Masukkan email dan password Anda untuk melanjutkan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Login Button */}
            {/* <Button */}
            {/*   variant="outline" */}
            {/*   className="w-full gap-2 border-2 hover:bg-slate-50" */}
            {/*   onClick={handleGoogleLogin} */}
            {/* > */}
            {/*   <svg className="w-5 h-5" viewBox="0 0 24 24"> */}
            {/*     <path */}
            {/*       fill="#4285F4" */}
            {/*       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" */}
            {/*     /> */}
            {/*     <path */}
            {/*       fill="#34A853" */}
            {/*       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" */}
            {/*     /> */}
            {/*     <path */}
            {/*       fill="#FBBC05" */}
            {/*       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" */}
            {/*     /> */}
            {/*     <path */}
            {/*       fill="#EA4335" */}
            {/*       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" */}
            {/*     /> */}
            {/*   </svg> */}
            {/*   Masuk dengan Google */}
            {/* </Button> */}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Masuk dengan email
                </span>
                {/* <span className="bg-background px-2 text-muted-foreground"> */}
                {/*   Atau masuk dengan email */}
                {/* </span> */}
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
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
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/lupa-password"
                    className="text-xs text-[#1c9af1] hover:text-red-600 hover:underline"
                  >
                    Lupa password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    Masuk...
                  </>
                ) : (
                  "Masuk"
                )}
              </Button>
            </form>

            {/* Register Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Belum punya akun? </span>
              <Link
                href="/daftar"
                className="text-[#1c9af1] hover:text-red-600 font-semibold hover:underline"
              >
                Daftar Gratis
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

      {/* Unverified Email Modal */}
      <Dialog open={showUnverifiedModal} onOpenChange={setShowUnverifiedModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-yellow-600" />
            </div>
            <DialogTitle className="text-center text-xl">
              Email Belum Diverifikasi
            </DialogTitle>
            <DialogDescription className="text-center">
              Akun dengan email{" "}
              <span className="font-semibold text-foreground">{email}</span>{" "}
              belum diverifikasi.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                Silakan cek inbox email Anda dan klik link verifikasi yang telah kami kirimkan.
                Jika tidak menemukan email, periksa folder spam atau coba daftar ulang.
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setShowUnverifiedModal(false)}
              className="w-full sm:w-auto bg-[#1c9af1] hover:bg-[#1a8cd8]"
            >
              Mengerti
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
