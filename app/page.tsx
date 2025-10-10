import { LandingHeader } from "@/components/landing-header"
import { LandingHero } from "@/components/landing-hero"
import { LandingStats } from "@/components/landing-stats"
import { LandingFooter } from "@/components/landing-footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <LandingHeader />
      <LandingHero />
      <LandingStats />
      <LandingFooter />
    </main>
  )
}
