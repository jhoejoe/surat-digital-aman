
import { Button } from "@/components/ui/button";

interface DocumentStatusActionsProps {
  document: any;
  processingDocuments: Set<string>;
  onStatusChange: (documentId: string, newStatus: string, fileName: string) => void;
}

const DocumentStatusActions = ({ document, processingDocuments, onStatusChange }: DocumentStatusActionsProps) => {
  if (document.status !== "PENDING") {
    return null;
  }

  return (
    <div className="flex space-x-1">
      <Button
        size="sm"
        variant="outline"
        onClick={() => onStatusChange(document.id, "PROCESSING", document.file_name)}
        disabled={processingDocuments.has(document.id)}
      >
        Proses
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onStatusChange(document.id, "COMPLETED", document.file_name)}
        disabled={processingDocuments.has(document.id)}
      >
        Selesai
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => onStatusChange(document.id, "REJECTED", document.file_name)}
        disabled={processingDocuments.has(document.id)}
      >
        Tolak
      </Button>
    </div>
  );
};

export default DocumentStatusActions;
