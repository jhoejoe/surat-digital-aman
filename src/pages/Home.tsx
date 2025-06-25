
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, Upload, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Kirim Surat",
      description: "Kirim dan upload dokumen untuk verifikasi",
      icon: Upload,
      path: "/kirim-surat",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Cek Progress",
      description: "Pantau status verifikasi dokumen Anda",
      icon: FileText,
      path: "/cek-progress",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Cek Keaslian",
      description: "Verifikasi keaslian dokumen elektronik",
      icon: CheckCircle,
      path: "/cek-keaslian",
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      title: "Bantuan",
      description: "Panduan penggunaan aplikasi",
      icon: HelpCircle,
      path: "/bantuan",
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Verifikasi Dokumen</h1>
                <p className="text-sm text-gray-600">Sistem Verifikasi Dokumen Elektronik</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Selamat Datang di Sistem Verifikasi Dokumen
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Verifikasi keaslian dokumen elektronik Anda dengan teknologi tanda tangan digital yang aman dan terpercaya
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    onClick={() => navigate(item.path)}
                    variant="outline"
                  >
                    Akses Fitur
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Aman & Terpercaya</h3>
              <p className="text-gray-600">Menggunakan teknologi PKI dan sertifikat digital resmi</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Format PDF</h3>
              <p className="text-gray-600">Mendukung verifikasi dokumen PDF dengan tanda tangan digital</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Mudah Digunakan</h3>
              <p className="text-gray-600">Interface yang intuitif dan proses verifikasi yang cepat</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
