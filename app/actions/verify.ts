'use server'

import { createClient } from '@/utils/supabase/server'
import { encodedRedirect } from '@/utils/utils'
import { cookies } from 'next/headers'
import { isString } from '@/utils/utils'
import { incrementLoggedInCount } from '@/database/logged_in_counts'
import { redirect } from 'next/navigation'

export default async function verify(_prevState: unknown, formData: FormData) {
  const phone = cookies().get('phone')?.value
  const token = formData.get('token')?.toString()
  const verificationProcess = cookies().get('verification_process')?.value
  const supabase = createClient()

  if (!phone || !isString(phone)) {
    // TODO: クエリ文字列を処理しないため、エラー文言が表示されない
    return encodedRedirect(
      'error',
      '/signup',
      'Session expired, please sign up again'
    )
  }
  if (!token) {
    return { error: 'Code are required' }
  }
  if (
    verificationProcess !== 'sms' &&
    verificationProcess !== 'phone_change'
  ) {
    // TODO: クエリ文字列を処理しないため、エラー文言が表示されない
    return encodedRedirect(
      'error',
      '/signup',
      'Session expired, please sign up again'
    )
  }

  // https://supabase.com/docs/guides/auth/phone-login#verifying-a-phone-otp
  const { error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: verificationProcess,
  })

  if (error) {
    console.error(error.code + ' ' + error.message)
    return { error: 'Error trying to verify' }
  }

  cookies().delete('verification_process')
  cookies().delete('phone')

  if (verificationProcess === 'sms') {
    const result = await incrementLoggedInCount()
    console.log('incrementLoggedInCount', result)
  }

  // TODO: When updating phone number, redirect to specific page (e.g. /protected/change-phone)
  redirect('/protected')
}

