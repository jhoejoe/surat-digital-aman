
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface AuditLog {
  id: string;
  timestamp: string;
  user_id: string;
  user_name: string;
  action: string;
  resource: string;
  resource_id: string;
  ip_address: string;
  user_agent: string;
  status: "success" | "failed" | "warning";
  details: string;
  changes?: any;
  created_at: string;
}

export const useAuditLogs = () => {
  return useQuery({
    queryKey: ["audit_logs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as AuditLog[];
    },
  });
};

export const useCreateAuditLog = () => {
  return useMutation({
    mutationFn: async (logData: Omit<AuditLog, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("audit_logs")
        .insert(logData)
        .select()
        .single();
      
      if (error) throw error;
      return data as AuditLog;
    },
  });
};

// Helper function to log activities
export const logActivity = async (
  action: string,
  resource: string,
  resourceId: string,
  details: string,
  status: "success" | "failed" | "warning" = "success",
  changes?: any
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      await supabase.from("audit_logs").insert({
        user_id: user.id,
        user_name: user.email || "Unknown User",
        action,
        resource,
        resource_id: resourceId,
        ip_address: "Unknown", // In real app, get from request
        user_agent: navigator.userAgent,
        status,
        details,
        changes,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
};
