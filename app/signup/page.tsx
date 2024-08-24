import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { SubmitButton } from '../../components/forms/submit-button'
import { Input } from '@/components/forms/input'
import { Label } from '@/components/forms/label'
import { FormMessage, Message } from '@/components/forms/form-message'
import { encodedRedirect } from '@/utils/utils'
import { cookies } from 'next/headers'

export default function Signup({ searchParams }: { searchParams: Message }) {
  const signUp = async (formData: FormData) => {
    'use server'
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
      return encodedRedirect('error', '/signup', 'Error trying to sign up')
    } else {
      cookies().set('phone', phone)
      return encodedRedirect(
        'success',
        '/verify',
        'Thanks for signing is! Please check your SMS for a verification code.'
      )
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
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>

      <form className="flex flex-col w-full justify-center gap-2 text-foreground [&>input]:mb-6 max-w-md">
        <h1 className="text-2xl font-medium">Sign up/Log in</h1>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="phone">Phone</Label>
          <Input name="phone" placeholder="+810812345678" required />
          <SubmitButton formAction={signUp} pendingText="Signing up...">
            Sign up
          </SubmitButton>
        </div>
        <FormMessage message={searchParams} />
      </form>
    </div>
  )
}
