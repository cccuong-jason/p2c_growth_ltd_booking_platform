-- Run this in your Supabase SQL Editor for Phase 2 Tracking

-- Add milestones JSONB tracking to B2B Projects
ALTER TABLE public.b2b_projects ADD COLUMN IF NOT EXISTS milestones jsonb DEFAULT '[]'::jsonb;

-- NOTIFY cache reload
NOTIFY pgrst, 'reload schema';
