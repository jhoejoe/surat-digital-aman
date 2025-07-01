
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useCreateTeam } from "@/hooks/useTeams";
import { useToast } from "@/hooks/use-toast";

interface CreateTeamDialogProps {
  onTeamCreated?: () => void;
}

const CreateTeamDialog = ({ onTeamCreated }: CreateTeamDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDescription, setNewTeamDescription] = useState("");

  const createTeam = useCreateTeam();
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
      setIsOpen(false);
      onTeamCreated?.();
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={createTeam.isPending}>
              {createTeam.isPending ? "Membuat..." : "Buat Tim"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;
