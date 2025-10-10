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
    title: "Intro",
    duration: "22min",
    lessons: [
      { title: "Introduction", duration: "2 min", completed: true },
      { title: "What is Figma?", duration: "5 min" },
      { title: "Understanding Figma", duration: "12 min" },
      { title: "UI tour", duration: "3 min" },
    ],
  },
  {
    id: "02",
    title: "Intermediate Level Stuff",
    duration: "1h 20min",
    lessons: [],
  },
  {
    id: "03",
    title: "Advanced Stuff",
    duration: "36min",
    lessons: [],
  },
  {
    id: "04",
    title: "Imports & Graphics",
    duration: "40min",
    lessons: [],
  },
  {
    id: "05",
    title: "Component in Figma",
    duration: "1h 12min",
    lessons: [],
  },
  {
    id: "06",
    title: "Styles in Figma",
    duration: "41min",
    lessons: [],
  },
  {
    id: "07",
    title: "Summary",
    duration: "8min",
    lessons: [],
  },
]

export function CourseContentSidebar() {
  const [expandedSection, setExpandedSection] = useState<string>("01")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course content</CardTitle>
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
          <CardTitle>Author</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Crystal Lucas" />
              <AvatarFallback>CL</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">Crystal Lucas</h4>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="font-medium">(4.8)</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">UI/UX Specialist</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Crystal is a seasoned UI/UX designer with over a decade of experience creating intuitive and visually
            engaging digital products.
          </p>
        </CardContent>
      </Card>

      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6">
        Enroll Now
      </Button>
    </div>
  )
}
