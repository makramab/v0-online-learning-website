'use server'

import { createClient } from '@/lib/supabase/server'

export interface Course {
  id: string
  slug: string
  title: string
  description: string | null
  short_description: string | null
  price: number
  original_price: number | null
  video_url: string | null
  preview_video_url: string | null
  thumbnail_url: string | null
  instructor_name: string | null
  instructor_title: string | null
  duration_minutes: number
  level: string
  category: string | null
  what_you_will_learn: string[]
  is_published: boolean
  created_at: string
  updated_at: string
}

/**
 * Get all published courses
 */
export async function getAllCourses(): Promise<{ courses: Course[]; error: string | null }> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching courses:', error)
    return { courses: [], error: error.message }
  }

  return { courses: data as Course[], error: null }
}

/**
 * Get a single course by ID
 */
export async function getCourseById(id: string): Promise<{ course: Course | null; error: string | null }> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('Error fetching course:', error)
    return { course: null, error: error.message }
  }

  return { course: data as Course, error: null }
}

/**
 * Get a single course by slug
 */
export async function getCourseBySlug(slug: string): Promise<{ course: Course | null; error: string | null }> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    console.error('Error fetching course by slug:', error)
    return { course: null, error: error.message }
  }

  return { course: data as Course, error: null }
}

/**
 * Get courses by category
 */
export async function getCoursesByCategory(category: string): Promise<{ courses: Course[]; error: string | null }> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('category', category)
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching courses by category:', error)
    return { courses: [], error: error.message }
  }

  return { courses: data as Course[], error: null }
}

/**
 * Format price to Indonesian Rupiah
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Format duration in minutes to human readable string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} menit`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) {
    return `${hours} jam`
  }
  return `${hours} jam ${remainingMinutes} menit`
}
