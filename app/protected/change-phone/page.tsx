import { FormMessage, Message } from '@/components/forms/form-message'
import { Input } from '@/components/forms/input'
import { Label } from '@/components/forms/label'
import { SubmitButton } from '@/components/forms/submit-button'
import { createClient } from '@/utils/supabase/server'
import { encodedRedirect } from '@/utils/utils'
import { cookies } from 'next/headers'
import { type } from 'os'

export default async function ChangePhone({
  searchParams,
}: {
  searchParams: Message
}) {
  const changePhone = async (formData: FormData) => {
    'use server'
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
      return encodedRedirect(
        'error',
        '/protected/change-phone',
        'Phone number update failed'
      )
    }

    cookies().set('phone', phone)
    cookies().set('verification_process', 'phone_change')
    encodedRedirect(
      'success',
      '/verify',
      'Please check your SMS for a verification code.'
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full">
      <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
        <h1 className="text-2xl font-medium">Change Phone</h1>

        <Label htmlFor="phone">New phone</Label>
        <Input name="phone" placeholder="+810812345678" required />
        <SubmitButton formAction={changePhone}>
          Change phone number
        </SubmitButton>
        <FormMessage message={searchParams} />
      </form>
    </div>
  )
}
