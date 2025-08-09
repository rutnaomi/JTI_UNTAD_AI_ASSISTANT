import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, FileText, Users, Calendar, CreditCard } from "lucide-react"
import Link from "next/link"

export default function MahasiswaBaruPage() {
  const steps = [
    {
      title: "Registrasi Online",
      description: "Lengkapi data diri dan upload dokumen yang diperlukan",
      icon: FileText,
      details: [
        "Login ke portal mahasiswa baru",
        "Isi biodata lengkap",
        "Upload foto 3x4 terbaru",
        "Upload ijazah dan transkrip nilai",
        "Upload surat keterangan sehat",
      ],
    },
    {
      title: "Pembayaran UKT",
      description: "Lakukan pembayaran Uang Kuliah Tunggal sesuai golongan",
      icon: CreditCard,
      details: [
        "Cek golongan UKT di portal",
        "Bayar melalui bank yang ditunjuk",
        "Simpan bukti pembayaran",
        "Upload bukti pembayaran ke sistem",
      ],
    },
    {
      title: "Daftar Ulang",
      description: "Konfirmasi kehadiran dan ambil kelengkapan mahasiswa",
      icon: CheckCircle,
      details: [
        "Datang ke kampus sesuai jadwal",
        "Bawa dokumen asli untuk verifikasi",
        "Foto untuk pembuatan KTM",
        "Terima jadwal OSPEK",
      ],
    },
    {
      title: "OSPEK",
      description: "Ikuti Orientasi Studi dan Pengenalan Kampus",
      icon: Users,
      details: [
        "Hadir tepat waktu sesuai jadwal",
        "Bawa perlengkapan yang diminta",
        "Ikuti semua sesi dengan aktif",
        "Kenali senior dan teman sekelas",
      ],
    },
  ]

  const documents = [
    "Ijazah SMA/SMK (asli + fotokopi)",
    "Transkrip nilai SMA/SMK",
    "Surat keterangan sehat",
    "Foto 3x4 sebanyak 6 lembar",
    "Fotokopi KTP",
    "Fotokopi Kartu Keluarga",
    "Surat keterangan tidak mampu (jika ada)",
  ]

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
              <h1 className="text-2xl font-bold text-gray-900">Panduan Mahasiswa Baru</h1>
              <p className="text-gray-600">Langkah-langkah untuk memulai perkuliahan di JTI UNTAD</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Message */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">Selamat Datang di JTI UNTAD! 🎉</CardTitle>
            <CardDescription className="text-blue-700 text-lg">
              Selamat atas diterimanya Anda sebagai mahasiswa baru Jurusan Teknologi Informasi Universitas Tadulako.
              Ikuti panduan berikut untuk memulai perjalanan akademik Anda.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Steps */}
        <div className="grid gap-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Langkah-langkah Registrasi</h2>
          {steps.map((step, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="flex items-center space-x-2">
                      <step.icon className="w-5 h-5 text-blue-600" />
                      <span>{step.title}</span>
                    </CardTitle>
                    <CardDescription className="text-base">{step.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Required Documents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Dokumen yang Diperlukan</span>
            </CardTitle>
            <CardDescription>Pastikan Anda menyiapkan semua dokumen berikut sebelum registrasi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Dates */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Jadwal Penting</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <span className="font-medium">Batas Registrasi Online</span>
                <span className="text-yellow-800 font-semibold">15 Agustus 2024</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="font-medium">Daftar Ulang</span>
                <span className="text-blue-800 font-semibold">20-22 Agustus 2024</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="font-medium">OSPEK</span>
                <span className="text-green-800 font-semibold">26-30 Agustus 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Butuh Bantuan?</CardTitle>
            <CardDescription>Hubungi kami jika ada pertanyaan atau kesulitan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Kontak Akademik</h4>
                <p className="text-sm text-gray-600">Email: akademik.jti@untad.ac.id</p>
                <p className="text-sm text-gray-600">Telp: (0451) 123456</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">AI Assistant</h4>
                <Link href="/chat">
                  <Button className="w-full">Chat dengan AI Assistant</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
