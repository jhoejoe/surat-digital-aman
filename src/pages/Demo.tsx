
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Play, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCreateDemoRequest } from "@/hooks/useDemoRequests";

const Demo = () => {
  const navigate = useNavigate();
  const createDemoRequest = useCreateDemoRequest();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.name || !formData.email || !formData.company) {
      return;
    }

    // Submit to database
    createDemoRequest.mutate({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone || undefined,
      message: formData.message || undefined
    }, {
      onSuccess: () => {
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: ""
        });
      }
    });
  };

  const demoFeatures = [
    "Penandatanganan dokumen real-time",
    "Verifikasi keaslian dokumen",
    "Dashboard management lengkap",
    "Integrasi API dengan sistem existing",
    "Audit trail dan reporting"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Demo Gratis Platform Tanda Tangan Digital
          </h1>
          <p className="text-gray-600">
            Rasakan langsung kemudahan dan keamanan platform tanda tangan digital kami
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Play className="w-5 h-5 mr-2 text-blue-600" />
                Ajukan Demo Gratis
              </CardTitle>
              <CardDescription>
                Isi form di bawah ini dan tim kami akan menghubungi Anda untuk mengatur sesi demo yang sesuai dengan kebutuhan bisnis Anda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Nama Perusahaan *</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="PT. Contoh Perusahaan"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Pesan atau Kebutuhan Khusus</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Ceritakan tentang kebutuhan tanda tangan digital di perusahaan Anda..."
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={createDemoRequest.isPending}
                >
                  {createDemoRequest.isPending ? "Mengirim..." : "Ajukan Demo Gratis"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Demo */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Yang Akan Anda Lihat di Demo</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {demoFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Durasi & Format Demo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Durasi: 30-45 menit</h4>
                  <p className="text-sm text-gray-600">Waktu yang cukup untuk melihat semua fitur utama</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Format: Online via Video Call</h4>
                  <p className="text-sm text-gray-600">Fleksibel dan mudah diakses dari mana saja</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Personalisasi</h4>
                  <p className="text-sm text-gray-600">Demo disesuaikan dengan kebutuhan industri Anda</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Demo;
