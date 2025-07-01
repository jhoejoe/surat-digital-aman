
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Globe, Users, FileCheck, Clock } from "lucide-react";
import { Smile } from "lucide-react";

const Solutions = () => {
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
    <div>
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
    </div>
  );
};

export default Solutions;
