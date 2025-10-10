import { Instagram, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"

export function LandingFooter() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex flex-col items-center gap-6">
          <p className="text-sm text-gray-400">© 2025 Tedchay Academy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-white hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-white hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-white hover:text-primary transition-colors" aria-label="YouTube">
              <Youtube className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
