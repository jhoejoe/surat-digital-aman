
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";

type VerificationResultInsert = TablesInsert<"verification_results">;

export const useCreateVerificationResult = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (verificationData: VerificationResultInsert) => {
      const { data, error } = await supabase
        .from("verification_results")
        .insert(verificationData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};
