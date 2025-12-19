import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  createDokuPayment,
  ALL_PAYMENT_METHODS,
  type DokuPaymentRequest,
} from '@/lib/doku'
import type { NotificationType } from '@/lib/actions/notifications'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

/**
 * Sanitize text for DOKU API
 * DOKU only allows: a-z A-Z 0-9 . - / + , = _ : ' @ %
 */
function sanitizeForDoku(text: string): string {
  // Replace common special characters with alternatives
  return text
    .replace(/&/g, 'dan')  // & -> dan
    .replace(/[^\w\s.,\-/+=_:'@%]/g, '') // Remove other invalid chars
    .trim()
}

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
    // Log but don't fail the payment flow if notification fails
    console.error('Failed to create payment notification:', error)
  }
}

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
    const { isBundle, bundlePrice, bundleName, courseId, courseName, coursePrice, localCourseId } = body

    // Handle Bundle Purchase
    if (isBundle) {
      return handleBundlePurchase(supabase, user, bundlePrice, bundleName)
    }

    // Handle Single Course Purchase
    return handleSingleCoursePurchase(supabase, user, courseId, courseName, coursePrice, localCourseId)
  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Handle bundle purchase - creates enrollments for all courses
 */
async function handleBundlePurchase(
  supabase: Awaited<ReturnType<typeof createClient>>,
  user: { id: string; email?: string; user_metadata?: { full_name?: string } },
  bundlePrice: number,
  bundleName: string
) {
  // Fetch all published courses from database
  const { data: allCourses, error: coursesError } = await supabase
    .from('courses')
    .select('id, title')
    .eq('is_published', true)

  if (coursesError || !allCourses || allCourses.length === 0) {
    console.error('Failed to fetch courses:', coursesError)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }

  // Check which courses user already owns
  const { data: existingEnrollments } = await supabase
    .from('enrollments')
    .select('course_id')
    .eq('user_id', user.id)
    .eq('payment_status', 'paid')

  const ownedCourseIds = new Set(existingEnrollments?.map(e => e.course_id) || [])

  // Filter out already owned courses
  const coursesToEnroll = allCourses.filter(course => !ownedCourseIds.has(course.id))

  if (coursesToEnroll.length === 0) {
    return NextResponse.json(
      { error: 'Anda sudah memiliki semua kursus' },
      { status: 400 }
    )
  }

  // Generate unique invoice number for bundle
  const timestamp = Date.now()
  const invoiceNumber = `INV-BUNDLE-${timestamp}`

  // Create pending enrollments for all courses not yet owned
  // Use upsert to handle existing non-paid enrollments (RLS doesn't allow DELETE)
  const enrollmentData = coursesToEnroll.map(course => ({
    user_id: user.id,
    course_id: course.id,
    payment_status: 'pending',
    amount_paid: Math.round(bundlePrice / coursesToEnroll.length), // Split amount for reference
    payment_reference: invoiceNumber,
    expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 60 minutes
  }))

  // Upsert enrollments - this will update existing ones or insert new ones
  const { error: enrollmentError } = await supabase
    .from('enrollments')
    .upsert(enrollmentData, {
      onConflict: 'user_id,course_id',
      ignoreDuplicates: false, // Update existing records
    })

  if (enrollmentError) {
    console.error('Bundle enrollment error:', enrollmentError)
    return NextResponse.json(
      { error: 'Failed to create enrollments' },
      { status: 500 }
    )
  }

  // Build callback URLs for bundle
  const callbackUrl = `${SITE_URL}/courses`
  const callbackUrlResult = `${SITE_URL}/courses?payment=success&type=bundle`
  const callbackUrlCancel = `${SITE_URL}/courses?payment=cancelled`

  // Sanitize text fields for DOKU
  const sanitizedBundleName = sanitizeForDoku(bundleName || 'Paket Semua Kursus')
  const sanitizedCustomerName = sanitizeForDoku(
    user.user_metadata?.full_name || user.email?.split('@')[0] || 'Customer'
  )

  // Build DOKU payment request for bundle
  const dokuRequest: DokuPaymentRequest = {
    order: {
      amount: bundlePrice,
      invoice_number: invoiceNumber,
      currency: 'IDR',
      callback_url: callbackUrl,
      callback_url_result: callbackUrlResult,
      callback_url_cancel: callbackUrlCancel,
      language: 'ID',
      auto_redirect: true,
      disable_retry_payment: false,
      line_items: [
        {
          id: 'bundle-all-courses',
          name: sanitizedBundleName.slice(0, 255),
          quantity: 1,
          price: bundlePrice,
          category: 'digital-content',
        },
      ],
    },
    payment: {
      payment_due_date: 60, // 60 minutes
      payment_method_types: ALL_PAYMENT_METHODS,
    },
    customer: {
      id: user.id,
      email: user.email,
      name: sanitizedCustomerName.slice(0, 255),
    },
    additional_info: {
      override_notification_url: `${SITE_URL}/api/doku/notification`,
      is_bundle: true,
      courses_count: coursesToEnroll.length,
    },
  }

  // Call DOKU API
  const dokuResponse = await createDokuPayment(dokuRequest)

  if (!dokuResponse.success || !dokuResponse.data) {
    console.error('DOKU error:', dokuResponse.error)
    return NextResponse.json(
      { error: dokuResponse.error || 'Payment initiation failed' },
      { status: 500 }
    )
  }

  // Create pending payment notification for bundle
  await createPaymentNotification(supabase, user.id, {
    type: 'payment',
    title: 'Pembayaran Diproses',
    message: `Pembayaran untuk ${sanitizedBundleName} (${coursesToEnroll.length} kursus) sedang menunggu konfirmasi. Silakan selesaikan pembayaran Anda.`,
    link: '/courses',
    metadata: {
      invoiceNumber,
      isBundle: true,
      coursesCount: coursesToEnroll.length,
      amount: bundlePrice,
    },
  })

  return NextResponse.json({
    success: true,
    paymentUrl: dokuResponse.data.response.payment.url,
    invoiceNumber,
    expiresAt: dokuResponse.data.response.payment.expired_date,
    isBundle: true,
    coursesCount: coursesToEnroll.length,
  })
}

