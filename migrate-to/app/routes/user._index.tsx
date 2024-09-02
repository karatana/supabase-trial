import { json, Link, useFetcher, useLoaderData } from '@remix-run/react'
import Header from '../../components/Header'
import { getLoggedInCount } from '../../utils/supabase/loggedInCounts'
import { createSupabaseServerClient } from '../../utils/supabase/client'
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const headers = new Headers()
  const supabase = createSupabaseServerClient(request, headers)

  const { data, error } = await supabase.auth.getUser()
  if (error) {
    return redirect('/')
  }

  const loggedInCount = await getLoggedInCount(supabase)
  return json({
    user: data.user,
    loggedInCount,
  })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const headers = new Headers()
  const supabase = createSupabaseServerClient(request, headers)
  await supabase.auth.signOut()
  return redirect('/')
}

export default function Index() {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === 'submitting'

  const { user, loggedInCount } = useLoaderData<typeof loader>()

  return (
    <>
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
          <div className="flex items-center gap-4">
            Hey, {user.phone}!
            <Link
              to="/user/change-phone"
              className="py-2 px-4 flex items-center justify-center rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-sm font-medium"
            >
              Change phone
            </Link>
            <fetcher.Form method="post">
              <button
                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                type="submit"
              >
                {isSubmitting ? 'Submitting...' : 'Logout'}
              </button>
            </fetcher.Form>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6 px-4">
          Logged in Count: {loggedInCount ?? 'null'}
        </main>
      </div>
    </>
  )
}
