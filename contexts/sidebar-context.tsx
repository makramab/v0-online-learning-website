"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface SidebarContextType {
  showUserCards: boolean
  toggleUserCards: () => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  toggleMobileMenu: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [showUserCards, setShowUserCards] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleUserCards = () => {
    setShowUserCards(prev => !prev)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev)
  }

  return (
    <SidebarContext.Provider value={{
      showUserCards,
      toggleUserCards,
      mobileMenuOpen,
      setMobileMenuOpen,
      toggleMobileMenu
    }}>
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
