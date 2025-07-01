
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Globe, Users, FileCheck, Clock, AlertTriangle, Smile, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  const painPoints = [
    "⏰ Stress setiap kali ada kontrak mendadak - print, scan, tunggu, kirim email berulang kali",
    "😰 Begadang mikirin dokumen penting yang hilang atau bisa dipalsukan kompetitor", 
    "💸 Biaya print, scan, dan kirim dokumen yang bengkak - belum lagi ongkos bensin bolak-balik",
    "🚗 Kehilangan deal jutaan rupiah karena terlambat tanda tangan - klien kabur ke kompetitor"
  ];

  const solutions = [
    {
      icon: Zap,
      title: "Tanda Tangan Lightning Speed - 5 Detik Kelar",
      description: "Bayangkan saat klien bilang 'saya butuh kontrak ini ditandatangani SEKARANG' - Anda tinggal klik, kirim, selesai! Tidak ada lagi panik mencari printer atau scanner. Deal jutaan rupiah tidak akan hilang lagi karena keterlambatan.",
      benefit: "Hemat 15-20 jam per bulan",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Tidur Nyenyak - 100% Anti Pemalsuan", 
      description: "Tidak perlu lagi begadang khawatir dokumen penting dipalsukan. Teknologi enkripsi militer memastikan tidak ada satu orangpun yang bisa mengubah atau memalsukan tanda tangan Anda. Bahkan hacker sekalipun menyerah!",
      benefit: "Keamanan tingkat bank",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: FileCheck,
      title: "Sah di Mata Hukum - Pengadilan Mengakui",
      description: "Dokumen digital Anda punya kekuatan hukum yang sama persis dengan tanda tangan basah. Sudah diuji di pengadilan dan diakui pemerintah Indonesia. Kalau ada masalah hukum, Anda aman 100%!",
      benefit: "Dilindungi UU ITE Indonesia",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Globe,
      title: "Bisnis Tanpa Batas - Tanda Tangan dari Mana Saja",
      description: "Klien di Medan? Anda di Bali? Tidak masalah! Kontrak bisa ditandatangani dalam hitungan menit. Bisnis Anda jadi lebih fleksibel dan bisa meraih peluang dari seluruh Indonesia bahkan luar negeri.",
      benefit: "Jangkauan bisnis unlimited",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Tim Lebih Produktif & Bahagia",
      description: "Staff tidak perlu lagi stress bolak-balik kantor hanya untuk tanda tangan. Mereka bisa fokus pada pekerjaan yang menghasilkan uang. Hasilnya? Produktivitas naik drastis, suasana kantor jadi lebih positif!",
      benefit: "Produktivitas naik 60%+",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "Tracking Lengkap - Audit Jadi Mudah",
      description: "Siapa yang tanda tangan kapan? Dokumen diubah berapa kali? Semua tercatat otomatis dengan timestamp yang akurat. Saat audit atau inspeksi, Anda tinggal show data - atasan dan auditor pasti terkesan!",
      benefit: "Zero dokumen hilang",
      color: "from-red-500 to-rose-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Problem Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-700 text-sm font-medium mb-4 animate-pulse">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Masih Pakai Cara Jadul? Kompetitor Anda Ketawa!
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
            Berhenti Siksa Diri dengan Cara Kuno!
            <br />
            <span className="text-red-600">Print-Scan-Kirim Era Sudah Berlalu</span>
          </h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto mb-12 border-l-4 border-red-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
              Sudah Berapa Lama Anda Tersiksa Seperti Ini?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {painPoints.map((problem, index) => (
                <div key={index} className="text-left p-4 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-gray-700 font-medium">{problem}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-r-lg">
              <p className="text-gray-700 font-bold text-lg">
                💡 <strong>FAKTA MENGEJUTKAN:</strong> Rata-rata perusahaan membuang 
                <span className="text-red-600"> 15-20 jam per bulan</span> dan 
                <span className="text-red-600"> Rp 500.000+</span> hanya untuk urusan print-scan-kirim dokumen!
              </p>
              <p className="text-gray-600 mt-2">
                Belum lagi deal yang hilang karena terlambat... Kerugiannya bisa jutaan rupiah!
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Solution Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
            <Smile className="w-4 h-4 mr-2" />
            Saatnya Kerja Cerdas, Bukan Kerja Keras!
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Rasakan Nikmatnya Bekerja dengan
            <br />
            <span className="text-green-600">Cara yang Revolusioner</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Bayangkan jika semua penderitaan di atas hilang dalam sekejap mata. 
            Inilah yang akan Anda rasakan setelah pakai SuratAman - 
            <strong className="text-green-600">seperti naik dari motor ke pesawat jet!</strong>
          </p>
        </div>

        {/* Enhanced Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <Card key={index} className="hover:shadow-2xl transition-all duration-300 group cursor-pointer border-0 shadow-lg bg-white hover:-translate-y-2">
                <CardHeader>
                  <div className={`w-20 h-20 bg-gradient-to-br ${solution.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">{solution.title}</CardTitle>
                  <div className="inline-block bg-gradient-to-r from-green-100 to-blue-100 text-green-700 px-3 py-2 rounded-full text-sm font-bold border border-green-200">
                    💎 {solution.benefit}
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

        {/* Enhanced Testimonial Section */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-16 border-t-4 border-green-500">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Mereka Sudah Merasakan Keajaiban Ini
            </h3>
            <p className="text-gray-600 text-lg">
              Dari stress jadi santai, dari rugi jadi untung besar!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border-l-4 border-blue-500 shadow-lg">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
                <span className="text-blue-600 font-bold text-sm">OMZET NAIK 40%</span>
              </div>
              <p className="text-gray-700 italic font-medium text-lg mb-4 leading-relaxed">
                "Dulu saya stress banget kalau ada kontrak mendadak. Tim panik, printer macet, 
                scanner error... Sekarang? Dalam 5 menit kelar semua! Klien sampai heran 
                kok bisa secepat ini. <strong>Omzet naik 40% karena deal lebih cepat closing!</strong> 
                ROI-nya gila-gilaan!"
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-700 font-bold text-lg">AS</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Andi Setiawan</p>
                  <p className="text-sm text-gray-600">CEO PT Teknologi Maju</p>
                  <p className="text-xs text-blue-600 font-semibold">Hemat 20 jam/bulan • Omzet +40%</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border-l-4 border-green-500 shadow-lg">
              <div className="flex items-center mb-4">
                <Globe className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-green-600 font-bold text-sm">BISNIS GLOBAL</span>
              </div>
              <p className="text-gray-700 italic font-medium text-lg mb-4 leading-relaxed">
                "Klien saya di Singapura dan Malaysia bisa langsung tanda tangan kontrak 
                tanpa delay. Dulu harus kirim dokumen via kurir, tunggu 3-5 hari. 
                <strong>Sekarang bisnis jadi international, cash flow lancar jaya!</strong> 
                Kompetitor masih pake cara lama, mereka ketinggalan jauh!"
              </p>
              <div className="flex items-center">
                <div className="w-14 h-14 bg-green-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-700 font-bold text-lg">SM</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Sari Melati</p>
                  <p className="text-sm text-gray-600">Direktur CV Sukses Mandiri</p>
                  <p className="text-xs text-green-600 font-semibold">Ekspansi 3 negara • Revenue +65%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Final CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-4">
                <AlertTriangle className="w-4 h-4 mr-2" />
                PENAWARAN TERBATAS - BERAKHIR SEGERA!
              </div>
              <h3 className="text-4xl font-bold mb-6">
                Jangan Sampai Menyesal Selamanya!
              </h3>
              <p className="text-blue-100 mb-4 max-w-3xl mx-auto text-xl leading-relaxed">
                Setiap hari yang Anda tunda, kompetitor semakin jauh unggul. 
                Sementara Anda masih repot print-scan, mereka sudah closing deal jutaan rupiah.
              </p>
              <p className="text-yellow-200 mb-8 max-w-2xl mx-auto text-lg font-semibold">
                <strong>Mau sampai kapan Anda tersiksa seperti ini?</strong> 
                Bergabunglah dengan 50,000+ pebisnis cerdas yang sudah merasakan keajaiban ini!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  onClick={() => navigate("/kirim-surat")}
                  className="bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105"
                >
                  🚀 YA! Saya Mau Hemat 15 Jam Bulan Ini!
                </Button>
                <Button 
                  onClick={() => navigate("/demo")}
                  variant="outline"
                  className="border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-white hover:text-blue-600 transition-all shadow-2xl"
                >
                  📹 Tunjukkan Buktinya (Demo 2 Menit)
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 max-w-2xl mx-auto">
                <p className="text-sm text-yellow-200 font-semibold mb-2">
                  🎁 BONUS EKSKLUSIF HARI INI:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li>✅ Gratis 30 hari trial (tanpa kartu kredit)</li>
                  <li>✅ Setup gratis oleh expert kami</li>
                  <li>✅ Training 1-on-1 untuk tim Anda</li>
                  <li>✅ Support WhatsApp priority 24/7</li>
                </ul>
              </div>
              <p className="text-xs text-blue-100">
                *Garansi 100% uang kembali jika tidak puas dalam 30 hari | Sudah dipercaya 50,000+ pengguna
              </p>
            </div>
            
            {/* Enhanced decorative elements */}
            <div className="absolute top-6 right-6 text-6xl opacity-20 animate-bounce">💰</div>
            <div className="absolute bottom-6 left-6 text-6xl opacity-20 animate-pulse">⚡</div>
            <div className="absolute top-1/2 left-6 text-4xl opacity-20">🚀</div>
            <div className="absolute top-1/3 right-6 text-4xl opacity-20">📈</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
