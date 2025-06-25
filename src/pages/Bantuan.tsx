
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle, FileText, CheckCircle, Upload, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Bantuan = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "Apa itu verifikasi dokumen elektronik?",
      answer: "Verifikasi dokumen elektronik adalah proses untuk memastikan keaslian dan integritas dokumen yang ditandatangani secara digital menggunakan sertifikat elektronik."
    },
    {
      question: "Format file apa yang didukung?",
      answer: "Saat ini sistem hanya mendukung file PDF yang telah ditandatangani secara digital dengan sertifikat elektronik yang valid."
    },
    {
      question: "Bagaimana cara mengetahui apakah dokumen asli atau sudah dimodifikasi?",
      answer: "Sistem akan menganalisis hash dan tanda tangan digital pada dokumen. Jika ada perubahan setelah penandatanganan, status akan menunjukkan 'SUDAH DIMODIFIKASI'."
    },
    {
      question: "Apa fungsi QR Code dan nomor tiket?",
      answer: "QR Code dan nomor tiket digunakan untuk verifikasi cepat tanpa perlu mengunggah ulang dokumen. Anda dapat menggunakan keduanya di fitur 'Cek Progress'."
    },
    {
      question: "Berapa lama proses verifikasi?",
      answer: "Proses verifikasi biasanya memakan waktu 1-3 menit tergantung pada ukuran file dan kompleksitas tanda tangan digital."
    }
  ];

  const features = [
    {
      title: "Kirim Surat",
      description: "Upload dokumen PDF untuk diverifikasi keasliannya",
      icon: Upload,
      steps: [
        "Klik menu 'Kirim Surat'",
        "Isi form dengan informasi yang diperlukan",
        "Upload file PDF yang telah ditandatangani digital",
        "Klik 'Kirim Dokumen' untuk memulai proses"
      ]
    },
    {
      title: "Cek Keaslian",
      description: "Verifikasi tanda tangan digital pada dokumen PDF",
      icon: CheckCircle,
      steps: [
        "Pilih menu 'Cek Keaslian'",
        "Upload file PDF yang ingin diverifikasi",
        "Tunggu proses verifikasi selesai",
        "Lihat hasil verifikasi lengkap dengan detail sertifikat"
      ]
    },
    {
      title: "Cek Progress",
      description: "Pantau status verifikasi menggunakan nomor tiket",
      icon: Search,
      steps: [
        "Masuk ke menu 'Cek Progress'",
        "Masukkan nomor tiket atau QR code",
        "Klik 'Cari' untuk melihat status",
        "Lihat detail progress dan hasil verifikasi"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Bantuan</h1>
                <p className="text-sm text-gray-600">Panduan penggunaan sistem verifikasi dokumen</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Feature Guide */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cara Menggunakan Fitur</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {feature.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                            {stepIndex + 1}
                          </div>
                          <p className="text-sm text-gray-600">{step}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pertanyaan yang Sering Diajukan</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Butuh Bantuan Lebih Lanjut?</CardTitle>
            <CardDescription>
              Jika Anda masih memiliki pertanyaan atau mengalami kendala, silakan hubungi tim support kami
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Email Support</h4>
                <p className="text-gray-600">support@verifikasi-dokumen.id</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Jam Operasional</h4>
                <p className="text-gray-600">Senin - Jumat: 08:00 - 17:00 WIB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Bantuan;
