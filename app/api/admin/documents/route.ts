import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { processDocument } from "@/lib/text-extraction"

export async function GET() {
  try {
    const supabase = createServerClient()

    const { data: documents, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ documents })
  } catch (error) {
    console.error("Error fetching documents:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerClient()
    const formData = await req.formData()

    const file = formData.get("file") as File
    const url = formData.get("url") as string
    const plainText = formData.get("plainText") as string
    const name = formData.get("name") as string

    let documentData: any = {
      name: name || "Untitled Document",
      status: "processing",
    }

    if (file) {
      // Upload file to Supabase storage
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage.from("documents").upload(fileName, file)

      if (uploadError) throw uploadError

      documentData = {
        ...documentData,
        file_path: uploadData.path,
        file_type: file.type,
        file_size: file.size,
      }
    } else if (url) {
      documentData = {
        ...documentData,
        url: url,
        file_type: "url",
      }
    } else if (plainText) {
      documentData = {
        ...documentData,
        plain_text: plainText,
        file_type: "text/plain",
      }
    }

    // Insert document record
    const { data: document, error } = await supabase.from("documents").insert(documentData).select().single()

    if (error) throw error

    // Process document in background
    processDocument(document.id).catch(console.error)

    return NextResponse.json({ document })
  } catch (error) {
    console.error("Error creating document:", error)
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 })
  }
}
