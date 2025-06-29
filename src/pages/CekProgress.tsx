import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, AlertTriangle, ArrowLeft, Clock, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDocument } from "@/hooks/useDocuments";
import { useVerificationResultsByDocumentId } from "@/hooks/useVerificationResults";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CekProgress = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ticketNumber, setTicketNumber] = useState("");
  const [searchTicket, setSearchTicket] = useState("");

  const { data: document, isLoading, error } = useDocument(searchTicket);
  const { data: verificationResults = [] } = useVerificationResultsByDocumentId(document?.id || "");

  const handleCheckProgress = () => {
    if (!ticketNumber.trim()) {
      toast({
        title: "Nomor Tiket Diperlukan",
        description: "Silakan masukkan nomor tiket.",
        variant: "destructive"
      });
      return;
    }
    setSearchTicket(ticketNumber.trim());
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-5 h-5" />;
      case 'PROCESSING':
        return <FileText className="w-5 h-5 animate-pulse" />;
      case 'COMPLETED':
        return <CheckCircle className="w-5 h-5" />;
      case 'REJECTED':
        return <X className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-600';
      case 'PROCESSING':
        return 'text-blue-600';
      case 'COMPLETED':
        return 'text-green-600';
      case 'REJECTED':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Dokumen belum diproses. Mohon menunggu.';
      case 'PROCESSING':
        return 'Dokumen sedang dalam proses verifikasi.';
      case 'COMPLETED':
        return 'Dokumen telah berhasil ditandatangani dan diverifikasi.';
      case 'REJECTED':
        return 'Dokumen ditolak karena tidak memenuhi persyaratan.';
      default:
        return 'Status tidak diketahui.';
    }
  };

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
            Cek Status Dokumen
          </h1>
          <p className="text-gray-600">
            Masukkan nomor tiket untuk melihat progress dokumen Anda
          </p>
        </div>

        {/* Check Progress Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Masukkan Nomor Tiket</CardTitle>
            <CardDescription>
              Nomor tiket dapat ditemukan pada email konfirmasi atau setelah
              pengiriman dokumen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="ticketNumber">Nomor Tiket</Label>
              <Input
                id="ticketNumber"
                placeholder="TKT123456"
                value={ticketNumber}
                onChange={(e) => setTicketNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCheckProgress()}
              />
            </div>
            <Button onClick={handleCheckProgress} disabled={isLoading}>
              {isLoading ? "Mencari..." : "Cek Progress"}
            </Button>
          </CardContent>
        </Card>

        {/* Status Display */}
        {error && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Dokumen Tidak Ditemukan
                </h3>
                <p className="text-gray-600">
                  Nomor tiket yang Anda masukkan tidak ditemukan. Silakan periksa kembali nomor tiket Anda.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {document && (
          <Card>
            <CardHeader>
              <CardTitle>Detail Dokumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={getStatusColor(document.status)}>
                    {getStatusIcon(document.status)}
                  </div>
                  <div>
                    <Badge variant={
                      document.status === 'COMPLETED' ? 'success' :
                      document.status === 'REJECTED' ? 'destructive' :
                      document.status === 'PROCESSING' ? 'default' : 'secondary'
                    }>
                      {document.status}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">
                      {getStatusMessage(document.status)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Informasi Dokumen</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Nama File:</span>
                      <span className="ml-2 text-gray-600">{document.file_name}</span>
                    </div>
                    <div>
                      <span className="font-medium">Subjek:</span>
                      <span className="ml-2 text-gray-600">{document.subject}</span>
                    </div>
                    <div>
                      <span className="font-medium">Penerima:</span>
                      <span className="ml-2 text-gray-600">{document.recipient}</span>
                    </div>
                    <div>
                      <span className="font-medium">Ukuran File:</span>
                      <span className="ml-2 text-gray-600">
                        {(document.file_size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Timeline</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Dikirim:</span>
                      <span className="ml-2 text-gray-600">
                        {new Date(document.created_at).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Terakhir Diperbarui:</span>
                      <span className="ml-2 text-gray-600">
                        {new Date(document.updated_at).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">QR Code:</span>
                      <span className="ml-2 text-gray-600 font-mono text-xs">
                        {document.qr_code}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              {document.message && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Pesan</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {document.message}
                  </p>
                </div>
              )}

              {/* Verification Results */}
              {verificationResults && verificationResults.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Hasil Verifikasi</h4>
                  <div className="space-y-2">
                    {verificationResults.map((result, index) => (
                      <div key={result.id || index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Integritas:</span>
                            <span className="ml-2">{result.document_integrity}</span>
                          </div>
                          <div>
                            <span className="font-medium">Validitas Sertifikat:</span>
                            <span className="ml-2">{result.certificate_validity}</span>
                          </div>
                          {result.signer_name && (
                            <div>
                              <span className="font-medium">Penandatangan:</span>
                              <span className="ml-2">{result.signer_name}</span>
                            </div>
                          )}
                          {result.signature_location && (
                            <div>
                              <span className="font-medium">Lokasi:</span>
                              <span className="ml-2">{result.signature_location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CekProgress;
