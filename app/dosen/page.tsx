"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Users, FileText, Award, Calendar, Settings, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function DosenPage() {
  const teachingServices = [
    {
      title: "Input Nilai Mahasiswa",
      description: "Panduan memasukkan nilai UTS, UAS, dan tugas mahasiswa",
      icon: BookOpen,
      steps: [
        "Login ke sistem SIAKAD dengan akun dosen",
        "Pilih menu 'Input Nilai'",
        "Pilih mata kuliah yang diampu",
        "Input nilai per komponen (UTS, UAS, Tugas, dll)",
        "Verifikasi data sebelum submit",
        "Submit nilai sebelum batas waktu",
      ],
      deadline: "7 hari setelah ujian",
      tips: "Pastikan semua komponen nilai sudah diinput sebelum submit final",
    },
    {
      title: "Absensi Perkuliahan",
      description: "Cara mencatat kehadiran mahasiswa dan dosen",
      icon: Users,
      steps: [
        "Buka aplikasi absensi atau form manual",
        "Pilih mata kuliah dan kelas",
        "Catat kehadiran mahasiswa",
        "Input materi yang diajarkan",
        "Submit absensi sebelum 24 jam",
        "Cetak rekapitulasi jika diperlukan",
      ],
      deadline: "Setiap selesai perkuliahan",
      tips: "Absensi minimal 75% untuk mahasiswa dapat mengikuti ujian",
    },
  ]

  const researchServices = [
    {
      title: "Pengajuan Penelitian",
      description: "Prosedur pengajuan proposal penelitian internal/eksternal",
      requirements: [
        "Proposal penelitian lengkap",
        "CV peneliti dan tim",
        "Surat pernyataan kesediaan",
        "RAB (Rencana Anggaran Biaya)",
      ],
      process: "2-4 minggu review",
      contact: "LPPM UNTAD",
    },
    {
      title: "Pengabdian Masyarakat",
      description: "Panduan kegiatan pengabdian kepada masyarakat",
      requirements: [
        "Proposal kegiatan pengabdian",
        "Surat kesediaan mitra",
        "Tim pelaksana minimal 3 orang",
        "Jadwal pelaksanaan kegiatan",
      ],
      process: "3-5 minggu review",
      contact: "LPPM UNTAD",
    },
    {
      title: "Publikasi Ilmiah",
      description: "Bantuan dan panduan publikasi jurnal nasional/internasional",
      requirements: [
        "Naskah artikel siap publikasi",
        "Surat pernyataan orisinalitas",
        "Bukti korespondensi dengan jurnal",
        "Proof of payment (jika ada)",
      ],
      process: "Sesuai timeline jurnal",
      contact: "Bagian Penelitian",
    },
  ]

  const administrativeServices = [
    {
      title: "Kenaikan Jabatan Fungsional",
      description: "Prosedur pengajuan kenaikan jabatan akademik",
      documents: [
        "Formulir usulan kenaikan jabatan",
        "Daftar riwayat hidup",
        "Fotokopi ijazah dan transkrip",
        "Surat keterangan mengajar",
        "Bukti karya ilmiah dan pengabdian",
        "Surat pernyataan kebenaran dokumen",
      ],
    },
    {
      title: "Cuti Akademik/Sabbatical",
      description: "Pengajuan cuti untuk studi lanjut atau penelitian",
      documents: [
        "Surat permohonan cuti",
        "Surat penerimaan dari institusi tujuan",
        "Rencana kegiatan selama cuti",
        "Surat rekomendasi dari atasan",
      ],
    },
    {
      title: "Sertifikasi Dosen",
      description: "Proses sertifikasi profesi dosen",
      documents: [
        "Portofolio dosen",
        "Bukti kualifikasi akademik",
        "Dokumen pengalaman mengajar",
        "Karya ilmiah dan pengabdian",
      ],
    },
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
              <h1 className="text-2xl font-bold text-gray-900">Panduan Dosen</h1>
              <p className="text-gray-600">Informasi administrasi dan layanan untuk dosen JTI UNTAD</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick Access */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-900">Akses Cepat Dosen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                onClick={() =>
                  window.open("https://siakad.untad.ac.id", "_blank")
                }
              >
                <BookOpen className="w-6 h-6 text-blue-600" />
                <span className="text-sm">Login SIAKAD</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                <Users className="w-6 h-6 text-green-600" />
                <span className="text-sm">Input Nilai</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                <Calendar className="w-6 h-6 text-purple-600" />
                <span className="text-sm">Jadwal Mengajar</span>
              </Button>
              <Link href="/chat">
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 w-full bg-transparent"
                >
                  <MessageSquare className="w-6 h-6 text-orange-600" />
                  <span className="text-sm">Tanya AI</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Teaching Services */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Layanan Pengajaran</h2>
          <div className="grid gap-6">
            {teachingServices.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <service.icon className="w-6 h-6 text-purple-600" />
                    <span>{service.title}</span>
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Langkah-langkah:</h4>
                      <ol className="space-y-2">
                        {service.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start space-x-2">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                              {stepIndex + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="space-y-4">
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h5 className="font-medium text-yellow-800 mb-1">Batas Waktu</h5>
                        <p className="text-yellow-700 text-sm">{service.deadline}</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h5 className="font-medium text-blue-800 mb-1">Tips</h5>
                        <p className="text-blue-700 text-sm">{service.tips}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Research Services */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Penelitian & Pengabdian</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchServices.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <span>{service.title}</span>
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Persyaratan:</h4>
                    <ul className="space-y-1">
                      {service.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Proses:</span>
                      <span className="font-medium">{service.process}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Kontak:</span>
                      <span className="font-medium">{service.contact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Administrative Services */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Administrasi Kepegawaian</h2>
          <div className="grid gap-6">
            {administrativeServices.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>{service.title}</span>
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold mb-3">Dokumen yang diperlukan:</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {service.documents.map((doc, docIndex) => (
                        <div key={docIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Important Links */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-gray-600" />
              <span>Link Penting</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start bg-transparent">
                <BookOpen className="w-4 h-4 mr-2" />
                SIAKAD Dosen
              </Button>
              <Button variant="outline" className="justify-start bg-transparent">
                <Award className="w-4 h-4 mr-2" />
                Portal LPPM
              </Button>
              <Button variant="outline" className="justify-start bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                SINTA Dikti
              </Button>
              <Button variant="outline" className="justify-start bg-transparent">
                <Users className="w-4 h-4 mr-2" />
                SISTER
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Kontak Bantuan</CardTitle>
            <CardDescription>Hubungi kontak berikut untuk bantuan administrasi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Bagian Akademik</h4>
                <p className="text-sm text-gray-600">Email: akademik.jti@untad.ac.id</p>
                <p className="text-sm text-gray-600">Telp: (0451) 123456</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">LPPM UNTAD</h4>
                <p className="text-sm text-gray-600">Email: lppm@untad.ac.id</p>
                <p className="text-sm text-gray-600">Telp: (0451) 123459</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Assistant</h4>
                <p className="text-sm text-gray-600 mb-2">Bantuan 24/7</p>
                <Link href="/chat">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
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
