import { SupabaseClient } from "@supabase/supabase-js";

export const getUser = async (client: SupabaseClient) => {
  const { data, error } = await client.auth.getUser()
  if (error) {
    throw error
  }
  return data.user
}