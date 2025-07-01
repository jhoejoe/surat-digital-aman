
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogPost } from "@/hooks/useBlogPosts";
import { useForm } from "react-hook-form";

interface BlogEditorProps {
  post?: BlogPost | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const BlogEditor = ({ post, onSubmit, onCancel, isLoading }: BlogEditorProps) => {
  const [content, setContent] = useState(post?.content || '');
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: post?.title || '',
      excerpt: post?.excerpt || '',
      status: post?.status || 'draft',
    }
  });

  const handleFormSubmit = (data: any) => {
    onSubmit({
      ...data,
      content: content,
    });
  };

  const handleStatusChange = (value: string) => {
    if (value === 'draft' || value === 'published' || value === 'archived') {
      setValue("status", value);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{post ? 'Edit Blog Post' : 'Buat Blog Post Baru'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="title">Judul</Label>
            <Input
              id="title"
              {...register("title", { required: true })}
              placeholder="Masukkan judul post"
              className="text-lg"
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt/Ringkasan</Label>
            <Input
              id="excerpt"
              {...register("excerpt")}
              placeholder="Ringkasan singkat post (opsional)"
            />
          </div>

          <div>
            <Label htmlFor="content">Konten</Label>
            <div className="border rounded-md">
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                }}
                config={{
                  toolbar: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'outdent',
                    'indent',
                    '|',
                    'blockQuote',
                    'insertTable',
                    'undo',
                    'redo'
                  ],
                  placeholder: 'Tulis konten blog di sini...',
                }}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={handleStatusChange} defaultValue={watch("status")}>
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

          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : post ? "Update Post" : "Buat Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogEditor;
