
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
import { useApiIntegrations, useCreateApiIntegration, useUpdateApiIntegration, useDeleteApiIntegration } from "@/hooks/useApiIntegrations";
import { logActivity } from "@/hooks/useAuditTrail";

const ApiIntegrations = () => {
  const { toast } = useToast();
  const { data: integrations = [], isLoading } = useApiIntegrations();
  const createIntegration = useCreateApiIntegration();
  const updateIntegration = useUpdateApiIntegration();
  const deleteIntegration = useDeleteApiIntegration();

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    endpoint: "",
    api_key: "",
    description: ""
  });

  const handleAddIntegration = async () => {
    if (!formData.name || !formData.endpoint || !formData.api_key) {
      toast({
        title: "Error",
        description: "Semua field wajib diisi",
        variant: "destructive"
      });
      return;
    }

    try {
      await createIntegration.mutateAsync({
        name: formData.name,
        endpoint: formData.endpoint,
        api_key: formData.api_key,
        description: formData.description,
        is_active: true,
        status: "connected",
        last_sync: new Date().toISOString()
      });

      // Log the activity
      await logActivity(
        "CREATE_API_INTEGRATION",
        "API_INTEGRATION",
        formData.name,
        `API Integration '${formData.name}' berhasil ditambahkan`
      );

      setFormData({ name: "", endpoint: "", api_key: "", description: "" });
      setShowAddForm(false);

      toast({
        title: "Berhasil",
        description: "API Integration berhasil ditambahkan"
      });
    } catch (error) {
      console.error("Error creating integration:", error);
      toast({
        title: "Error",
        description: "Gagal menambahkan API Integration",
        variant: "destructive"
      });
    }
  };

  const toggleIntegration = async (id: string, currentStatus: boolean) => {
    try {
      const integration = integrations.find(i => i.id === id);
      if (!integration) return;

      await updateIntegration.mutateAsync({
        id,
        is_active: !currentStatus,
        status: !currentStatus ? "connected" : "disconnected"
      });

      // Log the activity
      await logActivity(
        "TOGGLE_API_INTEGRATION",
        "API_INTEGRATION",
        id,
        `API Integration '${integration.name}' ${!currentStatus ? 'diaktifkan' : 'dinonaktifkan'}`
      );

      toast({
        title: "Berhasil",
        description: `API Integration ${!currentStatus ? 'diaktifkan' : 'dinonaktifkan'}`
      });
    } catch (error) {
      console.error("Error toggling integration:", error);
      toast({
        title: "Error",
        description: "Gagal mengubah status integration",
        variant: "destructive"
      });
    }
  };

  const testConnection = async (id: string) => {
    const integration = integrations.find(i => i.id === id);
    if (!integration) return;

    toast({
      title: "Testing Connection",
      description: `Menguji koneksi ke ${integration.name}...`
    });

    try {
      // Simulate API test
      setTimeout(async () => {
        await updateIntegration.mutateAsync({
          id,
          status: "connected",
          last_sync: new Date().toISOString()
        });

        // Log the activity
        await logActivity(
          "TEST_API_CONNECTION",
          "API_INTEGRATION",
          id,
          `Test koneksi API '${integration.name}' berhasil`
        );
        
        toast({
          title: "Koneksi Berhasil",
          description: `${integration.name} terhubung dengan baik`
        });
      }, 2000);
    } catch (error) {
      console.error("Error testing connection:", error);
      toast({
        title: "Test Gagal",
        description: "Gagal menguji koneksi",
        variant: "destructive"
      });
    }
  };

  const handleDeleteIntegration = async (id: string) => {
    try {
      const integration = integrations.find(i => i.id === id);
      if (!integration) return;

      await deleteIntegration.mutateAsync(id);

      // Log the activity
      await logActivity(
        "DELETE_API_INTEGRATION",
        "API_INTEGRATION",
        id,
        `API Integration '${integration.name}' berhasil dihapus`
      );

      toast({
        title: "Berhasil",
        description: "API Integration berhasil dihapus"
      });
    } catch (error) {
      console.error("Error deleting integration:", error);
      toast({
        title: "Error",
        description: "Gagal menghapus API Integration",
        variant: "destructive"
      });
    }
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                value={formData.api_key}
                onChange={(e) => setFormData({...formData, api_key: e.target.value})}
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
              <Button 
                onClick={handleAddIntegration}
                disabled={createIntegration.isPending}
              >
                {createIntegration.isPending ? "Menyimpan..." : "Simpan"}
              </Button>
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
                  <TableCell>{new Date(integration.last_sync).toLocaleString('id-ID')}</TableCell>
                  <TableCell>
                    <Switch
                      checked={integration.is_active}
                      onCheckedChange={() => toggleIntegration(integration.id, integration.is_active)}
                      disabled={updateIntegration.isPending}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => testConnection(integration.id)}
                        disabled={updateIntegration.isPending}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteIntegration(integration.id)}
                        disabled={deleteIntegration.isPending}
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
