'use client'

import Link from 'next/link'
import { SubmitButton } from '../../components/forms/submit-button'
import { Input } from '@/components/forms/input'
import { Label } from '@/components/forms/label'
import { useFormState } from 'react-dom'
import signUp from '@/app/actions'

export default function Signup() {
  const initialState = { error: '' }
  const [signUpState, signUpDispatch] = useFormState(signUp, initialState)

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

      <form
        className="flex flex-col w-full justify-center gap-2 text-foreground [&>input]:mb-6 max-w-md"
        action={signUpDispatch}
      >
        <h1 className="text-2xl font-medium">Sign up/Log in</h1>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="phone">Phone</Label>
          <Input name="phone" placeholder="+810812345678" required />
          <SubmitButton pendingText="Submitting...">
            Sign up/Log in
          </SubmitButton>
        </div>
        {'error' in signUpState && signUpState.error !== '' && (
          <div className="text-red-500 border-l-2 border-red-500 px-4">
            {signUpState.error}
          </div>
        )}
      </form>
    </div>
  )
}
