
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowLeft, FileText, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDocuments, useDocument } from "@/hooks/useDocuments";
import type { Tables } from "@/integrations/supabase/types";

type Document = Tables<"documents">;
type VerificationResult = Tables<"verification_results">;

interface DocumentWithVerification extends Document {
  verification_results: VerificationResult[];
}

const CekProgress = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedTicket, setSearchedTicket] = useState("");
  
  const { data: recentDocuments, isLoading: isLoadingRecent } = useDocuments();
  const { data: searchResult, isLoading: isSearching, error: searchError } = useDocument(searchedTicket);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setSearchedTicket(searchQuery.trim());
  };

  const getStatusBadge = (status: Document['status']) => {
    const statusConfig = {
      PENDING: { label: "Menunggu", color: "bg-yellow-500" },
      PROCESSING: { label: "Diproses", color: "bg-blue-500" },
      COMPLETED: { label: "Selesai", color: "bg-green-500" },
      FAILED: { label: "Gagal", color: "bg-red-500" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={`${config.color} text-white`}>
        {config.label}
      </Badge>
    );
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case "PENDING":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "PROCESSING":
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>;
      case "COMPLETED":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "FAILED":
        return <CheckCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID');
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
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Cek Progress</h1>
                <p className="text-sm text-gray-600">Pantau status verifikasi dokumen Anda</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cari Dokumen</CardTitle>
            <CardDescription>
              Masukkan nomor tiket atau QR code untuk melihat status dokumen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="search">Nomor Tiket / QR Code</Label>
                <Input
                  id="search"
                  placeholder="Contoh: TKT2024001 atau QR001ABC"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} disabled={isSearching}>
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Result */}
        {searchResult && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Hasil Pencarian</span>
                {getStatusBadge(searchResult.status)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(searchResult.status)}
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Nama File</Label>
                      <p className="text-lg font-medium">{searchResult.file_name}</p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Nomor Tiket</Label>
                    <p className="text-lg font-mono font-medium">{searchResult.ticket_number}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Tanggal Submit</Label>
                    <p className="text-lg font-medium">{formatDate(searchResult.created_at)}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">QR Code</Label>
                    <p className="text-lg font-mono font-medium">{searchResult.qr_code}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Subjek</Label>
                    <p className="text-lg font-medium">{searchResult.subject}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Penerima</Label>
                    <p className="text-lg font-medium">{searchResult.recipient}</p>
                  </div>
                  
                  {searchResult.verification_results && searchResult.verification_results.length > 0 && (
                    <>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Validitas Sertifikat</Label>
                        <p className={`text-lg font-medium ${
                          searchResult.verification_results[0].certificate_validity === 'VALID' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {searchResult.verification_results[0].certificate_validity}
                        </p>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Integritas Dokumen</Label>
                        <p className={`text-lg font-medium ${
                          searchResult.verification_results[0].document_integrity === 'ASLI' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {searchResult.verification_results[0].document_integrity}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {searchQuery && searchError && !isSearching && (
          <Card className="mb-8">
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Dokumen tidak ditemukan. Pastikan nomor tiket atau QR code yang Anda masukkan benar.</p>
            </CardContent>
          </Card>
        )}

        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Dokumen Terbaru</CardTitle>
            <CardDescription>
              Daftar dokumen yang baru-baru ini disubmit
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingRecent ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-2 text-gray-500">Memuat dokumen...</p>
              </div>
            ) : recentDocuments && recentDocuments.length > 0 ? (
              <div className="space-y-4">
                {recentDocuments.slice(0, 10).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(doc.status)}
                      <div>
                        <p className="font-medium">{doc.file_name}</p>
                        <p className="text-sm text-gray-500">{doc.ticket_number}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(doc.status)}
                      <p className="text-sm text-gray-500 mt-1">{formatDate(doc.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Belum ada dokumen yang disubmit.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CekProgress;
