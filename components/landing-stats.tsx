export function LandingStats() {
  const stats = [
    { number: "1000+", label: "Pelajar Indonesia" },
    { number: "50+", label: "Video Pembelajaran" },
    { number: "100%", label: "Pengalaman Nyata" },
  ]

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-3 group">
              <div className="text-6xl font-bold text-[#1c9af1] group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
              <div className="text-lg text-slate-700 font-medium">{stat.label}</div>
              <div className="w-16 h-1 bg-red-600/30 mx-auto rounded-full group-hover:w-24 group-hover:bg-red-600 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
