import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import type { NotificationType } from '@/lib/actions/notifications'
import { slugToCourseId } from '@/lib/course-mapping'

/**
 * DOKU Payment Notification Webhook
 *
 * This endpoint receives payment notifications from DOKU.
 * When a payment is completed (SUCCESS), it updates the enrollment status to 'paid'.
 *
 * Supports both:
 * - Single course purchases (INV-{timestamp}-{courseId})
 * - Bundle purchases (INV-BUNDLE-{timestamp}) - updates ALL enrollments with same invoice
 */

interface DokuNotificationPayload {
  order: {
    invoice_number: string
    amount: number
  }
  transaction: {
    status: string
    date: string
    original_request_id: string
  }
  channel: {
    id: string
  }
  acquirer?: {
    id: string
  }
  virtual_account_info?: {
    virtual_account_number: string
  }
  service: {
    id: string
  }
}

/**
 * Create a payment notification for the user
 */
async function createPaymentNotification(
  supabase: ReturnType<typeof createAdminClient>,
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

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification if needed
    const body = await request.text()
    let payload: DokuNotificationPayload

    try {
      payload = JSON.parse(body)
    } catch {
      console.error('Invalid JSON in DOKU notification')
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    console.log('DOKU Notification received:', JSON.stringify(payload, null, 2))

    const { order, transaction, channel } = payload

    if (!order?.invoice_number || !transaction?.status) {
      console.error('Missing required fields in DOKU notification')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const invoiceNumber = order.invoice_number
    const isBundle = invoiceNumber.startsWith('INV-BUNDLE-')

    // Find enrollments by payment reference (invoice number)
    // For bundles, there will be multiple enrollments with the same invoice
    const { data: enrollments, error: findError } = await supabase
      .from('enrollments')
      .select('*')
      .eq('payment_reference', invoiceNumber)

    if (findError || !enrollments || enrollments.length === 0) {
      console.error('Enrollment(s) not found for invoice:', invoiceNumber)
      // Return 200 to acknowledge receipt (DOKU expects 200)
      return NextResponse.json({ status: 'enrollment_not_found' })
    }

    // Map DOKU transaction status to our payment status
    let paymentStatus: 'pending' | 'paid' | 'failed' | 'expired'
    let paymentMethod: string | null = null

    switch (transaction.status.toUpperCase()) {
      case 'SUCCESS':
        paymentStatus = 'paid'
        paymentMethod = mapChannelToPaymentMethod(channel.id)
        break
      case 'FAILED':
        paymentStatus = 'failed'
        break
      case 'EXPIRED':
        paymentStatus = 'expired'
        break
      default:
        paymentStatus = 'pending'
    }

    // Build update data
    const updateData: Record<string, unknown> = {
      payment_status: paymentStatus,
      updated_at: new Date().toISOString(),
    }

    if (paymentStatus === 'paid') {
      updateData.purchased_at = new Date().toISOString()
      // For bundle, split the amount across courses for reference
      updateData.amount_paid = isBundle
        ? Math.round(order.amount / enrollments.length)
        : order.amount
    }

    if (paymentMethod) {
      updateData.payment_method = paymentMethod
    }

    // Update ALL enrollments with this invoice number
    // This handles both single purchases and bundles
    const { error: updateError, count } = await supabase
      .from('enrollments')
      .update(updateData)
      .eq('payment_reference', invoiceNumber)

    if (updateError) {
      console.error('Failed to update enrollment(s):', updateError)
      return NextResponse.json(
        { error: 'Failed to update enrollment' },
        { status: 500 }
      )
    }

    if (isBundle) {
      console.log(
        `Bundle: ${count || enrollments.length} enrollments updated to ${paymentStatus} for invoice ${invoiceNumber}`
      )
    } else {
      console.log(
        `Enrollment ${enrollments[0].id} updated to ${paymentStatus} for invoice ${invoiceNumber}`
      )
    }

    // Create notification based on payment status
    const userId = enrollments[0].user_id
    const coursesCount = enrollments.length

    // For single course purchases, get the course info to build specific link
    let courseLink = '/courses'
    let courseName = 'kursus'
    if (!isBundle && enrollments.length === 1) {
      const { data: course } = await supabase
        .from('courses')
        .select('slug, title')
        .eq('id', enrollments[0].course_id)
        .single()

      if (course?.slug) {
        const localId = slugToCourseId[course.slug]
        if (localId) {
          courseLink = `/courses/${localId}`
        }
        courseName = course.title || 'kursus'
      }
    }

    if (paymentStatus === 'paid') {
      await createPaymentNotification(supabase, userId, {
        type: 'payment',
        title: 'Pembayaran Berhasil! 🎉',
        message: isBundle
          ? `Selamat! Pembayaran ${formatCurrency(order.amount)} untuk Paket Semua Kursus (${coursesCount} kursus) telah berhasil. Semua kursus sudah dapat diakses.`
          : `Selamat! Pembayaran ${formatCurrency(order.amount)} untuk "${courseName}" telah berhasil. Kursus sudah dapat diakses.`,
        link: courseLink,
        metadata: {
          invoiceNumber,
          isBundle,
          coursesCount,
          amount: order.amount,
          paymentMethod,
          status: 'success',
        },
      })
    } else if (paymentStatus === 'failed') {
      await createPaymentNotification(supabase, userId, {
        type: 'payment',
        title: 'Pembayaran Gagal',
        message: isBundle
          ? `Pembayaran untuk Paket Semua Kursus gagal. Silakan coba lagi atau hubungi customer support.`
          : `Pembayaran untuk "${courseName}" gagal. Silakan coba lagi atau hubungi customer support.`,
        link: courseLink,
        metadata: {
          invoiceNumber,
          isBundle,
          amount: order.amount,
          status: 'failed',
        },
      })
    } else if (paymentStatus === 'expired') {
      await createPaymentNotification(supabase, userId, {
        type: 'payment',
        title: 'Pembayaran Kedaluwarsa',
        message: isBundle
          ? `Waktu pembayaran untuk Paket Semua Kursus telah habis. Silakan buat transaksi baru jika masih ingin membeli.`
          : `Waktu pembayaran untuk "${courseName}" telah habis. Silakan buat transaksi baru jika masih ingin membeli.`,
        link: courseLink,
        metadata: {
          invoiceNumber,
          isBundle,
          amount: order.amount,
          status: 'expired',
        },
      })
    }

    // Revalidate the courses page to reflect the new enrollment
    revalidatePath('/courses')

    // Return success (DOKU expects HTTP 200)
    return NextResponse.json({
      status: 'ok',
      message: isBundle
        ? `Bundle: ${count || enrollments.length} enrollments updated to ${paymentStatus}`
        : `Enrollment updated to ${paymentStatus}`,
      isBundle,
      coursesUpdated: count || enrollments.length,
    })
  } catch (error) {
    console.error('DOKU notification error:', error)
    // Still return 200 to prevent DOKU from retrying indefinitely
    return NextResponse.json({
      status: 'error',
      message: 'Internal server error',
    })
  }
}

/**
 * Map DOKU channel ID to our payment method type
 */
function mapChannelToPaymentMethod(channelId: string): string {
  const channelMap: Record<string, string> = {
    // Virtual Account
    VIRTUAL_ACCOUNT_BCA: 'bank_transfer',
    VIRTUAL_ACCOUNT_BANK_MANDIRI: 'bank_transfer',
    VIRTUAL_ACCOUNT_BANK_SYARIAH_MANDIRI: 'bank_transfer',
    VIRTUAL_ACCOUNT_BRI: 'bank_transfer',
    VIRTUAL_ACCOUNT_BNI: 'bank_transfer',
    VIRTUAL_ACCOUNT_DOKU: 'bank_transfer',
    VIRTUAL_ACCOUNT_BANK_PERMATA: 'bank_transfer',
    VIRTUAL_ACCOUNT_BANK_CIMB: 'bank_transfer',
    VIRTUAL_ACCOUNT_BANK_DANAMON: 'bank_transfer',
    VIRTUAL_ACCOUNT_BTN: 'bank_transfer',
    VIRTUAL_ACCOUNT_BNC: 'bank_transfer',
    // Credit Card
    CREDIT_CARD: 'credit_card',
    // E-Wallet
    EMONEY_OVO: 'e_wallet',
    EMONEY_SHOPEE_PAY: 'e_wallet',
    EMONEY_DANA: 'e_wallet',
    EMONEY_LINKAJA: 'e_wallet',
    EMONEY_DOKU: 'e_wallet',
    // QRIS
    QRIS: 'e_wallet',
    // Convenience Store
    ONLINE_TO_OFFLINE_ALFA: 'bank_transfer',
    ONLINE_TO_OFFLINE_INDOMARET: 'bank_transfer',
    // Direct Debit
    DIRECT_DEBIT_BRI: 'bank_transfer',
    // Paylater
    PEER_TO_PEER_AKULAKU: 'credit_card',
    PEER_TO_PEER_KREDIVO: 'credit_card',
    PEER_TO_PEER_INDODANA: 'credit_card',
  }

  return channelMap[channelId] || 'bank_transfer'
}

// Also handle GET requests for webhook verification if DOKU needs it
export async function GET() {
  return NextResponse.json({ status: 'DOKU notification endpoint ready' })
}
