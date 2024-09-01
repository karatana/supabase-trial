'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function changePhone(_prevState: unknown, formData: FormData) {
  const supabase = createClient()
  const phone = formData.get('phone')?.toString()

  if (!phone) {
    return { error: 'Phone are required' }
  }

  // https://supabase.com/docs/guides/auth/phone-login#updating-a-phone-number
  const { error } = await supabase.auth.updateUser({
    phone,
  })

  if (error) {
    console.error(error.code + ' ' + error.message)
    return { error: 'Phone number update failed' }
  }

  cookies().set('phone', phone)
  cookies().set('verification_process', 'phone_change')
  redirect('/verify')
}
