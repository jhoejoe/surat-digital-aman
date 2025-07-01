
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
import { generateTicketNumber, generateQRCode, calculateFileHash } from "@/utils/documentUtils";
import { supabase } from "@/integrations/supabase/client";
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
      console.log("Starting real PDF signature verification process...");
      
      // Step 1: Calculate file hash
      const fileHash = await calculateFileHash(selectedFile);
      console.log("File hash calculated:", fileHash);
      
      // Step 2: Generate ticket number and QR code
      const ticketNumber = generateTicketNumber();
      const qrCode = generateQRCode();
      
      console.log("Generated ticket number:", ticketNumber);
      console.log("Generated QR code:", qrCode);
      
      // Step 3: Create document record
      const documentData = {
        ticket_number: ticketNumber,
        file_name: selectedFile.name,
        file_size: selectedFile.size,
        file_hash: fileHash,
        subject: "Verifikasi Tanda Tangan Digital",
        recipient: "Sistem Verifikasi PDF",
        message: null,
        qr_code: qrCode,
        status: "PROCESSING" as const,
      };
      
      const document = await createDocument.mutateAsync(documentData);
      console.log("Document created:", document);
      
      // Step 4: Upload PDF file to Supabase Storage
      const fileExtension = selectedFile.name.split('.').pop();
      const fileName = `${document.id}.${fileExtension}`;
      const filePath = `documents/${fileName}`;
      
      console.log("Uploading file to storage:", filePath);
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error("File upload error:", uploadError);
        throw new Error(`Failed to upload file: ${uploadError.message}`);
      }

      console.log("File uploaded successfully:", uploadData);
      
      // Step 5: Call the new PDF signature verification Edge Function
      console.log("Calling verify-pdf-signature Edge Function...");
      
      const { data: verificationData, error: verificationError } = await supabase.functions.invoke('verify-pdf-signature', {
        body: {
          file_path: filePath,
          file_name: selectedFile.name,
          document_id: document.id
        }
      });

      if (verificationError) {
        console.error("PDF signature verification error:", verificationError);
        throw new Error(`PDF signature verification failed: ${verificationError.message}`);
      }

      console.log("PDF signature verification completed:", verificationData);

      // Step 6: Create verification result record with real PDF signature data
      const verificationResultData = {
        document_id: document.id,
        signature_count: verificationData.signatureCount,
        certificate_validity: verificationData.certificateValidity,
        signer_name: verificationData.signerName,
        signature_time: verificationData.signatureTime,
        valid_until: new Date(verificationData.validUntil).toISOString().split('T')[0],
        document_integrity: verificationData.documentIntegrity,
        signature_location: verificationData.signatureLocation,
      };
      
      await createVerificationResult.mutateAsync(verificationResultData);
      console.log("Verification result saved with real PDF signature data");
      
      // Step 7: Update document status to completed
      await updateDocument.mutateAsync({
        id: document.id,
        status: "COMPLETED"
      });
      console.log("Document status updated to COMPLETED");
      
      // Step 8: Set verification result for display
      const result: VerificationResult = {
        fileName: selectedFile.name,
        signatureCount: verificationData.signatureCount,
        certificateValidity: verificationData.certificateValidity,
        signerName: verificationData.signerName,
        signatureTime: new Date(verificationData.signatureTime).toLocaleString('id-ID'),
        validUntil: new Date(verificationData.validUntil).toLocaleDateString('id-ID'),
        documentIntegrity: verificationData.documentIntegrity,
        signatureLocation: verificationData.signatureLocation || undefined,
        qrCode: qrCode,
        ticketNumber: ticketNumber
      };
      
      setVerificationResult(result);
      setIsVerifying(false);
      
      toast({
        title: "Verifikasi Berhasil",
        description: "Tanda tangan digital PDF telah diverifikasi menggunakan analisis PDF yang sesungguhnya",
      });
    } catch (error) {
      console.error("Error during PDF signature verification:", error);
      setIsVerifying(false);
      toast({
        title: "Verifikasi Gagal",
        description: `Terjadi kesalahan saat memverifikasi tanda tangan PDF: ${error.message}`,
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
                Upload Dokumen PDF untuk Verifikasi Tanda Tangan
              </CardTitle>
              <CardDescription>
                Pilih file PDF yang ingin diverifikasi tanda tangan digitalnya menggunakan analisis PDF yang sesungguhnya
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
                  Maksimal ukuran file: 10MB. Format yang didukung: PDF dengan tanda tangan digital
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
                    Memverifikasi Tanda Tangan PDF...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verifikasi Tanda Tangan Digital
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
                  Hasil Verifikasi Tanda Tangan Digital PDF
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
                      <Label className="text-sm font-medium text-gray-500">Jumlah Tanda Tangan</Label>
                      <p className="text-lg font-medium">{verificationResult.signatureCount} Tanda Tangan Digital</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Validitas Sertifikat</Label>
                      <p className={`text-lg font-medium ${verificationResult.certificateValidity === 'VALID' ? 'text-green-600' : 'text-red-600'}`}>
                        {verificationResult.certificateValidity}
                      </p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Penandatangan</Label>
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
                      <Label className="text-sm font-medium text-gray-500">Integritas Dokumen</Label>
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
                        Simpan nomor tiket ini untuk referensi verifikasi
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
