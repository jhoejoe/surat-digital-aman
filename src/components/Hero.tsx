
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, FileText, Users, Clock, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const painPoints = [
    "Sudah tidak perlu lagi print-scan dokumen berulang kali",
    "Tidak ada lagi rasa khawatir dokumen dipalsukan atau diubah",
    "Hemat waktu berjam-jam untuk proses tanda tangan manual",
    "Dokumen sah secara hukum tanpa ribet ke notaris"
  ];

  const stats = [
    { icon: FileText, value: "1M+", label: "Dokumen Aman Tersimpan" },
    { icon: Users, value: "50K+", label: "Profesional Percaya Kami" },
    { icon: Shield, value: "99.9%", label: "Dokumen Terlindungi" },
    { icon: Clock, value: "5 Detik", label: "Rata-rata Tanda Tangan" }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-700 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Berhenti Buang Waktu untuk Print-Scan!
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Tanda Tangan Digital dalam
              <span className="text-blue-600"> 5 Detik</span>
              <br />
              <span className="text-2xl lg:text-3xl text-gray-600 font-normal">
                Tanpa Print, Tanpa Scan, Tanpa Ribet!
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Bayangkan betapa mudahnya jika Anda bisa menandatangani kontrak penting 
              dari mana saja, kapan saja - <strong>sah secara hukum</strong> dan 
              <strong> 100% aman</strong> dari pemalsuan. Saatnya tinggalkan cara lama!
            </p>

            <div className="space-y-3 mb-8">
              {painPoints.map((point, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{point}</span>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg">
              <p className="text-gray-700 italic">
                "Dulu butuh 3 hari untuk tanda tangan kontrak dengan klien di luar kota. 
                Sekarang cuma 5 menit! Tim saya jadi lebih produktif."
              </p>
              <p className="text-sm text-blue-600 font-semibold mt-2">
                - Budi Santoso, Direktur CV Maju Bersama
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold"
                onClick={() => navigate("/kirim-surat")}
              >
                🚀 Coba Gratis Sekarang!
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => navigate("/cek-keaslian")}
              >
                🔍 Cek Dokumen Saya
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              ✅ Tidak perlu kartu kredit • ✅ Langsung bisa dipakai • ✅ Support 24/7
            </p>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="w-8 h-8" />
                  <span className="text-sm font-medium">DOKUMEN TERVERIFIKASI</span>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-white/30 rounded w-3/4"></div>
                  <div className="h-3 bg-white/30 rounded w-1/2"></div>
                  <div className="h-3 bg-white/30 rounded w-2/3"></div>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium">✅ SAH SECARA HUKUM</div>
                    <div className="text-xs opacity-80">Tanda tangan terenkripsi</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold animate-bounce">
              HEMAT 90% WAKTU!
            </div>
            <div className="absolute -bottom-4 -right-4 bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold">
              100% LEGAL
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Ribuan Profesional Sudah Merasakan Manfaatnya
          </h3>
          <p className="text-gray-600">Bergabunglah dengan mereka yang sudah beralih ke cara yang lebih cerdas</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
