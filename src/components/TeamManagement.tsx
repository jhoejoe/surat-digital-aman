
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, AlertCircle } from "lucide-react";
import { useTeams } from "@/hooks/useTeams";
import CreateTeamDialog from "./teams/CreateTeamDialog";
import TeamCard from "./teams/TeamCard";
import EmptyTeamsState from "./teams/EmptyTeamsState";

const TeamManagement = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { data: teams = [], isLoading, error, refetch } = useTeams();

  const handleTeamCreated = () => {
    refetch();
  };

  const handleMemberInvited = () => {
    refetch();
  };

  const handleMemberRemoved = () => {
    refetch();
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
            <CreateTeamDialog onTeamCreated={handleTeamCreated} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {teams.length === 0 ? (
              <EmptyTeamsState onCreateTeam={() => setIsCreateOpen(true)} />
            ) : (
              teams.map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  onMemberInvited={handleMemberInvited}
                  onMemberRemoved={handleMemberRemoved}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;
