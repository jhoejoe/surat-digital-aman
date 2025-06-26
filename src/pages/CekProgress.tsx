import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CekProgress = () => {
  const navigate = useNavigate();
  const [ticketNumber, setTicketNumber] = useState("");
  const [documentStatus, setDocumentStatus] = useState<"pending" | "processing" | "completed" | "rejected" | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleCheckProgress = () => {
    // Mock API call to check document progress
    // In a real application, this would be an API call to your backend
    if (ticketNumber === "TKT123456") {
      setDocumentStatus("completed");
      setStatusMessage("Dokumen telah berhasil ditandatangani dan diverifikasi.");
    } else if (ticketNumber === "TKT789012") {
      setDocumentStatus("rejected");
      setStatusMessage("Dokumen ditolak karena tidak memenuhi persyaratan.");
    } else if (ticketNumber === "TKT345678") {
      setDocumentStatus("processing");
      setStatusMessage("Dokumen sedang dalam proses verifikasi.");
    } else {
      setDocumentStatus("pending");
      setStatusMessage("Dokumen belum diproses. Mohon menunggu.");
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
        <Card>
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
              />
            </div>
            <Button onClick={handleCheckProgress}>
              Cek Progress
            </Button>
          </CardContent>
        </Card>

        {/* Status Display */}
        {documentStatus && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Status Dokumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {documentStatus === "pending" && (
                <div className="flex items-center text-yellow-600">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  <p>Pending</p>
                </div>
              )}
              {documentStatus === "processing" && (
                <div className="flex items-center text-blue-600">
                  <FileText className="w-5 h-5 mr-2 animate-pulse" />
                  <p>Processing</p>
                </div>
              )}
              {documentStatus === "completed" && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <p>Completed</p>
                </div>
              )}
              {documentStatus === "rejected" && (
                <div className="flex items-center text-red-600">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  <p>Rejected</p>
                </div>
              )}
              <p className="text-gray-700">{statusMessage}</p>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CekProgress;
