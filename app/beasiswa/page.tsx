import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Award, Calendar, Users, ExternalLink, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function BeasiswaPage() {
  const scholarships = [
    {
      title: "Beasiswa PPA (Peningkatan Prestasi Akademik)",
      provider: "Kementerian Pendidikan",
      amount: "Rp 2.400.000/semester",
      deadline: "2024-03-15",
      status: "open",
      requirements: [
        "IPK minimal 3.00",
        "Tidak sedang menerima beasiswa lain",
        "Mahasiswa semester 2 ke atas",
        "Surat keterangan tidak mampu dari kelurahan",
      ],
      documents: [
        "Fotokopi KTM",
        "Transkrip nilai terbaru",
        "Surat keterangan penghasilan orang tua",
        "Kartu Keluarga",
        "Surat pernyataan tidak menerima beasiswa lain",
      ],
      contact: "kemahasiswaan@untad.ac.id",
    },
    {
      title: "Beasiswa BBM (Bantuan Belajar Mahasiswa)",
      provider: "Kementerian Pendidikan",
      amount: "Rp 1.200.000/semester",
      deadline: "2024-04-20",
      status: "open",
      requirements: [
        "IPK minimal 2.75",
        "Mahasiswa kurang mampu secara ekonomi",
        "Semester 2-8",
        "Aktif dalam kegiatan kemahasiswaan",
      ],
      documents: [
        "Fotokopi KTM dan KTP",
        "Transkrip nilai",
        "Surat keterangan tidak mampu",
        "Slip gaji orang tua",
        "Sertifikat kegiatan kemahasiswaan",
      ],
      contact: "kemahasiswaan@untad.ac.id",
    },
    {
      title: "Beasiswa Bidikmisi/KIP Kuliah",
      provider: "Kementerian Pendidikan",
      amount: "Rp 2.400.000/semester + UKT",
      deadline: "2024-02-28",
      status: "closed",
      requirements: [
        "Lulusan SMA/SMK/MA tahun berjalan atau 1 tahun sebelumnya",
        "Memiliki potensi akademik baik",
        "Kurang mampu secara ekonomi",
        "Lulus seleksi masuk perguruan tinggi",
      ],
      documents: [
        "Kartu peserta dan hasil UTBK",
        "Rapor semester 1-5",
        "Sertifikat prestasi (jika ada)",
        "Surat keterangan tidak mampu",
        "Kartu Keluarga dan KTP orang tua",
      ],
      contact: "bidikmisi@untad.ac.id",
    },
    {
      title: "Beasiswa Prestasi Akademik JTI",
      provider: "Jurusan Teknologi Informasi",
      amount: "Rp 1.500.000/semester",
      deadline: "2024-05-10",
      status: "open",
      requirements: [
        "Mahasiswa JTI UNTAD",
        "IPK minimal 3.50",
        "Ranking 1-5 di angkatan",
        "Aktif dalam organisasi atau lomba",
      ],
      documents: [
        "Transkrip nilai terbaru",
        "Surat rekomendasi dosen",
        "Portfolio prestasi",
        "Surat pernyataan kesediaan",
      ],
      contact: "kaprodi.jti@untad.ac.id",
    },
    {
      title: "Beasiswa Bank Indonesia",
      provider: "Bank Indonesia",
      amount: "Rp 1.000.000/bulan",
      deadline: "2024-06-30",
      status: "open",
      requirements: ["Mahasiswa semester 4-6", "IPK minimal 3.25", "Berkomitmen untuk Indonesia", "Lulus tes seleksi"],
      documents: [
        "CV dan motivation letter",
        "Transkrip nilai",
        "Surat rekomendasi",
        "Essay tentang kontribusi untuk Indonesia",
      ],
      contact: "scholarship@bi.go.id",
    },
    {
      title: "Beasiswa Djarum Plus",
      provider: "Djarum Foundation",
      amount: "Rp 1.000.000/bulan + soft skills",
      deadline: "2024-04-15",
      status: "open",
      requirements: ["Mahasiswa semester 4-8", "IPK minimal 3.00", "Aktif berorganisasi", "Memiliki jiwa kepemimpinan"],
      documents: ["Formulir aplikasi online", "Transkrip nilai", "Essay dan video profil", "Surat rekomendasi"],
      contact: "info@djarumfoundation.org",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800 border-green-200"
      case "closed":
        return "bg-red-100 text-red-800 border-red-200"
      case "soon":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Dibuka"
      case "closed":
        return "Ditutup"
      case "soon":
        return "Segera"
      default:
        return "Unknown"
    }
  }

  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const isDeadlineSoon = (dateString: string) => {
    const deadline = new Date(dateString)
    const today = new Date()
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays > 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Informasi Beasiswa</h1>
              <p className="text-gray-600">Daftar beasiswa yang tersedia untuk mahasiswa JTI UNTAD</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Overview */}
        <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900 flex items-center space-x-2">
              <Award className="w-6 h-6" />
              <span>Pusat Informasi Beasiswa</span>
            </CardTitle>
            <CardDescription className="text-yellow-700">
              Temukan berbagai peluang beasiswa untuk mendukung perjalanan akademik Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {scholarships.filter((s) => s.status === "open").length}
                </div>
                <div className="text-sm text-gray-600">Beasiswa Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{scholarships.length}</div>
                <div className="text-sm text-gray-600">Total Beasiswa</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {scholarships.filter((s) => isDeadlineSoon(s.deadline)).length}
                </div>
                <div className="text-sm text-gray-600">Deadline Dekat</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">6</div>
                <div className="text-sm text-gray-600">Provider</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Urgent Deadlines Alert */}
        {scholarships.some((s) => isDeadlineSoon(s.deadline) && s.status === "open") && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-900 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>Deadline Mendekat!</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scholarships
                  .filter((s) => isDeadlineSoon(s.deadline) && s.status === "open")
                  .map((scholarship, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="font-medium">{scholarship.title}</span>
                      <span className="text-sm text-orange-700">Deadline: {formatDeadline(scholarship.deadline)}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Scholarships List */}
        <div className="grid gap-6">
          {scholarships.map((scholarship, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{scholarship.title}</CardTitle>
                    <div className="flex items-center space-x-4 mb-2">
                      <Badge className={getStatusColor(scholarship.status)}>{getStatusLabel(scholarship.status)}</Badge>
                      <span className="text-sm text-gray-600">Provider: {scholarship.provider}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">{scholarship.amount}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">Deadline: {formatDeadline(scholarship.deadline)}</span>
                      </div>
                    </div>
                  </div>
                  {isDeadlineSoon(scholarship.deadline) && scholarship.status === "open" && (
                    <Badge className="bg-orange-100 text-orange-800">Segera!</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>Persyaratan</span>
                    </h4>
                    <ul className="space-y-1">
                      {scholarship.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <ExternalLink className="w-4 h-4 text-green-600" />
                      <span>Dokumen Diperlukan</span>
                    </h4>
                    <ul className="space-y-1">
                      {scholarship.documents.map((doc, docIndex) => (
                        <li key={docIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Kontak: </span>
                    {scholarship.contact}
                  </div>
                  <div className="flex space-x-2">
                    {scholarship.status === "open" && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Daftar Sekarang
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Detail Lengkap
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Tips Mendapatkan Beasiswa</CardTitle>
            <CardDescription>Panduan untuk meningkatkan peluang mendapatkan beasiswa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Persiapan Akademik</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Pertahankan IPK minimal sesuai persyaratan</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Aktif dalam kegiatan akademik dan organisasi</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Kumpulkan sertifikat prestasi dan kegiatan</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Jalin hubungan baik dengan dosen untuk rekomendasi</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Persiapan Dokumen</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Siapkan dokumen jauh sebelum deadline</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Pastikan semua dokumen lengkap dan valid</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Tulis essay atau motivation letter dengan baik</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Periksa kembali sebelum submit aplikasi</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Butuh Bantuan?</CardTitle>
            <CardDescription>Hubungi kami untuk informasi lebih lanjut tentang beasiswa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Bagian Kemahasiswaan</h4>
                <p className="text-sm text-gray-600 mb-1">Email: kemahasiswaan@untad.ac.id</p>
                <p className="text-sm text-gray-600 mb-1">Telp: (0451) 123458</p>
                <p className="text-sm text-gray-600">Jam: 08:00 - 15:00 WIB</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Assistant</h4>
                <p className="text-sm text-gray-600 mb-3">Tanyakan tentang persyaratan dan tips mendapatkan beasiswa</p>
                <Link href="/chat">
                  <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                    <Award className="w-4 h-4 mr-2" />
                    Chat Sekarang
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
