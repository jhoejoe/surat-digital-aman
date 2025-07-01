
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Crown, Shield, User, Trash2 } from "lucide-react";
import { useRemoveTeamMember, useUpdateMemberRole } from "@/hooks/useTeams";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: string;
  role: string;
  joined_at: string;
  user_id: string;
  profiles: {
    id: string;
    full_name: string | null;
    email: string;
  } | null;
}

interface TeamMemberListProps {
  members: TeamMember[];
  onMemberRemoved?: () => void;
}

const TeamMemberList = ({ members, onMemberRemoved }: TeamMemberListProps) => {
  const removeTeamMember = useRemoveTeamMember();
  const updateMemberRole = useUpdateMemberRole();
  const { toast } = useToast();

  const handleRemoveMember = async (memberId: string, memberName: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus ${memberName} dari tim?`)) {
      return;
    }

    try {
      await removeTeamMember.mutateAsync({ memberId });
      onMemberRemoved?.();
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

  if (!members || members.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p>Belum ada anggota dalam tim ini</p>
      </div>
    );
  }

  return (
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
        {members.map((member) => (
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
  );
};

export default TeamMemberList;
