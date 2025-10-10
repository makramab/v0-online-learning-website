export function LandingStats() {
  const stats = [
    { number: "30+", label: "Expert Mentors" },
    { number: "200k+", label: "Students Globally" },
    { number: "500+", label: "Total Courses" },
  ]

  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-6xl font-bold text-primary">{stat.number}</div>
              <div className="text-lg text-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
