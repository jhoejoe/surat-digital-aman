import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useTeams = () => {
  return useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      // First get teams with team_members
      const { data: teams, error: teamsError } = await supabase
        .from("teams")
        .select(`
          *,
          team_members (
            id,
            role,
            joined_at,
            user_id
          )
        `)
        .order("created_at", { ascending: false });
      
      if (teamsError) throw teamsError;
      if (!teams) return [];

      // Then enrich each team with profile data for team members
      const teamsWithProfiles = await Promise.all(
        teams.map(async (team) => {
          if (!team.team_members || team.team_members.length === 0) {
            return { ...team, team_members: [] };
          }

          const membersWithProfiles = await Promise.all(
            team.team_members.map(async (member) => {
              const { data: profile } = await supabase
                .from("profiles")
                .select("id, full_name, email")
                .eq("id", member.user_id)
                .single();

              return {
                ...member,
                profiles: profile || { id: member.user_id, full_name: null, email: "" }
              };
            })
          );

          return { ...team, team_members: membersWithProfiles };
        })
      );

      return teamsWithProfiles;
    },
  });
};

export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ name, description }: { name: string; description?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // First check if user profile exists
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();
      
      if (!profile) {
        throw new Error("User profile not found. Please complete your profile first.");
      }

      const { data: team, error: teamError } = await supabase
        .from("teams")
        .insert({
          name,
          description,
          owner_id: user.id
        })
        .select()
        .single();
      
      if (teamError) throw teamError;

      // Add creator as owner to team_members
      const { error: memberError } = await supabase
        .from("team_members")
        .insert({
          team_id: team.id,
          user_id: user.id,
          role: "owner"
        });

      if (memberError) throw memberError;
      
      return team;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
};

export const useTeamMembers = (teamId: string) => {
  return useQuery({
    queryKey: ["team-members", teamId],
    queryFn: async () => {
      // Get team members first
      const { data: members, error: membersError } = await supabase
        .from("team_members")
        .select("*")
        .eq("team_id", teamId)
        .order("joined_at", { ascending: true });
      
      if (membersError) throw membersError;
      if (!members) return [];

      // Then get profile data for each member
      const membersWithProfiles = await Promise.all(
        members.map(async (member) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("id, full_name, email")
            .eq("id", member.user_id)
            .single();

          return {
            ...member,
            profiles: profile || { id: member.user_id, full_name: null, email: "" }
          };
        })
      );

      return membersWithProfiles;
    },
    enabled: !!teamId,
  });
};

export const useInviteTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      teamId, 
      email, 
      role 
    }: { 
      teamId: string; 
      email: string; 
      role: string; 
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Check if email already has an account
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email)
        .single();

      // Check if user is already a team member
      if (existingProfile) {
        const { data: existingMember } = await supabase
          .from("team_members")
          .select("id")
          .eq("team_id", teamId)
          .eq("user_id", existingProfile.id)
          .single();
        
        if (existingMember) {
          throw new Error("User is already a member of this team");
        }
      }

      // Check for existing invitation
      const { data: existingInvitation } = await supabase
        .from("team_invitations")
        .select("id")
        .eq("team_id", teamId)
        .eq("email", email)
        .is("accepted_at", null)
        .gte("expires_at", new Date().toISOString())
        .single();

      if (existingInvitation) {
        throw new Error("An active invitation already exists for this email");
      }

      const { data, error } = await supabase
        .from("team_invitations")
        .insert({
          team_id: teamId,
          email,
          role,
          invited_by: user.id
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-invitations"] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
};

export const useRemoveTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ memberId }: { memberId: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Get member details to check if it's the last owner
      const { data: member } = await supabase
        .from("team_members")
        .select("role, team_id")
        .eq("id", memberId)
        .single();

      if (!member) throw new Error("Team member not found");

      // If removing an owner, check if there are other owners
      if (member.role === "owner") {
        const { data: owners } = await supabase
          .from("team_members")
          .select("id")
          .eq("team_id", member.team_id)
          .eq("role", "owner");

        if (owners && owners.length <= 1) {
          throw new Error("Cannot remove the last owner from the team");
        }
      }

      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", memberId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
  });
};

export const useUpdateMemberRole = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ memberId, role }: { memberId: string; role: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Get current member details
      const { data: currentMember } = await supabase
        .from("team_members")
        .select("role, team_id, user_id")
        .eq("id", memberId)
        .single();

      if (!currentMember) throw new Error("Team member not found");

      // If demoting from owner to another role, ensure there's at least one other owner
      if (currentMember.role === "owner" && role !== "owner") {
        const { data: owners } = await supabase
          .from("team_members")
          .select("id")
          .eq("team_id", currentMember.team_id)
          .eq("role", "owner");

        if (owners && owners.length <= 1) {
          throw new Error("Cannot demote the last owner. Promote another member to owner first.");
        }
      }

      const { data, error } = await supabase
        .from("team_members")
        .update({ role })
        .eq("id", memberId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
  });
};

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ invitationId }: { invitationId: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Get invitation details
      const { data: invitation } = await supabase
        .from("team_invitations")
        .select("*")
        .eq("id", invitationId)
        .single();

      if (!invitation) throw new Error("Invitation not found");
      if (invitation.accepted_at) throw new Error("Invitation already accepted");
      if (new Date(invitation.expires_at) < new Date()) {
        throw new Error("Invitation has expired");
      }

      // Check if user profile matches invitation email
      const { data: profile } = await supabase
        .from("profiles")
        .select("email")
        .eq("id", user.id)
        .single();

      if (!profile || profile.email !== invitation.email) {
        throw new Error("This invitation is not for your email address");
      }

      // Add user to team
      const { error: memberError } = await supabase
        .from("team_members")
        .insert({
          team_id: invitation.team_id,
          user_id: user.id,
          role: invitation.role,
          invited_by: invitation.invited_by
        });

      if (memberError) throw memberError;

      // Mark invitation as accepted
      const { error: invitationError } = await supabase
        .from("team_invitations")
        .update({ accepted_at: new Date().toISOString() })
        .eq("id", invitationId);

      if (invitationError) throw invitationError;

      return invitation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["team-invitations"] });
    },
  });
};

export const useTeamInvitations = (teamId?: string) => {
  return useQuery({
    queryKey: ["team-invitations", teamId],
    queryFn: async () => {
      let query = supabase
        .from("team_invitations")
        .select(`
          *,
          teams (
            id,
            name
          ),
          profiles:invited_by (
            id,
            full_name,
            email
          )
        `)
        .order("created_at", { ascending: false });

      if (teamId) {
        query = query.eq("team_id", teamId);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
    enabled: true,
  });
};
