"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"

export function CourseTabs() {
  const learningPoints = [
    "Setting up the environment",
    "Advanced HTML Practices",
    "Build a portfolio website",
    "Responsive Designs",
    "Understand HTML Programming",
    "Code HTML",
    "Start building beautiful websites",
  ]

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
        <TabsTrigger
          value="overview"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="author"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          Author
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
          Announcements
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          Reviews
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">About Course</h3>
          <p className="text-muted-foreground leading-relaxed">
            Unlock the power of Figma, the leading collaborative design tool, with our comprehensive online course.
            Whether you're a novice or looking to enhance your skills, this course will guide you through Figma's robust
            features and workflows.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Perfect for UI/UX designers, product managers, and anyone interested in modern design tools. Join us to
            elevate your design skills and boost your productivity with Figma!
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold">What You'll Learn</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {learningPoints.map((point, index) => (
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

      <TabsContent value="author" className="mt-6">
        <p className="text-muted-foreground">Author information will be displayed here.</p>
      </TabsContent>

      <TabsContent value="faq" className="mt-6">
        <p className="text-muted-foreground">Frequently asked questions will be displayed here.</p>
      </TabsContent>

      <TabsContent value="announcements" className="mt-6">
        <p className="text-muted-foreground">Course announcements will be displayed here.</p>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <p className="text-muted-foreground">Student reviews will be displayed here.</p>
      </TabsContent>
    </Tabs>
  )
}
