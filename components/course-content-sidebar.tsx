"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, ChevronUp, Play, Star, CheckCircle2 } from "lucide-react"
import { useState } from "react"

interface CourseSection {
  id: string
  title: string
  duration: string
  lessons: { title: string; duration: string; completed?: boolean }[]
}

const courseSections: CourseSection[] = [
  {
    id: "01",
    title: "Pengenalan DV Lottery",
    duration: "35 menit",
    lessons: [
      { title: "Selamat Datang di Kursus", duration: "3 menit", completed: true },
      { title: "Apa itu DV Lottery?", duration: "8 menit" },
      { title: "Syarat & Kelayakan", duration: "12 menit" },
      { title: "Timeline & Jadwal Penting", duration: "7 menit" },
      { title: "Peluang & Statistik", duration: "5 menit" },
    ],
  },
  {
    id: "02",
    title: "Proses Pendaftaran",
    duration: "1 jam 15 menit",
    lessons: [
      { title: "Persiapan Dokumen", duration: "15 menit" },
      { title: "Foto Requirements", duration: "10 menit" },
      { title: "Mengisi Formulir Entry", duration: "25 menit" },
      { title: "Tips Meningkatkan Peluang", duration: "15 menit" },
      { title: "Common Mistakes to Avoid", duration: "10 menit" },
    ],
  },
  {
    id: "03",
    title: "Setelah Menang",
    duration: "45 menit",
    lessons: [
      { title: "Notifikasi & Confirmation Number", duration: "8 menit" },
      { title: "Form DS-260 Step by Step", duration: "20 menit" },
      { title: "Supporting Documents", duration: "12 menit" },
      { title: "Paying Fees", duration: "5 menit" },
    ],
  },
  {
    id: "04",
    title: "Persiapan Interview",
    duration: "1 jam 30 menit",
    lessons: [],
  },
  {
    id: "05",
    title: "Medical Exam & Vaksinasi",
    duration: "40 menit",
    lessons: [],
  },
  {
    id: "06",
    title: "Setelah Approval",
    duration: "50 menit",
    lessons: [],
  },
  {
    id: "07",
    title: "Bonus: Tips dari Tedchay",
    duration: "25 menit",
    lessons: [],
  },
]

export function CourseContentSidebar() {
  const [expandedSection, setExpandedSection] = useState<string>("01")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Konten Kursus</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {courseSections.map((section) => {
            const isExpanded = expandedSection === section.id
            return (
              <div key={section.id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedSection(isExpanded ? "" : section.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">
                      {section.id}: {section.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{section.duration}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isExpanded && section.lessons.length > 0 && (
                  <div className="border-t bg-muted/20">
                    {section.lessons.map((lesson, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 cursor-pointer border-b last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          {lesson.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Play className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="text-sm">{lesson.title}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instruktur</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Tedchay" />
              <AvatarFallback>TC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">Tedchay</h4>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="font-medium">(4.9)</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">DV Lottery Winner & Imigran di US</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mantan kontestan Master Chef Indonesia yang berhasil pindah ke Amerika melalui DV Lottery. Kini berbagi pengalaman dan tips praktis untuk membantu orang Indonesia meraih American Dream.
          </p>
        </CardContent>
      </Card>

      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6">
        Daftar Sekarang - GRATIS
      </Button>
    </div>
  )
}
