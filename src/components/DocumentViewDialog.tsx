
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DocumentStatusBadge from "./DocumentStatusBadge";

interface DocumentViewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  document: any;
}

const DocumentViewDialog = ({ isOpen, onOpenChange, document }: DocumentViewDialogProps) => {
  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Dokumen</DialogTitle>
          <DialogDescription>
            Informasi lengkap tentang dokumen yang dipilih
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Nama File</label>
              <p className="text-sm">{document.file_name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Ticket Number</label>
              <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                {document.ticket_number}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <div className="mt-1">
                <DocumentStatusBadge status={document.status} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Ukuran File</label>
              <p className="text-sm">{(document.file_size / 1024).toFixed(2)} KB</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Subjek</label>
              <p className="text-sm">{document.subject}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Penerima</label>
              <p className="text-sm">{document.recipient}</p>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-500">Pesan</label>
              <p className="text-sm">{document.message || 'Tidak ada pesan'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Tanggal Dibuat</label>
              <p className="text-sm">
                {new Date(document.created_at).toLocaleString('id-ID')}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Terakhir Diupdate</label>
              <p className="text-sm">
                {new Date(document.updated_at).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
          <div className="pt-4 border-t">
            <label className="text-sm font-medium text-gray-500">QR Code</label>
            <div className="mt-2 p-4 bg-gray-50 rounded">
              <p className="text-xs font-mono break-all">{document.qr_code}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewDialog;
