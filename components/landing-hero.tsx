"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function LandingHero() {
  return (
    <section className="relative min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="relative inline-block">
                  <span className="relative z-10 text-primary">BOOST</span>
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                </span>
                <br />
                <span className="text-white">YOUR DIGITAL</span>
                <br />
                <span className="flex items-center gap-4">
                  <ArrowRight className="w-12 h-12 text-primary" />
                  <span className="text-white">EDUCATION</span>
                </span>
                <br />
                <span className="text-white">ONLINE</span>
              </h1>
            </div>

            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Unleash your potential with Tedchay Academy — the online platform to master the latest tech skills and
              lead the digital revolution.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-black hover:bg-primary/90 font-semibold text-base px-8 py-6 rounded-xl"
              >
                Enroll Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:text-primary hover:bg-transparent font-semibold text-base"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Watch Video
              </Button>
            </div>
          </div>

          {/* Right Column - Phone Mockups */}
          <div className="relative h-[600px] hidden lg:block">
            <div className="absolute top-0 right-0 w-[280px] h-[560px] transform rotate-6">
              <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-[3rem] border-4 border-gray-800 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>
                <div className="p-6 pt-10">
                  <div className="space-y-4">
                    <div className="text-sm text-gray-400">Hello, Emily</div>
                    <div className="bg-primary rounded-2xl p-6 space-y-3">
                      <div className="text-xs text-black/70">Featured</div>
                      <div className="text-lg font-bold text-black">Prototype and Design With AI</div>
                      <div className="flex items-center justify-between text-xs text-black/70">
                        <span>14 Lessons</span>
                        <span>8 Hours</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-white">My Courses</div>
                      <div className="bg-gray-800 rounded-xl p-4">
                        <div className="text-sm text-white mb-2">UI Design</div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "66%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-20 right-32 w-[280px] h-[560px] transform -rotate-3">
              <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-[3rem] border-4 border-gray-800 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>
                <div className="p-6 pt-10">
                  <div className="space-y-4">
                    <div className="text-2xl font-bold text-white">My Courses</div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-800 rounded-xl p-4 flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-white">Course {i}</div>
                            <div className="text-xs text-gray-400">12 lessons</div>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                            <Play className="w-5 h-5 text-primary fill-current" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
