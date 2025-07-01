
import { Badge } from "@/components/ui/badge";

interface DocumentStatusBadgeProps {
  status: string;
}

const DocumentStatusBadge = ({ status }: DocumentStatusBadgeProps) => {
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

export default DocumentStatusBadge;
