import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, FileText, ExternalLink, Search } from "lucide-react"
import Link from "next/link"

export default function FormulirPage() {
  const documents = [
    {
      title: "Formulir Pengisian KRS",
      description: "Form untuk pengisian Kartu Rencana Studi mahasiswa",
      category: "Akademik",
      type: "PDF",
      size: "245 KB",
      lastUpdated: "2024-01-15",
      downloadUrl: "#",
      forWho: ["Mahasiswa Aktif"],
    },
    {
      title: "Formulir Cuti Akademik",
      description: "Permohonan cuti kuliah sementara",
      category: "Administrasi",
      type: "PDF",
      size: "180 KB",
      lastUpdated: "2024-01-10",
      downloadUrl: "#",
      forWho: ["Mahasiswa Aktif"],
    },
    {
      title: "Surat Permohonan Skripsi",
      description: "Form pengajuan judul dan pembimbing skripsi",
      category: "Akademik",
      type: "DOCX",
      size: "95 KB",
      lastUpdated: "2024-01-20",
      downloadUrl: "#",
      forWho: ["Mahasiswa Tingkat Akhir"],
    },
    {
      title: "Formulir Pendaftaran Mahasiswa Baru",
      description: "Form registrasi untuk calon mahasiswa baru",
      category: "Registrasi",
      type: "PDF",
      size: "320 KB",
      lastUpdated: "2024-01-05",
      downloadUrl: "#",
      forWho: ["Mahasiswa Baru"],
    },
    {
      title: "Berita Acara Ujian",
      description: "Form untuk dosen pengawas ujian",
      category: "Ujian",
      type: "PDF",
      size: "150 KB",
      lastUpdated: "2024-01-12",
      downloadUrl: "#",
      forWho: ["Dosen"],
    },
    {
      title: "Formulir Input Nilai",
      description: "Form input nilai mahasiswa untuk dosen",
      category: "Akademik",
      type: "XLSX",
      size: "75 KB",
      lastUpdated: "2024-01-18",
      downloadUrl: "#",
      forWho: ["Dosen"],
    },
    {
      title: "Surat Keterangan Mahasiswa Aktif",
      description: "Template surat keterangan status mahasiswa",
      category: "Administrasi",
      type: "DOCX",
      size: "120 KB",
      lastUpdated: "2024-01-08",
      downloadUrl: "#",
      forWho: ["Mahasiswa Aktif"],
    },
    {
      title: "Formulir Pengajuan Penelitian",
      description: "Form proposal penelitian dosen",
      category: "Penelitian",
      type: "PDF",
      size: "280 KB",
      lastUpdated: "2024-01-14",
      downloadUrl: "#",
      forWho: ["Dosen"],
    },
    {
      title: "Formulir Beasiswa",
      description: "Pengajuan berbagai jenis beasiswa",
      category: "Beasiswa",
      type: "PDF",
      size: "200 KB",
      lastUpdated: "2024-01-16",
      downloadUrl: "#",
      forWho: ["Mahasiswa Aktif"],
    },
  ]

  const categories = [...new Set(documents.map((doc) => doc.category))]
  const userTypes = [...new Set(documents.flatMap((doc) => doc.forWho))]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Akademik":
        return "bg-blue-100 text-blue-800"
      case "Administrasi":
        return "bg-green-100 text-green-800"
      case "Registrasi":
        return "bg-purple-100 text-purple-800"
      case "Ujian":
        return "bg-orange-100 text-orange-800"
      case "Penelitian":
        return "bg-red-100 text-red-800"
      case "Beasiswa":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return "📄"
      case "DOCX":
        return "📝"
      case "XLSX":
        return "📊"
      default:
        return "📄"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Formulir & Dokumen</h1>
                <p className="text-gray-600">Download formulir dan dokumen administrasi JTI UNTAD</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Cari Dokumen
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Overview */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">Pusat Dokumen JTI UNTAD</CardTitle>
            <CardDescription className="text-green-700">
              Download formulir dan dokumen yang diperlukan untuk berbagai keperluan administrasi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{documents.length}</div>
                <div className="text-sm text-gray-600">Total Dokumen</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{categories.length}</div>
                <div className="text-sm text-gray-600">Kategori</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{userTypes.length}</div>
                <div className="text-sm text-gray-600">Jenis Pengguna</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">24/7</div>
                <div className="text-sm text-gray-600">Akses</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filter Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                Semua
              </Button>
              {categories.map((category) => (
                <Button key={category} variant="outline" size="sm">
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        <div className="grid gap-6">
          {documents.map((doc, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{getFileTypeIcon(doc.type)}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                        <p className="text-sm text-gray-600">{doc.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <Badge className={getCategoryColor(doc.category)}>{doc.category}</Badge>
                      <span className="text-sm text-gray-500">
                        {doc.type} • {doc.size}
                      </span>
                      <span className="text-sm text-gray-500">
                        Update: {new Date(doc.lastUpdated).toLocaleDateString("id-ID")}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Untuk:</span>
                      {doc.forWho.map((user, userIndex) => (
                        <Badge key={userIndex} variant="outline" className="text-xs">
                          {user}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Butuh Bantuan?</CardTitle>
            <CardDescription>Tidak menemukan dokumen yang Anda cari?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Kontak Bagian Akademik</h4>
                <p className="text-sm text-gray-600 mb-1">Email: akademik.jti@untad.ac.id</p>
                <p className="text-sm text-gray-600 mb-1">Telp: (0451) 123456</p>
                <p className="text-sm text-gray-600">Jam: 08:00 - 15:00 WIB</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Assistant</h4>
                <p className="text-sm text-gray-600 mb-3">Tanyakan tentang dokumen atau formulir yang Anda butuhkan</p>
                <Link href="/chat">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <FileText className="w-4 h-4 mr-2" />
                    Chat dengan AI
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Catatan Penting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Pastikan menggunakan formulir versi terbaru untuk menghindari penolakan</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Isi formulir dengan lengkap dan jelas sesuai petunjuk yang tersedia</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Lampirkan dokumen pendukung yang diperlukan sesuai ketentuan</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Untuk bantuan pengisian, hubungi bagian akademik atau gunakan AI Assistant</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
