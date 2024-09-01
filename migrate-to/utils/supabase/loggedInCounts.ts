import { getUser } from './authUser'
import { client } from './client'
import { SupabaseClient } from '@supabase/supabase-js'

export const selectLoggedInCount = async (
  client: SupabaseClient,
  user_id: string
) => {
  const { data, error } = await client
    .from('logged_in_counts')
    .select('counts')
    .eq('user_id', user_id)
  if (error) {
    throw error
  }
  return data[0]
}

export const upsertLoggedInCount = async (
  client: SupabaseClient,
  user_id: string,
  counts: number
) => {
  const { data, error } = await client
    .from('logged_in_counts')
    .upsert({ user_id, counts }, { onConflict: 'user_id' })
  if (error) {
    throw error
  }
  return data
}

export const getLoggedInCount = async (): Promise<number> => {
  const supabase = client()
  const user = await getUser(supabase)
  const loggedInCount = await selectLoggedInCount(supabase, user.id)
  return loggedInCount?.counts ?? 0
}

export const incrementLoggedInCount = async () => {
  const supabase = client()
  const user = await getUser(supabase)
  const loggedInCount = await getLoggedInCount()
  const result = await upsertLoggedInCount(supabase, user.id, loggedInCount + 1)
  return result
}
