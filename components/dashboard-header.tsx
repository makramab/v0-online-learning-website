"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, Trophy } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Press ⌘ + F to search"
              className="pl-10 bg-muted border-0 focus-visible:ring-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Trophy className="w-5 h-5 text-primary" />
            <span>1041 Trophy</span>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>
          <Avatar className="w-9 h-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            Join Bootcamp
            <Badge className="ml-2 bg-black text-primary-foreground">20% OFF</Badge>
          </Button>
        </div>
      </div>
    </header>
  )
}
