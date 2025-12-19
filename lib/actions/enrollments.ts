'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'expired'
export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'e_wallet'

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  payment_status: PaymentStatus
  payment_method: PaymentMethod | null
  payment_reference: string | null
  amount_paid: number | null
  purchased_at: string | null
  expires_at: string | null
  created_at: string
  updated_at: string
}

export interface EnrollmentWithCourse extends Enrollment {
  course: {
    id: string
    slug: string
    title: string
    thumbnail_url: string | null
    instructor_name: string | null
  }
}

/**
 * Check if the current user is enrolled in a course
 */
export async function checkEnrollment(courseId: string): Promise<{
  isEnrolled: boolean
  enrollment: Enrollment | null
  error: string | null
}> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { isEnrolled: false, enrollment: null, error: null }
  }

  const { data, error } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .eq('payment_status', 'paid')
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    console.error('Error checking enrollment:', error)
    return { isEnrolled: false, enrollment: null, error: error.message }
  }

  return {
    isEnrolled: !!data,
    enrollment: data as Enrollment | null,
    error: null
  }
}

/**
 * Get all enrollments for the current user
 */
export async function getUserEnrollments(): Promise<{
  enrollments: EnrollmentWithCourse[]
  error: string | null
}> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { enrollments: [], error: 'Not authenticated' }
  }

  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      course:courses(id, slug, title, thumbnail_url, instructor_name)
    `)
    .eq('user_id', user.id)
    .eq('payment_status', 'paid')
    .order('purchased_at', { ascending: false })

  if (error) {
    console.error('Error fetching user enrollments:', error)
    return { enrollments: [], error: error.message }
  }

  return { enrollments: data as EnrollmentWithCourse[], error: null }
}

/**
 * Create a pending enrollment (before payment)
 */
export async function createPendingEnrollment(
  courseId: string,
  amount: number
): Promise<{ enrollment: Enrollment | null; error: string | null }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { enrollment: null, error: 'Not authenticated' }
  }

  // Check if enrollment already exists
  const { data: existing } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .single()

  if (existing) {
    // If already paid, return error
    if (existing.payment_status === 'paid') {
      return { enrollment: null, error: 'Already enrolled in this course' }
    }
    // If pending/failed, update it
    const { data, error } = await supabase
      .from('enrollments')
      .update({
        payment_status: 'pending',
        amount_paid: amount,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      })
      .eq('id', existing.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating enrollment:', error)
      return { enrollment: null, error: error.message }
    }

    return { enrollment: data as Enrollment, error: null }
  }

  // Create new enrollment
  const { data, error } = await supabase
    .from('enrollments')
    .insert({
      user_id: user.id,
      course_id: courseId,
      payment_status: 'pending',
      amount_paid: amount,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating enrollment:', error)
    return { enrollment: null, error: error.message }
  }

  return { enrollment: data as Enrollment, error: null }
}

/**
 * Update enrollment status after payment
 * This would typically be called from a webhook handler
 */
export async function updateEnrollmentPayment(
  enrollmentId: string,
  paymentData: {
    status: PaymentStatus
    method?: PaymentMethod
    reference?: string
  }
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createClient()

  const updateData: Record<string, unknown> = {
    payment_status: paymentData.status,
  }

  if (paymentData.method) {
    updateData.payment_method = paymentData.method
  }

  if (paymentData.reference) {
    updateData.payment_reference = paymentData.reference
  }

  if (paymentData.status === 'paid') {
    updateData.purchased_at = new Date().toISOString()
  }

  const { error } = await supabase
    .from('enrollments')
    .update(updateData)
    .eq('id', enrollmentId)

  if (error) {
    console.error('Error updating enrollment payment:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/courses')
  return { success: true, error: null }
}

/**
 * Mock payment for testing - marks enrollment as paid
 * TODO: Remove this in production, replace with Doku integration
 */
export async function mockPayment(
  courseId: string,
  amount: number
): Promise<{ success: boolean; enrollmentId: string | null; error: string | null }> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, enrollmentId: null, error: 'Not authenticated' }
  }

  // Check if already enrolled
  const { data: existing } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .single()

  if (existing?.payment_status === 'paid') {
    return { success: false, enrollmentId: null, error: 'Already enrolled in this course' }
  }

  // Create or update enrollment as paid
  if (existing) {
    const { error } = await supabase
      .from('enrollments')
      .update({
        payment_status: 'paid',
        payment_method: 'credit_card',
        payment_reference: `MOCK-${Date.now()}`,
        amount_paid: amount,
        purchased_at: new Date().toISOString(),
      })
      .eq('id', existing.id)

    if (error) {
      console.error('Error updating mock payment:', error)
      return { success: false, enrollmentId: null, error: error.message }
    }

    revalidatePath('/courses')
    return { success: true, enrollmentId: existing.id, error: null }
  }

  // Create new paid enrollment
  const { data, error } = await supabase
    .from('enrollments')
    .insert({
      user_id: user.id,
      course_id: courseId,
      payment_status: 'paid',
      payment_method: 'credit_card',
      payment_reference: `MOCK-${Date.now()}`,
      amount_paid: amount,
      purchased_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating mock payment:', error)
    return { success: false, enrollmentId: null, error: error.message }
  }

  revalidatePath('/courses')
  return { success: true, enrollmentId: data.id, error: null }
}
