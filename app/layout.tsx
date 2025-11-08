import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { SidebarProvider } from "@/contexts/sidebar-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "AwalBaru.com - Your Pathway from Indonesia to the United States",
  description:
    "Platform pembelajaran untuk orang Indonesia yang ingin mewujudkan American Dream. Dipandu langsung oleh Tedchay, pemenang DV Lottery yang sukses di Amerika.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <SidebarProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </SidebarProvider>
        <Analytics />
      </body>
    </html>
  )
}
