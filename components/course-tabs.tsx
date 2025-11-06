"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Star } from "lucide-react"
import type { Course } from "@/lib/courses-data"

interface CourseTabsProps {
  course: Course
}

export function CourseTabs({ course }: CourseTabsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
        <TabsTrigger
          value="overview"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          Ringkasan
        </TabsTrigger>
        <TabsTrigger
          value="author"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          Narasumber
        </TabsTrigger>
        <TabsTrigger
          value="faq"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          FAQ
        </TabsTrigger>
        <TabsTrigger
          value="announcements"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          Pengumuman
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          Ulasan
        </TabsTrigger>
      </TabsList>

      {/* Overview Tab */}
      <TabsContent value="overview" className="mt-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Tentang Kursus</h3>
          {course.overview.about.map((paragraph, index) => (
            <p key={index} className="text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Yang Akan Anda Pelajari</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {course.overview.learningPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-muted-foreground">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      {/* Instructor Tab */}
      <TabsContent value="author" className="mt-6 space-y-4">
        <h3 className="text-2xl font-bold">Tentang Instruktur</h3>
        <div className="space-y-3">
          <div className="font-semibold text-lg text-foreground">
            {course.instructorBio.name} - {course.instructorBio.title}
          </div>
          {course.instructorBio.bio.map((paragraph, index) => (
            <p key={index} className="text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="space-y-3 pt-4">
          <h4 className="font-semibold text-foreground">Credentials & Achievements:</h4>
          <ul className="space-y-2">
            {course.instructorBio.credentials.map((credential, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <span className="text-muted-foreground">{credential}</span>
              </li>
            ))}
          </ul>
        </div>
      </TabsContent>

      {/* FAQ Tab */}
      <TabsContent value="faq" className="mt-6 space-y-4">
        <h3 className="text-2xl font-bold">Pertanyaan yang Sering Diajukan</h3>
        <div className="space-y-6">
          {course.faq.map((item, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-semibold text-foreground">{item.question}</h4>
              <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </TabsContent>

      {/* Announcements Tab */}
      <TabsContent value="announcements" className="mt-6 space-y-4">
        <h3 className="text-2xl font-bold">Pengumuman Kursus</h3>
        <div className="space-y-6">
          {course.announcements.map((announcement, index) => (
            <div key={index} className="border-l-4 border-primary pl-4 py-2 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-foreground">{announcement.title}</h4>
                <span className="text-sm text-muted-foreground">{announcement.date}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{announcement.content}</p>
            </div>
          ))}
        </div>
      </TabsContent>

      {/* Reviews Tab */}
      <TabsContent value="reviews" className="mt-6 space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Ulasan dari Siswa</h3>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-primary text-primary" />
            <span className="font-semibold text-lg">{course.rating}</span>
            <span className="text-muted-foreground">({course.reviewCount} ulasan)</span>
          </div>
        </div>
        <div className="space-y-6">
          {course.reviews.map((review, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-foreground">{review.name}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                          }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{review.date}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
