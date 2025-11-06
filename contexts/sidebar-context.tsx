"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface SidebarContextType {
  showUserCards: boolean
  toggleUserCards: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [showUserCards, setShowUserCards] = useState(true)

  const toggleUserCards = () => {
    setShowUserCards(prev => !prev)
  }

  return (
    <SidebarContext.Provider value={{ showUserCards, toggleUserCards }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
