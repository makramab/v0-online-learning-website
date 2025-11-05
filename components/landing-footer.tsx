import { Instagram, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"

export function LandingFooter() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex flex-col items-center gap-6">
          <p className="text-sm text-slate-600">© 2025 gotoamerica. Membantu Orang Indonesia Meraih American Dream.</p>
          <div className="flex items-center gap-6">
            <Link
              href="https://www.youtube.com/@tedchay"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-primary transition-colors"
              aria-label="YouTube Tedchay"
            >
              <Youtube className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-slate-600 hover:text-primary transition-colors" aria-label="Instagram Tedchay">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-slate-600 hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
