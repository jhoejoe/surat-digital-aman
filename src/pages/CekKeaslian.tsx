
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, CheckCircle, X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useCreateDocument, useUpdateDocument } from "@/hooks/useDocuments";
import { useCreateVerificationResult } from "@/hooks/useVerificationResults";
import { generateTicketNumber, generateQRCode, calculateFileHash, simulateDocumentVerification } from "@/utils/documentUtils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface VerificationResult {
  fileName: string;
  signatureCount: number;
  certificateValidity: "VALID" | "INVALID";
  signerName: string;
  signatureTime: string;
  validUntil: string;
  documentIntegrity: "ASLI" | "SUDAH DIMODIFIKASI";
  signatureLocation?: string;
  qrCode: string;
  ticketNumber: string;
}

const CekKeaslian = () => {
  const navigate = useNavigate();
  const createDocument = useCreateDocument();
  const updateDocument = useUpdateDocument();
  const createVerificationResult = useCreateVerificationResult();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File Terlalu Besar",
          description: "Ukuran file maksimal 10MB",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
      setVerificationResult(null);
    }
  };

  const handleVerification = async () => {
    if (!selectedFile) return;
    
    setIsVerifying(true);
    
    try {
      console.log("Starting verification process...");
      
      // Calculate file hash
      const fileHash = await calculateFileHash(selectedFile);
      console.log("File hash calculated:", fileHash);
      
      // Generate ticket number and QR code
      const ticketNumber = generateTicketNumber();
      const qrCode = generateQRCode();
      
      console.log("Generated ticket number:", ticketNumber);
      console.log("Generated QR code:", qrCode);
      
      // Create document record for verification
      const documentData = {
        ticket_number: ticketNumber,
        file_name: selectedFile.name,
        file_size: selectedFile.size,
        file_hash: fileHash,
        subject: "Verifikasi Keaslian Dokumen",
        recipient: "Sistem Verifikasi",
        message: null,
        qr_code: qrCode,
        status: "PROCESSING" as const,
      };
      
      const document = await createDocument.mutateAsync(documentData);
      console.log("Document created:", document);
      
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate document verification
      const mockVerification = simulateDocumentVerification(selectedFile.name);
      console.log("Mock verification result:", mockVerification);
      
      // Create verification result record
      const verificationData = {
        document_id: document.id,
        signature_count: mockVerification.signatureCount,
        certificate_validity: mockVerification.certificateValidity,
        signer_name: mockVerification.signerName,
        signature_time: new Date().toISOString(),
        valid_until: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
        document_integrity: mockVerification.documentIntegrity,
        signature_location: mockVerification.signatureLocation,
      };
      
      await createVerificationResult.mutateAsync(verificationData);
      console.log("Verification result created");
      
      // Update document status to completed
      await updateDocument.mutateAsync({
        id: document.id,
        status: "COMPLETED"
      });
      console.log("Document status updated to COMPLETED");
      
      // Set verification result for display
      const result: VerificationResult = {
        fileName: selectedFile.name,
        signatureCount: mockVerification.signatureCount,
        certificateValidity: mockVerification.certificateValidity,
        signerName: mockVerification.signerName,
        signatureTime: new Date().toLocaleString('id-ID'),
        validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID'),
        documentIntegrity: mockVerification.documentIntegrity,
        signatureLocation: mockVerification.signatureLocation || undefined,
        qrCode: qrCode,
        ticketNumber: ticketNumber
      };
      
      setVerificationResult(result);
      setIsVerifying(false);
      
      toast({
        title: "Verifikasi Berhasil",
        description: "Dokumen telah diverifikasi dan disimpan ke database",
      });
    } catch (error) {
      console.error("Error during verification:", error);
      setIsVerifying(false);
      toast({
        title: "Verifikasi Gagal",
        description: "Terjadi kesalahan saat memverifikasi dokumen. Silakan coba lagi.",
        variant: "destructive"
      });
    }
  };

  const resetVerification = () => {
    setSelectedFile(null);
    setVerificationResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!verificationResult ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload Dokumen PDF
              </CardTitle>
              <CardDescription>
                Pilih file PDF yang ingin diverifikasi keasliannya
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file">File Dokumen (PDF)</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="cursor-pointer"
                />
                <p className="text-sm text-gray-500">
                  Maksimal ukuran file: 10MB. Format yang didukung: PDF
                </p>
              </div>

              {selectedFile && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-8 h-8 text-red-600 mr-3" />
                      <div>
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetVerification}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              <Button
                onClick={handleVerification}
                disabled={!selectedFile || isVerifying}
                className="w-full"
                size="lg"
              >
                {isVerifying ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Memverifikasi Dokumen...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verifikasi Dokumen
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Verification Result */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Hasil Verifikasi Dokumen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Nama Dokumen</Label>
                      <p className="text-lg font-medium">{verificationResult.fileName}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Jumlah Penandatangan</Label>
                      <p className="text-lg font-medium">{verificationResult.signatureCount} Penandatangan</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Validitas Sertifikat</Label>
                      <p className={`text-lg font-medium ${verificationResult.certificateValidity === 'VALID' ? 'text-green-600' : 'text-red-600'}`}>
                        {verificationResult.certificateValidity}
                      </p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Nama Penandatangan</Label>
                      <p className="text-lg font-medium">{verificationResult.signerName}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Waktu Tanda Tangan</Label>
                      <p className="text-lg font-medium">{verificationResult.signatureTime}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Valid s/d</Label>
                      <p className="text-lg font-medium">{verificationResult.validUntil}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Status Integritas Dokumen</Label>
                      <p className={`text-lg font-medium ${verificationResult.documentIntegrity === 'ASLI' ? 'text-green-600' : 'text-red-600'}`}>
                        {verificationResult.documentIntegrity}
                      </p>
                    </div>
                    
                    {verificationResult.signatureLocation && (
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Lokasi Penandatangan</Label>
                        <p className="text-lg font-medium">{verificationResult.signatureLocation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QR Code and Ticket Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Verifikasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">QR Code</Label>
                    <div className="mt-2 p-4 bg-gray-100 rounded-lg text-center">
                      <div className="w-32 h-32 bg-white mx-auto mb-2 flex items-center justify-center border-2 border-dashed border-gray-300">
                        <span className="text-xs text-gray-500">QR Code</span>
                      </div>
                      <p className="text-sm font-mono">{verificationResult.qrCode}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Nomor Tiket</Label>
                    <div className="mt-2 p-4 bg-blue-50 rounded-lg">
                      <p className="text-lg font-mono font-bold text-blue-600">
                        {verificationResult.ticketNumber}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Simpan nomor tiket ini untuk verifikasi cepat di masa mendatang
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button onClick={resetVerification} variant="outline" className="flex-1">
                Verifikasi Dokumen Lain
              </Button>
              <Button onClick={() => navigate('/cek-progress')} className="flex-1">
                Lihat Progress Verifikasi
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CekKeaslian;
