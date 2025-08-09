import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, GraduationCap, MessageSquare, Settings, FileText, Calendar, Award } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const userTypes = [
    {
      title: "Mahasiswa Baru",
      description: "Panduan lengkap untuk mahasiswa baru mulai dari registrasi hingga orientasi",
      icon: GraduationCap,
      href: "/mahasiswa-baru",
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "Mahasiswa Aktif",
      description: "Informasi akademik, KRS, jadwal, dan prosedur administrasi mahasiswa aktif",
      icon: BookOpen,
      href: "/mahasiswa-aktif",
      color: "bg-green-50 border-green-200",
    },
    {
      title: "Dosen",
      description: "Panduan administrasi untuk dosen, penelitian, dan kegiatan akademik",
      icon: Users,
      href: "/dosen",
      color: "bg-purple-50 border-purple-200",
    },
  ]

  const quickAccess = [
    { title: "Kalender Akademik", icon: Calendar, href: "/kalender" },
    { title: "Formulir & Dokumen", icon: FileText, href: "/formulir" },
    { title: "Beasiswa", icon: Award, href: "/beasiswa" },
    { title: "Pengaturan AI", icon: Settings, href: "/admin" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">JTI UNTAD</h1>
                <p className="text-sm text-gray-600">Dokumentasi Administrasi</p>
              </div>
            </div>
            <Link href="/chat">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Selamat Datang di Portal Administrasi</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Jurusan Teknologi Informasi Universitas Tadulako
          </p>
          <p className="text-lg text-gray-500 max-w-4xl mx-auto">
            Temukan semua informasi administrasi yang Anda butuhkan. Dari panduan mahasiswa baru, prosedur akademik,
            hingga bantuan AI yang siap membantu 24/7.
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {userTypes.map((type) => (
            <Link key={type.title} href={type.href}>
              <Card className={`h-full hover:shadow-lg transition-shadow cursor-pointer ${type.color}`}>
                <CardHeader className="text-center">
                  <type.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">{type.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Akses Cepat</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickAccess.map((item) => (
              <Link key={item.title} href={item.href}>
                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <item.icon className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700 text-center">{item.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Assistant Preview */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h3 className="text-2xl font-bold mb-4">AI Assistant JTI</h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Dapatkan bantuan instan untuk pertanyaan administrasi Anda. AI Assistant kami menggunakan teknologi Gemini
            2.5 Flash untuk memberikan jawaban yang akurat dan terkini.
          </p>
          <Link href="/chat">
            <Button size="lg" variant="secondary">
              Mulai Chat Sekarang
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
