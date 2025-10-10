import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const courses = [
  {
    title: "Mastering Interaction Design: From Principles to Practice",
    description:
      "Dive into the core principles of interaction design and learn practical techniques to create engaging user experiences.",
    instructor: "Luis Mark",
    duration: "4h",
    level: "Beginner",
    price: 0,
    originalPrice: 69,
    tags: ["FREE", "EVENTS", "BEGINNER"],
    image: "/interaction-design-course.jpg",
  },
  {
    title: "Apple HIG Mastery: Creating Seamless User Experiences",
    description:
      "Learn how to design user interfaces that align with Apple's Human Interface Guidelines for iOS and macOS.",
    instructor: "Luis Mark",
    duration: "4h",
    level: "Beginner",
    price: 56.66,
    originalPrice: 69,
    tags: ["BEGINNER", "EVENT"],
    image: "/apple-design-course.jpg",
  },
  {
    title: "Creating Impactful Icons: Design Thinking and Execution",
    description:
      "Learn the basics of icon design, from concept development to creating visually stunning and functional icons.",
    instructor: "Luis Mark",
    duration: "32h",
    level: "Beginner",
    price: 66.66,
    originalPrice: 69,
    tags: ["EVENTS", "BEGINNER"],
    image: "/icon-design-course.jpg",
  },
  {
    title: "Advanced Interaction Design: Techniques and Best Practices",
    description:
      "Take your motion graphics skills to the next level with advanced techniques and industry best practices.",
    instructor: "Luis Mark",
    duration: "32h",
    level: "Beginner",
    price: 10.0,
    originalPrice: 69,
    tags: ["EVENTS", "BEGINNER"],
    image: "/advanced-design-course.jpg",
  },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 ml-64">
        <DashboardHeader />
        <main className="p-8 space-y-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 flex items-center justify-between overflow-hidden">
            <div className="flex-1 space-y-4">
              <div className="text-sm text-muted-foreground">Learning Path / Product Manager</div>
              <h1 className="text-4xl font-bold text-balance">Be a Good Product Manager</h1>
              <p className="text-muted-foreground max-w-2xl leading-relaxed">
                A product manager is a professional responsible for overseeing the development and success of a product
                from conception to launch and beyond. They act as{" "}
                <button className="text-primary font-medium hover:underline">Read More</button>
              </p>
            </div>
            <div className="hidden lg:block">
              <Image
                src="/product-manager-illustration.jpg"
                alt="Product Manager"
                width={400}
                height={300}
                className="object-contain"
              />
            </div>
          </div>

          {/* Courses Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Course and Events For Product Designer</h2>
              <Button variant="ghost" className="text-primary hover:text-primary/90">
                Show All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
