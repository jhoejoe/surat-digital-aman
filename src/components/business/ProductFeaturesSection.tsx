
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Building, 
  Shield, 
  Users, 
  Zap, 
  Globe
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductFeaturesSection = () => {
  const navigate = useNavigate();

  const productFeatures = [
    {
      icon: FileText,
      title: "e-Meterai",
      description: "Meterai digital resmi yang diakui pemerintah untuk semua dokumen bisnis",
      link: "/business/e-meterai"
    },
    {
      icon: Building,
      title: "Enterprise Plan",
      description: "Solusi khusus untuk perusahaan besar dengan kebutuhan volume tinggi"
    },
    {
      icon: Shield,
      title: "On Premise",
      description: "Deploy di server sendiri untuk keamanan dan kontrol maksimal"
    },
    {
      icon: Users,
      title: "Customer On Board",
      description: "Onboarding mudah untuk pelanggan dengan verifikasi identitas"
    },
    {
      icon: Zap,
      title: "API Integration",
      description: "Integrasi mudah dengan sistem existing melalui API"
    },
    {
      icon: Globe,
      title: "Digital Certificate",
      description: "Sertifikat digital untuk validasi dan keamanan dokumen"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Enterprise Plan</h2>
          <p className="text-xl text-gray-600">Solusi lengkap untuk kebutuhan bisnis enterprise</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => feature.link && navigate(feature.link)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-red-500" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFeaturesSection;
