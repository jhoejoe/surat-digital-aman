
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Globe, Users, FileCheck, Clock, AlertTriangle, Smile } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  const painPoints = [
    {
      icon: AlertTriangle,
      title: "Masalah yang Anda Hadapi Setiap Hari:",
      problems: [
        "⏰ Buang waktu berjam-jam untuk print-scan dokumen",
        "😰 Cemas dokumen hilang atau dipalsukan orang lain", 
        "💸 Biaya print, scan, dan kirim dokumen yang membengkak",
        "🚗 Bolak-balik ke kantor hanya untuk tanda tangan"
      ]
    }
  ];

  const solutions = [
    {
      icon: Zap,
      title: "Tanda Tangan dalam 5 Detik",
      description: "Bayangkan betapa leganya jika Anda bisa menandatangani kontrak penting sambil minum kopi di rumah. Tidak perlu lagi terburu-buru ke kantor!",
      benefit: "Hemat 3-5 jam per minggu"
    },
    {
      icon: Shield,
      title: "100% Aman dari Pemalsuan", 
      description: "Tidur nyenyak karena tahu dokumen Anda dilindungi teknologi enkripsi militer. Siapa pun tidak bisa mengubah atau memalsukan tanda tangan Anda.",
      benefit: "Risiko hukum = 0%"
    },
    {
      icon: FileCheck,
      title: "Sah Secara Hukum Seperti Aslinya",
      description: "Dokumen digital Anda memiliki kekuatan hukum yang sama dengan tanda tangan basah. Sudah diakui pengadilan dan pemerintah Indonesia.",
      benefit: "Diakui di seluruh Indonesia"
    },
    {
      icon: Globe,
      title: "Tanda Tangan dari Mana Saja",
      description: "Klien di Surabaya? Anda di Jakarta? Tidak masalah! Kontrak bisa ditandatangani dalam hitungan menit tanpa perlu ketemu langsung.",
      benefit: "Bisnis lebih fleksibel"
    },
    {
      icon: Users,
      title: "Tim Lebih Produktif dan Bahagia",
      description: "Staff tidak perlu lagi bolak-balik untuk tanda tangan. Mereka bisa fokus pada pekerjaan yang lebih penting dan strategis.",
      benefit: "Produktivitas naik 60%"
    },
    {
      icon: Clock,
      title: "Riwayat Lengkap Setiap Dokumen",
      description: "Siapa yang tanda tangan kapan? Dokumen diubah berapa kali? Semua tercatat rapi. Audit jadi mudah, atasan puas!",
      benefit: "Tidak ada lagi dokumen hilang"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Problem Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-700 text-sm font-medium mb-4">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Sudah Capek dengan Cara Lama?
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
            Berhenti Sia-siakan Waktu untuk
            <span className="text-red-600"> Print-Scan-Kirim!</span>
          </h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
              Masalah yang Anda Hadapi Setiap Hari:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {painPoints[0].problems.map((problem, index) => (
                <div key={index} className="text-left p-3 bg-red-50 rounded-lg">
                  <span className="text-gray-700">{problem}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
              <p className="text-gray-700 font-medium">
                💡 <strong>Tahukah Anda?</strong> Rata-rata perusahaan membuang 15-20 jam per bulan 
                hanya untuk urusan print, scan, dan kirim dokumen!
              </p>
            </div>
          </div>
        </div>

        {/* Solution Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
            <Smile className="w-4 h-4 mr-2" />
            Solusi yang Anda Butuhkan Ada Di Sini!
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Rasakan Bedanya Bekerja dengan
            <span className="text-green-600"> Cara yang Cerdas</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bayangkan jika semua masalah di atas hilang dalam sekejap. 
            Inilah yang akan Anda rasakan dengan SuratAman:
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 shadow-lg bg-white">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{solution.title}</CardTitle>
                  <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {solution.benefit}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed text-base">
                    {solution.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Testimonial Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Mereka Sudah Merasakan Manfaatnya
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
              <p className="text-gray-700 italic mb-4">
                "Tim saya dulu buang waktu 2-3 jam sehari cuma untuk print dan scan kontrak. 
                Sekarang dalam 5 menit semua selesai. ROI-nya luar biasa!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-700 font-bold">AS</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Andi Setiawan</p>
                  <p className="text-sm text-gray-600">CEO, PT Teknologi Maju</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
              <p className="text-gray-700 italic mb-4">
                "Klien saya di luar negeri bisa langsung tanda tangan kontrak tanpa delay. 
                Bisnis jadi lebih cepat, cash flow lebih lancar!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-700 font-bold">SM</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sari Melati</p>
                  <p className="text-sm text-gray-600">Direktur, CV Sukses Mandiri</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Sudah Siap Menghemat 15-20 Jam Per Bulan?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                Jangan biarkan kompetitor Anda lebih cepat. Bergabunglah dengan ribuan 
                profesional yang sudah merasakan efisiensi luar biasa!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button 
                  onClick={() => navigate("/kirim-surat")}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  🚀 Mulai Gratis Sekarang Juga!
                </Button>
                <Button 
                  onClick={() => navigate("/demo")}
                  variant="outline"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
                >
                  📹 Lihat Demo 2 Menit
                </Button>
              </div>
              <p className="text-sm text-blue-100">
                ⚡ Setup dalam 2 menit • 🔒 Data 100% aman • 💬 Support Indonesia 24/7
              </p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-6xl opacity-10">📈</div>
            <div className="absolute bottom-4 left-4 text-6xl opacity-10">⚡</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
