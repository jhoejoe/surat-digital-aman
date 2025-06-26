
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, FileText, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useDocuments, useUpdateDocumentStatus } from "@/hooks/useDocuments";
import { useProfiles, useUpdateProfile } from "@/hooks/useProfiles";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { profile, user } = useAuth();
  const { toast } = useToast();
  const { data: documents, isLoading: documentsLoading } = useDocuments();
  const { data: profiles, isLoading: profilesLoading } = useProfiles();
  const updateDocumentStatus = useUpdateDocumentStatus();
  const updateProfile = useUpdateProfile();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    if (profile && profile.role !== 'admin') {
      toast({
        title: "Akses Ditolak",
        description: "Anda tidak memiliki akses ke halaman admin.",
        variant: "destructive"
      });
      navigate("/");
      return;
    }
  }, [user, profile, navigate, toast]);

  const handleStatusChange = async (documentId: string, newStatus: string) => {
    try {
      await updateDocumentStatus.mutateAsync({ id: documentId, status: newStatus });
      toast({
        title: "Status Berhasil Diperbarui",
        description: "Status dokumen telah diperbarui.",
      });
    } catch (error) {
      toast({
        title: "Gagal Memperbarui Status",
        description: "Terjadi kesalahan saat memperbarui status.",
        variant: "destructive"
      });
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateProfile.mutateAsync({ id: userId, role: newRole });
      toast({
        title: "Role Berhasil Diperbarui",
        description: "Role pengguna telah diperbarui.",
      });
    } catch (error) {
      toast({
        title: "Gagal Memperbarui Role",
        description: "Terjadi kesalahan saat memperbarui role.",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'PENDING': { variant: 'secondary', label: 'Pending' },
      'PROCESSING': { variant: 'default', label: 'Processing' },
      'COMPLETED': { variant: 'success', label: 'Completed' },
      'REJECTED': { variant: 'destructive', label: 'Rejected' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || { variant: 'secondary', label: status };
    return <Badge variant={statusInfo.variant as any}>{statusInfo.label}</Badge>;
  };

  if (!profile || profile.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Administrator
          </h1>
          <p className="text-gray-600">
            Kelola dokumen dan pengguna sistem
          </p>
        </div>

        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Dokumen
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Pengguna
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Dokumen</CardTitle>
                <CardDescription>
                  Kelola semua dokumen yang dikirim pengguna
                </CardDescription>
              </CardHeader>
              <CardContent>
                {documentsLoading ? (
                  <div className="text-center py-8">Memuat data...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama File</TableHead>
                          <TableHead>Penerima</TableHead>
                          <TableHead>Subjek</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Tanggal</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {documents?.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell className="font-medium">{doc.file_name}</TableCell>
                            <TableCell>{doc.recipient}</TableCell>
                            <TableCell>{doc.subject}</TableCell>
                            <TableCell>{getStatusBadge(doc.status)}</TableCell>
                            <TableCell>
                              {new Date(doc.created_at).toLocaleDateString('id-ID')}
                            </TableCell>
                            <TableCell>
                              <Select
                                value={doc.status}
                                onValueChange={(value) => handleStatusChange(doc.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="PENDING">Pending</SelectItem>
                                  <SelectItem value="PROCESSING">Processing</SelectItem>
                                  <SelectItem value="COMPLETED">Completed</SelectItem>
                                  <SelectItem value="REJECTED">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Pengguna</CardTitle>
                <CardDescription>
                  Kelola pengguna dan role mereka
                </CardDescription>
              </CardHeader>
              <CardContent>
                {profilesLoading ? (
                  <div className="text-center py-8">Memuat data...</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Tanggal Daftar</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {profiles?.map((profile) => (
                          <TableRow key={profile.id}>
                            <TableCell className="font-medium">
                              {profile.full_name || 'Tidak ada nama'}
                            </TableCell>
                            <TableCell>{profile.email}</TableCell>
                            <TableCell>
                              <Badge variant={profile.role === 'admin' ? 'default' : 'secondary'}>
                                {profile.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(profile.created_at).toLocaleDateString('id-ID')}
                            </TableCell>
                            <TableCell>
                              <Select
                                value={profile.role}
                                onValueChange={(value) => handleRoleChange(profile.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="user">User</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
