"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea, Input } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, Save, RefreshCw, ArrowLeft, Bot, Upload, FileText, LinkIcon, Type, Edit3 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Document {
  id: string
  name: string
  file_type: string
  status: string
  created_at: string
  extracted_text?: string
}

interface WebsiteContent {
  id: string
  page_key: string
  title?: string
  content: any
  is_published: boolean
}

export default function AdminPage() {
  const [systemPrompt, setSystemPrompt] = useState("")
  const [documents, setDocuments] = useState<Document[]>([])
  const [websiteContents, setWebsiteContents] = useState<WebsiteContent[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const { toast } = useToast()

  // Document upload states
  const [uploadType, setUploadType] = useState<"file" | "url" | "text">("file")
  const [uploadUrl, setUploadUrl] = useState("")
  const [uploadText, setUploadText] = useState("")
  const [uploadName, setUploadName] = useState("")

  // Content editing states
  const [editingContent, setEditingContent] = useState<WebsiteContent | null>(null)
  const [newContentKey, setNewContentKey] = useState("")
  const [newContentTitle, setNewContentTitle] = useState("")
  const [newContentData, setNewContentData] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Load system prompt
      const promptResponse = await fetch("/api/admin/system-prompt")
      const promptData = await promptResponse.json()
      setSystemPrompt(promptData.prompt)

      // Load documents
      const docsResponse = await fetch("/api/admin/documents")
      const docsData = await docsResponse.json()
      setDocuments(docsData.documents || [])

      // Load website content
      const contentResponse = await fetch("/api/admin/content")
      const contentData = await contentResponse.json()
      setWebsiteContents(contentData.contents || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat data",
        variant: "destructive",
      })
    }
  }

  const generatePromptFromDocuments = () => {
    const selectedDocs = documents.filter((doc) => selectedDocuments.includes(doc.id) && doc.extracted_text)

    if (selectedDocs.length === 0) {
      toast({
        title: "Peringatan",
        description: "Pilih dokumen yang sudah diproses terlebih dahulu",
        variant: "destructive",
      })
      return
    }

    const combinedText = selectedDocs.map((doc) => `=== ${doc.name} ===\n${doc.extracted_text}`).join("\n\n")

    const newPrompt = `Anda adalah AI Assistant untuk Jurusan Teknologi Informasi Universitas Tadulako (JTI UNTAD).

Gunakan informasi berikut sebagai referensi utama untuk menjawab pertanyaan:

${combinedText}

INSTRUKSI:
- Berikan jawaban yang akurat berdasarkan informasi di atas
- Jika informasi tidak tersedia dalam dokumen, berikan jawaban umum yang membantu
- Gunakan bahasa Indonesia yang ramah dan profesional
- Selalu tawarkan bantuan lebih lanjut

Jawab pertanyaan pengguna dengan mengacu pada informasi administrasi JTI UNTAD di atas.`

    setSystemPrompt(newPrompt)
    toast({
      title: "Berhasil",
      description: `Prompt berhasil dibuat dari ${selectedDocs.length} dokumen`,
    })
  }

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()

      if (uploadType === "file") {
        const fileInput = document.getElementById("file-upload") as HTMLInputElement
        if (fileInput?.files?.[0]) {
          formData.append("file", fileInput.files[0])
        }
      } else if (uploadType === "url") {
        formData.append("url", uploadUrl)
      } else if (uploadType === "text") {
        formData.append("plainText", uploadText)
      }

      formData.append("name", uploadName || "Untitled Document")

      const response = await fetch("/api/admin/documents", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        toast({
          title: "Berhasil",
          description: "Dokumen berhasil diupload dan sedang diproses",
        })
        loadData()
        setUploadUrl("")
        setUploadText("")
        setUploadName("")
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengupload dokumen",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const saveSystemPrompt = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/system-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: systemPrompt,
          documentIds: selectedDocuments,
        }),
      })

      if (response.ok) {
        toast({
          title: "Berhasil",
          description: "System prompt berhasil diperbarui",
        })
      } else {
        throw new Error("Failed to save")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan system prompt",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const saveWebsiteContent = async () => {
    if (!editingContent && (!newContentKey || !newContentData)) {
      toast({
        title: "Error",
        description: "Lengkapi semua field yang diperlukan",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageKey: editingContent?.page_key || newContentKey,
          title: editingContent?.title || newContentTitle,
          content: JSON.parse(editingContent ? JSON.stringify(editingContent.content) : newContentData),
          isPublished: editingContent?.is_published ?? true,
        }),
      })

      if (response.ok) {
        toast({
          title: "Berhasil",
          description: "Konten website berhasil diperbarui",
        })
        loadData()
        setEditingContent(null)
        setNewContentKey("")
        setNewContentTitle("")
        setNewContentData("")
      } else {
        throw new Error("Failed to save")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan konten website",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Settings className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold">Admin Panel</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="documents">Dokumen</TabsTrigger>
            <TabsTrigger value="system-prompt">AI Prompt</TabsTrigger>
            <TabsTrigger value="content">Konten Website</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="documents">
            <div className="grid gap-6">
              {/* Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>Upload Dokumen</span>
                  </CardTitle>
                  <CardDescription>
                    Upload PDF, DOCX, atau masukkan URL/teks untuk diekstrak menjadi knowledge base
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFileUpload} className="space-y-4">
                    <div>
                      <Label htmlFor="upload-name">Nama Dokumen</Label>
                      <Input
                        id="upload-name"
                        value={uploadName}
                        onChange={(e) => setUploadName(e.target.value)}
                        placeholder="Masukkan nama dokumen..."
                      />
                    </div>

                    <div className="flex space-x-2 mb-4">
                      <Button
                        type="button"
                        variant={uploadType === "file" ? "default" : "outline"}
                        onClick={() => setUploadType("file")}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        File
                      </Button>
                      <Button
                        type="button"
                        variant={uploadType === "url" ? "default" : "outline"}
                        onClick={() => setUploadType("url")}
                      >
                        <LinkIcon className="w-4 h-4 mr-2" />
                        URL
                      </Button>
                      <Button
                        type="button"
                        variant={uploadType === "text" ? "default" : "outline"}
                        onClick={() => setUploadType("text")}
                      >
                        <Type className="w-4 h-4 mr-2" />
                        Teks
                      </Button>
                    </div>

                    {uploadType === "file" && (
                      <div>
                        <Label htmlFor="file-upload">Upload File (PDF, DOCX)</Label>
                        <Input id="file-upload" type="file" accept=".pdf,.docx,.doc" className="mt-2" />
                      </div>
                    )}

                    {uploadType === "url" && (
                      <div>
                        <Label htmlFor="url-input">URL Website</Label>
                        <Input
                          id="url-input"
                          value={uploadUrl}
                          onChange={(e) => setUploadUrl(e.target.value)}
                          placeholder="https://example.com"
                          className="mt-2"
                        />
                      </div>
                    )}

                    {uploadType === "text" && (
                      <div>
                        <Label htmlFor="text-input">Teks Langsung</Label>
                        <Textarea
                          id="text-input"
                          value={uploadText}
                          onChange={(e) => setUploadText(e.target.value)}
                          placeholder="Masukkan teks yang ingin dijadikan knowledge base..."
                          rows={6}
                          className="mt-2"
                        />
                      </div>
                    )}

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4 mr-2" />
                      )}
                      Upload & Proses
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Documents List */}
              <Card>
                <CardHeader>
                  <CardTitle>Dokumen Tersimpan</CardTitle>
                  <CardDescription>Pilih dokumen untuk dijadikan sumber AI prompt</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedDocuments.includes(doc.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedDocuments([...selectedDocuments, doc.id])
                              } else {
                                setSelectedDocuments(selectedDocuments.filter((id) => id !== doc.id))
                              }
                            }}
                            className="rounded"
                          />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-gray-500">
                              {doc.file_type} • {new Date(doc.created_at).toLocaleDateString("id-ID")}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            doc.status === "completed"
                              ? "default"
                              : doc.status === "processing"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  {selectedDocuments.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <Button onClick={generatePromptFromDocuments}>
                        <Bot className="w-4 h-4 mr-2" />
                        Generate AI Prompt dari {selectedDocuments.length} Dokumen
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system-prompt">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <span>Kelola System Prompt AI</span>
                </CardTitle>
                <CardDescription>Edit prompt AI atau generate otomatis dari dokumen yang diupload</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="system-prompt">System Prompt</Label>
                  <Textarea
                    id="system-prompt"
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    rows={20}
                    className="mt-2 font-mono text-sm"
                    placeholder="Masukkan system prompt untuk AI Assistant..."
                  />
                </div>

                <div className="flex space-x-2">
                  <Button onClick={saveSystemPrompt} disabled={isLoading}>
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Simpan Prompt
                  </Button>

                  <Button variant="outline" onClick={loadData}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Muat Ulang
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <div className="grid gap-6">
              {/* Add New Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Tambah/Edit Konten Website</CardTitle>
                  <CardDescription>Kelola konten dinamis untuk berbagai halaman website</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="content-key">Page Key</Label>
                      <Input
                        id="content-key"
                        value={editingContent?.page_key || newContentKey}
                        onChange={(e) =>
                          editingContent
                            ? setEditingContent({ ...editingContent, page_key: e.target.value })
                            : setNewContentKey(e.target.value)
                        }
                        placeholder="homepage_hero, quick_access, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor="content-title">Title</Label>
                      <Input
                        id="content-title"
                        value={editingContent?.title || newContentTitle}
                        onChange={(e) =>
                          editingContent
                            ? setEditingContent({ ...editingContent, title: e.target.value })
                            : setNewContentTitle(e.target.value)
                        }
                        placeholder="Judul konten"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="content-data">Content (JSON)</Label>
                    <Textarea
                      id="content-data"
                      value={editingContent ? JSON.stringify(editingContent.content, null, 2) : newContentData}
                      onChange={(e) =>
                        editingContent
                          ? setEditingContent({ ...editingContent, content: JSON.parse(e.target.value || "{}") })
                          : setNewContentData(e.target.value)
                      }
                      rows={10}
                      className="font-mono text-sm"
                      placeholder='{"title": "Judul", "description": "Deskripsi"}'
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={saveWebsiteContent} disabled={isLoading}>
                      <Save className="w-4 h-4 mr-2" />
                      Simpan Konten
                    </Button>
                    {editingContent && (
                      <Button variant="outline" onClick={() => setEditingContent(null)}>
                        Batal Edit
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Existing Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Konten Website Tersimpan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {websiteContents.map((content) => (
                      <div key={content.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{content.title || content.page_key}</p>
                          <p className="text-sm text-gray-500">Key: {content.page_key}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={content.is_published ? "default" : "secondary"}>
                            {content.is_published ? "Published" : "Draft"}
                          </Badge>
                          <Button size="sm" variant="outline" onClick={() => setEditingContent(content)}>
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Statistik & Analytics</CardTitle>
                <CardDescription>Data penggunaan sistem (fitur akan datang)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Fitur analytics akan segera tersedia</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
