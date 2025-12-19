"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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
import { signUp } from "@/lib/actions/auth"
import { Loader2, Mail } from "lucide-react"

export default function DaftarPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok"
    }

    if (!agreedToTerms) {
      newErrors.terms = "Anda harus menyetujui syarat dan ketentuan"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    const formDataObj = new FormData()
    formDataObj.append('name', formData.name)
    formDataObj.append('email', formData.email)
    formDataObj.append('password', formData.password)

    const result = await signUp(formDataObj)

    if (result?.error) {
      setErrors({ general: result.error })
      setIsLoading(false)
    } else if (result?.success) {
      // If auto-logged in (email verification disabled), redirect to courses
      if (result.autoLoggedIn) {
        router.push('/courses')
        return
      }
      // If email verification required, show verification modal
      if (result.requiresVerification) {
        setRegisteredEmail(result.email || formData.email)
        setShowVerificationModal(true)
        setIsLoading(false)
      }
    }
  }

  const handleModalClose = () => {
    setShowVerificationModal(false)
    router.push('/masuk')
  }

  const handleGoogleRegister = () => {
    // TODO: Implement Google OAuth registration
    console.log("Register with Google")
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
          <p className="text-muted-foreground mt-2">Mulai perjalanan Anda ke Amerika</p>
        </div>

        <Card className="border-t-4 border-t-[#1c9af1]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Daftar Gratis</CardTitle>
            <CardDescription>
              Buat akun baru untuk mengakses semua kursus
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Register Button */}
            {/* <Button */}
            {/*   variant="outline" */}
            {/*   className="w-full gap-2 border-2 hover:bg-slate-50" */}
            {/*   onClick={handleGoogleRegister} */}
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
            {/*   Daftar dengan Google */}
            {/* </Button> */}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Daftar dengan email
                </span>
                {/* <span className="bg-background px-2 text-muted-foreground"> */}
                {/*   Atau daftar dengan email */}
                {/* </span> */}
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              {errors.general && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {errors.general}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Minimal 8 karakter"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Masukkan password lagi"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => {
                      setAgreedToTerms(checked as boolean)
                      if (errors.terms) {
                        setErrors({ ...errors, terms: "" })
                      }
                    }}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    Saya menyetujui{" "}
                    <Link href="/terms" className="text-[#1c9af1] hover:underline">
                      Syarat & Ketentuan
                    </Link>{" "}
                    dan{" "}
                    <Link href="/privacy" className="text-[#1c9af1] hover:underline">
                      Kebijakan Privasi
                    </Link>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-xs text-red-500">{errors.terms}</p>
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
                    Mendaftar...
                  </>
                ) : (
                  "Daftar Sekarang"
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Sudah punya akun? </span>
              <Link
                href="/masuk"
                className="text-[#1c9af1] hover:text-red-600 font-semibold hover:underline"
              >
                Masuk
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

      {/* Email Verification Modal */}
      <Dialog open={showVerificationModal} onOpenChange={handleModalClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-[#1c9af1]" />
            </div>
            <DialogTitle className="text-center text-xl">
              Verifikasi Email Anda
            </DialogTitle>
            <DialogDescription className="text-center">
              Kami telah mengirimkan email verifikasi ke{" "}
              <span className="font-semibold text-foreground">{registeredEmail}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                Silakan cek inbox email Anda dan klik link verifikasi untuk mengaktifkan akun Anda.
                Jika tidak menemukan email, periksa folder spam.
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={handleModalClose}
              className="w-full sm:w-auto bg-[#1c9af1] hover:bg-[#1a8cd8]"
            >
              Mengerti, Lanjut ke Halaman Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
