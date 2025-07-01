
-- First, let's fix the infinite recursion in the team_members RLS policies
-- by creating a security definer function to get user role

CREATE OR REPLACE FUNCTION public.get_user_team_role(target_team_id uuid, target_user_id uuid)
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.team_members 
  WHERE team_id = target_team_id AND user_id = target_user_id
  LIMIT 1;
$$;

-- Drop the existing problematic policies
DROP POLICY IF EXISTS "Team owners and admins can manage members" ON public.team_members;
DROP POLICY IF EXISTS "Users can view team members of their teams" ON public.team_members;

-- Create new policies using the security definer function
CREATE POLICY "Team owners and admins can manage members" 
  ON public.team_members 
  FOR ALL 
  USING (
    public.get_user_team_role(team_id, auth.uid()) IN ('owner', 'admin')
  );

CREATE POLICY "Users can view team members of their teams" 
  ON public.team_members 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members tm 
      WHERE tm.team_id = team_members.team_id 
      AND tm.user_id = auth.uid()
    )
  );
