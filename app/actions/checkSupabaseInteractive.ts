'use server'

import { createClient } from '@/utils/supabase/server'

export default async function checkSupabaseInteractive(): Promise<boolean> {
  try {
    createClient()
    return true
  } catch (e) {
    return false
  }
}