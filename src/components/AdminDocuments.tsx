
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Eye, Download, Trash2, Edit } from "lucide-react";
import { useDocuments, useUpdateDocument, useDeleteDocument } from "@/hooks/useDocuments";
import { useToast } from "@/hooks/use-toast";
import { logActivity } from "@/hooks/useAuditTrail";
import { useState } from "react";

const AdminDocuments = () => {
  const { data: documents = [], isLoading } = useDocuments();
  const updateDocument = useUpdateDocument();
  const deleteDocument = useDeleteDocument();
  const { toast } = useToast();
  const [processingDocuments, setProcessingDocuments] = useState<Set<string>>(new Set());

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
    return <div>Loading...</div>;
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
                <TableHead>Pengirim</TableHead>
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
                  <TableCell>{doc.user_id}</TableCell>
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
                      <Button size="sm" variant="outline" title="Lihat Detail">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" title="Unduh">
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
    </div>
  );
};

export default AdminDocuments;
