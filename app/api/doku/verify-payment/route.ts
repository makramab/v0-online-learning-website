import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkDokuPaymentStatus } from '@/lib/doku'
import type { NotificationType } from '@/lib/actions/notifications'
import { slugToCourseId } from '@/lib/course-mapping'

/**
 * Create a payment notification for the user
 */
async function createPaymentNotification(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  data: {
    type: NotificationType
    title: string
    message: string
    link?: string
    metadata?: Record<string, unknown>
  }
) {
  const { error } = await supabase.from('notifications').insert({
    user_id: userId,
    type: data.type,
    title: data.title,
    message: data.message,
    link: data.link || null,
    metadata: data.metadata || {},
  })

  if (error) {
    console.error('Failed to create payment notification:', error)
  }
}

/**
 * Format currency in IDR
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Verify payment status with DOKU and update enrollment(s)
 *
 * This endpoint is called when user returns from payment with ?payment=success
 * It checks the actual payment status with DOKU and updates the enrollment accordingly.
 * This serves as a fallback when webhooks cannot reach the server (e.g., localhost).
 *
 * Supports both:
 * - Single course verification: { courseId: string }
 * - Bundle verification: { isBundle: true }
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { courseId, isBundle } = body

    // Handle bundle verification
    if (isBundle) {
      return handleBundleVerification(supabase, user.id)
    }

    // Handle single course verification
    if (!courseId) {
      return NextResponse.json(
        { error: 'Missing course ID' },
        { status: 400 }
      )
    }

    return handleSingleCourseVerification(supabase, user.id, courseId)
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Handle verification for bundle purchase
 * Finds any pending bundle enrollments and verifies payment status
 */
async function handleBundleVerification(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string
) {
  // Find any pending enrollment with a bundle invoice number
  const { data: pendingEnrollments, error: enrollmentError } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', userId)
    .eq('payment_status', 'pending')
    .like('payment_reference', 'INV-BUNDLE-%')
    .order('created_at', { ascending: false })

  if (enrollmentError) {
    console.error('Error fetching bundle enrollments:', enrollmentError)
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    )
  }

  if (!pendingEnrollments || pendingEnrollments.length === 0) {
    // Check if there are already paid bundle enrollments
    const { data: paidEnrollments } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', userId)
      .eq('payment_status', 'paid')
      .like('payment_reference', 'INV-BUNDLE-%')
      .limit(1)

    if (paidEnrollments && paidEnrollments.length > 0) {
      return NextResponse.json({
        success: true,
        status: 'already_paid',
        message: 'Bundle enrollment already confirmed',
        isBundle: true,
      })
    }

    return NextResponse.json(
      { error: 'No pending bundle enrollment found' },
      { status: 404 }
    )
  }

  // Get the invoice number from the first pending enrollment
  const invoiceNumber = pendingEnrollments[0].payment_reference
  if (!invoiceNumber) {
    return NextResponse.json(
      { error: 'No payment reference found' },
      { status: 400 }
    )
  }

  // Check payment status with DOKU
  const dokuStatus = await checkDokuPaymentStatus(invoiceNumber)

  if (!dokuStatus.success) {
    console.error('DOKU status check failed:', dokuStatus.error)
    return NextResponse.json(
      { error: 'Failed to verify payment status' },
      { status: 500 }
    )
  }

  const transactionStatus = dokuStatus.data?.transaction?.status

  if (transactionStatus === 'SUCCESS') {
    // Update ALL enrollments with this invoice number to paid
    const { error: updateError, count } = await supabase
      .from('enrollments')
      .update({
        payment_status: 'paid',
        purchased_at: new Date().toISOString(),
        payment_method: dokuStatus.data?.channel?.id || 'doku',
      })
      .eq('user_id', userId)
      .eq('payment_reference', invoiceNumber)
      .eq('payment_status', 'pending')

    if (updateError) {
      console.error('Failed to update bundle enrollments:', updateError)
      return NextResponse.json(
        { error: 'Failed to update enrollments' },
        { status: 500 }
      )
    }

    // Create success notification for bundle
    const amount = pendingEnrollments[0].amount_paid * pendingEnrollments.length
    await createPaymentNotification(supabase, userId, {
      type: 'payment',
      title: 'Pembayaran Berhasil! 🎉',
      message: `Selamat! Pembayaran ${formatCurrency(amount)} untuk Paket Semua Kursus (${count || pendingEnrollments.length} kursus) telah berhasil. Semua kursus sudah dapat diakses.`,
      link: '/courses',
      metadata: {
        invoiceNumber,
        isBundle: true,
        coursesCount: count || pendingEnrollments.length,
        amount,
        status: 'success',
      },
    })

    return NextResponse.json({
      success: true,
      status: 'paid',
      message: 'Bundle payment verified and all enrollments confirmed',
      isBundle: true,
      coursesUnlocked: count || pendingEnrollments.length,
    })
  } else if (transactionStatus === 'PENDING') {
    return NextResponse.json({
      success: true,
      status: 'pending',
      message: 'Bundle payment is still pending',
      isBundle: true,
    })
  } else if (transactionStatus === 'EXPIRED') {
    // Update all bundle enrollments to expired
    await supabase
      .from('enrollments')
      .update({ payment_status: 'expired' })
      .eq('user_id', userId)
      .eq('payment_reference', invoiceNumber)

    // Create expired notification
    await createPaymentNotification(supabase, userId, {
      type: 'payment',
      title: 'Pembayaran Kedaluwarsa',
      message: 'Waktu pembayaran untuk Paket Semua Kursus telah habis. Silakan buat transaksi baru jika masih ingin membeli.',
      link: '/courses',
      metadata: {
        invoiceNumber,
        isBundle: true,
        status: 'expired',
      },
    })

    return NextResponse.json({
      success: true,
      status: 'expired',
      message: 'Bundle payment has expired',
      isBundle: true,
    })
  } else {
    // Failed or other status
    await supabase
      .from('enrollments')
      .update({ payment_status: 'failed' })
      .eq('user_id', userId)
      .eq('payment_reference', invoiceNumber)

    // Create failed notification
    await createPaymentNotification(supabase, userId, {
      type: 'payment',
      title: 'Pembayaran Gagal',
      message: 'Pembayaran untuk Paket Semua Kursus gagal. Silakan coba lagi atau hubungi customer support.',
      link: '/courses',
      metadata: {
        invoiceNumber,
        isBundle: true,
        status: 'failed',
      },
    })

    return NextResponse.json({
      success: true,
      status: 'failed',
      message: 'Bundle payment failed',
      isBundle: true,
    })
  }
}

