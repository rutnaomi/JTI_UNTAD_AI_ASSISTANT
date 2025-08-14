"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  Users,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function MahasiswaAktifPage() {
  const academicServices = [
    {
      title: "Kartu Rencana Studi (KRS)",
      description: "Panduan pengisian KRS dan pemilihan mata kuliah",
      icon: BookOpen,
      steps: [
        "Login ke sistem SIAKAD dengan NIM dan password",
        "Pilih menu 'Pengisian KRS'",
        "Konsultasi dengan dosen pembimbing akademik",
        "Pilih mata kuliah sesuai semester dan prasyarat",
        "Submit KRS sebelum batas waktu yang ditentukan",
        "Cetak KRS yang telah disetujui",
      ],
      deadline: "Minggu ke-2 setiap semester",
      contact: "Bagian Akademik: akademik.jti@untad.ac.id",
    },
    {
      title: "Kartu Hasil Studi (KHS)",
      description: "Cara mengakses dan mencetak transkrip nilai",
      icon: GraduationCap,
      steps: [
        "Login ke sistem SIAKAD",
        "Pilih menu 'Kartu Hasil Studi'",
        "Pilih semester yang ingin dilihat",
        "Download atau cetak KHS",
        "Untuk transkrip resmi, ajukan ke bagian akademik",
      ],
      deadline: "Tersedia setelah nilai diinput dosen",
      contact: "Bagian Akademik: akademik.jti@untad.ac.id",
    },
    {
      title: "Cuti Akademik",
      description: "Prosedur pengajuan cuti kuliah sementara",
      icon: Calendar,
      steps: [
        "Isi formulir pengajuan cuti akademik",
        "Lampirkan surat keterangan (sakit/bekerja/dll)",
        "Persetujuan dari dosen pembimbing akademik",
        "Persetujuan dari Ketua Program Studi",
        "Submit ke bagian akademik",
        "Bayar biaya administrasi cuti",
      ],
      deadline: "Maksimal minggu ke-4 semester berjalan",
      contact: "Kaprodi JTI: kaprodi.jti@untad.ac.id",
    },
  ];

  const administrativeServices = [
    {
      title: "Surat Keterangan Mahasiswa Aktif",
      description:
        "Untuk keperluan beasiswa, magang, atau administrasi lainnya",
      requirements: [
        "Fotokopi KTM yang masih berlaku",
        "Fotokopi KRS semester berjalan",
        "Pas foto 3x4 (1 lembar)",
        "Biaya administrasi Rp 10.000",
      ],
      process: "2-3 hari kerja",
      location: "Bagian Akademik Fakultas MIPA",
    },
    {
      title: "Surat Pengantar Penelitian",
      description: "Untuk mahasiswa yang akan melakukan penelitian skripsi",
      requirements: [
        "Proposal penelitian yang telah disetujui",
        "Surat permohonan dari mahasiswa",
        "Fotokopi KTM",
        "Surat persetujuan dosen pembimbing",
      ],
      process: "3-5 hari kerja",
      location: "Program Studi JTI",
    },
    {
      title: "Perpanjangan Studi",
      description: "Untuk mahasiswa yang melewati batas masa studi normal",
      requirements: [
        "Surat permohonan perpanjangan",
        "Transkrip nilai terbaru",
        "Rencana penyelesaian studi",
        "Persetujuan dosen pembimbing akademik",
      ],
      process: "1-2 minggu",
      location: "Dekan Fakultas MIPA",
    },
  ];

  const importantDates = [
    { event: "Pengisian KRS", date: "1-14 Januari 2024", type: "deadline" },
    { event: "Perubahan KRS", date: "15-21 Januari 2024", type: "info" },
    { event: "UTS", date: "18-29 Maret 2024", type: "exam" },
    { event: "UAS", date: "20-31 Mei 2024", type: "exam" },
    { event: "Pengumuman Nilai", date: "10 Juni 2024", type: "info" },
  ];

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
              <h1 className="text-2xl font-bold text-gray-900">
                Panduan Mahasiswa Aktif
              </h1>
              <p className="text-gray-600">
                Informasi akademik dan administrasi untuk mahasiswa JTI UNTAD
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">Aksi Cepat</CardTitle>
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
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              >
                <FileText className="w-6 h-6 text-green-600" />
                <span className="text-sm">Download KHS</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
              >
                <Calendar className="w-6 h-6 text-purple-600" />
                <span className="text-sm">Jadwal Kuliah</span>
              </Button>
              <Link href="/chat">
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 w-full bg-transparent"
                >
                  <Users className="w-6 h-6 text-orange-600" />
                  <span className="text-sm">Tanya AI</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Academic Services */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Layanan Akademik
          </h2>
          <div className="grid gap-6">
            {academicServices.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <service.icon className="w-6 h-6 text-blue-600" />
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
                          <li
                            key={stepIndex}
                            className="flex items-start space-x-2"
                          >
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                              {stepIndex + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="space-y-4">
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center space-x-2 mb-1">
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                          <span className="font-medium text-yellow-800">
                            Batas Waktu
                          </span>
                        </div>
                        <p className="text-yellow-700 text-sm">
                          {service.deadline}
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-2 mb-1">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-blue-800">
                            Kontak
                          </span>
                        </div>
                        <p className="text-blue-700 text-sm">
                          {service.contact}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Administrative Services */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Layanan Administrasi
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {administrativeServices.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Persyaratan:</h4>
                    <ul className="space-y-1">
                      {service.requirements.map((req, reqIndex) => (
                        <li
                          key={reqIndex}
                          className="flex items-start space-x-2"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Proses:</span>
                      <span className="font-medium">{service.process}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">Lokasi:</span>
                      <span className="font-medium">{service.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Important Dates */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Jadwal Penting Semester Ini</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {importantDates.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.type === "deadline"
                          ? "bg-red-500"
                          : item.type === "exam"
                          ? "bg-orange-500"
                          : "bg-blue-500"
                      }`}
                    ></div>
                    <span className="font-medium">{item.event}</span>
                  </div>
                  <span className="text-gray-600 font-medium">{item.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle>Kontak Penting</CardTitle>
            <CardDescription>
              Hubungi kontak berikut untuk bantuan lebih lanjut
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Bagian Akademik
                  </h4>
                  <p className="text-sm text-gray-600">
                    Email: akademik.jti@untad.ac.id
                  </p>
                  <p className="text-sm text-gray-600">Telp: (0451) 123456</p>
                  <p className="text-sm text-gray-600">
                    Jam: 08:00 - 15:00 WIB
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Ketua Program Studi
                  </h4>
                  <p className="text-sm text-gray-600">
                    Email: kaprodi.jti@untad.ac.id
                  </p>
                  <p className="text-sm text-gray-600">Telp: (0451) 123457</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Bagian Kemahasiswaan
                  </h4>
                  <p className="text-sm text-gray-600">
                    Email: kemahasiswaan@untad.ac.id
                  </p>
                  <p className="text-sm text-gray-600">Telp: (0451) 123458</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">AI Assistant</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Bantuan 24/7 untuk pertanyaan administrasi
                  </p>
                  <Link href="/chat">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Chat Sekarang
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
