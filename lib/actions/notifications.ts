'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Notification types
export type NotificationType = 'course' | 'achievement' | 'community' | 'system' | 'payment'

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message: string
  link: string | null
  is_read: boolean
  created_at: string
  metadata: Record<string, unknown>
}

export interface CreateNotificationData {
  type: NotificationType
  title: string
  message: string
  link?: string
  metadata?: Record<string, unknown>
}

/**
 * Get all notifications for the current user
 * @param limit - Maximum number of notifications to fetch (default: 20)
 * @param includeRead - Whether to include read notifications (default: true)
 */
export async function getNotifications(
  limit: number = 20,
  includeRead: boolean = true
): Promise<{ notifications: Notification[]; error: string | null }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { notifications: [], error: 'Not authenticated' }
  }

  let query = supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (!includeRead) {
    query = query.eq('is_read', false)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching notifications:', error)
    return { notifications: [], error: error.message }
  }

  return { notifications: data as Notification[], error: null }
}

/**
 * Get count of unread notifications
 */
export async function getUnreadCount(): Promise<{ count: number; error: string | null }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { count: 0, error: 'Not authenticated' }
  }

  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('is_read', false)

  if (error) {
    console.error('Error fetching unread count:', error)
    return { count: 0, error: error.message }
  }

  return { count: count ?? 0, error: null }
}

/**
 * Mark a single notification as read
 */
export async function markNotificationAsRead(
  notificationId: string
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error marking notification as read:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/courses')
  return { success: true, error: null }
}

/**
 * Mark all notifications as read for the current user
 */
export async function markAllNotificationsAsRead(): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', user.id)
    .eq('is_read', false)

  if (error) {
    console.error('Error marking all notifications as read:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/courses')
  return { success: true, error: null }
}

/**
 * Delete a single notification
 */
export async function deleteNotification(
  notificationId: string
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting notification:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/courses')
  return { success: true, error: null }
}

/**
 * Create a new notification for the current user
 * This is typically called from other server actions when events occur
 */
export async function createNotification(
  data: CreateNotificationData
): Promise<{ notification: Notification | null; error: string | null }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { notification: null, error: 'Not authenticated' }
  }

  const { data: notification, error } = await supabase
    .from('notifications')
    .insert({
      user_id: user.id,
      type: data.type,
      title: data.title,
      message: data.message,
      link: data.link || null,
      metadata: data.metadata || {},
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating notification:', error)
    return { notification: null, error: error.message }
  }

  revalidatePath('/courses')
  return { notification: notification as Notification, error: null }
}

/**
 * Create a notification for a specific user (admin/system use)
 * This requires the service role or appropriate permissions
 */
export async function createNotificationForUser(
  userId: string,
  data: CreateNotificationData
): Promise<{ notification: Notification | null; error: string | null }> {
  const supabase = await createClient()

  const { data: notification, error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      type: data.type,
      title: data.title,
      message: data.message,
      link: data.link || null,
      metadata: data.metadata || {},
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating notification for user:', error)
    return { notification: null, error: error.message }
  }

  return { notification: notification as Notification, error: null }
}
