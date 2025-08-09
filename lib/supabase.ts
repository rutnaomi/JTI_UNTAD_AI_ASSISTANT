import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client
export const createServerClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

// Database types
export interface SystemPrompt {
  id: string
  name: string
  content: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  name: string
  file_path?: string
  file_type: string
  file_size?: number
  extracted_text?: string
  url?: string
  plain_text?: string
  status: "processing" | "completed" | "failed"
  created_at: string
  updated_at: string
}

export interface WebsiteContent {
  id: string
  page_key: string
  title?: string
  content: any
  is_published: boolean
  created_at: string
  updated_at: string
}
