'use server'

import { createClient } from '@/utils/supabase/server'
import { encodedRedirect } from '@/utils/utils'
import { cookies } from 'next/headers'

export default async function signUp(_prevState: unknown, formData: FormData) {
  const phone = formData.get('phone')?.toString()
  const supabase = createClient()

  if (!phone) {
    return { error: 'Phone are required' }
  }

  // https://supabase.com/docs/guides/auth/phone-login#signing-in-with-phone-otp
  const { error } = await supabase.auth.signInWithOtp({
    phone,
  })

  if (error) {
    console.error(error.code + ' ' + error.message)
    return { error: 'Error trying to sign up' }
  }

  cookies().set('phone', phone)
  cookies().set('verification_process', 'sms')
  return encodedRedirect(
    'success',
    '/verify',
    'Thanks for signing is! Please check your SMS for a verification code.'
  )
}
