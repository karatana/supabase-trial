'use client'

import { SubmitButton } from '../../components/forms/submit-button'
import { Input } from '@/components/forms/input'
import { Label } from '@/components/forms/label'
import { useFormState } from 'react-dom'
import BackLink from '@/components/BackLink'
import verify from '@/app/actions/verify'

export default function Verify() {
  const initialState = { error: '' }
  const [verifyState, verifyDispatch] = useFormState(verify, initialState)

  return (
    <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
      <BackLink to="/" />

      <form
        className="flex flex-col w-full justify-center gap-2 text-foreground [&>input]:mb-6 max-w-md"
        action={verifyDispatch}
      >
        <h1 className="text-2xl font-medium">Verify</h1>
        <div className="text-foreground border-l-2 px-4">
          Please check your SMS for a verification code.
        </div>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="token">Verification Code</Label>
          <Input name="token" required />
          <SubmitButton>Verify</SubmitButton>
        </div>
        {'error' in verifyState && verifyState.error !== '' && (
          <div className="text-red-500 border-l-2 border-red-500 px-4">
            {verifyState.error}
          </div>
        )}
      </form>
    </div>
  )
}
