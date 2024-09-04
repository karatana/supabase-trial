import { type SupabaseClient } from '@supabase/supabase-js'

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

export const getLoggedInCount = async (
  client: SupabaseClient
): Promise<number> => {
  const { data, error } = await client.auth.getUser()
  if (error) {
    throw error
  }
  const user = data.user
  const loggedInCount = await selectLoggedInCount(client, user.id)
  return loggedInCount?.counts ?? 0
}

export const incrementLoggedInCount = async (client: SupabaseClient) => {
  const { data, error } = await client.auth.getUser()
  if (error) {
    throw error
  }
  const user = data.user
  const loggedInCount = await getLoggedInCount(client)
  const result = await upsertLoggedInCount(client, user.id, loggedInCount + 1)
  return result
}
