
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useBlogPosts, useCreateBlogPost, useUpdateBlogPost, useDeleteBlogPost, useBlogCategories, useCreateBlogCategory, BlogPost } from "@/hooks/useBlogPosts";
import { useForm } from "react-hook-form";

const AdminBlog = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  
  const { data: blogPosts, isLoading } = useBlogPosts();
  const { data: categories } = useBlogCategories();
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();
  const createCategory = useCreateBlogCategory();

  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const { register: registerCategory, handleSubmit: handleSubmitCategory, reset: resetCategory } = useForm();

  const onSubmitPost = (data: any) => {
    const postData = {
      ...data,
      slug: data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      published_at: data.status === 'published' ? new Date().toISOString() : null,
    };

    if (editingPost) {
      updatePost.mutate({ id: editingPost.id, ...postData });
    } else {
      createPost.mutate(postData);
    }
    
    reset();
    setIsCreateDialogOpen(false);
    setEditingPost(null);
  };

  const onSubmitCategory = (data: any) => {
    const categoryData = {
      ...data,
      slug: data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
    };
    
    createCategory.mutate(categoryData);
    resetCategory();
    setIsCategoryDialogOpen(false);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setValue('title', post.title);
    setValue('content', post.content);
    setValue('excerpt', post.excerpt || '');
    setValue('status', post.status);
    setIsCreateDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus blog post ini?')) {
      deletePost.mutate(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manajemen Blog</h2>
        <div className="flex space-x-2">
          <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Kategori Baru
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Buat Kategori Baru</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitCategory(onSubmitCategory)} className="space-y-4">
                <div>
                  <Label htmlFor="categoryName">Nama Kategori</Label>
                  <Input
                    id="categoryName"
                    {...registerCategory("name", { required: true })}
                    placeholder="Masukkan nama kategori"
                  />
                </div>
                <div>
                  <Label htmlFor="categoryDescription">Deskripsi</Label>
                  <Textarea
                    id="categoryDescription"
                    {...registerCategory("description")}
                    placeholder="Deskripsi kategori (opsional)"
                  />
                </div>
                <Button type="submit" disabled={createCategory.isPending}>
                  {createCategory.isPending ? "Membuat..." : "Buat Kategori"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Post Baru
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingPost ? 'Edit Post' : 'Buat Post Baru'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmitPost)} className="space-y-4">
                <div>
                  <Label htmlFor="title">Judul</Label>
                  <Input
                    id="title"
                    {...register("title", { required: true })}
                    placeholder="Masukkan judul post"
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    {...register("excerpt")}
                    placeholder="Ringkasan singkat post"
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Konten</Label>
                  <Textarea
                    id="content"
                    {...register("content", { required: true })}
                    placeholder="Tulis konten blog di sini..."
                    rows={8}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={(value) => setValue("status", value)} defaultValue="draft">
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" disabled={createPost.isPending || updatePost.isPending}>
                  {createPost.isPending || updatePost.isPending ? "Menyimpan..." : editingPost ? "Update Post" : "Buat Post"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Categories Section */}
      {categories && categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Kategori Blog</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge key={category.id} variant="outline">
                  {category.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Blog Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {blogPosts && blogPosts.length > 0 ? (
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold">{post.title}</h3>
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                    </div>
                    {post.excerpt && (
                      <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Dibuat: {new Date(post.created_at).toLocaleDateString('id-ID')}
                      {post.published_at && (
                        <span> • Dipublikasi: {new Date(post.published_at).toLocaleDateString('id-ID')}</span>
                      )}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(post)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Belum ada blog posts. Buat yang pertama!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlog;
