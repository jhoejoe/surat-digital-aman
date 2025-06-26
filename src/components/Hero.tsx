
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, FileText, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const features = [
    "Tanda tangan digital yang sah secara hukum",
    "Enkripsi tingkat militer untuk keamanan maksimal",
    "Verifikasi dokumen real-time",
    "Integrasi mudah dengan sistem existing"
  ];

  const stats = [
    { icon: FileText, value: "1M+", label: "Dokumen Ditandatangani" },
    { icon: Users, value: "50K+", label: "Pengguna Aktif" },
    { icon: Shield, value: "99.9%", label: "Tingkat Keamanan" },
    { icon: CheckCircle, value: "24/7", label: "Dukungan Teknis" }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Solusi Tanda Tangan Digital Terpercaya
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Tanda Tangan Digital
              <span className="text-blue-600"> Yang Aman</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Digitalisasi proses penandatanganan dokumen Anda dengan teknologi 
              kriptografi terdepan. Sah secara hukum, aman, dan efisien.
            </p>

            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                onClick={() => navigate("/kirim-surat")}
              >
                Mulai Tanda Tangan
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={() => navigate("/cek-keaslian")}
              >
                Verifikasi Dokumen
              </Button>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="w-8 h-8" />
                  <span className="text-sm font-medium">SERTIFIKAT DIGITAL</span>
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
                    <div className="text-sm font-medium">Terverifikasi</div>
                    <div className="text-xs opacity-80">Tanda tangan sah</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
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
