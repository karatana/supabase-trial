'use client'

import changePhone from '@/app/actions/change-phone'
import BackLink from '@/components/BackLink'
import { Input } from '@/components/forms/input'
import { Label } from '@/components/forms/label'
import { SubmitButton } from '@/components/forms/submit-button'
import { useFormState } from 'react-dom'

export default async function ChangePhone() {
  const initialState = { error: '' }
  const [changePhoneState, changePhoneDispatch] = useFormState(
    changePhone,
    initialState
  )

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full">
      <BackLink to="/protected" />

      <form
        className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4"
        action={changePhoneDispatch}
      >
        <h1 className="text-2xl font-medium">Change Phone</h1>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="phone">New phone</Label>
          <Input name="phone" placeholder="+810812345678" required />
          <SubmitButton pendingText="Submitting...">
            Change phone number
          </SubmitButton>
        </div>
        {'error' in changePhoneState && changePhoneState.error !== '' && (
          <div className="text-red-500 border-l-2 border-red-500 px-4">
            {changePhoneState.error}
          </div>
        )}
      </form>
    </div>
  )
}
