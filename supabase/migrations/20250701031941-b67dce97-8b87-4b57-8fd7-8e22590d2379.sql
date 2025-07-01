
-- Create teams table
CREATE TABLE public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create team_members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  invited_by UUID REFERENCES auth.users(id),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Create team_invitations table
CREATE TABLE public.team_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  invited_by UUID REFERENCES auth.users(id) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days'),
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(team_id, email)
);

-- Enable RLS
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for teams
CREATE POLICY "Users can view teams they are members of" 
  ON public.teams 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members 
      WHERE team_id = teams.id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Team owners can update their teams" 
  ON public.teams 
  FOR UPDATE 
  USING (owner_id = auth.uid());

CREATE POLICY "Authenticated users can create teams" 
  ON public.teams 
  FOR INSERT 
  WITH CHECK (auth.uid() = owner_id);

-- RLS Policies for team_members
CREATE POLICY "Users can view team members of their teams" 
  ON public.team_members 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members tm 
      WHERE tm.team_id = team_members.team_id AND tm.user_id = auth.uid()
    )
  );

CREATE POLICY "Team owners and admins can manage members" 
  ON public.team_members 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members tm 
      WHERE tm.team_id = team_members.team_id 
      AND tm.user_id = auth.uid() 
      AND tm.role IN ('owner', 'admin')
    )
  );

-- RLS Policies for team_invitations
CREATE POLICY "Users can view invitations for their teams" 
  ON public.team_invitations 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members tm 
      WHERE tm.team_id = team_invitations.team_id 
      AND tm.user_id = auth.uid() 
      AND tm.role IN ('owner', 'admin')
    )
    OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "Team admins can manage invitations" 
  ON public.team_invitations 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members tm 
      WHERE tm.team_id = team_invitations.team_id 
      AND tm.user_id = auth.uid() 
      AND tm.role IN ('owner', 'admin')
    )
  );

-- Update profiles table to include team_id
ALTER TABLE public.profiles ADD COLUMN current_team_id UUID REFERENCES public.teams(id);
