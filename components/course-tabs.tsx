"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"

export function CourseTabs() {
  const learningPoints = [
    "Memahami syarat kelayakan DV Lottery secara detail",
    "Mengisi formulir DS-260 dengan benar dan lengkap",
    "Tips meningkatkan peluang menang DV Lottery",
    "Persiapan dokumen untuk interview konsulat",
    "Teknik menjawab pertanyaan interview dengan percaya diri",
    "Memahami proses medical exam dan vaksinasi",
    "Langkah-langkah setelah mendapat approval visa",
    "Cara menghindari kesalahan umum yang sering terjadi",
  ]

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
          Instruktur
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

      <TabsContent value="overview" className="mt-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Tentang Kursus</h3>
          <p className="text-muted-foreground leading-relaxed">
            Kursus komprehensif tentang DV Lottery (Diversity Visa Lottery Program) yang akan memandu Anda dari proses pendaftaran hingga persiapan interview di konsulat Amerika. Dipandu langsung oleh Tedchay yang telah berhasil memenangkan DV Lottery dan kini tinggal di Amerika Serikat.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Cocok untuk siapa saja yang ingin mencoba peruntungan DV Lottery atau yang sudah menang dan membutuhkan panduan lengkap untuk proses selanjutnya. Pelajari dari pengalaman nyata, bukan hanya teori!
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Yang Akan Anda Pelajari</h3>
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

      <TabsContent value="author" className="mt-6 space-y-4">
        <h3 className="text-2xl font-bold">Tentang Instruktur</h3>
        <div className="space-y-3">
          <p className="text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Tedchay</span> adalah mantan kontestan Master Chef Indonesia yang berhasil memenangkan DV Lottery dan kini tinggal di Amerika Serikat. Dengan pengalaman langsung dalam proses imigrasi, Tedchay membagikan tips dan trik praktis yang tidak akan Anda temukan di panduan resmi.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Sebagai content creator dan YouTuber dengan ribuan subscriber, Tedchay memiliki kemampuan menjelaskan konsep kompleks dengan cara yang mudah dipahami dan engaging. Bergabunglah dengan ribuan orang Indonesia lainnya yang telah belajar dari pengalaman Tedchay!
          </p>
        </div>
      </TabsContent>

      <TabsContent value="faq" className="mt-6">
        <p className="text-muted-foreground">Pertanyaan yang sering diajukan akan ditampilkan di sini.</p>
      </TabsContent>

      <TabsContent value="announcements" className="mt-6">
        <p className="text-muted-foreground">Pengumuman kursus akan ditampilkan di sini.</p>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <p className="text-muted-foreground">Ulasan dari siswa akan ditampilkan di sini.</p>
      </TabsContent>
    </Tabs>
  )
}
