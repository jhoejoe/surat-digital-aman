
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Search, Filter, Download, Eye, User, FileText, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuditLogs } from "@/hooks/useAuditTrail";

interface AuditLog {
  id: string;
  timestamp: string;
  user_id: string;
  user_name: string;
  action: string;
  resource: string;
  resource_id: string;
  ip_address: string;
  user_agent: string;
  status: "success" | "failed" | "warning";
  details: string;
  changes?: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
}

const AuditTrail = () => {
  const { toast } = useToast();
  const { data: auditLogs = [], isLoading } = useAuditLogs();
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Filter logs based on search and filters
  useEffect(() => {
    let filtered = auditLogs;

    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ip_address.includes(searchTerm)
      );
    }

    if (actionFilter !== "all") {
      filtered = filtered.filter(log => log.action === actionFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(log => log.status === statusFilter);
    }

    setFilteredLogs(filtered);
  }, [searchTerm, actionFilter, statusFilter, auditLogs]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Berhasil</Badge>;
      case "failed":
        return <Badge variant="destructive">Gagal</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Peringatan</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "LOGIN":
      case "LOGOUT":
      case "FAILED_LOGIN":
        return <User className="w-4 h-4" />;
      case "CREATE_DOCUMENT":
      case "UPDATE_DOCUMENT":
      case "DELETE_DOCUMENT":
      case "VERIFY_DOCUMENT":
        return <FileText className="w-4 h-4" />;
      case "UPDATE_SETTINGS":
      case "CHANGE_PERMISSIONS":
      case "CREATE_API_INTEGRATION":
      case "DELETE_API_INTEGRATION":
      case "TOGGLE_API_INTEGRATION":
      case "TEST_API_CONNECTION":
        return <Shield className="w-4 h-4" />;
      default:
        return <Eye className="w-4 h-4" />;
    }
  };

  const exportLogs = () => {
    const csvContent = [
      ["Timestamp", "User", "Action", "Resource", "Status", "IP Address", "Details"].join(","),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.user_name,
        log.action,
        log.resource,
        log.status,
        log.ip_address,
        `"${log.details}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-trail-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Berhasil",
      description: "Audit trail berhasil diekspor ke CSV"
    });
  };

  const viewDetails = (log: AuditLog) => {
    setSelectedLog(log);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Audit Trail</h2>
          <p className="text-gray-600">Log aktivitas sistem dan pengguna</p>
        </div>
        <Button onClick={exportLogs}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filter & Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Cari user, aksi, atau IP address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Aksi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Aksi</SelectItem>
                  <SelectItem value="LOGIN">Login</SelectItem>
                  <SelectItem value="LOGOUT">Logout</SelectItem>
                  <SelectItem value="CREATE_DOCUMENT">Buat Dokumen</SelectItem>
                  <SelectItem value="VERIFY_DOCUMENT">Verifikasi Dokumen</SelectItem>
                  <SelectItem value="CREATE_API_INTEGRATION">Buat API Integration</SelectItem>
                  <SelectItem value="DELETE_API_INTEGRATION">Hapus API Integration</SelectItem>
                  <SelectItem value="TOGGLE_API_INTEGRATION">Toggle API Integration</SelectItem>
                  <SelectItem value="TEST_API_CONNECTION">Test API Connection</SelectItem>
                  <SelectItem value="UPDATE_SETTINGS">Update Settings</SelectItem>
                  <SelectItem value="FAILED_LOGIN">Login Gagal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="success">Berhasil</SelectItem>
                  <SelectItem value="failed">Gagal</SelectItem>
                  <SelectItem value="warning">Peringatan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Log Aktivitas ({filteredLogs.length} entries)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Waktu</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Aksi</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    {new Date(log.timestamp).toLocaleString('id-ID')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      {log.user_name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getActionIcon(log.action)}
                      <span className="ml-2">{log.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>{log.resource}</TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell className="font-mono text-sm">{log.ip_address}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => viewDetails(log)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {selectedLog && (
        <Card className="fixed inset-0 z-50 m-4 max-w-2xl mx-auto my-8 overflow-auto">
          <CardHeader>
            <CardTitle>Detail Audit Log</CardTitle>
            <CardDescription>
              Informasi lengkap aktivitas sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Timestamp:</strong>
                <p className="font-mono text-sm">{new Date(selectedLog.timestamp).toLocaleString('id-ID')}</p>
              </div>
              <div>
                <strong>Status:</strong>
                <div className="mt-1">{getStatusBadge(selectedLog.status)}</div>
              </div>
              <div>
                <strong>User:</strong>
                <p>{selectedLog.user_name} ({selectedLog.user_id})</p>
              </div>
              <div>
                <strong>IP Address:</strong>
                <p className="font-mono text-sm">{selectedLog.ip_address}</p>
              </div>
              <div>
                <strong>Action:</strong>
                <p>{selectedLog.action}</p>
              </div>
              <div>
                <strong>Resource:</strong>
                <p>{selectedLog.resource} ({selectedLog.resource_id})</p>
              </div>
            </div>
            
            <div>
              <strong>User Agent:</strong>
              <p className="text-sm text-gray-600 break-all">{selectedLog.user_agent}</p>
            </div>
            
            <div>
              <strong>Details:</strong>
              <p>{selectedLog.details}</p>
            </div>

            {selectedLog.changes && selectedLog.changes.length > 0 && (
              <div>
                <strong>Perubahan Data:</strong>
                <div className="mt-2 space-y-2">
                  {selectedLog.changes.map((change, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded">
                      <div className="font-medium">{change.field}</div>
                      <div className="text-sm">
                        <span className="text-red-600">- {change.oldValue || "(kosong)"}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-green-600">+ {change.newValue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={() => setSelectedLog(null)}>Tutup</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AuditTrail;
