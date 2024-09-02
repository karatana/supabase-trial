import { createCookie } from '@remix-run/node' // or cloudflare/deno

export const verificationProcessPrefs = createCookie('verif-prefs', {
  maxAge: 3_600,
})
