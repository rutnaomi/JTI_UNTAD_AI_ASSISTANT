import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(req.url)
    const pageKey = searchParams.get("pageKey")

    if (pageKey) {
      const { data: content, error } = await supabase
        .from("website_content")
        .select("*")
        .eq("page_key", pageKey)
        .eq("is_published", true)
        .single()

      if (error && error.code !== "PGRST116") throw error

      return NextResponse.json({ content })
    } else {
      const { data: contents, error } = await supabase
        .from("website_content")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error

      return NextResponse.json({ contents })
    }
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const { pageKey, title, content, isPublished } = await req.json()

    const { data, error } = await supabase
      .from("website_content")
      .upsert({
        page_key: pageKey,
        title,
        content,
        is_published: isPublished ?? true,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ content: data })
  } catch (error) {
    console.error("Error updating content:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}
