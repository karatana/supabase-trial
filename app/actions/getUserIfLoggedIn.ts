'use server'

import { createClient } from '@/utils/supabase/server'
import { User } from '@supabase/supabase-js'

export default async function getUserIfLoggedIn(): Promise<User | null> {
  const supabase = createClient()
  if (!supabase || !supabase.auth) {
    return null
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}
