
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import InviteMemberDialog from "./InviteMemberDialog";
import TeamMemberList from "./TeamMemberList";

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

interface Team {
  id: string;
  name: string;
  description?: string;
  team_members?: TeamMember[];
}

interface TeamCardProps {
  team: Team;
  onMemberInvited?: () => void;
  onMemberRemoved?: () => void;
}

const TeamCard = ({ team, onMemberInvited, onMemberRemoved }: TeamCardProps) => {
  return (
    <Card className="border-l-4 border-l-blue-500">
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
          <InviteMemberDialog
            teamId={team.id}
            teamName={team.name}
            onMemberInvited={onMemberInvited}
          />
        </div>
      </CardHeader>
      <CardContent>
        <TeamMemberList
          members={team.team_members || []}
          onMemberRemoved={onMemberRemoved}
        />
      </CardContent>
    </Card>
  );
};

export default TeamCard;
