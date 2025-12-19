'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { featureFlags } from '@/lib/config/features'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  })

  if (error) {
    return { error: error.message, success: false }
  }

  // If email verification is disabled, auto-login the user
  if (!featureFlags.requireEmailVerification) {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      return { error: signInError.message, success: false }
    }

    revalidatePath('/', 'layout')
    return { success: true, autoLoggedIn: true }
  }

  revalidatePath('/', 'layout')
  return { success: true, email, requiresVerification: true }
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/courses')
}

export async function signOut() {
  const supabase = await createClient()

  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function getUser() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  return user
}

export async function requestPasswordReset(email: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password`,
  })

  if (error) {
    return { error: error.message, success: false }
  }

  return { success: true }
}

export async function updatePassword(newPassword: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    return { error: error.message, success: false }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function updateProfile(name: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: name,
    },
  })

  if (error) {
    return { error: error.message, success: false }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function uploadAvatar(formData: FormData) {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated', success: false }
  }

  const file = formData.get('avatar') as File
  if (!file) {
    return { error: 'No file provided', success: false }
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return { error: 'File harus berformat JPG, PNG, atau WebP', success: false }
  }

  // Validate file size (max 2MB)
  const maxSize = 2 * 1024 * 1024 // 2MB
  if (file.size > maxSize) {
    return { error: 'Ukuran file maksimal 2MB', success: false }
  }

  // Generate file path: {user_id}/avatar.{ext}
  const fileExt = file.name.split('.').pop()
  const filePath = `${user.id}/avatar.${fileExt}`

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      upsert: true, // Replace if exists
    })

  if (uploadError) {
    return { error: uploadError.message, success: false }
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)

  // Add cache buster to URL to force refresh
  const avatarUrl = `${publicUrl}?t=${Date.now()}`

  // Update user metadata with avatar URL
  const { error: updateError } = await supabase.auth.updateUser({
    data: {
      avatar_url: avatarUrl,
    },
  })

  if (updateError) {
    return { error: updateError.message, success: false }
  }

  revalidatePath('/', 'layout')
  return { success: true, avatarUrl }
}

export async function deleteAvatar() {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated', success: false }
  }

  // List files in user's folder
  const { data: files, error: listError } = await supabase.storage
    .from('avatars')
    .list(user.id)

  if (listError) {
    return { error: listError.message, success: false }
  }

  // Delete all avatar files for this user
  if (files && files.length > 0) {
    const filesToDelete = files.map(file => `${user.id}/${file.name}`)
    const { error: deleteError } = await supabase.storage
      .from('avatars')
      .remove(filesToDelete)

    if (deleteError) {
      return { error: deleteError.message, success: false }
    }
  }

  // Remove avatar_url from user metadata
  const { error: updateError } = await supabase.auth.updateUser({
    data: {
      avatar_url: null,
    },
  })

  if (updateError) {
    return { error: updateError.message, success: false }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}
