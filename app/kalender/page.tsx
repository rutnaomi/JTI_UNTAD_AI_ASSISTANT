import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Download, Filter } from "lucide-react"
import Link from "next/link"

export default function KalenderPage() {
  const academicEvents = [
    {
      date: "2024-01-08",
      title: "Awal Semester Genap 2023/2024",
      type: "semester",
      description: "Dimulainya perkuliahan semester genap",
    },
    {
      date: "2024-01-08",
      title: "Pembukaan Pengisian KRS",
      type: "registration",
      description: "Mahasiswa dapat mulai mengisi KRS",
    },
    {
      date: "2024-01-21",
      title: "Batas Akhir Pengisian KRS",
      type: "deadline",
      description: "Batas terakhir pengisian dan perubahan KRS",
    },
    {
      date: "2024-02-14",
      title: "Batas Akhir Pembayaran UKT",
      type: "deadline",
      description: "Batas pembayaran UKT semester genap",
    },
    {
      date: "2024-03-18",
      title: "Ujian Tengah Semester (UTS)",
      type: "exam",
      description: "Pelaksanaan UTS untuk semua mata kuliah",
    },
    {
      date: "2024-03-29",
      title: "Selesai UTS",
      type: "exam",
      description: "Berakhirnya periode UTS",
    },
    {
      date: "2024-04-01",
      title: "Libur Semester",
      type: "holiday",
      description: "Libur tengah semester",
    },
    {
      date: "2024-04-08",
      title: "Mulai Perkuliahan Pasca UTS",
      type: "semester",
      description: "Dimulainya kembali perkuliahan setelah UTS",
    },
    {
      date: "2024-05-20",
      title: "Ujian Akhir Semester (UAS)",
      type: "exam",
      description: "Pelaksanaan UAS untuk semua mata kuliah",
    },
    {
      date: "2024-05-31",
      title: "Selesai UAS",
      type: "exam",
      description: "Berakhirnya periode UAS",
    },
    {
      date: "2024-06-10",
      title: "Pengumuman Nilai",
      type: "announcement",
      description: "Pengumuman hasil studi semester genap",
    },
    {
      date: "2024-06-15",
      title: "Wisuda Periode I",
      type: "graduation",
      description: "Upacara wisuda periode pertama tahun 2024",
    },
    {
      date: "2024-07-01",
      title: "Libur Semester",
      type: "holiday",
      description: "Libur akhir semester genap",
    },
    {
      date: "2024-08-19",
      title: "Awal Semester Ganjil 2024/2025",
      type: "semester",
      description: "Dimulainya perkuliahan semester ganjil",
    },
    {
      date: "2024-08-26",
      title: "OSPEK Mahasiswa Baru",
      type: "orientation",
      description: "Orientasi Studi dan Pengenalan Kampus",
    },
    {
      date: "2024-12-16",
      title: "Wisuda Periode II",
      type: "graduation",
      description: "Upacara wisuda periode kedua tahun 2024",
    },
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "semester":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "registration":
        return "bg-green-100 text-green-800 border-green-200"
      case "deadline":
        return "bg-red-100 text-red-800 border-red-200"
      case "exam":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "holiday":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "announcement":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "graduation":
        return "bg-pink-100 text-pink-800 border-pink-200"
      case "orientation":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "semester":
        return "Semester"
      case "registration":
        return "Registrasi"
      case "deadline":
        return "Deadline"
      case "exam":
        return "Ujian"
      case "holiday":
        return "Libur"
      case "announcement":
        return "Pengumuman"
      case "graduation":
        return "Wisuda"
      case "orientation":
        return "Orientasi"
      default:
        return "Lainnya"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const eventTypes = [...new Set(academicEvents.map((event) => event.type))]

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
                <h1 className="text-2xl font-bold text-gray-900">Kalender Akademik</h1>
                <p className="text-gray-600">Tahun Akademik 2023/2024 - 2024/2025</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Overview */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Kalender Akademik JTI UNTAD</CardTitle>
            <CardDescription className="text-blue-700">
              Jadwal lengkap kegiatan akademik untuk mahasiswa, dosen, dan staff JTI UNTAD
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <div className="text-sm text-gray-600">Semester</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">16</div>
                <div className="text-sm text-gray-600">Total Event</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">4</div>
                <div className="text-sm text-gray-600">Periode Ujian</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">2</div>
                <div className="text-sm text-gray-600">Wisuda</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Event Types Legend */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Kategori Kegiatan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <Badge key={type} className={getEventTypeColor(type)}>
                  {getEventTypeLabel(type)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Events Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Jadwal Kegiatan</span>
            </CardTitle>
            <CardDescription>Daftar lengkap kegiatan akademik berdasarkan tanggal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {academicEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(event.date).toLocaleDateString("id-ID", { day: "2-digit" })}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(event.date).toLocaleDateString("id-ID", { month: "short" })}
                    </div>
                    <div className="text-xs text-gray-500">{new Date(event.date).getFullYear()}</div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{event.title}</h3>
                      <Badge className={getEventTypeColor(event.type)}>{getEventTypeLabel(event.type)}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    <p className="text-xs text-gray-500">{formatDate(event.date)}</p>
                  </div>
                </div>
              ))}
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
                <p>Jadwal dapat berubah sewaktu-waktu sesuai kebijakan universitas</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Mahasiswa wajib mengikuti jadwal yang telah ditetapkan</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Untuk informasi terbaru, silakan hubungi bagian akademik atau gunakan AI Assistant</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Libur nasional dan hari besar keagamaan akan disesuaikan dengan kalender pemerintah</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact for Updates */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Informasi Lebih Lanjut</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Bagian Akademik</h4>
                <p className="text-sm text-gray-600">Email: akademik.jti@untad.ac.id</p>
                <p className="text-sm text-gray-600">Telp: (0451) 123456</p>
                <p className="text-sm text-gray-600">Jam: 08:00 - 15:00 WIB</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Assistant</h4>
                <p className="text-sm text-gray-600 mb-3">Tanyakan jadwal dan informasi akademik kapan saja</p>
                <Link href="/chat">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Calendar className="w-4 h-4 mr-2" />
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
