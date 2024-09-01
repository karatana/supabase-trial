import type { LinksFunction } from '@remix-run/node'
import {
  Form,
  Links,
  Meta,
  MetaFunction,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import appStylesHref from './app.css?url'
import Header from '../components/Header'

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
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            <ul>
              <li>
                <a href={`/contacts/1`}>Your Name</a>
              </li>
              <li>
                <a href={`/contacts/2`}>Your Friend</a>
              </li>
            </ul>
          </nav>
        </div>

        <main className="min-h-screen flex flex-col items-center">
          <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm"></div>
            </nav>

            <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
              <Header />
              <main className="flex-1 flex flex-col gap-6 px-4">
                <h2 className="font-bold text-2xl mb-4">Next steps</h2>
              </main>
            </div>

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
