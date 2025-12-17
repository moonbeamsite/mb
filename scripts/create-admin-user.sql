-- SQL Script to create admin user
-- Run this in your Supabase SQL Editor after creating the user account

-- Step 1: First, create a user account through Supabase Auth Dashboard or use the following:
-- Go to Supabase Dashboard > Authentication > Users > Add User
-- Email: admin@moonbeam.com
-- Password: Admin123!@#
-- Auto Confirm User: Yes

-- Step 2: After creating the user, get the user ID and replace 'USER_ID_HERE' below
-- You can find the user ID in the Authentication > Users section

-- Replace 'USER_ID_HERE' with the actual UUID from the created user
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_ID_HERE', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Verify the admin user was created
SELECT 
    ur.user_id,
    ur.role,
    ur.created_at
FROM public.user_roles ur
WHERE ur.role = 'admin';

-- Optional: Create additional admin users by repeating the process