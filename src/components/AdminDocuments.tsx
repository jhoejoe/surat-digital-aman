
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useDocuments, useUpdateDocument, useDeleteDocument } from "@/hooks/useDocuments";
import { useToast } from "@/hooks/use-toast";
import { logActivity } from "@/hooks/useAuditTrail";
import { useState } from "react";
import DocumentTable from "./DocumentTable";
import DocumentViewDialog from "./DocumentViewDialog";

const AdminDocuments = () => {
  const { data: documents = [], isLoading } = useDocuments();
  const updateDocument = useUpdateDocument();
  const deleteDocument = useDeleteDocument();
  const { toast } = useToast();
  const [processingDocuments, setProcessingDocuments] = useState<Set<string>>(new Set());
  const [viewingDocument, setViewingDocument] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleStatusChange = async (documentId: string, newStatus: string, currentFileName: string) => {
    try {
      setProcessingDocuments(prev => new Set(prev).add(documentId));
      
      await updateDocument.mutateAsync({
        id: documentId,
        status: newStatus
      });

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
          <DocumentTable 
            documents={documents}
            processingDocuments={processingDocuments}
            onStatusChange={handleStatusChange}
            onViewDocument={handleViewDocument}
            onDownloadDocument={handleDownloadDocument}
            onDeleteDocument={handleDeleteDocument}
          />
        </CardContent>
      </Card>

      <DocumentViewDialog 
        isOpen={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        document={viewingDocument}
      />
    </div>
  );
};

export default AdminDocuments;
