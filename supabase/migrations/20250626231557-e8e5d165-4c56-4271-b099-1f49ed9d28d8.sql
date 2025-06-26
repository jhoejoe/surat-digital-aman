
-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

-- Create simple, non-recursive policies
CREATE POLICY "Users can view own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Create a simple policy for admins without recursive checks
CREATE POLICY "Enable read access for service role" 
  ON public.profiles 
  FOR SELECT 
  USING (true);

-- Allow service role to update profiles (for admin operations)
CREATE POLICY "Enable update for service role" 
  ON public.profiles 
  FOR UPDATE 
  USING (true);

-- Set your account as admin
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'johaniip@gmail.com';

-- Also create the profile if it doesn't exist
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  auth.users.id,
  'johaniip@gmail.com',
  COALESCE(auth.users.raw_user_meta_data ->> 'full_name', 'Admin User'),
  'admin'
FROM auth.users
WHERE auth.users.email = 'johaniip@gmail.com'
AND NOT EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE email = 'johaniip@gmail.com'
);
