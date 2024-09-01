'use client'

import getUserIfLoggedIn from '@/app/actions/getUserIfLoggedIn'
import signOut from '@/app/actions/signout'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    getUserIfLoggedIn().then(setUser)
  }, [])

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          Hey, {user.phone}!
          <Link
            href="/protected/change-phone"
            className="py-2 px-4 flex items-center justify-center rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-sm font-medium"
          >
            Change phone
          </Link>
          <form action={signOut}>
            <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
              Logout
            </button>
          </form>
        </>
      ) : (
        <Link
          href="/signup"
          className="h-8 flex items-center justify-center rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-sm font-medium px-4"
        >
          Sign up/Log in
        </Link>
      )}
    </div>
  )
}
