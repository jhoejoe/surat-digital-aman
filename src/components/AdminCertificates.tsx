
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Shield, Search, Plus, Eye, Download, Trash2, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useCertificates } from "@/hooks/useCertificates";
import type { Certificate } from "@/types/certificate";

const AdminCertificates = () => {
  const { data: certificates = [], isLoading, refetch } = useCertificates();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCertificates = certificates.filter((cert: Certificate) => 
    cert.subject_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.issuer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.serial_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "VALID":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Valid
          </Badge>
        );
      case "EXPIRED":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Kedaluwarsa
          </Badge>
        );
      case "REVOKED":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Dicabut
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <RefreshCw className="w-3 h-3 mr-1" />
            Menunggu
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Memuat sertifikat...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Manajemen Sertifikat ({filteredCertificates.length})
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Sertifikat
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Kelola sertifikat digital untuk verifikasi dokumen
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari berdasarkan nama subjek, penerbit, atau serial number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Subjek</TableHead>
                <TableHead>Penerbit</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Berlaku Hingga</TableHead>
                <TableHead>Dibuat</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center text-gray-500">
                      <Shield className="w-12 h-12 mb-2 opacity-50" />
                      <p>Tidak ada sertifikat ditemukan</p>
                      {searchTerm && (
                        <p className="text-sm">Coba ubah kata kunci pencarian</p>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCertificates.map((cert: Certificate) => (
                  <TableRow key={cert.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{cert.subject_name}</div>
                        {cert.common_name && (
                          <div className="text-sm text-gray-500">{cert.common_name}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {cert.issuer_name || "Unknown"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {cert.serial_number}
                      </code>
                    </TableCell>
                    <TableCell>{getStatusBadge(cert.status)}</TableCell>
                    <TableCell>
                      {cert.valid_until ? (
                        <div className={`text-sm ${
                          new Date(cert.valid_until) < new Date() 
                            ? 'text-red-600 font-medium' 
                            : 'text-gray-600'
                        }`}>
                          {formatDate(cert.valid_until)}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {formatDate(cert.created_at)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" title="Lihat Detail">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" title="Unduh Sertifikat">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" title="Hapus">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCertificates;
