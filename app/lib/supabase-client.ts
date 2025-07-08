import { createClient } from '@supabase/supabase-js'

// For static export, we need to use NEXT_PUBLIC_ variables
// These might not be available during build time, so we provide defaults
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Only create the client if we have real values (not during build)
export const supabase = (supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any

export type Database = {
  public: {
    Tables: {
      visitors: {
        Row: {
          id: string
          city: string | null
          country: string | null
          ip: string | null
          visited_at: string
        }
        Insert: {
          id?: string
          city?: string | null
          country?: string | null
          ip?: string | null
          visited_at?: string
        }
        Update: {
          id?: string
          city?: string | null
          country?: string | null
          ip?: string | null
          visited_at?: string
        }
      }
    }
  }
} 