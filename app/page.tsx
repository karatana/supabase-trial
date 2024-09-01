'use client'

import AuthButton from '../components/AuthButton'
import ConnectSupabaseSteps from '@/components/tutorial/ConnectSupabaseSteps'
import SignUpUserSteps from '@/components/tutorial/SignUpUserSteps'
import Header from '@/components/Header'
import checkSupabaseInteractive from './actions/checkSupabaseInteractive'
import { useEffect, useState } from 'react'
import Loading from '@/components/tutorial/Loading'

export default function Index() {
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<
    boolean | string
  >('loading')
  useEffect(() => {
    checkSupabaseInteractive().then(setIsSupabaseConnected)
  }, [])

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
          <AuthButton />
        </div>
      </nav>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6 px-4">
          <h2 className="font-bold text-2xl mb-4">Next steps</h2>
          {isSupabaseConnected === 'loading' && <Loading />}
          {isSupabaseConnected === true && <SignUpUserSteps />}
          {isSupabaseConnected === false && <ConnectSupabaseSteps />}
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  )
}