/**
 * Handle single course purchase
 */
async function handleSingleCoursePurchase(
  supabase: Awaited<ReturnType<typeof createClient>>,
  user: { id: string; email?: string; user_metadata?: { full_name?: string } },
  courseId: string,
  courseName: string,
  coursePrice: number,
  localCourseId: number
) {
  if (!courseId || !courseName || !coursePrice) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  // Generate unique invoice number
  const timestamp = Date.now()
  const invoiceNumber = `INV-${timestamp}-${courseId.slice(0, 8)}`

  // Check if user already has a paid enrollment
  const { data: existingEnrollment } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .eq('payment_status', 'paid')
    .single()

  if (existingEnrollment) {
    return NextResponse.json(
      { error: 'Already enrolled in this course' },
      { status: 400 }
    )
  }

  // Create or update pending enrollment
  const { data: enrollment, error: enrollmentError } = await supabase
    .from('enrollments')
    .upsert(
      {
        user_id: user.id,
        course_id: courseId,
        payment_status: 'pending',
        amount_paid: coursePrice,
        payment_reference: invoiceNumber,
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 60 minutes
      },
      {
        onConflict: 'user_id,course_id',
      }
    )
    .select()
    .single()

  if (enrollmentError) {
    console.error('Enrollment error:', enrollmentError)
    return NextResponse.json(
      { error: 'Failed to create enrollment' },
      { status: 500 }
    )
  }

  // Build callback URLs
  const callbackUrl = `${SITE_URL}/courses/${localCourseId}`
  const callbackUrlResult = `${SITE_URL}/courses/${localCourseId}?payment=success`
  const callbackUrlCancel = `${SITE_URL}/courses/${localCourseId}?payment=cancelled`

  // Sanitize text fields for DOKU
  const sanitizedCourseName = sanitizeForDoku(courseName)
  const sanitizedCustomerName = sanitizeForDoku(
    user.user_metadata?.full_name || user.email?.split('@')[0] || 'Customer'
  )

  // Build DOKU payment request
  const dokuRequest: DokuPaymentRequest = {
    order: {
      amount: coursePrice,
      invoice_number: invoiceNumber,
      currency: 'IDR',
      callback_url: callbackUrl,
      callback_url_result: callbackUrlResult,
      callback_url_cancel: callbackUrlCancel,
      language: 'ID',
      auto_redirect: true,
      disable_retry_payment: false,
      line_items: [
        {
          id: courseId.slice(0, 64), // Max 64 chars
          name: sanitizedCourseName.slice(0, 255), // Max 255 chars
          quantity: 1,
          price: coursePrice,
          category: 'digital-content',
        },
      ],
    },
    payment: {
      payment_due_date: 60, // 60 minutes
      payment_method_types: ALL_PAYMENT_METHODS,
    },
    customer: {
      id: user.id,
      email: user.email,
      name: sanitizedCustomerName.slice(0, 255), // Max 255 chars
    },
    additional_info: {
      override_notification_url: `${SITE_URL}/api/doku/notification`,
    },
  }

  // Call DOKU API
  const dokuResponse = await createDokuPayment(dokuRequest)

  if (!dokuResponse.success || !dokuResponse.data) {
    console.error('DOKU error:', dokuResponse.error)
    return NextResponse.json(
      { error: dokuResponse.error || 'Payment initiation failed' },
      { status: 500 }
    )
  }

  // Update enrollment with DOKU token
  await supabase
    .from('enrollments')
    .update({
      payment_reference: invoiceNumber,
    })
    .eq('id', enrollment.id)

  // Create pending payment notification for single course
  await createPaymentNotification(supabase, user.id, {
    type: 'payment',
    title: 'Pembayaran Diproses',
    message: `Pembayaran untuk kursus "${sanitizedCourseName}" sedang menunggu konfirmasi. Silakan selesaikan pembayaran Anda.`,
    link: `/courses/${localCourseId}`,
    metadata: {
      invoiceNumber,
      courseId,
      courseName: sanitizedCourseName,
      amount: coursePrice,
    },
  })

  return NextResponse.json({
    success: true,
    paymentUrl: dokuResponse.data.response.payment.url,
    invoiceNumber,
    expiresAt: dokuResponse.data.response.payment.expired_date,
  })
}
