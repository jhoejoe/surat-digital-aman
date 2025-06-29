
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

type VerificationResult = Tables<"verification_results">;
type VerificationResultInsert = TablesInsert<"verification_results">;
type VerificationResultUpdate = TablesUpdate<"verification_results">;

export const useVerificationResults = () => {
  return useQuery({
    queryKey: ["verification_results"],
    queryFn: async (): Promise<VerificationResult[]> => {
      const { data, error } = await supabase
        .from("verification_results")
        .select("*")
        .order("verification_completed_at", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useVerificationResultsByDocumentId = (documentId: string) => {
  return useQuery({
    queryKey: ["verification_results", "document", documentId],
    queryFn: async (): Promise<VerificationResult[]> => {
      const { data, error } = await supabase
        .from("verification_results")
        .select("*")
        .eq("document_id", documentId)
        .order("verification_completed_at", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!documentId,
  });
};

export const useCreateVerificationResult = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (verificationData: VerificationResultInsert): Promise<VerificationResult> => {
      const { data, error } = await supabase
        .from("verification_results")
        .insert(verificationData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verification_results"] });
    },
  });
};

export const useUpdateVerificationResult = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<VerificationResult> & { id: string }): Promise<VerificationResult> => {
      const { data, error } = await supabase
        .from("verification_results")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verification_results"] });
    },
  });
};

export const useDeleteVerificationResult = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("verification_results")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verification_results"] });
    },
  });
};
