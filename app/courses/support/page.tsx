"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageCircle, Users, Clock, ChevronDown } from "lucide-react"
import Link from "next/link"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Kirim pertanyaan via email",
    action: "support@gotoamerica.com",
    link: "mailto:support@gotoamerica.com",
    color: "from-blue-500 to-blue-400"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    description: "Chat langsung dengan tim kami",
    action: "+62 812-3456-7890",
    link: "https://wa.me/6281234567890",
    color: "from-green-500 to-green-400"
  },
  {
    icon: Users,
    title: "Komunitas",
    description: "Tanya sesama member",
    action: "Buka Forum",
    link: "/courses/community",
    color: "from-purple-500 to-purple-400"
  }
]

const faqs = [
  {
    question: "Bagaimana cara mendaftar kursus?",
    answer: "Untuk mendaftar kursus, Anda bisa browse semua kursus di halaman Course, lalu klik tombol 'Mulai Belajar Gratis' pada kursus yang Anda inginkan. Kursus akan otomatis ditambahkan ke halaman 'My Course' Anda."
  },
  {
    question: "Bagaimana cara mengakses materi pembelajaran?",
    answer: "Setelah mendaftar kursus, buka halaman 'My Course' dari sidebar. Klik tombol 'Lanjutkan' pada kursus yang ingin Anda pelajari. Anda akan diarahkan ke halaman course detail dengan semua materi video, resources, dan assignment."
  },
  {
    question: "Apakah saya akan mendapat sertifikat?",
    answer: "Ya! Setelah menyelesaikan 100% materi kursus, Anda akan mendapatkan Certificate of Completion yang bisa diunduh dalam format PDF. Sertifikat ini mencantumkan nama Anda, nama kursus, dan tanggal penyelesaian."
  },
  {
    question: "Bagaimana cara upgrade ke Premium?",
    answer: "Klik tombol 'Premium' merah di pojok kanan atas header. Anda akan diarahkan ke halaman pembayaran dimana bisa memilih paket membership (bulanan atau tahunan). Premium member mendapat akses ke semua kursus eksklusif dan fitur tambahan."
  },
  {
    question: "Apa itu DV Lottery dan bagaimana cara memenangkannya?",
    answer: "DV Lottery (Diversity Visa Lottery) adalah program pemerintah Amerika yang memberikan Green Card melalui undian. Untuk mempelajari cara mendaftar dan tips memenangkannya, ikuti kursus 'DV Lottery Masterclass' yang dipandu langsung oleh Teddy Cahyadi, pemenang DV Lottery."
  },
  {
    question: "Apakah materi kursus bisa diakses selamanya?",
    answer: "Ya! Setelah mendaftar kursus, Anda memiliki akses seumur hidup ke semua materi pembelajaran termasuk video, resources, dan update konten di masa depan. Anda bisa belajar dengan kecepatan Anda sendiri tanpa batas waktu."
  }
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 rounded-lg transition-colors group">
        <span className="font-semibold text-base pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4 pt-2">
        <p className="text-muted-foreground leading-relaxed">{answer}</p>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function SupportPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 ml-64">
        <DashboardHeader />
        <main className="p-8 space-y-8 max-w-5xl">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Pusat Bantuan</h1>
            <p className="text-muted-foreground">
              Kami siap membantu Anda! Hubungi kami atau temukan jawaban di FAQ
            </p>
          </div>

          {/* Response Time Badge */}
          <Card className="border-[#1c9af1] bg-blue-50/50">
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#1c9af1]" />
              <div>
                <p className="font-semibold text-[#1c9af1]">Waktu Respon: 1-2 Hari Kerja</p>
                <p className="text-sm text-muted-foreground">
                  Tim support kami akan merespon pertanyaan Anda secepat mungkin
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Methods */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Hubungi Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">{method.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {method.description}
                          </p>
                          {method.link.startsWith('http') || method.link.startsWith('mailto') ? (
                            <a href={method.link} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" className="w-full">
                                {method.action}
                              </Button>
                            </a>
                          ) : (
                            <Link href={method.link}>
                              <Button variant="outline" className="w-full">
                                {method.action}
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Pertanyaan yang Sering Diajukan (FAQ)</h2>
            </div>
            <Card>
              <CardContent className="p-6 space-y-2">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <FAQItem question={faq.question} answer={faq.answer} />
                    {index < faqs.length - 1 && <hr className="my-2" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Additional Help */}
          <Card className="bg-gradient-to-r from-[#1580d1] to-[#1c9af1] border-0">
            <CardContent className="p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-2">Masih Butuh Bantuan?</h3>
              <p className="text-white/90 mb-4">
                Tim support kami siap membantu Anda dengan pertanyaan apapun
              </p>
              <a href="mailto:support@gotoamerica.com">
                <Button size="lg" className="bg-white text-[#1c9af1] hover:bg-white/90">
                  <Mail className="w-5 h-5 mr-2" />
                  Kirim Email ke Support
                </Button>
              </a>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
