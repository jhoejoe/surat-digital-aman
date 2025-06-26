
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreateDocument } from "@/hooks/useDocuments";
import { generateTicketNumber, generateQRCode, calculateFileHash } from "@/utils/documentUtils";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const KirimSurat = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const createDocument = useCreateDocument();
  
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    receiverName: "",
    receiverEmail: "",
    subject: "",
    message: ""
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: "Format File Tidak Didukung",
          description: "Hanya file PDF yang diperbolehkan.",
          variant: "destructive"
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File Terlalu Besar",
          description: "Ukuran file maksimal 10MB.",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "File Diperlukan",
        description: "Silakan pilih file PDF untuk dikirim.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileHash = await calculateFileHash(selectedFile);
      const ticketNumber = generateTicketNumber();
      const qrCode = generateQRCode();

      const documentData = {
        file_name: selectedFile.name,
        file_size: selectedFile.size,
        file_hash: fileHash,
        recipient: `${formData.receiverName} (${formData.receiverEmail})`,
        subject: formData.subject,
        message: formData.message,
        ticket_number: ticketNumber,
        qr_code: qrCode,
        status: 'PENDING' as const
      };

      await createDocument.mutateAsync(documentData);

      toast({
        title: "Dokumen Berhasil Dikirim!",
        description: `Nomor tiket: ${ticketNumber}`,
      });

      // Reset form
      setFormData({
        senderName: "",
        senderEmail: "",
        receiverName: "",
        receiverEmail: "",
        subject: "",
        message: ""
      });
      setSelectedFile(null);

      // Navigate to progress page
      navigate("/cek-progress");

    } catch (error) {
      console.error('Error creating document:', error);
      toast({
        title: "Gagal Mengirim Dokumen",
        description: "Terjadi kesalahan saat mengirim dokumen. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            Kirim Dokumen untuk Ditandatangani
          </h1>
          <p className="text-gray-600">
            Upload dokumen PDF Anda dan kirim untuk mendapatkan tanda tangan digital
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload Dokumen
              </CardTitle>
              <CardDescription>
                Pilih file PDF yang akan ditandatangani (maksimal 10MB)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  {selectedFile ? (
                    <div className="flex items-center justify-center">
                      <FileText className="w-8 h-8 text-blue-600 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-2">
                        Klik untuk upload file atau drag & drop
                      </p>
                      <p className="text-xs text-gray-500">PDF (maksimal 10MB)</p>
                    </div>
                  )}
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Sender Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Pengirim</CardTitle>
              <CardDescription>
                Masukkan informasi Anda sebagai pengirim dokumen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="senderName">Nama Lengkap *</Label>
                  <Input
                    id="senderName"
                    value={formData.senderName}
                    onChange={(e) => setFormData({...formData, senderName: e.target.value})}
                    required
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <Label htmlFor="senderEmail">Email *</Label>
                  <Input
                    id="senderEmail"
                    type="email"
                    value={formData.senderEmail}
                    onChange={(e) => setFormData({...formData, senderEmail: e.target.value})}
                    required
                    placeholder="nama@email.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Receiver Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Penerima</CardTitle>
              <CardDescription>
                Masukkan informasi pihak yang akan menandatangani dokumen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="receiverName">Nama Lengkap *</Label>
                  <Input
                    id="receiverName"
                    value={formData.receiverName}
                    onChange={(e) => setFormData({...formData, receiverName: e.target.value})}
                    required
                    placeholder="Masukkan nama penerima"
                  />
                </div>
                <div>
                  <Label htmlFor="receiverEmail">Email *</Label>
                  <Input
                    id="receiverEmail"
                    type="email"
                    value={formData.receiverEmail}
                    onChange={(e) => setFormData({...formData, receiverEmail: e.target.value})}
                    required
                    placeholder="email@penerima.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subjek *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                  placeholder="Subjek dokumen"
                />
              </div>
              <div>
                <Label htmlFor="message">Pesan (Opsional)</Label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Pesan tambahan untuk penerima..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isUploading}
              className="min-w-[150px]"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Mengirim...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Kirim Dokumen
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
      
      <Footer />
    </div>
  );
};

export default KirimSurat;
