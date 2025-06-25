
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useCreateDocument } from "@/hooks/useDocuments";
import { generateTicketNumber, generateQRCode, calculateFileHash } from "@/utils/documentUtils";

const KirimSurat = () => {
  const navigate = useNavigate();
  const createDocument = useCreateDocument();
  const [formData, setFormData] = useState({
    subject: "",
    recipient: "",
    message: "",
    file: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: "File Tidak Valid",
          description: "Hanya file PDF yang diizinkan",
          variant: "destructive"
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Terlalu Besar",
          description: "Ukuran file maksimal 10MB",
          variant: "destructive"
        });
        return;
      }
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.recipient || !formData.file) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log("Starting document submission...");
      
      // Calculate file hash
      const fileHash = await calculateFileHash(formData.file);
      console.log("File hash calculated:", fileHash);
      
      // Generate ticket number and QR code
      const ticketNumber = generateTicketNumber();
      const qrCode = generateQRCode();
      
      console.log("Generated ticket number:", ticketNumber);
      console.log("Generated QR code:", qrCode);
      
      // Create document record
      const documentData = {
        ticket_number: ticketNumber,
        file_name: formData.file.name,
        file_size: formData.file.size,
        file_hash: fileHash,
        subject: formData.subject,
        recipient: formData.recipient,
        message: formData.message || null,
        qr_code: qrCode,
        status: "PENDING" as const,
      };
      
      console.log("Document data:", documentData);
      
      await createDocument.mutateAsync(documentData);
      
      toast({
        title: "Surat Berhasil Dikirim",
        description: `Dokumen Anda telah berhasil dikirim dengan nomor tiket: ${ticketNumber}`,
      });
      
      navigate('/cek-progress');
    } catch (error) {
      console.error("Error submitting document:", error);
      toast({
        title: "Gagal Mengirim Dokumen",
        description: "Terjadi kesalahan saat mengirim dokumen. Silakan coba lagi.",
        variant: "destructive"
      });
    }
  };

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
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Kirim Surat</h1>
                <p className="text-sm text-gray-600">Upload dan kirim dokumen untuk verifikasi</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Form Pengiriman Dokumen</CardTitle>
            <CardDescription>
              Lengkapi informasi di bawah ini untuk mengirim dokumen Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Subjek Surat *</Label>
                <Input
                  id="subject"
                  placeholder="Masukkan subjek surat"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient">Penerima *</Label>
                <Input
                  id="recipient"
                  placeholder="Nama atau instansi penerima"
                  value={formData.recipient}
                  onChange={(e) => handleInputChange('recipient', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Pesan</Label>
                <Textarea
                  id="message"
                  placeholder="Pesan tambahan (opsional)"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">File Dokumen (PDF) *</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                  className="cursor-pointer"
                />
                {formData.file && (
                  <div className="mt-2 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      File terpilih: {formData.file.name} ({(formData.file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Catatan Penting:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Pastikan dokumen telah ditandatangani secara digital</li>
                  <li>• Format file harus PDF dengan ukuran maksimal 10MB</li>
                  <li>• Dokumen akan diverifikasi secara otomatis setelah dikirim</li>
                </ul>
              </div>

              <Button
                type="submit"
                disabled={createDocument.isPending}
                className="w-full"
                size="lg"
              >
                {createDocument.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Mengirim Dokumen...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Kirim Dokumen
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default KirimSurat;
