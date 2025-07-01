
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface DemoRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  message?: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export const useDemoRequests = () => {
  return useQuery({
    queryKey: ["demoRequests"],
    queryFn: async () => {
      console.log("Fetching demo requests...");
      const { data, error } = await supabase
        .from("demo_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching demo requests:", error);
        throw error;
      }
      console.log("Fetched demo requests:", data);
      return data as DemoRequest[];
    },
  });
};

export const useCreateDemoRequest = () => {
  return useMutation({
    mutationFn: async (newRequest: Omit<DemoRequest, 'id' | 'status' | 'created_at' | 'updated_at'>) => {
      console.log("Creating demo request:", newRequest);
      const { data, error } = await supabase
        .from("demo_requests")
        .insert([newRequest])
        .select()
        .single();

      if (error) {
        console.error("Error creating demo request:", error);
        throw error;
      }
      console.log("Created demo request:", data);
      return data;
    },
    onSuccess: () => {
      toast.success("Permintaan demo berhasil dikirim!");
    },
    onError: (error) => {
      console.error("Error creating demo request:", error);
      toast.error("Gagal mengirim permintaan demo");
    },
  });
};

export const useUpdateDemoRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<DemoRequest> & { id: string }) => {
      const { data, error } = await supabase
        .from("demo_requests")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demoRequests"] });
      toast.success("Status permintaan demo berhasil diperbarui!");
    },
    onError: (error) => {
      console.error("Error updating demo request:", error);
      toast.error("Gagal memperbarui status permintaan demo");
    },
  });
};

export const useDeleteDemoRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("demo_requests")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demoRequests"] });
      toast.success("Permintaan demo berhasil dihapus!");
    },
    onError: (error) => {
      console.error("Error deleting demo request:", error);
      toast.error("Gagal menghapus permintaan demo");
    },
  });
};
