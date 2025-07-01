
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DocumentStatusBadge from "./DocumentStatusBadge";
import DocumentStatusActions from "./DocumentStatusActions";
import DocumentActionButtons from "./DocumentActionButtons";

interface DocumentTableProps {
  documents: any[];
  processingDocuments: Set<string>;
  onStatusChange: (documentId: string, newStatus: string, fileName: string) => void;
  onViewDocument: (document: any) => void;
  onDownloadDocument: (document: any) => void;
  onDeleteDocument: (documentId: string, fileName: string) => void;
}

const DocumentTable = ({ 
  documents, 
  processingDocuments, 
  onStatusChange, 
  onViewDocument, 
  onDownloadDocument, 
  onDeleteDocument 
}: DocumentTableProps) => {
  return (
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
                <DocumentStatusBadge status={doc.status} />
                <DocumentStatusActions 
                  document={doc}
                  processingDocuments={processingDocuments}
                  onStatusChange={onStatusChange}
                />
              </div>
            </TableCell>
            <TableCell>
              {new Date(doc.created_at).toLocaleDateString('id-ID')}
            </TableCell>
            <TableCell>
              <DocumentActionButtons 
                document={doc}
                onView={onViewDocument}
                onDownload={onDownloadDocument}
                onDelete={onDeleteDocument}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DocumentTable;
