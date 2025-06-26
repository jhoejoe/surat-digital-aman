
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Search, Filter, Download, Eye, User, FileText, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId: string;
  ipAddress: string;
  userAgent: string;
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
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockLogs: AuditLog[] = [
      {
        id: "1",
        timestamp: "2025-06-26T10:30:00Z",
        userId: "user-123",
        userName: "Admin User",
        action: "LOGIN",
        resource: "AUTH",
        resourceId: "session-456",
        ipAddress: "103.131.61.5",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        status: "success",
        details: "User berhasil login ke sistem"
      },
      {
        id: "2",
        timestamp: "2025-06-26T10:25:00Z",
        userId: "user-123",
        userName: "Admin User",
        action: "CREATE_DOCUMENT",
        resource: "DOCUMENT",
        resourceId: "doc-789",
        ipAddress: "103.131.61.5",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        status: "success",
        details: "Dokumen 'Kontrak Kerja.pdf' berhasil dibuat",
        changes: [
          { field: "file_name", oldValue: "", newValue: "Kontrak Kerja.pdf" },
          { field: "status", oldValue: "", newValue: "PENDING" }
        ]
      },
      {
        id: "3",
        timestamp: "2025-06-26T10:20:00Z",
        userId: "user-456",
        userName: "John Doe",
        action: "VERIFY_DOCUMENT",
        resource: "DOCUMENT",
        resourceId: "doc-123",
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        status: "success",
        details: "Dokumen berhasil diverifikasi"
      },
      {
        id: "4",
        timestamp: "2025-06-26T10:15:00Z",
        userId: "user-789",
        userName: "Jane Smith",
        action: "FAILED_LOGIN",
        resource: "AUTH",
        resourceId: "session-fail-1",
        ipAddress: "203.192.1.50",
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
        status: "failed",
        details: "Login gagal - password salah"
      },
      {
        id: "5",
        timestamp: "2025-06-26T10:10:00Z",
        userId: "user-123",
        userName: "Admin User",
        action: "UPDATE_SETTINGS",
        resource: "SYSTEM",
        resourceId: "settings-1",
        ipAddress: "103.131.61.5",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        status: "success",
        details: "Pengaturan sistem diperbarui",
        changes: [
          { field: "max_file_size", oldValue: "5MB", newValue: "10MB" },
          { field: "allowed_extensions", oldValue: "pdf", newValue: "pdf,docx" }
        ]
      }
    ];
    
    setAuditLogs(mockLogs);
    setFilteredLogs(mockLogs);
  }, []);

  // Filter logs based on search and filters
  useEffect(() => {
    let filtered = auditLogs;

    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ipAddress.includes(searchTerm)
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
        log.userName,
        log.action,
        log.resource,
        log.status,
        log.ipAddress,
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
                      {log.userName}
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
                  <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
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
                <p>{selectedLog.userName} ({selectedLog.userId})</p>
              </div>
              <div>
                <strong>IP Address:</strong>
                <p className="font-mono text-sm">{selectedLog.ipAddress}</p>
              </div>
              <div>
                <strong>Action:</strong>
                <p>{selectedLog.action}</p>
              </div>
              <div>
                <strong>Resource:</strong>
                <p>{selectedLog.resource} ({selectedLog.resourceId})</p>
              </div>
            </div>
            
            <div>
              <strong>User Agent:</strong>
              <p className="text-sm text-gray-600 break-all">{selectedLog.userAgent}</p>
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
