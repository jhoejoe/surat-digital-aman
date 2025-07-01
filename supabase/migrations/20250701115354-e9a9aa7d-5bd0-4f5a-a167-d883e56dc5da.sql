
-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id UUID REFERENCES auth.users NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog categories table
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog post categories junction table
CREATE TABLE public.blog_post_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE CASCADE NOT NULL,
  UNIQUE(post_id, category_id)
);

-- Add RLS policies for blog posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Admin can manage all blog posts
CREATE POLICY "Admins can manage all blog posts" 
  ON public.blog_posts 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Public can read published blog posts
CREATE POLICY "Public can read published blog posts" 
  ON public.blog_posts 
  FOR SELECT 
  USING (status = 'published');

-- Add RLS policies for blog categories
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- Admin can manage categories
CREATE POLICY "Admins can manage categories" 
  ON public.blog_categories 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Public can read categories
CREATE POLICY "Public can read categories" 
  ON public.blog_categories 
  FOR SELECT 
  USING (true);

-- Add RLS policies for blog post categories
ALTER TABLE public.blog_post_categories ENABLE ROW LEVEL SECURITY;

-- Admin can manage post categories
CREATE POLICY "Admins can manage post categories" 
  ON public.blog_post_categories 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Public can read post categories for published posts
CREATE POLICY "Public can read post categories" 
  ON public.blog_post_categories 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.blog_posts 
      WHERE blog_posts.id = post_id 
      AND blog_posts.status = 'published'
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_categories_slug ON public.blog_categories(slug);
