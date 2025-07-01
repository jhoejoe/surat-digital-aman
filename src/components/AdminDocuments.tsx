
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Eye, Download, Trash2, AlertCircle } from "lucide-react";
import { useDocuments, useUpdateDocument, useDeleteDocument } from "@/hooks/useDocuments";
import { useToast } from "@/hooks/use-toast";
import { logActivity } from "@/hooks/useAuditTrail";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const AdminDocuments = () => {
  const { data: documents = [], isLoading } = useDocuments();
  const updateDocument = useUpdateDocument();
  const deleteDocument = useDeleteDocument();
  const { toast } = useToast();
  const [processingDocuments, setProcessingDocuments] = useState<Set<string>>(new Set());
  const [viewingDocument, setViewingDocument] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <Badge className="bg-green-100 text-green-800">Selesai</Badge>;
      case "PROCESSING":
        return <Badge className="bg-blue-100 text-blue-800">Diproses</Badge>;
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-800">Menunggu</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">Ditolak</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleStatusChange = async (documentId: string, newStatus: string, currentFileName: string) => {
    try {
      setProcessingDocuments(prev => new Set(prev).add(documentId));
      
      await updateDocument.mutateAsync({
        id: documentId,
        status: newStatus
      });

      // Log the activity
      await logActivity(
        "UPDATE_DOCUMENT_STATUS",
        "DOCUMENT",
        documentId,
        `Status dokumen '${currentFileName}' diubah menjadi ${newStatus}`
      );

      toast({
        title: "Berhasil",
        description: `Status dokumen berhasil diubah menjadi ${newStatus}`
      });
    } catch (error) {
      console.error("Error updating document status:", error);
      toast({
        title: "Error",
        description: "Gagal mengubah status dokumen",
        variant: "destructive"
      });
    } finally {
      setProcessingDocuments(prev => {
        const newSet = new Set(prev);
        newSet.delete(documentId);
        return newSet;
      });
    }
  };

  const handleViewDocument = async (document: any) => {
    try {
      setViewingDocument(document);
      setIsViewDialogOpen(true);
      
      // Log the activity
      await logActivity(
        "VIEW_DOCUMENT",
        "DOCUMENT",
        document.id,
        `Melihat detail dokumen '${document.file_name}'`
      );
    } catch (error) {
      console.error("Error viewing document:", error);
      toast({
        title: "Error",
        description: "Gagal melihat detail dokumen",
        variant: "destructive"
      });
    }
  };

  const handleDownloadDocument = async (document: any) => {
    try {
      // In a real implementation, you would download the file from storage
      // For now, we'll just show a notification and log the activity
      
      await logActivity(
        "DOWNLOAD_DOCUMENT",
        "DOCUMENT",
        document.id,
        `Mengunduh dokumen '${document.file_name}'`
      );

      toast({
        title: "Download",
        description: `Dokumen ${document.file_name} siap diunduh`,
      });

      // Here you would implement actual file download logic
      // For example: window.open(fileUrl, '_blank');
      
    } catch (error) {
      console.error("Error downloading document:", error);
      toast({
        title: "Error",
        description: "Gagal mengunduh dokumen",
        variant: "destructive"
      });
    }
  };

  const handleDeleteDocument = async (documentId: string, fileName: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus dokumen "${fileName}"?`)) {
      return;
    }

    try {
      await deleteDocument.mutateAsync(documentId);

      // Log the activity
      await logActivity(
        "DELETE_DOCUMENT",
        "DOCUMENT",
        documentId,
        `Dokumen '${fileName}' berhasil dihapus`
      );

      toast({
        title: "Berhasil",
        description: "Dokumen berhasil dihapus"
      });
    } catch (error) {
      console.error("Error deleting document:", error);
      toast({
        title: "Error",
        description: "Gagal menghapus dokumen",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Semua Dokumen ({documents.length})
          </CardTitle>
          <CardDescription>
            Kelola dan monitor semua dokumen yang dikirim pengguna
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama File</TableHead>
                <TableHead>Ticket Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Kirim</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{doc.file_name}</div>
                      <div className="text-sm text-gray-500">
                        {doc.subject && `Subjek: ${doc.subject}`}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {doc.ticket_number}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(doc.status)}
                      {doc.status === "PENDING" && (
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(doc.id, "PROCESSING", doc.file_name)}
                            disabled={processingDocuments.has(doc.id)}
                          >
                            Proses
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(doc.id, "COMPLETED", doc.file_name)}
                            disabled={processingDocuments.has(doc.id)}
                          >
                            Selesai
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusChange(doc.id, "REJECTED", doc.file_name)}
                            disabled={processingDocuments.has(doc.id)}
                          >
                            Tolak
                          </Button>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(doc.created_at).toLocaleDateString('id-ID')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        title="Lihat Detail"
                        onClick={() => handleViewDocument(doc)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        title="Unduh"
                        onClick={() => handleDownloadDocument(doc)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        title="Hapus"
                        onClick={() => handleDeleteDocument(doc.id, doc.file_name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Document Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Dokumen</DialogTitle>
            <DialogDescription>
              Informasi lengkap tentang dokumen yang dipilih
            </DialogDescription>
          </DialogHeader>
          {viewingDocument && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nama File</label>
                  <p className="text-sm">{viewingDocument.file_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Ticket Number</label>
                  <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    {viewingDocument.ticket_number}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">
                    {getStatusBadge(viewingDocument.status)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Ukuran File</label>
                  <p className="text-sm">{(viewingDocument.file_size / 1024).toFixed(2)} KB</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Subjek</label>
                  <p className="text-sm">{viewingDocument.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Penerima</label>
                  <p className="text-sm">{viewingDocument.recipient}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">Pesan</label>
                  <p className="text-sm">{viewingDocument.message || 'Tidak ada pesan'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Tanggal Dibuat</label>
                  <p className="text-sm">
                    {new Date(viewingDocument.created_at).toLocaleString('id-ID')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Terakhir Diupdate</label>
                  <p className="text-sm">
                    {new Date(viewingDocument.updated_at).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <label className="text-sm font-medium text-gray-500">QR Code</label>
                <div className="mt-2 p-4 bg-gray-50 rounded">
                  <p className="text-xs font-mono break-all">{viewingDocument.qr_code}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDocuments;
