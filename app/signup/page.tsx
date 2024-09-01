'use client'

import { SubmitButton } from '../../components/forms/submit-button'
import { Input } from '@/components/forms/input'
import { Label } from '@/components/forms/label'
import { useFormState } from 'react-dom'
import signUp from '@/app/actions/signup'
import BackLink from '@/components/BackLink'

export default function Signup() {
  const initialState = { error: '' }

  const [signUpState, signUpDispatch] = useFormState(signUp, initialState)

  return (
    <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
      <BackLink to="/" />

      <form
        className="flex flex-col w-full justify-center gap-2 text-foreground [&>input]:mb-6 max-w-md"
        action={signUpDispatch}
      >
        <h1 className="text-2xl font-medium">Sign up/Log in</h1>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="phone">Phone</Label>
          <Input name="phone" placeholder="+810812345678" required />
          <SubmitButton>Sign up/Log in</SubmitButton>
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
