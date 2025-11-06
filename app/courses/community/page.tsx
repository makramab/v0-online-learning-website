"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  MessageSquare,
  Eye,
  TrendingUp,
  Heart,
  Calendar,
  Award,
  Plus,
  MessageCircle,
  Share2
} from "lucide-react"
import Link from "next/link"

// Mock data for categories
const categories = [
  {
    id: 1,
    icon: "💚",
    title: "DV Lottery Success",
    description: "Cerita dan tips dari pemenang DV Lottery",
    topicsCount: 234,
    color: "from-green-500 to-green-400"
  },
  {
    id: 2,
    icon: "🎓",
    title: "Beasiswa & Education",
    description: "Diskusi tentang Fullbright, LPDP, dan beasiswa lainnya",
    topicsCount: 189,
    color: "from-blue-500 to-blue-400"
  },
  {
    id: 3,
    icon: "✈️",
    title: "J1 Visa Experience",
    description: "Berbagi pengalaman J1 Internship/Trainee",
    topicsCount: 156,
    color: "from-purple-500 to-purple-400"
  },
  {
    id: 4,
    icon: "🏢",
    title: "Karir & Pekerjaan",
    description: "Tips karir dan mencari pekerjaan di USA",
    topicsCount: 143,
    color: "from-orange-500 to-orange-400"
  },
  {
    id: 5,
    icon: "🏠",
    title: "Kehidupan di Amerika",
    description: "Adaptasi budaya, housing, dan daily life",
    topicsCount: 198,
    color: "from-pink-500 to-pink-400"
  },
  {
    id: 6,
    icon: "💬",
    title: "Tanya Jawab Umum",
    description: "Pertanyaan seputar imigrasi ke Amerika",
    topicsCount: 312,
    color: "from-cyan-500 to-cyan-400"
  }
]

// Mock data for recent discussions
const recentDiscussions = [
  {
    id: 1,
    title: "Tips Interview DV Lottery - Apa yang Ditanya di Konsulat?",
    author: "Andi Wijaya",
    authorInitials: "AW",
    category: "DV Lottery Success",
    timestamp: "2 jam lalu",
    replies: 24,
    views: 456,
    likes: 18,
    excerpt: "Halo semuanya! Saya baru saja interview DV Lottery minggu lalu dan berhasil approved. Mau share pengalaman saya..."
  },
  {
    id: 2,
    title: "Fullbright 2025 - Timeline dan Proses Seleksi",
    author: "Siti Nurhaliza",
    authorInitials: "SN",
    category: "Beasiswa & Education",
    timestamp: "5 jam lalu",
    replies: 16,
    views: 342,
    likes: 12,
    excerpt: "Ada yang apply Fullbright tahun ini? Yuk kita diskusi tentang timeline dan persiapan dokumen..."
  },
  {
    id: 3,
    title: "J1 Au Pair: Cara Pilih Host Family yang Tepat",
    author: "Rina Puspita",
    authorInitials: "RP",
    category: "J1 Visa Experience",
    timestamp: "Yesterday",
    replies: 31,
    views: 678,
    likes: 25,
    excerpt: "Berdasarkan pengalaman 2 tahun sebagai Au Pair, ini tips memilih host family yang cocok..."
  },
  {
    id: 4,
    title: "Biaya Hidup di NYC vs California - Comparison",
    author: "Budi Santoso",
    authorInitials: "BS",
    category: "Kehidupan di Amerika",
    timestamp: "2 days ago",
    replies: 42,
    views: 891,
    likes: 34,
    excerpt: "Saya tinggal di NYC 2 tahun, sekarang pindah ke California. Ini perbandingan biaya hidup..."
  },
  {
    id: 5,
    title: "SSN dan Credit Score untuk Newcomers - Guide Lengkap",
    author: "Dika Pratama",
    authorInitials: "DP",
    category: "Tanya Jawab Umum",
    timestamp: "3 days ago",
    replies: 28,
    views: 723,
    likes: 41,
    excerpt: "Panduan lengkap mendapatkan Social Security Number dan membangun credit score dari nol..."
  }
]

