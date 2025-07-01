
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useTeams = () => {
  return useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("teams")
        .select(`
          *,
          team_members (
            id,
            role,
            joined_at,
            profiles (
              id,
              full_name,
              email
            )
          )
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ name, description }: { name: string; description?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

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
      const { data, error } = await supabase
        .from("team_members")
        .select(`
          *,
          profiles (
            id,
            full_name,
            email
          )
        `)
        .eq("team_id", teamId)
        .order("joined_at", { ascending: true });
      
      if (error) throw error;
      return data;
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
    },
  });
};

export const useRemoveTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ memberId }: { memberId: string }) => {
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
