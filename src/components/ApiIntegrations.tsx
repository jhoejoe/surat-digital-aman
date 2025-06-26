
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Key, Globe, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiIntegration {
  id: string;
  name: string;
  endpoint: string;
  apiKey: string;
  isActive: boolean;
  lastSync: string;
  status: "connected" | "disconnected" | "error";
  description?: string;
}

const ApiIntegrations = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<ApiIntegration[]>([
    {
      id: "1",
      name: "Privy Integration",
      endpoint: "https://api.privy.id/v1",
      apiKey: "pk_***************",
      isActive: true,
      lastSync: "2025-06-26T10:30:00Z",
      status: "connected",
      description: "Digital signature verification service"
    },
    {
      id: "2", 
      name: "Webhook Notifikasi",
      endpoint: "https://your-app.com/webhook",
      apiKey: "wh_***************",
      isActive: false,
      lastSync: "2025-06-25T15:20:00Z",
      status: "disconnected",
      description: "Real-time notification system"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    endpoint: "",
    apiKey: "",
    description: ""
  });

  const handleAddIntegration = () => {
    if (!formData.name || !formData.endpoint || !formData.apiKey) {
      toast({
        title: "Error",
        description: "Semua field wajib diisi",
        variant: "destructive"
      });
      return;
    }

    const newIntegration: ApiIntegration = {
      id: Date.now().toString(),
      name: formData.name,
      endpoint: formData.endpoint,
      apiKey: formData.apiKey,
      isActive: true,
      lastSync: new Date().toISOString(),
      status: "connected",
      description: formData.description
    };

    setIntegrations([...integrations, newIntegration]);
    setFormData({ name: "", endpoint: "", apiKey: "", description: "" });
    setShowAddForm(false);

    toast({
      title: "Berhasil",
      description: "API Integration berhasil ditambahkan"
    });
  };

  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(integration =>
      integration.id === id
        ? { 
            ...integration, 
            isActive: !integration.isActive,
            status: !integration.isActive ? "connected" : "disconnected"
          }
        : integration
    ));
  };

  const testConnection = (id: string) => {
    const integration = integrations.find(i => i.id === id);
    if (integration) {
      toast({
        title: "Testing Connection",
        description: `Menguji koneksi ke ${integration.name}...`
      });

      // Simulate API test
      setTimeout(() => {
        setIntegrations(integrations.map(i =>
          i.id === id
            ? { ...i, status: "connected", lastSync: new Date().toISOString() }
            : i
        ));
        
        toast({
          title: "Koneksi Berhasil",
          description: `${integration.name} terhubung dengan baik`
        });
      }, 2000);
    }
  };

  const deleteIntegration = (id: string) => {
    setIntegrations(integrations.filter(i => i.id !== id));
    toast({
      title: "Berhasil",
      description: "API Integration berhasil dihapus"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800">Terhubung</Badge>;
      case "disconnected":
        return <Badge variant="secondary">Terputus</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">API Integrations</h2>
          <p className="text-gray-600">Kelola integrasi API eksternal</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah API
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Tambah API Integration</CardTitle>
            <CardDescription>
              Konfigurasi koneksi ke API eksternal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nama Integration</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Contoh: Privy API"
              />
            </div>
            <div>
              <Label htmlFor="endpoint">Endpoint URL</Label>
              <Input
                id="endpoint"
                value={formData.endpoint}
                onChange={(e) => setFormData({...formData, endpoint: e.target.value})}
                placeholder="https://api.service.com/v1"
              />
            </div>
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={formData.apiKey}
                onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                placeholder="Masukkan API key"
              />
            </div>
            <div>
              <Label htmlFor="description">Deskripsi (Opsional)</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Deskripsi singkat tentang API ini"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddIntegration}>Simpan</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Daftar API Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sync Terakhir</TableHead>
                <TableHead>Aktif</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {integrations.map((integration) => (
                <TableRow key={integration.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{integration.name}</div>
                      {integration.description && (
                        <div className="text-sm text-gray-500">{integration.description}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{integration.endpoint}</TableCell>
                  <TableCell>{getStatusBadge(integration.status)}</TableCell>
                  <TableCell>{new Date(integration.lastSync).toLocaleString('id-ID')}</TableCell>
                  <TableCell>
                    <Switch
                      checked={integration.isActive}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => testConnection(integration.id)}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteIntegration(integration.id)}
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

export default ApiIntegrations;