// Mock top contributors
const topContributors = [
  { name: "Teddy Cahyadi", posts: 156, reputation: 2450, badge: "Expert" },
  { name: "Mutiara Indah", posts: 98, reputation: 1834, badge: "Mentor" },
  { name: "Riko Nugraha", posts: 87, reputation: 1562, badge: "Mentor" },
  { name: "Grace Aritonang", posts: 76, reputation: 1342, badge: "Helper" }
]

// Mock upcoming events
const upcomingEvents = [
  {
    title: "Live Q&A: DV Lottery 2026",
    host: "Teddy Cahyadi",
    date: "25 Jan 2025",
    time: "19:00 WIB"
  },
  {
    title: "Webinar: LPDP Application Tips",
    host: "Fauzan Rahman",
    date: "1 Feb 2025",
    time: "20:00 WIB"
  }
]

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 ml-64">
        <DashboardHeader />
        <main className="p-8 space-y-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-[#1580d1] to-[#1c9af1] rounded-2xl p-8 relative overflow-hidden">
            {/* Flag decoration */}
            <div className="absolute top-0 right-0 w-1/4 h-full opacity-5">
              <div className="h-full flex flex-col">
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-red-600"></div>
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold text-white">Komunitas gotoamerica</h1>
                <Badge className="bg-yellow-500 text-yellow-900 hover:bg-yellow-500">BETA</Badge>
              </div>
              <p className="text-white/90 text-lg">
                Berbagi pengalaman dan saling mendukung menuju American Dream
              </p>
              <div className="flex items-center gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>2,450 members</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>1,234 discussions</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>156 active today</span>
                </div>
              </div>
            </div>
          </div>

          {/* BETA Notice */}
          <Card className="border-l-4 border-l-yellow-500 bg-yellow-50/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🚧</div>
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-1">Dalam Pengembangan</h3>
                  <p className="text-sm text-yellow-800">
                    Fitur komunitas masih dalam tahap beta. Fitur posting dan komentar akan segera hadir.
                    Saat ini Anda dapat melihat diskusi dan kategori yang tersedia.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="flex items-center gap-4">
            <Button className="bg-red-600 text-white hover:bg-red-700" disabled>
              <Plus className="w-4 h-4 mr-2" />
              Share Story
            </Button>
            <Button variant="outline" disabled>
              <MessageCircle className="w-4 h-4 mr-2" />
              Ask Question
            </Button>
            <Button variant="outline" disabled>
              <Share2 className="w-4 h-4 mr-2" />
              Join Discussion
            </Button>
            <span className="text-xs text-muted-foreground ml-2">(Coming Soon)</span>
          </div>

          {/* Discussion Categories */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Kategori Diskusi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-transparent hover:border-t-[#1c9af1]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{category.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MessageSquare className="w-4 h-4" />
                          <span>{category.topicsCount} topics</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Discussions - Left Column */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold">Diskusi Terbaru</h2>
              <div className="space-y-4">
                {recentDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12 bg-[#1c9af1]">
                          <AvatarFallback className="text-white font-semibold">
                            {discussion.authorInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-lg mb-1 hover:text-[#1c9af1] transition-colors">
                                {discussion.title}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="font-medium">{discussion.author}</span>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs">{discussion.category}</Badge>
                                <span>•</span>
                                <span>{discussion.timestamp}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {discussion.excerpt}
                          </p>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              <span>{discussion.replies} replies</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              <span>{discussion.views} views</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Heart className="w-4 h-4" />
                              <span>{discussion.likes} likes</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar - Right Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Top Contributors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#1c9af1]" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#1c9af1] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{contributor.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {contributor.posts} posts • {contributor.reputation} rep
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">{contributor.badge}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#1c9af1]" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>Host: {event.host}</div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>{event.date} • {event.time}</span>
                        </div>
                      </div>
                      {index < upcomingEvents.length - 1 && <hr className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Success Stories Spotlight */}
              <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    ⭐ Success Story
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-900 mb-3">
                    "Dari Indonesia ke NYC: Perjalanan saya mendapatkan DV Lottery dan bekerja sebagai Chef"
                  </p>
                  <p className="text-xs text-green-700 mb-3">- Teddy Cahyadi</p>
                  <Button size="sm" variant="outline" className="w-full text-green-800 border-green-300 hover:bg-green-100">
                    Baca Selengkapnya
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
