import BackLink from '@components/BackLink'
import { Input } from '@components/forms/input'
import { Label } from '@components/forms/label'
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { createSupabaseServerClient } from '@utils/supabase/client'
import { incrementLoggedInCount } from '@utils/supabase/loggedInCounts'
import { verificationProcessPrefs } from '~/cookies.server'

interface VerifyData {
  error?: string
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get('Cookie')
  const cookie = (await verificationProcessPrefs.parse(cookieHeader)) || {}
  const phone = cookie.phone

  if (!phone) {
    // TODO: リダイレクト時にエラートースト的なものを表示したい
    return redirect('/signup', {
      headers: {
        'Set-Cookie': await verificationProcessPrefs.serialize({
          phone: null,
          verificationProcess: null,
        }),
      },
    })
  }

  return null
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const headers = new Headers()
  const supabase = createSupabaseServerClient(request, headers)

  const cookieHeader = request.headers.get('Cookie')
  const cookie = (await verificationProcessPrefs.parse(cookieHeader)) || {}
  const phone = cookie.phone
  const verificationProcess = cookie.verificationProcess

  if (!phone) {
    // TODO: リダイレクト時にエラートースト的なものを表示したい
    return redirect('/signup', {
      headers: {
        'Set-Cookie': await verificationProcessPrefs.serialize({
          phone: null,
          verificationProcess: null,
        }),
      },
    })
  }

  const formData = await request.formData()
  const token = formData.get('token')?.toString()

  if (!token) {
    return json({ error: 'Code are required' })
  }

  // https://supabase.com/docs/guides/auth/phone-login#verifying-a-phone-otp
  const { error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: verificationProcess,
  })

  if (error) {
    console.error(error.code, error.message)
    return json({ error: 'Error trying to verify' })
  }

  if (verificationProcess === 'sms') {
    const result = await incrementLoggedInCount(supabase)
    console.log('incrementLoggedInCount', result)
  }

  // TODO: 成功時のHeaderを渡し、Cookieに保存しないとセッションが継続しない。middleware的なものが必要かも
  headers.append(
    'Set-Cookie',
    await verificationProcessPrefs.serialize({
      phone: null,
      verificationProcess: null,
    })
  )
  return redirect('/user', {
    headers,
  })
}

export default function Verify() {
  const fetcher = useFetcher<VerifyData>()
  const isSubmitting = fetcher.state === 'submitting'

  return (
    <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
      <BackLink to="/" />

      <fetcher.Form
        className="flex flex-col w-full justify-center gap-2 text-foreground [&>input]:mb-6 max-w-md"
        method="post"
      >
        <h1 className="text-2xl font-medium">Verify</h1>
        <div className="text-foreground border-l-2 px-4">
          Please check your SMS for a verification code.
        </div>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="token">Verification Code</Label>
          <Input name="token" required />
          <button
            className="bg-black h-8 flex items-center justify-center font-medium text-sm hover:bg-slate-800 transition-colors text-white rounded-md text-foreground"
            type="submit"
          >
            {isSubmitting ? 'Submitting...' : 'Verify'}
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
