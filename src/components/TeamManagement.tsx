import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Plus, UserPlus, Trash2, Crown, Shield, User } from "lucide-react";
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

  const { data: teams = [], isLoading } = useTeams();
  const createTeam = useCreateTeam();
  const inviteTeamMember = useInviteTeamMember();
  const removeTeamMember = useRemoveTeamMember();
  const updateMemberRole = useUpdateMemberRole();
  const { toast } = useToast();

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTeam.mutateAsync({
        name: newTeamName,
        description: newTeamDescription
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
    if (!selectedTeamId) return;

    try {
      await inviteTeamMember.mutateAsync({
        teamId: selectedTeamId,
        email: inviteEmail,
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

  if (isLoading) {
    return <div>Loading...</div>;
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
                    <Label htmlFor="teamName">Nama Tim</Label>
                    <Input
                      id="teamName"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      placeholder="Masukkan nama tim"
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
            {teams.map((team) => (
              <Card key={team.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      {team.description && (
                        <CardDescription>{team.description}</CardDescription>
                      )}
                    </div>
                    <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
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
                            <Label htmlFor="inviteEmail">Email</Label>
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
                                <SelectItem value="member">Member</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
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
                      {team.team_members?.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center">
                              {getRoleIcon(member.role)}
                              <span className="ml-2">
                                {member.profiles?.full_name || "Nama tidak tersedia"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{member.profiles?.email}</TableCell>
                          <TableCell>{getRoleBadge(member.role)}</TableCell>
                          <TableCell>
                            {new Date(member.joined_at || member.created_at).toLocaleDateString('id-ID')}
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
                                  >
                                    <SelectTrigger className="w-24">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="member">Member</SelectItem>
                                      <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => 
                                      handleRemoveMember(member.id, member.profiles?.full_name || "User")
                                    }
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
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;
