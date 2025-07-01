
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

interface EmptyTeamsStateProps {
  onCreateTeam: () => void;
}

const EmptyTeamsState = ({ onCreateTeam }: EmptyTeamsStateProps) => {
  return (
    <div className="text-center py-8">
      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada tim</h3>
      <p className="text-gray-500 mb-4">Buat tim pertama Anda untuk mulai berkolaborasi</p>
      <Button onClick={onCreateTeam}>
        <Plus className="w-4 h-4 mr-2" />
        Buat Tim Pertama
      </Button>
    </div>
  );
};

export default EmptyTeamsState;
