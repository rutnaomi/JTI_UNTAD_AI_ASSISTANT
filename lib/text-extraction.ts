import { createServerClient } from "./supabase"

// Text extraction from URL
export async function extractTextFromUrl(url: string): Promise<string> {
  try {
    const response = await fetch(url)
    const html = await response.text()

    // Simple HTML to text conversion (in production, use a proper library)
    const text = html
      .replace(/<script[^>]*>.*?<\/script>/gi, "")
      .replace(/<style[^>]*>.*?<\/style>/gi, "")
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim()

    return text
  } catch (error) {
    console.error("Error extracting text from URL:", error)
    throw new Error("Failed to extract text from URL")
  }
}

// Text extraction from PDF (using pdf-parse)
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // In a real implementation, you would use pdf-parse or similar library
    // For now, we'll simulate the extraction
    return "Extracted text from PDF document..."
  } catch (error) {
    console.error("Error extracting text from PDF:", error)
    throw new Error("Failed to extract text from PDF")
  }
}

// Text extraction from DOCX
export async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  try {
    // In a real implementation, you would use mammoth or similar library
    // For now, we'll simulate the extraction
    return "Extracted text from DOCX document..."
  } catch (error) {
    console.error("Error extracting text from DOCX:", error)
    throw new Error("Failed to extract text from DOCX")
  }
}

// Process document and extract text
export async function processDocument(documentId: string) {
  const supabase = createServerClient()

  try {
    // Get document details
    const { data: document, error } = await supabase.from("documents").select("*").eq("id", documentId).single()

    if (error || !document) {
      throw new Error("Document not found")
    }

    let extractedText = ""

    if (document.url) {
      extractedText = await extractTextFromUrl(document.url)
    } else if (document.plain_text) {
      extractedText = document.plain_text
    } else if (document.file_path) {
      // Download file from Supabase storage
      const { data: fileData } = await supabase.storage.from("documents").download(document.file_path)

      if (fileData) {
        const buffer = Buffer.from(await fileData.arrayBuffer())

        if (document.file_type === "application/pdf") {
          extractedText = await extractTextFromPDF(buffer)
        } else if (document.file_type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
          extractedText = await extractTextFromDocx(buffer)
        }
      }
    }

    // Update document with extracted text
    await supabase
      .from("documents")
      .update({
        extracted_text: extractedText,
        status: "completed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", documentId)

    return extractedText
  } catch (error) {
    console.error("Error processing document:", error)

    // Update document status to failed
    await supabase
      .from("documents")
      .update({
        status: "failed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", documentId)

    throw error
  }
}
