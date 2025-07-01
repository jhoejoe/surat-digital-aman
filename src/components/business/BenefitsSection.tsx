
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  Shield, 
  CheckCircle, 
  Building
} from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      title: "Hemat Waktu & Biaya",
      description: "Proses tanda tangan digital 10x lebih cepat dari metode konvensional",
      icon: Zap
    },
    {
      title: "Keamanan Terjamin",
      description: "Sertifikat digital dan enkripsi tingkat militer untuk proteksi maksimal",
      icon: Shield
    },
    {
      title: "Compliance & Legal",
      description: "Sesuai dengan regulasi pemerintah dan standar internasional",
      icon: CheckCircle
    },
    {
      title: "Skalabilitas Bisnis",
      description: "Solusi yang dapat berkembang seiring pertumbuhan perusahaan",
      icon: Building
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Accelerate your business with SuratAman end-to-end digital solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Welcome to SuratAman for business. Our fast and leading digital signature and digital identity provider in Indonesia. 
            Enjoy a convenient & efficient digital experience with advanced trust & security through our business solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-red-500" />
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
