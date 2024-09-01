'use client'

import { createClient } from '@/utils/supabase/server'
import { SubmitButton } from '../../components/forms/submit-button'
import { Input } from '@/components/forms/input'
import { Label } from '@/components/forms/label'
import { FormMessage, Message } from '@/components/forms/form-message'
import { encodedRedirect } from '@/utils/utils'
import { cookies } from 'next/headers'
import { isString } from '@/utils/utils'
import { incrementLoggedInCount } from '@/database/logged_in_counts'
import BackLink from '@/components/BackLink'

export default function Verify({ searchParams }: { searchParams: Message }) {
  const verify = async (formData: FormData) => {
    'use server'
    const phone = cookies().get('phone')?.value
    const token = formData.get('token')?.toString()
    const verificationProcess = cookies().get('verification_process')?.value
    const supabase = createClient()

    if (!phone || !isString(phone)) {
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
      return encodedRedirect('error', '/verify', 'Error trying to sign up')
    } else {
      cookies().delete('verification_process')
      cookies().delete('phone')

      if (verificationProcess === 'sms') {
        const result = await incrementLoggedInCount()
        console.log('incrementLoggedInCount', result)
      }

      // TODO: When updating phone number, redirect to specific page (e.g. /protected/change-phone)
      return encodedRedirect('success', '/protected', '')
    }
  }

  if ('message' in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    )
  }

  return (
    <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
      <BackLink />

      <form className="flex flex-col w-full justify-center gap-2 text-foreground [&>input]:mb-6 max-w-md">
        <h1 className="text-2xl font-medium">Verify</h1>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="token">Verification Code</Label>
          <Input name="token" required />
          <SubmitButton formAction={verify} pendingText="Verifying...">
            Verify
          </SubmitButton>
        </div>
        <FormMessage message={searchParams} />
      </form>
    </div>
  )
}
