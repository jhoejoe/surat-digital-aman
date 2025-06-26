
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ApiIntegration {
  id: string;
  name: string;
  endpoint: string;
  api_key: string;
  is_active: boolean;
  last_sync: string;
  status: "connected" | "disconnected" | "error";
  description?: string;
  created_at: string;
  updated_at: string;
}

export const useApiIntegrations = () => {
  return useQuery({
    queryKey: ["api_integrations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("api_integrations")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as ApiIntegration[];
    },
  });
};

export const useCreateApiIntegration = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (integrationData: Omit<ApiIntegration, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("api_integrations")
        .insert({
          ...integrationData,
          last_sync: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as ApiIntegration;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api_integrations"] });
    },
  });
};

export const useUpdateApiIntegration = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ApiIntegration> & { id: string }) => {
      const { data, error } = await supabase
        .from("api_integrations")
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data as ApiIntegration;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api_integrations"] });
    },
  });
};

export const useDeleteApiIntegration = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("api_integrations")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api_integrations"] });
    },
  });
};
