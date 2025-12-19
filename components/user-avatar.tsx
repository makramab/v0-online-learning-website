"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser, getUserInitials, getUserAvatarUrl } from "@/contexts/user-context"
import { cn } from "@/lib/utils"
import type { User } from "@supabase/supabase-js"

interface UserAvatarProps {
  /** Optional user object. If not provided, will use context */
  user?: User | null
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl"
  /** Additional class names */
  className?: string
  /** Fallback class names for the initials */
  fallbackClassName?: string
  /** Show loading skeleton when loading */
  showLoading?: boolean
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-24 h-24 text-2xl",
}

export function UserAvatar({
  user: propUser,
  size = "md",
  className,
  fallbackClassName,
  showLoading = true,
}: UserAvatarProps) {
  const { user: contextUser, isLoading } = useUser()

  // Use prop user if provided, otherwise use context user
  const user = propUser !== undefined ? propUser : contextUser

  const initials = getUserInitials(user)
  const avatarUrl = getUserAvatarUrl(user)

  if (showLoading && isLoading && propUser === undefined) {
    return (
      <div
        className={cn(
          "rounded-full bg-muted animate-pulse",
          sizeClasses[size],
          className
        )}
      />
    )
  }

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      {avatarUrl && (
        <AvatarImage
          src={avatarUrl}
          alt={user?.user_metadata?.full_name || "User avatar"}
        />
      )}
      <AvatarFallback
        className={cn(
          "bg-[#1c9af1] text-white font-semibold",
          fallbackClassName
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
