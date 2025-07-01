
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { useInviteTeamMember } from "@/hooks/useTeams";
import { useToast } from "@/hooks/use-toast";

interface InviteMemberDialogProps {
  teamId: string;
  teamName: string;
  onMemberInvited?: () => void;
}

const InviteMemberDialog = ({ teamId, teamName, onMemberInvited }: InviteMemberDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");

  const inviteTeamMember = useInviteTeamMember();
  const { toast } = useToast();

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) {
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
        teamId,
        email: inviteEmail.trim().toLowerCase(),
        role: inviteRole
      });
      setInviteEmail("");
      setInviteRole("member");
      setIsOpen(false);
      onMemberInvited?.();
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPlus className="w-4 h-4 mr-2" />
          Undang Anggota
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Undang Anggota Tim</DialogTitle>
          <DialogDescription>
            Kirim undangan untuk bergabung dengan tim {teamName}
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
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={inviteTeamMember.isPending}>
              {inviteTeamMember.isPending ? "Mengirim..." : "Kirim Undangan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberDialog;
