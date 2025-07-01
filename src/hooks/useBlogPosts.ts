
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  status: 'draft' | 'published' | 'archived';
  author_id: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export const useBlogPosts = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    },
    enabled: !!user,
  });
};

export const useBlogCategories = () => {
  return useQuery({
    queryKey: ["blogCategories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as BlogCategory[];
    },
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (newPost: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'author_id'>) => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("blog_posts")
        .insert([{ ...newPost, author_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      toast.success("Blog post berhasil dibuat!");
    },
    onError: (error) => {
      console.error("Error creating blog post:", error);
      toast.error("Gagal membuat blog post");
    },
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<BlogPost> & { id: string }) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      toast.success("Blog post berhasil diperbarui!");
    },
    onError: (error) => {
      console.error("Error updating blog post:", error);
      toast.error("Gagal memperbarui blog post");
    },
  });
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogPosts"] });
      toast.success("Blog post berhasil dihapus!");
    },
    onError: (error) => {
      console.error("Error deleting blog post:", error);
      toast.error("Gagal menghapus blog post");
    },
  });
};

export const useCreateBlogCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCategory: Omit<BlogCategory, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from("blog_categories")
        .insert([newCategory])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogCategories"] });
      toast.success("Kategori berhasil dibuat!");
    },
    onError: (error) => {
      console.error("Error creating category:", error);
      toast.error("Gagal membuat kategori");
    },
  });
};
