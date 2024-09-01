import { createClient } from '@supabase/supabase-js'

export const client = () => {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
}
