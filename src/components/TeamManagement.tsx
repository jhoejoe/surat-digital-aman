
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Plus, UserPlus, Trash2, Crown, Shield, User, AlertCircle } from "lucide-react";
import { useTeams, useCreateTeam, useInviteTeamMember, useRemoveTeamMember, useUpdateMemberRole } from "@/hooks/useTeams";
import { useToast } from "@/hooks/use-toast";

const TeamManagement = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDescription, setNewTeamDescription] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");

  const { data: teams = [], isLoading, error } = useTeams();
  const createTeam = useCreateTeam();
  const inviteTeamMember = useInviteTeamMember();
  const removeTeamMember = useRemoveTeamMember();
  const updateMemberRole = useUpdateMemberRole();
  const { toast } = useToast();

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) {
      toast({
        title: "Error",
        description: "Nama tim harus diisi",
        variant: "destructive"
      });
      return;
    }

    try {
      await createTeam.mutateAsync({
        name: newTeamName.trim(),
        description: newTeamDescription.trim() || undefined
      });
      setNewTeamName("");
      setNewTeamDescription("");
      setIsCreateOpen(false);
      toast({
        title: "Tim berhasil dibuat",
        description: "Tim baru telah ditambahkan ke sistem",
      });
    } catch (error: any) {
      toast({
        title: "Gagal membuat tim",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeamId || !inviteEmail.trim()) {
      toast({
        title: "Error",
        description: "Email harus diisi",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteEmail.trim())) {
      toast({
        title: "Error",
        description: "Format email tidak valid",
        variant: "destructive"
      });
      return;
    }

    try {
      await inviteTeamMember.mutateAsync({
        teamId: selectedTeamId,
        email: inviteEmail.trim().toLowerCase(),
        role: inviteRole
      });
      setInviteEmail("");
      setInviteRole("member");
      setIsInviteOpen(false);
      toast({
        title: "Undangan berhasil dikirim",
        description: `Undangan telah dikirim ke ${inviteEmail}`,
      });
    } catch (error: any) {
      toast({
        title: "Gagal mengirim undangan",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleRemoveMember = async (memberId: string, memberName: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus ${memberName} dari tim?`)) {
      return;
    }

    try {
      await removeTeamMember.mutateAsync({ memberId });
      toast({
        title: "Anggota dihapus",
        description: `${memberName} telah dihapus dari tim`,
      });
    } catch (error: any) {
      toast({
        title: "Gagal menghapus anggota",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleUpdateRole = async (memberId: string, newRole: string, memberName: string) => {
    try {
      await updateMemberRole.mutateAsync({ memberId, role: newRole });
      toast({
        title: "Peran berhasil diperbarui",
        description: `Peran ${memberName} telah diubah menjadi ${newRole}`,
      });
    } catch (error: any) {
      toast({
        title: "Gagal memperbarui peran",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="w-4 h-4 text-yellow-600" />;
      case "admin":
        return <Shield className="w-4 h-4 text-blue-600" />;
      default:
        return <User className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "owner":
        return <Badge className="bg-yellow-100 text-yellow-800">Owner</Badge>;
      case "admin":
        return <Badge className="bg-blue-100 text-blue-800">Admin</Badge>;
      default:
        return <Badge variant="secondary">Member</Badge>;
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "owner":
        return "Pemilik";
      case "admin":
        return "Administrator";
      default:
        return "Anggota";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat data tim...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Gagal memuat data tim: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Manajemen Tim ({teams.length})
              </CardTitle>
              <CardDescription>
                Kelola tim dan anggota dalam organisasi
              </CardDescription>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Tim Baru
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Buat Tim Baru</DialogTitle>
                  <DialogDescription>
                    Buat tim baru untuk mengorganisir anggota dalam proyek
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateTeam} className="space-y-4">
                  <div>
                    <Label htmlFor="teamName">Nama Tim *</Label>
                    <Input
                      id="teamName"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      placeholder="Masukkan nama tim"
                      maxLength={100}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="teamDescription">Deskripsi (Opsional)</Label>
                    <Input
                      id="teamDescription"
                      value={newTeamDescription}
                      onChange={(e) => setNewTeamDescription(e.target.value)}
                      placeholder="Deskripsi tim"
                      maxLength={255}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                      Batal
                    </Button>
                    <Button type="submit" disabled={createTeam.isPending}>
                      {createTeam.isPending ? "Membuat..." : "Buat Tim"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {teams.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada tim</h3>
                <p className="text-gray-500 mb-4">Buat tim pertama Anda untuk mulai berkolaborasi</p>
                <Button onClick={() => setIsCreateOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Tim Pertama
                </Button>
              </div>
            ) : (
              teams.map((team) => (
                <Card key={team.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{team.name}</CardTitle>
                        {team.description && (
                          <CardDescription>{team.description}</CardDescription>
                        )}
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          {team.team_members?.length || 0} anggota
                        </div>
                      </div>
                      <Dialog open={isInviteOpen && selectedTeamId === team.id} onOpenChange={(open) => {
                        setIsInviteOpen(open);
                        if (!open) setSelectedTeamId("");
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTeamId(team.id)}
                          >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Undang Anggota
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Undang Anggota Tim</DialogTitle>
                            <DialogDescription>
                              Kirim undangan untuk bergabung dengan tim {team.name}
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleInviteMember} className="space-y-4">
                            <div>
                              <Label htmlFor="inviteEmail">Email *</Label>
                              <Input
                                id="inviteEmail"
                                type="email"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                placeholder="email@contoh.com"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="inviteRole">Peran</Label>
                              <Select value={inviteRole} onValueChange={setInviteRole}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="member">Anggota</SelectItem>
                                  <SelectItem value="admin">Administrator</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button type="button" variant="outline" onClick={() => setIsInviteOpen(false)}>
                                Batal
                              </Button>
                              <Button type="submit" disabled={inviteTeamMember.isPending}>
                                {inviteTeamMember.isPending ? "Mengirim..." : "Kirim Undangan"}
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {team.team_members && team.team_members.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Anggota</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Peran</TableHead>
                            <TableHead>Bergabung</TableHead>
                            <TableHead>Aksi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {team.team_members.map((member) => (
                            <TableRow key={member.id}>
                              <TableCell>
                                <div className="flex items-center">
                                  {getRoleIcon(member.role)}
                                  <span className="ml-2">
                                    {member.profiles?.full_name || "Nama tidak tersedia"}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>{member.profiles?.email || "Email tidak tersedia"}</TableCell>
                              <TableCell>{getRoleBadge(member.role)}</TableCell>
                              <TableCell>
                                {member.joined_at 
                                  ? new Date(member.joined_at).toLocaleDateString('id-ID')
                                  : "Tidak diketahui"
                                }
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  {member.role !== "owner" && (
                                    <>
                                      <Select
                                        value={member.role}
                                        onValueChange={(newRole) => 
                                          handleUpdateRole(member.id, newRole, member.profiles?.full_name || "User")
                                        }
                                        disabled={updateMemberRole.isPending}
                                      >
                                        <SelectTrigger className="w-32">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="member">Anggota</SelectItem>
                                          <SelectItem value="admin">Admin</SelectItem>
                                          <SelectItem value="owner">Pemilik</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => 
                                          handleRemoveMember(member.id, member.profiles?.full_name || "User")
                                        }
                                        disabled={removeTeamMember.isPending}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p>Belum ada anggota dalam tim ini</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;
