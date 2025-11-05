"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, Trophy, Crown } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari kursus atau topik..."
              className="pl-10 bg-muted border-0 focus-visible:ring-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Trophy className="w-5 h-5 text-primary" />
            <span>12 Kursus Selesai</span>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>
          <Avatar className="w-9 h-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
            <AvatarFallback>BP</AvatarFallback>
          </Avatar>
          <Button className="bg-red-600 text-white hover:bg-red-700 font-semibold gap-2 shadow-md">
            <Crown className="w-4 h-4" />
            Premium
          </Button>
        </div>
      </div>
    </header>
  )
}