/**
 * Handle verification for single course purchase
 */
async function handleSingleCourseVerification(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  courseId: string
) {
  // Find the user's pending enrollment for this course
  const { data: enrollment, error: enrollmentError } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .eq('payment_status', 'pending')
    .single()

  if (enrollmentError || !enrollment) {
    // Check if already paid
    const { data: paidEnrollment } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .eq('payment_status', 'paid')
      .single()

    if (paidEnrollment) {
      return NextResponse.json({
        success: true,
        status: 'already_paid',
        message: 'Enrollment already confirmed',
      })
    }

    return NextResponse.json(
      { error: 'No pending enrollment found' },
      { status: 404 }
    )
  }

  // Check payment status with DOKU
  const invoiceNumber = enrollment.payment_reference
  if (!invoiceNumber) {
    return NextResponse.json(
      { error: 'No payment reference found' },
      { status: 400 }
    )
  }

  const dokuStatus = await checkDokuPaymentStatus(invoiceNumber)

  if (!dokuStatus.success) {
    console.error('DOKU status check failed:', dokuStatus.error)
    return NextResponse.json(
      { error: 'Failed to verify payment status' },
      { status: 500 }
    )
  }

  const transactionStatus = dokuStatus.data?.transaction?.status

  // Get course info for specific link and name
  let courseLink = '/courses'
  let courseName = 'kursus'
  const { data: course } = await supabase
    .from('courses')
    .select('slug, title')
    .eq('id', courseId)
    .single()

  if (course?.slug) {
    const localId = slugToCourseId[course.slug]
    if (localId) {
      courseLink = `/courses/${localId}`
    }
    courseName = course.title || 'kursus'
  }

  if (transactionStatus === 'SUCCESS') {
    // Update enrollment to paid
    const { error: updateError } = await supabase
      .from('enrollments')
      .update({
        payment_status: 'paid',
        purchased_at: new Date().toISOString(),
        payment_method: dokuStatus.data?.channel?.id || 'doku',
      })
      .eq('id', enrollment.id)

    if (updateError) {
      console.error('Failed to update enrollment:', updateError)
      return NextResponse.json(
        { error: 'Failed to update enrollment' },
        { status: 500 }
      )
    }

    // Create success notification for single course
    await createPaymentNotification(supabase, userId, {
      type: 'payment',
      title: 'Pembayaran Berhasil! 🎉',
      message: `Selamat! Pembayaran ${formatCurrency(enrollment.amount_paid)} untuk "${courseName}" telah berhasil. Kursus sudah dapat diakses.`,
      link: courseLink,
      metadata: {
        invoiceNumber,
        courseId,
        amount: enrollment.amount_paid,
        status: 'success',
      },
    })

    return NextResponse.json({
      success: true,
      status: 'paid',
      message: 'Payment verified and enrollment confirmed',
    })
  } else if (transactionStatus === 'PENDING') {
    return NextResponse.json({
      success: true,
      status: 'pending',
      message: 'Payment is still pending',
    })
  } else if (transactionStatus === 'EXPIRED') {
    // Update enrollment to expired
    await supabase
      .from('enrollments')
      .update({ payment_status: 'expired' })
      .eq('id', enrollment.id)

    // Create expired notification
    await createPaymentNotification(supabase, userId, {
      type: 'payment',
      title: 'Pembayaran Kedaluwarsa',
      message: `Waktu pembayaran untuk "${courseName}" telah habis. Silakan buat transaksi baru jika masih ingin membeli.`,
      link: courseLink,
      metadata: {
        invoiceNumber,
        courseId,
        status: 'expired',
      },
    })

    return NextResponse.json({
      success: true,
      status: 'expired',
      message: 'Payment has expired',
    })
  } else {
    // Failed or other status
    await supabase
      .from('enrollments')
      .update({ payment_status: 'failed' })
      .eq('id', enrollment.id)

    // Create failed notification
    await createPaymentNotification(supabase, userId, {
      type: 'payment',
      title: 'Pembayaran Gagal',
      message: `Pembayaran untuk "${courseName}" gagal. Silakan coba lagi atau hubungi customer support.`,
      link: courseLink,
      metadata: {
        invoiceNumber,
        courseId,
        status: 'failed',
      },
    })

    return NextResponse.json({
      success: true,
      status: 'failed',
      message: 'Payment failed',
    })
  }
}
