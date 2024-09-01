import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import appStylesHref from './app.css?url'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: appStylesHref },
]

export const meta: MetaFunction = () => {
  return [
    { title: 'Remix and Supabase Starter Kit' },
    {
      name: 'description',
      content: 'The way to build apps with Remix and Supabase',
    },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <Outlet />
            <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
              <p>
                Powered by{' '}
                <a
                  href="https://github.com/karatana/various-auth-trial"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  karatana
                </a>
              </p>
            </footer>
          </div>
        </main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
