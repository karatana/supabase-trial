import { Label } from '../../components/forms/label'
import BackLink from '../../components/BackLink'
import { Input } from '../../components/forms/input'
import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { createSupabaseServerClient } from '../../utils/supabase/client'

import { verificationProcessPrefs } from '../cookies.server'

interface ChangePhoneData {
  error?: string
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const headers = new Headers()
  const supabase = createSupabaseServerClient(request, headers)
  const formData = await request.formData()
  const phone = formData.get('phone')?.toString()

  if (!phone) {
    return json({ error: 'Phone are required' })
  }

  // https://supabase.com/docs/guides/auth/phone-login#updating-a-phone-number
  const { error } = await supabase.auth.updateUser({
    phone,
  })

  if (error) {
    console.error(error.code, error.message)
    return json({ error: 'Phone number update failed' })
  }

  return redirect('/verify', {
    headers: {
      'Set-Cookie': await verificationProcessPrefs.serialize({
        phone,
        verificationProcess: 'phone_change',
      }),
    },
  })
}

export default function ChangePhone() {
  const fetcher = useFetcher<ChangePhoneData>()
  const isSubmitting = fetcher.state === 'submitting'

  return (
    <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
      <BackLink to="/user" />

      <fetcher.Form
        className="flex flex-col w-full justify-center gap-2 text-foreground [&>input]:mb-6 max-w-md"
        method="post"
      >
        <h1 className="text-2xl font-medium">Change Phone</h1>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="phone">New Phone</Label>
          <Input name="phone" placeholder="+810812345678" required />
          <button
            className="bg-black h-8 flex items-center justify-center font-medium text-sm hover:bg-slate-800 transition-colors text-white rounded-md text-foreground"
            type="submit"
          >
            {isSubmitting ? 'Submitting...' : 'Change phone number'}
          </button>
        </div>
        {fetcher.data && fetcher.data.error && (
          <div className="text-red-500 border-l-2 border-red-500 px-4">
            {fetcher.data.error}
          </div>
        )}
      </fetcher.Form>
    </div>
  )
}
