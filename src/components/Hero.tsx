
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, FileText, Users, Clock, Zap, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const painPoints = [
    "Tidak perlu lagi buang waktu 3-5 jam per minggu untuk print-scan dokumen",
    "Bebas dari kekhawatiran dokumen hilang atau dipalsukan pesaing",
    "Hemat ratusan ribu rupiah biaya print, scan, dan kirim dokumen setiap bulan",
    "Kontrak ditandatangani dalam hitungan menit, bukan hari"
  ];

  const stats = [
    { icon: FileText, value: "1M+", label: "Dokumen Aman Tersimpan" },
    { icon: Users, value: "50K+", label: "Pebisnis Merasakan Manfaatnya" },
    { icon: Shield, value: "99.9%", label: "Tingkat Keamanan Dokumen" },
    { icon: Clock, value: "5 Detik", label: "Rata-rata Tanda Tangan" }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-700 text-sm font-medium mb-6 animate-pulse">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Masih Repot Print-Scan? Kompetitor Anda Sudah Lebih Cepat!
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Berhenti Buang Waktu!
              <br />
              <span className="text-blue-600">Tanda Tangan Digital</span>
              <br />
              <span className="text-2xl lg:text-3xl text-gray-600 font-normal">
                yang Menghemat 15+ Jam Kerja Anda Setiap Bulan
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              <strong>Bayangkan...</strong> Klien di Surabaya bisa menandatangani kontrak 
              dalam 5 menit sementara Anda santai di Jakarta. Tidak ada lagi drama print-scan, 
              tidak ada lagi dokumen hilang, dan yang pasti — 
              <strong className="text-green-600"> bisnis Anda jadi lebih cepat dari kompetitor!</strong>
            </p>

            <div className="space-y-3 mb-8">
              {painPoints.map((point, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{point}</span>
                </div>
              ))}
            </div>

            {/* Enhanced Testimonial */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg shadow-sm">
              <p className="text-gray-700 italic font-medium text-lg mb-3">
                "Dulu saya stress banget kalau ada kontrak mendadak. Harus print, scan, 
                kirim email, tunggu balasan... Sekarang? 5 menit kelar! Tim saya heran 
                kok bisa secepat ini. Omzet naik 40% karena deal lebih cepat closing!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-700 font-bold text-lg">BS</span>
                </div>
                <div>
                  <p className="text-blue-600 font-semibold text-lg">Budi Santoso</p>
                  <p className="text-sm text-gray-600">Direktur CV Maju Bersama - Hemat 20 jam/bulan</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg font-bold shadow-lg transform hover:scale-105 transition-all"
                onClick={() => navigate("/kirim-surat")}
              >
                🚀 Hemat 15 Jam Bulan Ini - GRATIS!
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold shadow-lg"
                onClick={() => navigate("/cek-keaslian")}
              >
                🔍 Cek Dokumen Saya Sekarang
              </Button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700 font-medium">
                ⚡ <strong>Penawaran Terbatas:</strong> Coba gratis selama 30 hari • Tidak perlu kartu kredit 
                • Setup hanya 2 menit • Support WhatsApp 24/7
              </p>
            </div>

            <p className="text-xs text-gray-500">
              *Sudah dipercaya 50,000+ pebisnis Indonesia | Sah secara hukum | Diakui pengadilan
            </p>
          </div>

          {/* Right Content - Enhanced Illustration */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="w-8 h-8" />
                  <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded">TERVERIFIKASI</span>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-white/30 rounded w-3/4"></div>
                  <div className="h-3 bg-white/30 rounded w-1/2"></div>
                  <div className="h-3 bg-white/30 rounded w-2/3"></div>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-bold">✅ SAH SECARA HUKUM</div>
                    <div className="text-xs opacity-90">Diakui pengadilan Indonesia</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced floating elements */}
            <div className="absolute -top-6 -left-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold animate-bounce shadow-lg">
              HEMAT 90% WAKTU!
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-green-400 to-green-500 text-green-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              100% LEGAL & AMAN
            </div>
            <div className="absolute top-1/2 -right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              TRENDING!
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ribuan Pebisnis Cerdas Sudah Merasakan Hasilnya
          </h3>
          <p className="text-gray-600 text-lg">
            Jangan sampai tertinggal! Bergabunglah dengan mereka yang sudah 
            <span className="text-green-600 font-semibold"> menghemat waktu dan meningkatkan profit</span>
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl mb-4">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
