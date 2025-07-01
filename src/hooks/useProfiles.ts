
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProfiles = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select(`
          *,
          teams:current_team_id (
            id,
            name
          )
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      const { data, error } = await supabase
        .from("profiles")
        .update({ role, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
};

export const useUpdateCurrentTeam = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, teamId }: { userId: string; teamId: string | null }) => {
      const { data, error } = await supabase
        .from("profiles")
        .update({ current_team_id: teamId, updated_at: new Date().toISOString() })
        .eq("id", userId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
};
