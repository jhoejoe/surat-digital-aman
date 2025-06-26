
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Globe, Users, FileCheck, Clock } from "lucide-react";

const Features = () => {
  const mainFeatures = [
    {
      icon: Shield,
      title: "Keamanan Tingkat Enterprise",
      description: "Enkripsi end-to-end dengan standar keamanan internasional untuk melindungi dokumen Anda."
    },
    {
      icon: Zap,
      title: "Proses Cepat & Efisien",
      description: "Tanda tangani dokumen dalam hitungan detik, tidak perlu lagi mencetak dan scan."
    },
    {
      icon: Globe,
      title: "Akses Dari Mana Saja",
      description: "Platform berbasis cloud yang dapat diakses kapan saja, di mana saja melalui browser."
    },
    {
      icon: Users,
      title: "Kolaborasi Tim",
      description: "Kirim dokumen untuk ditandatangani oleh multiple pihak dengan tracking real-time."
    },
    {
      icon: FileCheck,
      title: "Verifikasi Otomatis",
      description: "Sistem verifikasi otomatis untuk memastikan keaslian dan integritas dokumen."
    },
    {
      icon: Clock,
      title: "Riwayat Lengkap",
      description: "Audit trail lengkap untuk setiap transaksi dengan timestamp yang akurat."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-4">
            Fitur Unggulan
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Solusi Lengkap untuk Kebutuhan
            <span className="text-blue-600"> Tanda Tangan Digital</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Platform terintegrasi yang memudahkan proses penandatanganan, verifikasi, 
            dan pengelolaan dokumen digital dengan standar keamanan tertinggi.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow group cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <IconComponent className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Siap untuk Memulai Transformasi Digital?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan perusahaan yang telah mempercayai 
              platform kami untuk solusi tanda tangan digital mereka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Demo Gratis
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Hubungi Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
