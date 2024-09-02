import { json, Link, useLoaderData } from '@remix-run/react'
import { createSupabaseServerClient } from '../../utils/supabase/client'
import Header from '../../components/Header'
import ConnectSupabaseSteps from '../../components/tutorial/ConnectSupabaseSteps'
import SignUpUserSteps from '../../components/tutorial/SignUpUserSteps'
import { LoaderFunctionArgs, redirect } from '@remix-run/node'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const headers = new Headers()

  let supabase
  let isSupabaseConnected
  try {
    supabase = createSupabaseServerClient(request, headers)
    isSupabaseConnected = true
  } catch (e) {
    isSupabaseConnected = false
  }

  if (isSupabaseConnected && supabase) {
    const { error } = await supabase.auth.getUser()
    if (!error) {
      return redirect('/user')
    }
  }

  return json({ isSupabaseConnected })
}

export default function Index() {
  const { isSupabaseConnected } = useLoaderData<typeof loader>()

  return (
    <>
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
          <div className="flex gap-2">
            <Link
              to="/signup"
              className="h-8 flex items-center justify-center rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-sm font-medium px-4"
            >
              Sign up/Log in
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6 px-4">
          <h2 className="font-bold text-2xl mb-4">Next steps</h2>
          {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        </main>
      </div>
    </>
  )
}
