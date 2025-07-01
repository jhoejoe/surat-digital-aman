
import { Button } from "@/components/ui/button";
import { Eye, Download, Trash2 } from "lucide-react";

interface DocumentActionButtonsProps {
  document: any;
  onView: (document: any) => void;
  onDownload: (document: any) => void;
  onDelete: (documentId: string, fileName: string) => void;
}

const DocumentActionButtons = ({ document, onView, onDownload, onDelete }: DocumentActionButtonsProps) => {
  return (
    <div className="flex space-x-2">
      <Button 
        size="sm" 
        variant="outline" 
        title="Lihat Detail"
        onClick={() => onView(document)}
      >
        <Eye className="w-4 h-4" />
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        title="Unduh"
        onClick={() => onDownload(document)}
      >
        <Download className="w-4 h-4" />
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        title="Hapus"
        onClick={() => onDelete(document.id, document.file_name)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default DocumentActionButtons;
