import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createServerClient()

    const { data: activePrompt, error } = await supabase
      .from("system_prompts")
      .select("*")
      .eq("is_active", true)
      .single()

    if (error && error.code !== "PGRST116") throw error

    return NextResponse.json({
      prompt: activePrompt?.content || "",
      lastUpdated: activePrompt?.updated_at || "",
    })
  } catch (error) {
    console.error("Error fetching system prompt:", error)
    return NextResponse.json({ error: "Failed to fetch system prompt" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const { prompt, name, documentIds } = await req.json()

    // Deactivate all existing prompts
    await supabase.from("system_prompts").update({ is_active: false }).eq("is_active", true)

    // Create new active prompt
    const { data: newPrompt, error } = await supabase
      .from("system_prompts")
      .insert({
        name: name || "Custom Prompt",
        content: prompt,
        is_active: true,
      })
      .select()
      .single()

    if (error) throw error

    // Link documents to prompt if provided
    if (documentIds && documentIds.length > 0) {
      const promptDocuments = documentIds.map((docId: string) => ({
        prompt_id: newPrompt.id,
        document_id: docId,
      }))

      await supabase.from("prompt_documents").insert(promptDocuments)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating system prompt:", error)
    return NextResponse.json({ error: "Failed to update system prompt" }, { status: 500 })
  }
}
