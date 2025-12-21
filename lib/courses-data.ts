// Complete course data for all 9 courses
export interface Course {
  id: number
  title: string
  description: string
  instructor: string
  duration: string
  level: string
  price: number
  originalPrice?: number
  tags: string[]
  image: string
  visaType: string
  category: string
  totalLessons: number
  rating: number
  reviewCount: number
  wistiaMediaId: string // Main course video
  previewWistiaMediaId: string // Preview video for non-enrolled users

  // Tab content
  overview: {
    about: string[]
    learningPoints: string[]
  }
  instructorBio: {
    name: string
    title: string
    bio: string[]
    credentials: string[]
  }
  faq: {
    question: string
    answer: string
  }[]
  announcements: {
    date: string
    title: string
    content: string
  }[]
  reviews: {
    name: string
    rating: number
    date: string
    comment: string
  }[]
  courseContent: {
    id: string
    title: string
    duration: string
    lessons: {
      title: string
      duration: string
      completed?: boolean
    }[]
  }[]
}

export const coursesData: Course[] = [
  // Course 1 - Teddy Cahyadi - DV Lottery
  {
    id: 1,
    title: "DV Lottery Masterclass: Cara Menang & Persiapan Interview",
    description: "Panduan lengkap memenangkan DV Lottery dan persiapan interview dari pemenang langsung. Pelajari strategi, tips, dan pengalaman nyata bekerja sebagai Jr. Executive Sous Chef di Sofitel New York, USA.",
    instructor: "Teddy Cahyadi",
    duration: "6 jam",
    level: "Pemula",
    price: 149000,
    originalPrice: 299000,
    tags: ["GRATIS", "POPULER", "PEMULA"],
    image: "/courses/1-TEDDY.jpg",
    visaType: "Diversity/Lottery Visa",
    category: "Imigrasi & Visa",
    totalLessons: 24,
    rating: 4.9,
    reviewCount: 342,
    wistiaMediaId: "5inp6y66ic",
    previewWistiaMediaId: "hu02uiarql", // TODO: Replace with actual preview video ID

    overview: {
      about: [
        "Kursus komprehensif tentang DV Lottery (Diversity Visa Lottery Program) yang akan memandu Anda dari proses pendaftaran hingga persiapan interview di konsulat Amerika. Dipandu langsung oleh Tedchay yang telah berhasil memenangkan DV Lottery dan kini tinggal di Amerika Serikat.",
        "Cocok untuk siapa saja yang ingin mencoba peruntungan DV Lottery atau yang sudah menang dan membutuhkan panduan lengkap untuk proses selanjutnya. Pelajari dari pengalaman nyata, bukan hanya teori!"
      ],
      learningPoints: [
        "Memahami syarat kelayakan DV Lottery secara detail",
        "Mengisi formulir DS-260 dengan benar dan lengkap",
        "Tips meningkatkan peluang menang DV Lottery",
        "Persiapan dokumen untuk interview konsulat",
        "Teknik menjawab pertanyaan interview dengan percaya diri",
        "Memahami proses medical exam dan vaksinasi",
        "Langkah-langkah setelah mendapat approval visa",
        "Cara menghindari kesalahan umum yang sering terjadi"
      ]
    },

    instructorBio: {
      name: "Teddy Cahyadi",
      title: "DV Lottery Winner & Jr. Executive Sous Chef",
      bio: [
        "Tedchay adalah mantan kontestan Master Chef Indonesia yang berhasil memenangkan DV Lottery dan kini bekerja sebagai Jr. Executive Sous Chef di Sofitel New York, USA. Dengan pengalaman langsung dalam proses imigrasi, Tedchay membagikan tips dan trik praktis yang tidak akan Anda temukan di panduan resmi.",
        "Sebagai content creator dan YouTuber dengan ribuan subscriber, Tedchay memiliki kemampuan menjelaskan konsep kompleks dengan cara yang mudah dipahami dan engaging. Bergabunglah dengan ribuan orang Indonesia lainnya yang telah belajar dari pengalaman Tedchay!"
      ],
      credentials: [
        "Pemenang DV Lottery 2018",
        "Jr. Executive Sous Chef di Sofitel New York",
        "Mantan Kontestan Master Chef Indonesia",
        "10,000+ subscriber di YouTube"
      ]
    },

    faq: [
      {
        question: "Apakah saya perlu membayar untuk mendaftar DV Lottery?",
        answer: "Tidak! Pendaftaran DV Lottery resmi di dvprogram.state.gov adalah 100% GRATIS. Hati-hati dengan penipuan yang meminta bayaran untuk mendaftar."
      },
      {
        question: "Berapa peluang saya untuk menang DV Lottery?",
        answer: "Peluang bervariasi tergantung negara asal. Untuk Indonesia, rata-rata peluang sekitar 0.5-1%. Meskipun kecil, ribuan orang Indonesia berhasil setiap tahunnya!"
      },
      {
        question: "Apakah saya bisa membawa keluarga jika menang?",
        answer: "Ya! Anda bisa include spouse (suami/istri) dan anak unmarried di bawah 21 tahun dalam aplikasi DV Lottery Anda."
      },
      {
        question: "Berapa lama proses dari menang hingga dapat Green Card?",
        answer: "Biasanya 6-12 bulan dari pengumuman pemenang hingga interview di konsulat. Setelah approved, Anda harus masuk ke USA dalam 6 bulan."
      },
      {
        question: "Apakah kursus ini cocok untuk pemula yang belum pernah apply?",
        answer: "Sangat cocok! Kursus ini dirancang untuk pemula yang sama sekali belum mengenal DV Lottery. Semua dijelaskan step by step dari nol."
      }
    ],

    announcements: [
      {
        date: "15 Januari 2025",
        title: "Kursus Sekarang 100% GRATIS!",
        content: "Sebagai bagian dari misi membantu lebih banyak orang Indonesia meraih American Dream, kursus DV Lottery ini sekarang dapat diakses secara gratis. Daftar sekarang dan mulai belajar!"
      },
      {
        date: "10 Januari 2025",
        title: "Update: Periode Pendaftaran DV-2027",
        content: "Pendaftaran DV Lottery 2027 dibuka Oktober 2025. Persiapkan diri Anda dari sekarang dengan mengikuti kursus ini!"
      },
      {
        date: "5 Januari 2025",
        title: "Live Q&A Session Bersama Tedchay",
        content: "Bergabunglah dalam sesi tanya jawab langsung setiap akhir bulan di YouTube channel Tedchay. Link akan dibagikan kepada member kursus."
      }
    ],

    reviews: [
      {
        name: "Budi Santoso",
        rating: 5,
        date: "10 Januari 2025",
        comment: "Kursus terbaik untuk DV Lottery! Saya berhasil menang tahun ini dan semua berkat tips dari Tedchay. Penjelasannya sangat detail dan mudah diikuti."
      },
      {
        name: "Siti Nurhaliza",
        rating: 5,
        date: "8 Januari 2025",
        comment: "Alhamdulillah berhasil lolos interview konsulat! Persiapan interview dari kursus ini sangat membantu. Highly recommended!"
      },
      {
        name: "Rudi Hartono",
        rating: 4,
        date: "5 Januari 2025",
        comment: "Konten sangat lengkap dan informatif. Saya baru apply tahun ini, semoga berhasil. Terima kasih Tedchay!"
      },
      {
        name: "Dewi Lestari",
        rating: 5,
        date: "3 Januari 2025",
        comment: "Gratis tapi kualitasnya premium! Saya sudah apply 3 tahun dan baru tahun ini menang setelah ikuti tips dari kursus ini."
      }
    ],

    courseContent: [
      {
        id: "01",
        title: "Pengenalan DV Lottery",
        duration: "35 menit",
        lessons: [
          { title: "Selamat Datang di Kursus", duration: "3 menit", completed: true },
          { title: "Apa itu DV Lottery?", duration: "8 menit" },
          { title: "Syarat & Kelayakan", duration: "12 menit" },
          { title: "Timeline & Jadwal Penting", duration: "7 menit" },
          { title: "Peluang & Statistik", duration: "5 menit" }
        ]
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
          { title: "Common Mistakes to Avoid", duration: "10 menit" }
        ]
      },
      {
        id: "03",
        title: "Setelah Menang",
        duration: "45 menit",
        lessons: [
          { title: "Notifikasi & Confirmation Number", duration: "8 menit" },
          { title: "Form DS-260 Step by Step", duration: "20 menit" },
          { title: "Supporting Documents", duration: "12 menit" },
          { title: "Paying Fees", duration: "5 menit" }
        ]
      },
      {
        id: "04",
        title: "Persiapan Interview",
        duration: "1 jam 30 menit",
        lessons: [
          { title: "Dokumen yang Dibawa ke Konsulat", duration: "15 menit" },
          { title: "Pertanyaan Interview Umum", duration: "25 menit" },
          { title: "Tips Menjawab dengan Percaya Diri", duration: "20 menit" },
          { title: "Dress Code & Etika", duration: "10 menit" },
          { title: "Simulasi Interview", duration: "20 menit" }
        ]
      },
      {
        id: "05",
        title: "Medical Exam & Vaksinasi",
        duration: "40 menit",
        lessons: [
          { title: "Persiapan Medical Exam", duration: "12 menit" },
          { title: "Vaksinasi yang Diperlukan", duration: "15 menit" },
          { title: "Biaya dan Prosedur", duration: "13 menit" }
        ]
      }
    ]
  },

  // Course 2 - Riko Nugraha - Tourist Visa
  {
    id: 2,
    title: "Tourist Visa to USA: Panduan Liburan & Aplikasi Visa",
    description: "Panduan lengkap mengurus Tourist Visa ke Amerika. Pelajari cara aplikasi, tips interview, dan explore destinasi wisata populer di USA dari pengalaman nyata.",
    instructor: "Riko Nugraha",
    duration: "3 jam",
    level: "Pemula",
    price: 99000,
    originalPrice: 199000,
    tags: ["DISKON", "PEMULA"],
    image: "/courses/2-RIKO.jpg",
    visaType: "Tourist Visa",
    category: "Visa & Travel",
    totalLessons: 15,
    rating: 4.8,
    reviewCount: 156,
    wistiaMediaId: "mtakj95z0k",
    previewWistiaMediaId: "rl4g0kxmzi", // TODO: Replace with actual preview video ID

    overview: {
      about: [
        "Panduan praktis untuk mendapatkan Tourist Visa (B1/B2) ke Amerika Serikat. Pelajari seluruh proses dari persiapan dokumen, pengisian form DS-160, hingga tips sukses interview di konsulat.",
        "Riko akan berbagi pengalaman pribadinya dalam mengurus visa turis dan tips liburan hemat di Amerika. Cocok untuk yang ingin berlibur, mengunjungi keluarga, atau sekadar jalan-jalan ke negeri Paman Sam."
      ],
      learningPoints: [
        "Cara mengisi form DS-160 dengan benar",
        "Persiapan dokumen pendukung yang kuat",
        "Tips interview konsulat untuk tourist visa",
        "Menghindari visa rejection",
        "Destinasi wisata populer di USA",
        "Tips liburan hemat di Amerika",
        "Itinerary planning yang efektif",
        "Travel insurance dan kebutuhan lainnya"
      ]
    },

    instructorBio: {
      name: "Riko Nugraha",
      title: "Travel Enthusiast & Visa Consultant",
      bio: [
        "Riko adalah seorang travel enthusiast yang telah berkunjung ke Amerika Serikat berkali-kali dengan tourist visa. Dengan pengalaman lebih dari 5 tahun membantu teman dan keluarga mengurus visa turis, Riko memahami seluk-beluk proses aplikasi.",
        "Melalui kursus ini, Riko ingin membantu lebih banyak orang Indonesia mewujudkan impian liburan ke Amerika dengan panduan yang praktis dan mudah diikuti."
      ],
      credentials: [
        "Berpengalaman 5+ kali ke USA dengan tourist visa",
        "Membantu 100+ orang mendapatkan tourist visa",
        "Travel blogger dengan 50,000+ followers",
        "Certified Travel Consultant"
      ]
    },

    faq: [
      {
        question: "Berapa biaya untuk apply tourist visa ke USA?",
        answer: "Biaya aplikasi visa (MRV fee) adalah $185 atau sekitar Rp 2.9 juta. Biaya ini non-refundable meskipun visa Anda ditolak."
      },
      {
        question: "Berapa lama proses mendapatkan tourist visa?",
        answer: "Dari pendaftaran hingga interview biasanya 2-4 minggu. Setelah interview, visa bisa keluar 3-7 hari kerja jika approved."
      },
      {
        question: "Apa saja dokumen yang diperlukan?",
        answer: "Paspor, foto, bukti finansial (rekening koran), surat kerja, bukti ikatan dengan Indonesia (sertifikat rumah/tanah), dan itinerary perjalanan."
      },
      {
        question: "Apakah tourist visa bisa diperpanjang?",
        answer: "Tourist visa biasanya valid 10 tahun multiple entry. Namun, setiap kunjungan maksimal 6 bulan dan bisa diperpanjang dengan aplikasi ke USCIS."
      },
      {
        question: "Bagaimana jika visa saya ditolak?",
        answer: "Anda bisa apply kembali kapan saja dengan memperbaiki kekurangan aplikasi sebelumnya. Tidak ada batasan jumlah aplikasi."
      }
    ],

    announcements: [
      {
        date: "12 Januari 2025",
        title: "Promo Tahun Baru - Diskon 50%!",
        content: "Dapatkan kursus ini dengan harga spesial Rp 199rb (harga normal Rp 399rb). Promo terbatas hingga akhir Januari 2025!"
      },
      {
        date: "8 Januari 2025",
        title: "Update: Jadwal Interview Konsulat",
        content: "Konsulat US di Jakarta dan Surabaya sudah membuka jadwal hingga April 2025. Segera booking interview Anda!"
      }
    ],

    reviews: [
      {
        name: "Putri Amelia",
        rating: 5,
        date: "11 Januari 2025",
        comment: "Approved! Terima kasih banyak mas Riko. Tips interviewnya sangat membantu, saya jadi lebih percaya diri."
      },
      {
        name: "Andi Wijaya",
        rating: 5,
        date: "9 Januari 2025",
        comment: "Kursus yang sangat worth it. Penjelasannya detail dan mudah dipahami. Recommended untuk yang mau apply tourist visa."
      },
      {
        name: "Linda Kusuma",
        rating: 4,
        date: "7 Januari 2025",
        comment: "Konten bagus, tapi saya berharap ada lebih banyak contoh case study. Overall sangat membantu!"
      }
    ],

    courseContent: [
      {
        id: "01",
        title: "Pengenalan Tourist Visa",
        duration: "25 menit",
        lessons: [
          { title: "Welcome & Course Overview", duration: "3 menit", completed: true },
          { title: "Apa itu B1/B2 Visa?", duration: "8 menit" },
          { title: "Siapa yang Perlu Tourist Visa?", duration: "7 menit" },
          { title: "Biaya dan Timeline", duration: "7 menit" }
        ]
      },
      {
        id: "02",
        title: "Persiapan Dokumen",
        duration: "45 menit",
        lessons: [
          { title: "Checklist Dokumen Lengkap", duration: "10 menit" },
          { title: "Bukti Finansial yang Kuat", duration: "12 menit" },
          { title: "Surat Sponsor (jika ada)", duration: "8 menit" },
          { title: "Itinerary dan Booking", duration: "15 menit" }
        ]
      },
      {
        id: "03",
        title: "Mengisi Form DS-160",
        duration: "50 menit",
        lessons: [
          { title: "Cara Akses Form DS-160", duration: "5 menit" },
          { title: "Step by Step Mengisi Form", duration: "30 menit" },
          { title: "Upload Foto yang Benar", duration: "10 menit" },
          { title: "Review & Submit", duration: "5 menit" }
        ]
      },
      {
        id: "04",
        title: "Interview Konsulat",
        duration: "40 menit",
        lessons: [
          { title: "Booking Jadwal Interview", duration: "8 menit" },
          { title: "Persiapan Hari H", duration: "12 menit" },
          { title: "Pertanyaan Interview Umum", duration: "15 menit" },
          { title: "Tips Approved", duration: "5 menit" }
        ]
      }
    ]
  },

  // Course 3 - Mutiara - Fullbright Scholarship
  {
    id: 3,
    title: "Beasiswa Fullbright: Raih Master di Amerika",
    description: "Strategi mendapatkan beasiswa Fullbright untuk program Master di universitas top Amerika. Pengalaman kuliah di Rutgers University dan tips aplikasi beasiswa.",
    instructor: "Mutiara Indah Puspita Sari, S.Ars",
    duration: "8 jam",
    level: "Menengah",
    price: 99000,
    originalPrice: 199000,
    tags: ["POPULER", "BEASISWA"],
    image: "/courses/3-MUTT.jpg",
    visaType: "J1 Visa",
    category: "Beasiswa & Pendidikan",
    totalLessons: 32,
    rating: 4.9,
    reviewCount: 218,
    wistiaMediaId: "5pb0c21duu",
    previewWistiaMediaId: "anogj1s4s9", // TODO: Replace with actual preview video ID

    overview: {
      about: [
        "Panduan komprehensif untuk mendapatkan beasiswa Fullbright, salah satu beasiswa paling prestisius di dunia. Pelajari dari Mutiara yang berhasil mendapatkan Fullbright Masters dan kuliah di Rutgers University.",
        "Kursus ini mencakup seluruh proses aplikasi dari persiapan dokumen, essay writing, hingga interview. Cocok untuk fresh graduate atau profesional yang ingin melanjutkan studi Master di Amerika dengan beasiswa penuh."
      ],
      learningPoints: [
        "Memahami program Fullbright dan eligibility",
        "Strategi memilih universitas dan program studi",
        "Cara menulis statement of purpose yang compelling",
        "Tips mendapatkan letter of recommendation yang kuat",
        "Persiapan TOEFL/IELTS dan GRE",
        "Interview Fullbright yang efektif",
        "Proses acceptance dan J1 visa",
        "Kehidupan sebagai Fullbright scholar di USA"
      ]
    },

    instructorBio: {
      name: "Mutiara Indah Puspita Sari, S.Ars",
      title: "Fullbright Scholar & Master Student at Rutgers",
      bio: [
        "Mutiara adalah seorang arsitek yang berhasil mendapatkan beasiswa Fullbright untuk melanjutkan studi Master di Rutgers University, salah satu universitas top di Amerika Serikat. Dengan background arsitektur dan passion dalam pendidikan, Mutiara ingin membantu lebih banyak orang Indonesia mendapatkan kesempatan yang sama.",
        "Melalui kursus ini, Mutiara berbagi seluruh strategi dan tips yang ia gunakan untuk mendapatkan beasiswa Fullbright, dari persiapan hingga kehidupan sebagai scholar di Amerika."
      ],
      credentials: [
        "Fullbright Masters Scholar 2023",
        "Master Student di Rutgers University",
        "Sarjana Arsitektur dengan IPK 3.8",
        "TOEFL Score 110/120"
      ]
    },

    faq: [
      {
        question: "Apakah beasiswa Fullbright full coverage?",
        answer: "Ya! Fullbright menanggung semua biaya kuliah, living allowance bulanan, tiket PP, asuransi kesehatan, dan biaya-biaya lainnya. Anda tidak perlu keluar biaya sama sekali."
      },
      {
        question: "Berapa IPK minimum untuk apply Fullbright?",
        answer: "Tidak ada IPK minimum resmi, tapi rata-rata awardee memiliki IPK 3.5+. Namun, Fullbright juga melihat aspek lain seperti leadership, community service, dan potensi impact."
      },
      {
        question: "Apakah saya perlu pengalaman kerja?",
        answer: "Untuk Fullbright Masters, pengalaman kerja bukan requirement wajib tapi sangat direkomendasikan. Fresh graduate dengan achievement kuat juga bisa apply."
      },
      {
        question: "Berapa lama proses aplikasi Fullbright?",
        answer: "Proses dari pembukaan aplikasi hingga announcement sekitar 8-10 bulan. Aplikasi biasanya dibuka Februari-April dan hasil keluar November-Desember."
      },
      {
        question: "Apakah harus kembali ke Indonesia setelah lulus?",
        answer: "Ya, Fullbright memiliki 2-year home country requirement. Anda harus kembali ke Indonesia minimal 2 tahun sebelum bisa apply visa kerja/tinggal di USA lagi."
      }
    ],

    announcements: [
      {
        date: "14 Januari 2025",
        title: "Pembukaan Aplikasi Fullbright 2026",
        content: "Fullbright 2026 akan dibuka Februari 2025! Persiapkan dokumen Anda dari sekarang dan join kursus ini untuk maximize peluang Anda."
      },
      {
        date: "10 Januari 2025",
        title: "Webinar: Tips Lolos Fullbright Interview",
        content: "Join webinar gratis tanggal 20 Januari 2025 pukul 19.00 WIB. Link akan dibagikan ke semua peserta kursus."
      }
    ],

    reviews: [
      {
        name: "Rahmat Hidayat",
        rating: 5,
        date: "13 Januari 2025",
        comment: "Alhamdulillah lolos Fullbright 2024! Kursus ini sangat membantu terutama di bagian statement of purpose dan interview prep. Worth every penny!"
      },
      {
        name: "Anisa Putri",
        rating: 5,
        date: "11 Januari 2025",
        comment: "Konten sangat lengkap dan detail. Mutiara menjelaskan dengan sangat baik dan memberikan banyak contoh. Highly recommended!"
      },
      {
        name: "Dimas Prasetyo",
        rating: 4,
        date: "9 Januari 2025",
        comment: "Bagus banget! Saya sedang prepare aplikasi untuk tahun depan dan kursus ini sangat membantu. Semoga berhasil!"
      }
    ],

    courseContent: [
      {
        id: "01",
        title: "Pengenalan Fullbright",
        duration: "40 menit",
        lessons: [
          { title: "Apa itu Fullbright Scholarship?", duration: "10 menit", completed: true },
          { title: "Eligibility & Requirements", duration: "12 menit" },
          { title: "Timeline Aplikasi", duration: "8 menit" },
          { title: "Success Stories", duration: "10 menit" }
        ]
      },
      {
        id: "02",
        title: "Persiapan Aplikasi",
        duration: "1 jam 30 menit",
        lessons: [
          { title: "Memilih Program & Universitas", duration: "20 menit" },
          { title: "Persiapan TOEFL/IELTS", duration: "15 menit" },
          { title: "Persiapan GRE (jika perlu)", duration: "15 menit" },
          { title: "Research & Finding Professors", duration: "20 menit" },
          { title: "Dokumen yang Dibutuhkan", duration: "20 menit" }
        ]
      },
      {
        id: "03",
        title: "Essay & Statement of Purpose",
        duration: "2 jam",
        lessons: [
          { title: "Cara Menulis SOP yang Kuat", duration: "30 menit" },
          { title: "Personal Statement Tips", duration: "25 menit" },
          { title: "Study Objectives", duration: "20 menit" },
          { title: "Contoh Essay yang Baik", duration: "25 menit" },
          { title: "Common Mistakes to Avoid", duration: "20 menit" }
        ]
      },
      {
        id: "04",
        title: "Letter of Recommendation",
        duration: "45 menit",
        lessons: [
          { title: "Memilih Recommender yang Tepat", duration: "15 menit" },
          { title: "Cara Meminta LOR", duration: "15 menit" },
          { title: "Tips untuk Recommender", duration: "15 menit" }
        ]
      },
      {
        id: "05",
        title: "Interview Preparation",
        duration: "1 jam 30 menit",
        lessons: [
          { title: "Format & Struktur Interview", duration: "15 menit" },
          { title: "Pertanyaan yang Sering Ditanya", duration: "30 menit" },
          { title: "Mock Interview Practice", duration: "35 menit" },
          { title: "Tips Menjawab dengan Percaya Diri", duration: "10 menit" }
        ]
      }
    ]
  },

  // Course 4 - Miftakhul - Au Pair
  {
    id: 4,
    title: "Au Pair Program: Kerja & Tinggal di Amerika",
    description: "Panduan lengkap program Au Pair untuk bekerja dan tinggal di Amerika. Pelajari proses aplikasi, kehidupan sebagai Au Pair, dan pengalaman nyata di USA.",
    instructor: "Miftakhul Ma'rifah, S.Pd",
    duration: "5 jam",
    level: "Pemula",
    price: 99000,
    originalPrice: 199000,
    tags: ["KERJA", "PEMULA"],
    image: "/courses/4-MITA.jpg",
    visaType: "J1 Visa",
    category: "Work & Cultural Exchange",
    totalLessons: 20,
    rating: 4.7,
    reviewCount: 189,
    wistiaMediaId: "v7fd4wxbb5",
    previewWistiaMediaId: "kq5y10yvic", // TODO: Replace with actual preview video ID

    overview: {
      about: [
        "Program Au Pair adalah kesempatan emas untuk bekerja dan tinggal di Amerika Serikat selama 1-2 tahun sambil mengasuh anak keluarga host. Selain mendapat gaji, Anda juga mendapat free room & board, asuransi, dan education allowance $500.",
        "Miftakhul, seorang guru yang sukses menjadi Au Pair di USA, akan membagikan seluruh proses dari aplikasi hingga kehidupan sehari-hari sebagai Au Pair. Cocok untuk fresh graduate atau siapapun yang ingin pengalaman international."
      ],
      learningPoints: [
        "Memahami program Au Pair dan requirements",
        "Cara memilih agency yang tepat",
        "Proses aplikasi dan matching dengan host family",
        "Interview tips dengan host family",
        "J1 visa process untuk Au Pair",
        "Duties dan responsibilities sebagai Au Pair",
        "Managing relationship dengan host family",
        "Travel opportunities selama program"
      ]
    },

    instructorBio: {
      name: "Miftakhul Ma'rifah, S.Pd",
      title: "Former Au Pair & Education Specialist",
      bio: [
        "Miftakhul adalah seorang sarjana pendidikan yang memutuskan untuk menjadi Au Pair di Amerika Serikat untuk mendapatkan pengalaman international dan meningkatkan kemampuan bahasa Inggris. Selama 2 tahun sebagai Au Pair, ia tinggal bersama host family di berbagai negara bagian dan belajar banyak tentang budaya Amerika.",
        "Setelah program selesai, Mita kembali ke Indonesia dan sekarang membantu orang lain yang ingin mengikuti program Au Pair melalui konsultasi dan kursus online."
      ],
      credentials: [
        "Au Pair di USA selama 2 tahun",
        "Sarjana Pendidikan (S.Pd)",
        "Certified Childcare Professional",
        "500+ students telah dibantu"
      ]
    },

    faq: [
      {
        question: "Berapa gaji Au Pair di Amerika?",
        answer: "Minimum $195.75 per minggu atau sekitar Rp 3.1 juta per bulan. Plus free room & board (kamar dan makan), asuransi, dan $500 education allowance untuk ambil kelas."
      },
      {
        question: "Apa saja requirements untuk jadi Au Pair?",
        answer: "Wanita/Pria 18-26 tahun, belum menikah, no criminal record, punya pengalaman childcare minimum 200 jam, bahasa Inggris conversational, dan high school diploma minimum."
      },
      {
        question: "Berapa lama program Au Pair?",
        answer: "Program standar adalah 12 bulan dengan opsi extend hingga 24 bulan total. Setelah program selesai, Anda bisa travel di USA selama 30 hari (grace period)."
      },
      {
        question: "Apakah aman untuk perempuan?",
        answer: "Ya! Program Au Pair sangat regulated oleh US State Department. Agency harus melakukan screening ketat terhadap host family dan ada support system 24/7 untuk Au Pair."
      },
      {
        question: "Bisakah saya kuliah sambil jadi Au Pair?",
        answer: "Bisa! Anda wajib ambil minimum 6 credit hours di college/university dengan education allowance $500 yang diberikan host family. Banyak Au Pair yang ambil online classes."
      }
    ],

    announcements: [
      {
        date: "13 Januari 2025",
        title: "Info Session: Meet Former Au Pairs",
        content: "Join virtual meet & greet dengan alumni Au Pair dari berbagai negara bagian. Tanya jawab langsung tentang pengalaman mereka!"
      },
      {
        date: "9 Januari 2025",
        title: "List Agency Au Pair Terpercaya",
        content: "Telah diupdate list agency Au Pair yang recommended untuk apply. Check di section resources!"
      }
    ],

    reviews: [
      {
        name: "Fitri Handayani",
        rating: 5,
        date: "12 Januari 2025",
        comment: "Alhamdulillah sudah berangkat ke USA bulan lalu! Kursus ini sangat membantu dalam proses matching dengan host family. Thank you Mita!"
      },
      {
        name: "Nurul Azizah",
        rating: 5,
        date: "10 Januari 2025",
        comment: "Konten sangat detail dan praktikal. Saya jadi tahu exactly apa yang harus dilakukan untuk jadi Au Pair. Highly recommended!"
      },
      {
        name: "Rani Permata",
        rating: 4,
        date: "8 Januari 2025",
        comment: "Bagus! Tapi saya berharap ada lebih banyak video tentang daily life sebagai Au Pair. Overall sangat membantu."
      }
    ],

    courseContent: [
      {
        id: "01",
        title: "Introduction to Au Pair Program",
        duration: "35 menit",
        lessons: [
          { title: "Welcome to Au Pair Course", duration: "5 menit", completed: true },
          { title: "Apa itu Au Pair?", duration: "10 menit" },
          { title: "Benefits & Challenges", duration: "12 menit" },
          { title: "Eligibility Requirements", duration: "8 menit" }
        ]
      },
      {
        id: "02",
        title: "Memilih Agency & Aplikasi",
        duration: "1 jam 15 menit",
        lessons: [
          { title: "Top Au Pair Agencies", duration: "15 menit" },
          { title: "Comparison & How to Choose", duration: "20 menit" },
          { title: "Application Process Step by Step", duration: "25 menit" },
          { title: "Creating Strong Profile", duration: "15 menit" }
        ]
      },
      {
        id: "03",
        title: "Matching dengan Host Family",
        duration: "1 jam 30 menit",
        lessons: [
          { title: "How Matching Works", duration: "12 menit" },
          { title: "Video Call Interview Tips", duration: "25 menit" },
          { title: "Questions to Ask Host Family", duration: "20 menit" },
          { title: "Red Flags to Watch Out", duration: "18 menit" },
          { title: "Making Your Decision", duration: "15 menit" }
        ]
      },
      {
        id: "04",
        title: "J1 Visa & Pre-Departure",
        duration: "50 menit",
        lessons: [
          { title: "J1 Visa Application", duration: "15 menit" },
          { title: "Packing Tips", duration: "12 menit" },
          { title: "What to Expect on Arrival", duration: "15 menit" },
          { title: "Culture Shock Preparation", duration: "8 menit" }
        ]
      },
      {
        id: "05",
        title: "Life as an Au Pair",
        duration: "1 jam 10 menit",
        lessons: [
          { title: "Daily Duties & Schedule", duration: "18 menit" },
          { title: "Childcare Best Practices", duration: "20 menit" },
          { title: "Managing Homesickness", duration: "12 menit" },
          { title: "Travel & Exploring USA", duration: "20 menit" }
        ]
      }
    ]
  },

  // Course 5 - Marcello - Culinary Career
  {
    id: 5,
    title: "Hotel & Culinary Career di New York",
    description: "Membangun karir di industri kuliner dan hospitality New York. Pengalaman bekerja sebagai Hotel Line Cook dan tips masuk industri restoran Amerika.",
    instructor: "Marcello Josua S",
    duration: "6 jam",
    level: "Menengah",
    price: 99000,
    originalPrice: 199000,
    tags: ["KARIR", "KULINER"],
    image: "/courses/5-MARCELLO.jpg",
    visaType: "J1 Visa",
    category: "Career & Hospitality",
    totalLessons: 25,
    rating: 4.8,
    reviewCount: 167,
    wistiaMediaId: "vlfwvsrsrr",
    previewWistiaMediaId: "6fujmfkm1n", // TODO: Replace with actual preview video ID

    overview: {
      about: [
        "Industri hospitality dan kuliner di Amerika, terutama New York City, menawarkan peluang karir yang luar biasa bagi orang Indonesia. Pelajari bagaimana Marcello memulai karirnya sebagai Hotel Line Cook di salah satu hotel ternama di NYC melalui program J1 Internship.",
        "Kursus ini mencakup seluruh journey dari aplikasi J1 visa, finding job opportunities, interview process, hingga tips sukses di dapur profesional Amerika. Cocok untuk culinary school graduates atau siapapun yang passionate tentang kuliner."
      ],
      learningPoints: [
        "Memahami J1 Internship/Trainee program untuk culinary",
        "Cara mencari dan apply job di USA",
        "Resume dan cover letter untuk hospitality industry",
        "Interview tips untuk culinary positions",
        "Kitchen hierarchy di Amerika",
        "Working in professional kitchen environment",
        "Networking dalam industri hospitality",
        "Career growth opportunities"
      ]
    },

    instructorBio: {
      name: "Marcello Josua S",
      title: "Hotel Line Cook at NYC",
      bio: [
        "Marcello adalah lulusan culinary school yang berhasil mendapatkan kesempatan bekerja di industri hospitality New York melalui program J1 Trainee. Saat ini ia bekerja sebagai Line Cook di salah satu hotel ternama di Manhattan.",
        "Dengan pengalaman bekerja di lingkungan fast-paced kitchen NYC, Marcello ingin berbagi tips dan strategi untuk sukses di industri kuliner Amerika. Dari aplikasi visa hingga daily routine di professional kitchen, semua akan dijelaskan detail dalam kursus ini."
      ],
      credentials: [
        "Line Cook di Hotel NYC",
        "J1 Trainee Visa Holder",
        "Culinary School Graduate",
        "5+ years experience in F&B"
      ]
    },

    faq: [
      {
        question: "Apa itu J1 Internship/Trainee program?",
        answer: "J1 adalah cultural exchange visa yang memungkinkan Anda bekerja di USA untuk training dan internship selama 12-18 bulan. Untuk culinary, biasanya menggunakan kategori Trainee."
      },
      {
        question: "Apakah harus lulusan culinary school?",
        answer: "Untuk J1 Trainee, Anda perlu background relevan - bisa dari culinary school atau minimal 5 years work experience di F&B/hospitality."
      },
      {
        question: "Berapa gaji Line Cook di New York?",
        answer: "Entry level line cook di NYC biasanya $15-18/hour atau sekitar Rp 7-9 juta per bulan. Dengan overtime bisa lebih tinggi. Senior positions bisa $25-30/hour."
      },
      {
        question: "Apakah harus bisa bahasa Inggris fluent?",
        answer: "Conversational English sangat penting karena Anda harus communicate dengan team. Tapi banyak kitchen di NYC yang multicultural, jadi tidak perlu perfect English."
      },
      {
        question: "Bisakah extend J1 visa?",
        answer: "J1 Trainee bisa extend hingga max 18 bulan total. Setelah itu, Anda harus pulang ke Indonesia minimum 2 tahun sebelum bisa apply J1 lagi (2-year rule)."
      }
    ],

    announcements: [
      {
        date: "11 Januari 2025",
        title: "Job Openings: NYC Restaurants Hiring",
        content: "List restaurants dan hotels di NYC yang sedang hiring dan open untuk sponsor J1. Check di resource section!"
      },
      {
        date: "7 Januari 2025",
        title: "Virtual Kitchen Tour: Behind the Scenes",
        content: "Exclusive video tour of professional kitchen di NYC akan diupload minggu depan. Stay tuned!"
      }
    ],

    reviews: [
      {
        name: "Kevin Tanaka",
        rating: 5,
        date: "10 Januari 2025",
        comment: "Sangat inspiratif! Saya juga culinary graduate dan kursus ini memberi roadmap jelas untuk bekerja di USA. Thank you Marcello!"
      },
      {
        name: "Rina Sutanto",
        rating: 5,
        date: "8 Januari 2025",
        comment: "Konten sangat praktis dan applicable. Saya sedang prepare aplikasi J1 dan kursus ini sangat membantu!"
      },
      {
        name: "Benny Wijaya",
        rating: 4,
        date: "6 Januari 2025",
        comment: "Bagus! Insight tentang kitchen culture di USA sangat berguna. Recommended untuk culinary professionals."
      }
    ],

    courseContent: [
      {
        id: "01",
        title: "Introduction to Hospitality Career in USA",
        duration: "30 menit",
        lessons: [
          { title: "Welcome & My Journey", duration: "5 menit", completed: true },
          { title: "Hospitality Industry Overview", duration: "10 menit" },
          { title: "Career Paths in Culinary", duration: "10 menit" },
          { title: "NYC vs Other Cities", duration: "5 menit" }
        ]
      },
      {
        id: "02",
        title: "J1 Visa untuk Culinary",
        duration: "1 jam 15 menit",
        lessons: [
          { title: "J1 Internship vs Trainee", duration: "15 menit" },
          { title: "Finding Sponsor Organization", duration: "20 menit" },
          { title: "Application Process", duration: "25 menit" },
          { title: "DS-2019 & Visa Interview", duration: "15 menit" }
        ]
      },
      {
        id: "03",
        title: "Job Hunting di USA",
        duration: "1 jam 30 menit",
        lessons: [
          { title: "Where to Find Jobs", duration: "15 menit" },
          { title: "Creating US-style Resume", duration: "25 menit" },
          { title: "Cover Letter for Hospitality", duration: "20 menit" },
          { title: "Application & Follow-up", duration: "15 menit" },
          { title: "Networking Tips", duration: "15 menit" }
        ]
      },
      {
        id: "04",
        title: "Interview & Onboarding",
        duration: "1 jam",
        lessons: [
          { title: "Preparing for Culinary Interview", duration: "20 menit" },
          { title: "Common Interview Questions", duration: "15 menit" },
          { title: "Practical Skills Assessment", duration: "15 menit" },
          { title: "Negotiation & Acceptance", duration: "10 menit" }
        ]
      },
      {
        id: "05",
        title: "Working in Professional Kitchen",
        duration: "1 jam 45 menit",
        lessons: [
          { title: "Kitchen Hierarchy & Positions", duration: "15 menit" },
          { title: "Line Cook Daily Routine", duration: "20 menit" },
          { title: "Mise en Place & Prep Work", duration: "15 menit" },
          { title: "Service Time Management", duration: "20 menit" },
          { title: "Kitchen Safety & Standards", duration: "15 menit" },
          { title: "Dealing with Pressure", duration: "10 menit" },
          { title: "Career Advancement", duration: "10 menit" }
        ]
      }
    ]
  },

  // Course 6 - Grace - Accounting Career
  {
    id: 6,
    title: "Accounting Career di Amerika: J1 Visa Path",
    description: "Panduan membangun karir sebagai Accountant di Amerika melalui J1 Visa. Pengalaman kerja di New Jersey dan tips masuk industri akuntansi USA.",
    instructor: "Grace Gevani Aritonang, S.Ak",
    duration: "7 jam",
    level: "Menengah",
    price: 99000,
    originalPrice: 199000,
    tags: ["KARIR", "PROFESIONAL"],
    image: "/courses/6-GRACE.jpg",
    visaType: "J1 Visa",
    category: "Career & Finance",
    totalLessons: 28,
    rating: 4.9,
    reviewCount: 145,
    wistiaMediaId: "dwgyj4f0qe",
    previewWistiaMediaId: "0sxtqyhxf1", // TODO: Replace with actual preview video ID

    overview: {
      about: [
        "Industri akuntansi di Amerika menawarkan peluang karir yang sangat baik dengan gaji kompetitif. Pelajari bagaimana Grace, seorang sarjana akuntansi, berhasil bekerja di New Jersey melalui J1 Trainee program dan membangun karir di salah satu accounting firm terkemuka.",
        "Kursus ini mencakup persiapan dari Indonesia, aplikasi J1 visa, job hunting untuk accounting positions, hingga tips sukses bekerja di corporate America. Cocok untuk accounting graduates atau professionals yang ingin pengalaman international."
      ],
      learningPoints: [
        "J1 Trainee program untuk accounting professionals",
        "US GAAP vs Indonesian accounting standards",
        "Cara apply job sebagai accountant di USA",
        "Resume dan LinkedIn optimization",
        "Interview tips for accounting positions",
        "CPA certification pathway",
        "Working in American corporate culture",
        "Networking dalam accounting industry"
      ]
    },

    instructorBio: {
      name: "Grace Gevani Aritonang, S.Ak",
      title: "Accountant in New Jersey",
      bio: [
        "Grace adalah sarjana akuntansi yang berhasil mendapatkan kesempatan bekerja di Amerika melalui program J1 Trainee. Saat ini ia bekerja sebagai accountant di sebuah perusahaan di New Jersey dan sedang mempersiapkan diri untuk CPA exam.",
        "Melalui kursus ini, Grace ingin membantu accounting professionals Indonesia yang ingin mengembangkan karir di Amerika. Dari persiapan visa hingga daily work life, semua akan dijelaskan berdasarkan pengalaman nyata."
      ],
      credentials: [
        "Accountant di New Jersey",
        "Sarjana Akuntansi (S.Ak) IPK 3.7",
        "J1 Trainee Visa Holder",
        "CPA Candidate"
      ]
    },

    faq: [
      {
        question: "Apakah harus punya CPA untuk kerja di USA?",
        answer: "Tidak wajib untuk entry-level positions. Namun CPA sangat membantu untuk career advancement dan gaji lebih tinggi. Banyak perusahaan yang support employees untuk ambil CPA exam."
      },
      {
        question: "Berapa gaji accountant di Amerika?",
        answer: "Entry level accountant: $50,000-65,000/year (Rp 65-85 juta/bulan). Senior accountant: $70,000-90,000/year. CPA holders bisa lebih tinggi lagi."
      },
      {
        question: "Apakah accounting degree dari Indonesia diakui?",
        answer: "Ya, tapi Anda perlu credential evaluation untuk memastikan equivalency. Untuk CPA exam, ada requirement tertentu yang harus dipenuhi tergantung state."
      },
      {
        question: "Berapa lama J1 Trainee untuk accounting?",
        answer: "Maximum 18 bulan (1.5 tahun). Ini cukup untuk mendapat valuable experience dan potentially prepare for CPA exam."
      },
      {
        question: "Bisakah switch ke H1B work visa setelah J1?",
        answer: "Technically bisa, tapi harus wait 2 years setelah J1 berakhir (2-year home residency requirement). Atau bisa apply waiver dalam kondisi tertentu."
      }
    ],

    announcements: [
      {
        date: "12 Januari 2025",
        title: "Update: CPA Exam Requirements 2025",
        content: "CPA exam requirements telah diupdate. Check module terbaru untuk informasi lengkap tentang pathway untuk international candidates."
      },
      {
        date: "8 Januari 2025",
        title: "Networking Event: Accounting Professionals",
        content: "Join virtual networking session dengan Indonesian accountants di USA. Registrasi dibuka untuk course members!"
      }
    ],

    reviews: [
      {
        name: "Josephine Tan",
        rating: 5,
        date: "11 Januari 2025",
        comment: "Kursus terbaik untuk accounting professionals! Sangat detail dan praktis. Saya berhasil dapat job offer di accounting firm di USA. Thank you Grace!"
      },
      {
        name: "Daniel Gunawan",
        rating: 5,
        date: "9 Januari 2025",
        comment: "Konten sangat comprehensive. Tips resume dan interview sangat membantu. Highly recommended untuk accountants!"
      },
      {
        name: "Lisa Margaretha",
        rating: 4,
        date: "7 Januari 2025",
        comment: "Bagus! Insight tentang US GAAP dan work culture sangat berguna. Worth the investment."
      }
    ],

    courseContent: [
      {
        id: "01",
        title: "Accounting Career in USA Overview",
        duration: "35 menit",
        lessons: [
          { title: "Welcome & My Story", duration: "5 menit", completed: true },
          { title: "Accounting Industry di USA", duration: "12 menit" },
          { title: "Career Paths for Accountants", duration: "10 menit" },
          { title: "Salary & Benefits Expectations", duration: "8 menit" }
        ]
      },
      {
        id: "02",
        title: "J1 Visa untuk Accounting",
        duration: "1 jam 20 menit",
        lessons: [
          { title: "J1 Trainee Requirements", duration: "15 menit" },
          { title: "Finding Sponsor & Host Company", duration: "25 menit" },
          { title: "Application & Documentation", duration: "25 menit" },
          { title: "Visa Interview Preparation", duration: "15 menit" }
        ]
      },
      {
        id: "03",
        title: "US GAAP vs Indonesian Standards",
        duration: "1 jam 15 menit",
        lessons: [
          { title: "Key Differences Overview", duration: "20 menit" },
          { title: "Financial Reporting Standards", duration: "25 menit" },
          { title: "Tax Accounting Basics", duration: "20 menit" },
          { title: "Resources untuk Belajar", duration: "10 menit" }
        ]
      },
      {
        id: "04",
        title: "Job Application Strategy",
        duration: "1 jam 45 menit",
        lessons: [
          { title: "Job Boards & Resources", duration: "15 menit" },
          { title: "Creating US-style Accounting Resume", duration: "30 menit" },
          { title: "LinkedIn Profile Optimization", duration: "25 menit" },
          { title: "Cover Letter Best Practices", duration: "20 menit" },
          { title: "Application Tracking & Follow-up", duration: "15 menit" }
        ]
      },
      {
        id: "05",
        title: "Interview & Work Preparation",
        duration: "1 jam 30 menit",
        lessons: [
          { title: "Accounting Interview Questions", duration: "25 menit" },
          { title: "Technical Skills Assessment", duration: "20 menit" },
          { title: "Behavioral Interview Tips", duration: "20 menit" },
          { title: "Salary Negotiation", duration: "15 menit" },
          { title: "First Day & Onboarding", duration: "10 menit" }
        ]
      },
      {
        id: "06",
        title: "CPA Certification Pathway",
        duration: "1 jam 15 menit",
        lessons: [
          { title: "What is CPA?", duration: "10 menit" },
          { title: "Requirements for International Candidates", duration: "20 menit" },
          { title: "Choosing the Right State", duration: "15 menit" },
          { title: "Study Plan & Resources", duration: "20 menit" },
          { title: "Exam Process & Timeline", duration: "10 menit" }
        ]
      }
    ]
  },

  // Course 7 - Fauzan - LPDP Scholarship
  {
    id: 7,
    title: "LPDP Scholarship: Master di New York University",
    description: "Strategi mendapatkan beasiswa LPDP untuk kuliah Master di NYU. Pengalaman kuliah Industrial Engineering dan tips aplikasi beasiswa pemerintah Indonesia.",
    instructor: "Fauzan Rahman",
    duration: "8 jam",
    level: "Menengah",
    price: 99000,
    originalPrice: 199000,
    tags: ["BEASISWA", "POPULER"],
    image: "/courses/7-FAUZAN.jpg",
    visaType: "J1 Visa",
    category: "Beasiswa & Pendidikan",
    totalLessons: 35,
    rating: 4.8,
    reviewCount: 203,
    wistiaMediaId: "gal6htd0ge",
    previewWistiaMediaId: "6lb1rtyt27", // TODO: Replace with actual preview video ID

    overview: {
      about: [
        "LPDP (Lembaga Pengelola Dana Pendidikan) adalah beasiswa pemerintah Indonesia yang memberikan kesempatan kuliah Master/PhD di universitas top dunia dengan full funding. Pelajari dari Fauzan yang berhasil mendapatkan LPDP dan kuliah Industrial Engineering di New York University (NYU).",
        "Kursus ini mencakup seluruh proses aplikasi LPDP dari persiapan dokumen, essay, hingga interview. Plus tips aplikasi universitas luar negeri, khususnya di Amerika. Cocok untuk fresh graduate atau profesional dengan mimpi kuliah S2/S3 gratis."
      ],
      learningPoints: [
        "Memahami skema beasiswa LPDP (Regular, Afirmasi, Targeted)",
        "Eligibility dan requirements LPDP terbaru",
        "Strategi mendapat LoA (Letter of Acceptance) dari universitas top",
        "Cara menulis essay LPDP yang kuat",
        "Rencana studi dan contribution plan yang compelling",
        "Persiapan wawancara LPDP",
        "Proses setelah lolos: J1 visa dan keberangkatan",
        "Kehidupan sebagai awardee LPDP di Amerika"
      ]
    },

    instructorBio: {
      name: "Fauzan Rahman",
      title: "LPDP Scholar & Master Student at NYU",
      bio: [
        "Fauzan adalah penerima beasiswa LPDP yang saat ini sedang menempuh Master in Industrial Engineering di New York University, salah satu universitas terbaik di Amerika. Dengan IPK undergraduate 3.6 dan pengalaman kerja 2 tahun, Fauzan berhasil bersaing dengan ribuan applicants dan lolos LPDP.",
        "Melalui kursus ini, Fauzan berbagi seluruh strategi yang ia gunakan untuk lolos LPDP dan diterima di NYU. Dari persiapan tes (TOEFL/IELTS, GRE), aplikasi LoA, hingga interview LPDP, semuanya dijelaskan step by step."
      ],
      credentials: [
        "LPDP Scholar 2023",
        "Master Student di NYU Tandon School of Engineering",
        "2 years work experience in manufacturing",
        "TOEFL 105, GRE 320"
      ]
    },

    faq: [
      {
        question: "Apakah LPDP full funding?",
        answer: "Ya! LPDP menanggung tuition fee penuh, living allowance, tiket PP, buku, asuransi, aplikasi visa, dan biaya penelitian (untuk PhD). Total bisa mencapai Rp 1-2 miliar untuk program Master di USA."
      },
      {
        question: "Berapa IPK minimum untuk LPDP?",
        answer: "IPK minimum untuk Master adalah 3.0 (skala 4.0). Tapi rata-rata awardee memiliki IPK 3.5+. LPDP juga melihat achievement, leadership, dan contribution to Indonesia."
      },
      {
        question: "Apakah harus sudah punya LoA saat apply LPDP?",
        answer: "Ada dua jalur: Persiapan (belum punya LoA) dan Pendaftar (sudah punya LoA). Keduanya bisa apply, tapi yang sudah punya LoA dari universitas rank tinggi lebih unggul."
      },
      {
        question: "Berapa lama proses seleksi LPDP?",
        answer: "Dari pembukaan pendaftaran hingga pengumuman final sekitar 4-6 bulan. Ada tahap administrasi, tes tertulis (jika diperlukan), dan wawancara."
      },
      {
        question: "Apakah harus kembali ke Indonesia setelah lulus?",
        answer: "Ya, ada kewajiban mengabdi di Indonesia sesuai ikatan dinas (biasanya 2n+1 tahun, dimana n adalah lama studi). Untuk Master 2 tahun berarti 5 tahun pengabdian."
      }
    ],

    announcements: [
      {
        date: "13 Januari 2025",
        title: "LPDP 2025 Batch 1 Dibuka!",
        content: "Pendaftaran LPDP Batch 1 tahun 2025 dibuka Februari 2025. Persiapkan dokumen dari sekarang! Join webinar persiapan tanggal 25 Januari."
      },
      {
        date: "9 Januari 2025",
        title: "Update: Universitas Rank & Prioritas",
        content: "LPDP telah update list universitas prioritas untuk tahun 2025. NYU masuk rank 30 global untuk Engineering!"
      }
    ],

    reviews: [
      {
        name: "Amira Kusuma",
        rating: 5,
        date: "12 Januari 2025",
        comment: "Alhamdulillah lolos LPDP 2024! Kursus ini sangat membantu terutama untuk essay dan interview prep. Terima kasih Fauzan!"
      },
      {
        name: "Dika Pramudya",
        rating: 5,
        date: "10 Januari 2025",
        comment: "Konten sangat lengkap dan up to date dengan requirement LPDP terbaru. Worth every rupiah!"
      },
      {
        name: "Tania Wijaya",
        rating: 4,
        date: "8 Januari 2025",
        comment: "Bagus! Tapi saya berharap ada lebih banyak contoh successful essays. Overall very helpful."
      }
    ],

    courseContent: [
      {
        id: "01",
        title: "Pengenalan LPDP",
        duration: "45 menit",
        lessons: [
          { title: "Apa itu LPDP?", duration: "10 menit", completed: true },
          { title: "Skema Beasiswa (Regular, Afirmasi, Targeted)", duration: "15 menit" },
          { title: "Eligibility & Requirements", duration: "12 menit" },
          { title: "Timeline & Key Dates", duration: "8 menit" }
        ]
      },
      {
        id: "02",
        title: "Memilih Universitas & Program",
        duration: "1 jam 20 menit",
        lessons: [
          { title: "University Ranking & LPDP Preferences", duration: "20 menit" },
          { title: "Choosing the Right Program", duration: "18 menit" },
          { title: "Research Potential Supervisors", duration: "22 menit" },
          { title: "Application Timeline USA vs UK vs Others", duration: "20 menit" }
        ]
      },
      {
        id: "03",
        title: "Mendapatkan Letter of Acceptance",
        duration: "2 jam",
        lessons: [
          { title: "TOEFL/IELTS Preparation", duration: "25 menit" },
          { title: "GRE/GMAT Strategy", duration: "25 menit" },
          { title: "Statement of Purpose for University", duration: "30 menit" },
          { title: "Recommendation Letters", duration: "20 menit" },
          { title: "Application Submission & Follow-up", duration: "20 menit" }
        ]
      },
      {
        id: "04",
        title: "Aplikasi LPDP: Dokumen & Essay",
        duration: "2 jam 15 menit",
        lessons: [
          { title: "Dokumen yang Diperlukan", duration: "20 menit" },
          { title: "Essay 1: Kontribusi untuk Indonesia", duration: "30 menit" },
          { title: "Essay 2: Success Story", duration: "25 menit" },
          { title: "Rencana Studi yang Compelling", duration: "30 menit" },
          { title: "Common Mistakes to Avoid", duration: "15 menit" },
          { title: "Review & Proofreading", duration: "15 menit" }
        ]
      },
      {
        id: "05",
        title: "Wawancara LPDP",
        duration: "1 jam 30 menit",
        lessons: [
          { title: "Format Wawancara LPDP", duration: "15 menit" },
          { title: "Panel & Pewawancara", duration: "10 menit" },
          { title: "Pertanyaan yang Sering Ditanyakan", duration: "30 menit" },
          { title: "Tips Menjawab dengan Percaya Diri", duration: "20 menit" },
          { title: "Mock Interview Practice", duration: "15 menit" }
        ]
      },
      {
        id: "06",
        title: "Setelah Lolos: Persiapan Keberangkatan",
        duration: "50 menit",
        lessons: [
          { title: "Proses Setelah Lolos Seleksi", duration: "10 menit" },
          { title: "J1 Visa Application", duration: "20 menit" },
          { title: "Persiapan Finansial & Packing", duration: "12 menit" },
          { title: "Tips Kehidupan di USA sebagai LPDP Scholar", duration: "8 menit" }
        ]
      }
    ]
  },

  // Course 8 - Eric - F1 Visa Undergraduate
  {
    id: 8,
    title: "F1 Visa: Kuliah S1 di CUNY Baruch College",
    description: "Panduan lengkap kuliah S1 di Amerika dengan F1 Visa. Pengalaman di CUNY Baruch College, public university terbaik, dan tips aplikasi universitas USA.",
    instructor: "Eric Salim Marlie",
    duration: "6 jam",
    level: "Pemula",
    price: 99000,
    originalPrice: 199000,
    tags: ["KULIAH", "F1 VISA"],
    image: "/courses/8-ERIC.jpg",
    visaType: "F1 Visa",
    category: "Pendidikan & Student Life",
    totalLessons: 27,
    rating: 4.7,
    reviewCount: 178,
    wistiaMediaId: "a23hrvv2zg",
    previewWistiaMediaId: "hsh7vk1m5d", // TODO: Replace with actual preview video ID

    overview: {
      about: [
        "Kuliah undergraduate (S1) di Amerika adalah impian banyak siswa Indonesia. Pelajari dari Eric yang saat ini kuliah di CUNY Baruch College, salah satu public university terbaik di New York City dengan biaya relatif affordable.",
        "Kursus ini mencakup seluruh journey dari persiapan aplikasi universitas, F1 visa process, hingga student life di Amerika. Eric akan berbagi tips memilih universitas, aplikasi scholarship, dan bagaimana survive sebagai international student."
      ],
      learningPoints: [
        "Memahami sistem pendidikan tinggi di USA",
        "Cara memilih universitas yang tepat (budget, ranking, location)",
        "Application process: Common App, essays, SAT/ACT",
        "Financial aid & scholarships untuk international students",
        "F1 student visa application",
        "Persiapan keberangkatan dan arrival",
        "Campus life dan academic success tips",
        "OPT (Optional Practical Training) opportunities"
      ]
    },

    instructorBio: {
      name: "Eric Salim Marlie",
      title: "Undergraduate Student at CUNY Baruch College",
      bio: [
        "Eric adalah mahasiswa S1 di CUNY Baruch College, New York City, salah satu public university dengan value terbaik di Amerika. Dengan biaya kuliah yang lebih affordable dibanding private universities, Baruch menawarkan pendidikan berkualitas terutama untuk Business dan Liberal Arts.",
        "Eric memutuskan kuliah di USA setelah lulus SMA di Indonesia. Melalui kursus ini, Eric ingin membantu siswa SMA dan fresh graduates yang bermimpi kuliah di Amerika dengan memberikan panduan praktis dan realistis tentang proses aplikasi dan kehidupan sebagai international student."
      ],
      credentials: [
        "Current student at CUNY Baruch College",
        "F1 Visa holder",
        "SAT Score 1400",
        "Partial scholarship recipient"
      ]
    },

    faq: [
      {
        question: "Berapa biaya kuliah S1 di Amerika?",
        answer: "Bervariasi. Public universities seperti CUNY: $18,000-30,000/year. Private universities: $40,000-70,000/year. Plus living expenses $15,000-20,000/year. Total bisa Rp 500 juta - 1.5 miliar per tahun."
      },
      {
        question: "Apakah ada scholarship untuk international undergraduate students?",
        answer: "Ada, tapi sangat kompetitif. Beberapa universities offer merit-based scholarships. Atau bisa cari external scholarships dari organizations. Full scholarship sangat jarang untuk undergrad."
      },
      {
        question: "Apakah harus ada SAT/ACT?",
        answer: "Banyak universitas sekarang test-optional (terutama post-COVID), tapi SAT/ACT yang bagus bisa strengthen aplikasi. Top universities masih require atau strongly recommend."
      },
      {
        question: "Bisakah kerja part-time dengan F1 visa?",
        answer: "Ya, tapi ada limitasi. On-campus jobs (di kampus) boleh max 20 hours/week during semester. Off-campus harus dapat approval khusus (CPT/OPT)."
      },
      {
        question: "Apa itu OPT dan bagaimana cara mendapatkannya?",
        answer: "OPT (Optional Practical Training) adalah work authorization setelah graduation. F1 students bisa apply untuk 12 months OPT (STEM majors bisa extend hingga 36 months total)."
      }
    ],

    announcements: [
      {
        date: "11 Januari 2025",
        title: "Application Season 2025-2026",
        content: "Early Action/Early Decision deadlines jatuh November 2025. Regular Decision January 2026. Persiapkan dari sekarang!"
      },
      {
        date: "7 Januari 2025",
        title: "Virtual Campus Tour: CUNY Baruch",
        content: "Join virtual campus tour dan Q&A session dengan Eric. Registrasi dibuka untuk course members!"
      }
    ],

    reviews: [
      {
        name: "Jessica Gunawan",
        rating: 5,
        date: "10 Januari 2025",
        comment: "Sangat membantu! Saya SMA kelas 12 dan berencana apply US universities. Kursus ini memberi roadmap jelas. Thank you Eric!"
      },
      {
        name: "Andrew Wijaya",
        rating: 4,
        date: "8 Januari 2025",
        comment: "Konten bagus dan praktis. Essay tips sangat berguna. Recommended untuk yang mau kuliah S1 di USA."
      },
      {
        name: "Michelle Tan",
        rating: 5,
        date: "6 Januari 2025",
        comment: "Love it! Insight tentang CUNY system dan affordable options sangat helpful. Not everyone can afford Ivy League!"
      }
    ],

    courseContent: [
      {
        id: "01",
        title: "Planning Your US College Education",
        duration: "40 menit",
        lessons: [
          { title: "Welcome & My Journey to USA", duration: "5 menit", completed: true },
          { title: "Why Study in USA?", duration: "10 menit" },
          { title: "Types of Universities (Public, Private, Liberal Arts)", duration: "15 menit" },
          { title: "Timeline: When to Start?", duration: "10 menit" }
        ]
      },
      {
        id: "02",
        title: "Choosing Universities",
        duration: "1 jam 15 menit",
        lessons: [
          { title: "Factors to Consider: Budget, Location, Major", duration: "20 menit" },
          { title: "Public vs Private Universities", duration: "15 menit" },
          { title: "Affordable Options for International Students", duration: "20 menit" },
          { title: "Creating Your College List", duration: "20 menit" }
        ]
      },
      {
        id: "03",
        title: "Standardized Tests",
        duration: "1 jam",
        lessons: [
          { title: "SAT vs ACT: Which One?", duration: "12 menit" },
          { title: "SAT Preparation Strategy", duration: "20 menit" },
          { title: "TOEFL/IELTS for International Students", duration: "18 menit" },
          { title: "Test-Optional Policies", duration: "10 menit" }
        ]
      },
      {
        id: "04",
        title: "College Application Process",
        duration: "1 jam 45 menit",
        lessons: [
          { title: "Common Application Overview", duration: "15 menit" },
          { title: "Writing Personal Essays", duration: "30 menit" },
          { title: "Supplemental Essays Tips", duration: "25 menit" },
          { title: "Letters of Recommendation", duration: "15 menit" },
          { title: "Extracurriculars & Activities Section", duration: "20 menit" }
        ]
      },
      {
        id: "05",
        title: "Financial Aid & Scholarships",
        duration: "50 menit",
        lessons: [
          { title: "Understanding Financial Aid for International Students", duration: "15 menit" },
          { title: "Merit-based Scholarships", duration: "15 menit" },
          { title: "External Scholarship Opportunities", duration: "12 menit" },
          { title: "Demonstrating Financial Ability", duration: "8 menit" }
        ]
      },
      {
        id: "06",
        title: "F1 Visa Process",
        duration: "1 jam",
        lessons: [
          { title: "What is F1 Visa?", duration: "10 menit" },
          { title: "I-20 Form & SEVIS Fee", duration: "15 menit" },
          { title: "Visa Interview Preparation", duration: "20 menit" },
          { title: "Common Visa Questions", duration: "15 menit" }
        ]
      },
      {
        id: "07",
        title: "Student Life in USA",
        duration: "1 jam 10 menit",
        lessons: [
          { title: "Pre-Departure Checklist", duration: "12 menit" },
          { title: "Housing Options (Dorm, Off-Campus)", duration: "15 menit" },
          { title: "Academic Success Tips", duration: "18 menit" },
          { title: "Campus Life & Making Friends", duration: "15 menit" },
          { title: "Working & OPT Opportunities", duration: "10 menit" }
        ]
      }
    ]
  },

  // Course 9 - Endin - PhD & Postdoc
  {
    id: 9,
    title: "PhD & Postdoc Research Fellow di Amerika",
    description: "Panduan lengkap menempuh PhD dan menjadi Postdoctoral Research Fellow di Amerika. Strategi riset, publikasi, dan membangun karir akademik di USA.",
    instructor: "Endin Nokik Stuyanna, MD, PhD",
    duration: "10 jam",
    level: "Lanjutan",
    price: 99000,
    originalPrice: 199000,
    tags: ["PhD", "RISET", "LANJUTAN"],
    image: "/courses/9-ENDIN.jpg",
    visaType: "J1/F1 Visa",
    category: "Riset & Akademik",
    totalLessons: 40,
    rating: 4.9,
    reviewCount: 124,
    wistiaMediaId: "gzpq5sedf0",
    previewWistiaMediaId: "j5mgirr4gd", // TODO: Replace with actual preview video ID

    overview: {
      about: [
        "Program PhD di Amerika menawarkan kesempatan riset world-class dengan funding lengkap. Pelajari dari Dr. Endin yang saat ini menjadi Postdoctoral Research Fellow setelah menyelesaikan PhD. Dari aplikasi PhD, navigating doctoral program, hingga career path setelah PhD.",
        "Kursus ini dirancang untuk mereka yang serius mengejar karir akademik dan riset. Mencakup strategi publikasi, grant writing, teaching assistantship, dan transition ke postdoc atau academic positions. Sangat cocok untuk Master graduates atau professionals di bidang STEM, Medical, atau Social Sciences."
      ],
      learningPoints: [
        "PhD application strategy: finding advisors, writing research proposal",
        "Funding opportunities: fellowships, assistantships, grants",
        "F1 vs J1 visa untuk PhD students",
        "Navigating doctoral program: coursework, qualifying exams, dissertation",
        "Research methodology dan publication strategy",
        "Teaching experience dan pedagogical skills",
        "Postdoc application dan negotiation",
        "Academic career path in USA"
      ]
    },

    instructorBio: {
      name: "Endin Nokik Stuyanna, MD, PhD",
      title: "Postdoctoral Research Fellow",
      bio: [
        "Dr. Endin adalah seorang physician scientist yang menyelesaikan MD di Indonesia dan melanjutkan PhD di Amerika Serikat. Saat ini beliau adalah Postdoctoral Research Fellow di salah satu research institution terkemuka, focusing on biomedical research.",
        "Dengan pengalaman navigating both medical dan academic path, Dr. Endin memahami challenges unik yang dihadapi international students dalam PhD program. Melalui kursus ini, beliau ingin membantu calon PhD students mempersiapkan diri dengan baik dan succeed dalam doctoral journey mereka."
      ],
      credentials: [
        "MD from Indonesian Medical School",
        "PhD from US University",
        "Postdoctoral Research Fellow",
        "10+ publications in peer-reviewed journals",
        "Grant recipient (NIH F31 Fellowship)"
      ]
    },

    faq: [
      {
        question: "Apakah PhD di Amerika full funded?",
        answer: "Ya! Hampir semua PhD programs di USA (terutama STEM) memberikan full funding: tuition waiver, stipend $25,000-40,000/year, health insurance. Anda tidak perlu bayar tuition dan dapat gaji bulanan."
      },
      {
        question: "Berapa lama program PhD di Amerika?",
        answer: "Rata-rata 5-6 tahun untuk STEM fields. Humanities dan Social Sciences bisa 6-7 tahun. Tergantung pada research progress dan publication record."
      },
      {
        question: "Apakah perlu Master degree sebelum PhD?",
        answer: "Tidak wajib untuk most programs di USA. Bisa langsung PhD setelah Bachelor's. Namun, Master degree dan research experience akan strengthen your application significantly."
      },
      {
        question: "Apa perbedaan F1 vs J1 visa untuk PhD?",
        answer: "F1: Most common untuk students. OPT opportunities setelah graduation. J1: Usually untuk fellowship recipients. Ada 2-year home residency requirement tapi bisa dapat waiver. Pilihan tergantung funding source."
      },
      {
        question: "Bagaimana career path setelah PhD?",
        answer: "Multiple options: (1) Postdoc → Tenure-track faculty, (2) Industry research positions, (3) Government/non-profit research, (4) Science policy, (5) Consulting. Many options beyond academia!"
      }
    ],

    announcements: [
      {
        date: "12 Januari 2025",
        title: "PhD Application Season 2025",
        content: "Deadlines untuk Fall 2026 PhD programs mostly di December 2025. Persiapkan GRE, TOEFL, dan research proposal dari sekarang!"
      },
      {
        date: "8 Januari 2025",
        title: "Webinar: Life as Postdoc in USA",
        content: "Join exclusive webinar dengan Dr. Endin dan other postdocs sharing their experiences. Tanggal akan diumumkan!"
      }
    ],

    reviews: [
      {
        name: "Dr. Raden Wisnu",
        rating: 5,
        date: "11 Januari 2025",
        comment: "Excellent course! Sebagai PhD candidate, kursus ini sangat membantu dalam planning dissertation dan postdoc applications. Highly recommended!"
      },
      {
        name: "Dian Kusumawati",
        rating: 5,
        date: "9 Januari 2025",
        comment: "Konten sangat comprehensive dan advanced. Perfect untuk yang serius mengejar academic career. Worth the investment!"
      },
      {
        name: "Dr. Ahmad Fauzi",
        rating: 4,
        date: "7 Januari 2025",
        comment: "Bagus sekali! Insight about grant writing dan publication strategy sangat valuable. Would love more content on industry transition."
      }
    ],

    courseContent: [
      {
        id: "01",
        title: "Introduction to PhD in USA",
        duration: "50 menit",
        lessons: [
          { title: "Welcome & My PhD Journey", duration: "8 menit", completed: true },
          { title: "PhD vs Master's: Key Differences", duration: "12 menit" },
          { title: "Structure of PhD Programs", duration: "15 menit" },
          { title: "Career Outcomes After PhD", duration: "15 menit" }
        ]
      },
      {
        id: "02",
        title: "PhD Application Strategy",
        duration: "2 jam",
        lessons: [
          { title: "Choosing Research Area & Programs", duration: "25 menit" },
          { title: "Finding & Contacting Potential Advisors", duration: "30 menit" },
          { title: "Writing Research Proposal/Statement of Purpose", duration: "35 menit" },
          { title: "Letters of Recommendation Strategy", duration: "20 menit" },
          { title: "GRE & TOEFL Preparation", duration: "10 menit" }
        ]
      },
      {
        id: "03",
        title: "Funding Your PhD",
        duration: "1 jam 15 menit",
        lessons: [
          { title: "Types of Funding: TA, RA, Fellowships", duration: "20 menit" },
          { title: "External Fellowships (NSF, NIH, Fulbright)", duration: "25 menit" },
          { title: "Applying for Grants as PhD Student", duration: "20 menit" },
          { title: "Managing Your Stipend", duration: "10 menit" }
        ]
      },
      {
        id: "04",
        title: "Visa Process: F1 vs J1",
        duration: "45 menit",
        lessons: [
          { title: "Understanding F1 Student Visa", duration: "15 menit" },
          { title: "Understanding J1 Exchange Visa", duration: "15 menit" },
          { title: "Visa Interview Tips for PhD Applicants", duration: "15 menit" }
        ]
      },
      {
        id: "05",
        title: "First Year: Coursework & Rotations",
        duration: "1 jam 30 menit",
        lessons: [
          { title: "Navigating Course Requirements", duration: "20 menit" },
          { title: "Lab Rotations (for STEM)", duration: "25 menit" },
          { title: "Choosing Your Advisor", duration: "20 menit" },
          { title: "Qualifying/Comprehensive Exams", duration: "25 menit" }
        ]
      },
      {
        id: "06", title: "Research & Dissertation", duration: "2 jam",
        lessons: [
          { title: "Developing Your Research Project", duration: "25 menit" },
          { title: "Research Methodology Best Practices", duration: "30 menit" },
          { title: "Literature Review & Staying Current", duration: "20 menit" },
          { title: "Dissertation Proposal & Committee", duration: "25 menit" },
          { title: "Writing Your Dissertation", duration: "20 menit" }
        ]
      },
      {
        id: "07",
        title: "Publication Strategy",
        duration: "1 jam 30 menit",
        lessons: [
          { title: "Why Publications Matter", duration: "15 menit" },
          { title: "Choosing Journals & Conference", duration: "20 menit" },
          { title: "Writing Scientific Papers", duration: "30 menit" },
          { title: "Dealing with Peer Review", duration: "15 menit" },
          { title: "Building Your Publication Record", duration: "10 menit" }
        ]
      },
      {
        id: "08",
        title: "Teaching Experience",
        duration: "50 menit",
        lessons: [
          { title: "Teaching Assistantship Duties", duration: "15 menit" },
          { title: "Developing Teaching Skills", duration: "20 menit" },
          { title: "Supervising Undergraduate Researchers", duration: "15 menit" }
        ]
      },
      {
        id: "09",
        title: "Postdoc Applications",
        duration: "1 jam 30 menit",
        lessons: [
          { title: "When to Start Looking for Postdoc", duration: "12 menit" },
          { title: "Finding Postdoc Positions", duration: "20 menit" },
          { title: "Application Materials: CV, Cover Letter, Research Statement", duration: "30 menit" },
          { title: "Interview & Negotiation", duration: "18 menit" },
          { title: "Transitioning to Postdoc Role", duration: "10 menit" }
        ]
      },
      {
        id: "10",
        title: "Career Planning Beyond Postdoc",
        duration: "1 jam 20 menit",
        lessons: [
          { title: "Academic Career Track: Tenure-Track Faculty", duration: "20 menit" },
          { title: "Industry Research Positions", duration: "20 menit" },
          { title: "Alternative Careers for PhDs", duration: "20 menit" },
          { title: "Networking & Professional Development", duration: "12 menit" },
          { title: "Work Authorization: OPT, H1B, Green Card", duration: "8 menit" }
        ]
      }
    ]
  },

  // Course 10 - Dinar - Community Solutions Program
  {
    id: 10,
    title: "Community Solutions Program: Fellowship di Amerika",
    description: "Panduan lengkap mendapatkan fellowship Community Solutions Program dari U.S. Department of State. Pengalaman 4 bulan bekerja di NGO Amerika dan membangun jaringan internasional.",
    instructor: "Dinar Pratiwi, S.Sos",
    duration: "5 jam",
    level: "Menengah",
    price: 99000,
    originalPrice: 199000,
    tags: ["FELLOWSHIP", "NGO", "KOMUNITAS"],
    image: "/courses/10-DINAR.JPEG",
    visaType: "J1 Visa",
    category: "Fellowship & Community Development",
    totalLessons: 22,
    rating: 4.8,
    reviewCount: 134,
    wistiaMediaId: "3i1m0738a3",
    previewWistiaMediaId: "qevchmmumy",

    overview: {
      about: [
        "Community Solutions Program (CSP) adalah program fellowship bergengsi yang didanai oleh U.S. Department of State untuk para pemimpin komunitas dari seluruh dunia. Selama 4 bulan di Amerika, fellows bekerja langsung dengan NGO Amerika untuk mengembangkan solusi inovatif bagi tantangan di komunitas mereka.",
        "Dinar, seorang aktivis sosial yang berhasil menjadi CSP Fellow, akan membagikan seluruh pengalaman dari proses aplikasi hingga implementasi proyek pasca-fellowship. Cocok untuk aktivis, pekerja sosial, atau siapapun yang ingin membuat dampak positif di komunitas."
      ],
      learningPoints: [
        "Memahami program Community Solutions dan eligibility",
        "Cara menulis aplikasi yang compelling",
        "Strategi memilih isu dan organisasi host",
        "Persiapan interview dan assessment",
        "Pengalaman fellowship di NGO Amerika",
        "Networking dengan fellows internasional",
        "Implementasi proyek pasca-fellowship",
        "Bergabung dengan alumni network global"
      ]
    },

    instructorBio: {
      name: "Dinar Pratiwi, S.Sos",
      title: "Community Solutions Program Fellow",
      bio: [
        "Dinar adalah seorang aktivis sosial dan community organizer yang berhasil terpilih sebagai Community Solutions Program Fellow. Selama fellowship, ia ditempatkan di sebuah NGO di Amerika yang fokus pada pemberdayaan perempuan dan pengembangan ekonomi lokal.",
        "Dengan pengalaman bekerja di berbagai organisasi non-profit di Indonesia, Dinar memahami tantangan yang dihadapi para change-makers lokal. Melalui kursus ini, ia ingin membantu lebih banyak orang Indonesia mendapatkan kesempatan fellowship ini dan membawa pulang ilmu untuk memajukan komunitas mereka."
      ],
      credentials: [
        "Community Solutions Program Fellow 2023",
        "Sarjana Sosiologi (S.Sos)",
        "5+ tahun pengalaman di NGO",
        "Founder komunitas pemberdayaan lokal"
      ]
    },

    faq: [
      {
        question: "Apa itu Community Solutions Program?",
        answer: "CSP adalah program fellowship 4 bulan yang didanai U.S. Department of State. Fellows ditempatkan di NGO Amerika untuk belajar best practices dalam community development, civic engagement, atau isu sosial lainnya."
      },
      {
        question: "Apakah biaya fellowship ditanggung sepenuhnya?",
        answer: "Ya! CSP adalah fully-funded fellowship. Semua biaya ditanggung termasuk tiket pesawat PP, akomodasi, living allowance, asuransi kesehatan, dan biaya program. Anda tidak perlu mengeluarkan biaya sama sekali."
      },
      {
        question: "Siapa yang bisa apply CSP?",
        answer: "CSP terbuka untuk emerging leaders berusia 25-38 tahun dengan minimal 3 tahun pengalaman di bidang community development, civic engagement, atau isu sosial. Harus memiliki proyek atau inisiatif yang akan dikembangkan setelah fellowship."
      },
      {
        question: "Berapa lama proses seleksi CSP?",
        answer: "Proses seleksi sekitar 6-8 bulan dari pembukaan aplikasi hingga pengumuman. Ada tahap aplikasi online, interview, dan final selection oleh IREX dan U.S. Department of State."
      },
      {
        question: "Apakah harus kembali ke Indonesia setelah fellowship?",
        answer: "Ya, CSP mengharuskan fellows kembali ke negara asal untuk mengimplementasikan proyek dan berbagi ilmu yang didapat. Ini adalah inti dari program - membawa dampak positif ke komunitas Anda."
      }
    ],

    announcements: [
      {
        date: "14 Januari 2025",
        title: "Pembukaan Aplikasi CSP 2026",
        content: "Aplikasi Community Solutions Program 2026 dibuka Maret 2025! Persiapkan proposal proyek Anda dari sekarang. Join webinar persiapan untuk course members!"
      },
      {
        date: "10 Januari 2025",
        title: "Alumni Sharing Session",
        content: "Dengarkan pengalaman langsung dari CSP alumni Indonesia dalam virtual sharing session. Registrasi dibuka khusus untuk peserta kursus!"
      }
    ],

    reviews: [
      {
        name: "Ratna Dewi",
        rating: 5,
        date: "12 Januari 2025",
        comment: "Alhamdulillah lolos CSP 2024! Kursus ini sangat membantu terutama untuk menyusun proposal proyek dan persiapan interview. Terima kasih Dinar!"
      },
      {
        name: "Bagus Prasetyo",
        rating: 5,
        date: "10 Januari 2025",
        comment: "Konten sangat praktikal dan based on real experience. Saya jadi paham exactly apa yang dicari oleh selection committee. Highly recommended!"
      },
      {
        name: "Sri Wahyuni",
        rating: 4,
        date: "8 Januari 2025",
        comment: "Bagus! Insight tentang kehidupan sebagai fellow dan networking tips sangat berguna. Semoga tahun depan bisa lolos!"
      }
    ],

    courseContent: [
      {
        id: "01",
        title: "Pengenalan Community Solutions Program",
        duration: "40 menit",
        lessons: [
          { title: "Selamat Datang di Kursus", duration: "5 menit", completed: true },
          { title: "Apa itu Community Solutions Program?", duration: "12 menit" },
          { title: "Manfaat dan Kesempatan CSP", duration: "13 menit" },
          { title: "Timeline dan Proses Seleksi", duration: "10 menit" }
        ]
      },
      {
        id: "02",
        title: "Eligibility dan Persiapan",
        duration: "50 menit",
        lessons: [
          { title: "Siapa yang Bisa Apply?", duration: "10 menit" },
          { title: "Track dan Fokus Area CSP", duration: "15 menit" },
          { title: "Menentukan Isu dan Proyek", duration: "15 menit" },
          { title: "Persiapan Dokumen", duration: "10 menit" }
        ]
      },
      {
        id: "03",
        title: "Menulis Aplikasi yang Kuat",
        duration: "1 jam 30 menit",
        lessons: [
          { title: "Overview Aplikasi Online", duration: "10 menit" },
          { title: "Menulis Personal Statement", duration: "25 menit" },
          { title: "Menyusun Proposal Proyek", duration: "30 menit" },
          { title: "Tips Recommendation Letters", duration: "15 menit" },
          { title: "Common Mistakes to Avoid", duration: "10 menit" }
        ]
      },
      {
        id: "04",
        title: "Persiapan Interview",
        duration: "1 jam",
        lessons: [
          { title: "Format Interview CSP", duration: "12 menit" },
          { title: "Pertanyaan yang Sering Ditanyakan", duration: "20 menit" },
          { title: "Cara Menjawab dengan Percaya Diri", duration: "18 menit" },
          { title: "Mock Interview Practice", duration: "10 menit" }
        ]
      },
      {
        id: "05",
        title: "Pengalaman Fellowship di Amerika",
        duration: "1 jam 15 menit",
        lessons: [
          { title: "Pre-Departure dan J1 Visa", duration: "15 menit" },
          { title: "Orientation dan Training", duration: "15 menit" },
          { title: "Bekerja di NGO Amerika", duration: "20 menit" },
          { title: "Networking dengan Fellows Lain", duration: "15 menit" },
          { title: "Cultural Exchange dan Travel", duration: "10 menit" }
        ]
      },
      {
        id: "06",
        title: "Pasca-Fellowship dan Alumni Network",
        duration: "45 menit",
        lessons: [
          { title: "Implementasi Proyek di Indonesia", duration: "15 menit" },
          { title: "Alumni Grants dan Opportunities", duration: "12 menit" },
          { title: "Bergabung dengan Alumni Network", duration: "10 menit" },
          { title: "Continuing Your Impact", duration: "8 menit" }
        ]
      }
    ]
  }
]

// Helper function to get course by ID
export function getCourseById(id: number): Course | undefined {
  return coursesData.find(course => course.id === id)
}

// Helper function to get all courses
export function getAllCourses(): Course[] {
  return coursesData
}
