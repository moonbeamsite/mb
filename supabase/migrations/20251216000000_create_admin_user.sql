-- Create admin user migration
-- This will create an admin user account that can be used to access the admin panel

-- First, we need to create a function that can create users in auth.users
-- Note: In production, you should create the user through Supabase Auth UI or API
-- This is a development/setup helper

-- Create a function to insert admin user data
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    admin_user_id UUID;
BEGIN
    -- Insert into auth.users (this is typically handled by Supabase Auth)
    -- For development purposes, we'll create a placeholder
    -- In production, create the user through Supabase Dashboard or Auth API
    
    -- Generate a UUID for the admin user
    admin_user_id := gen_random_uuid();
    
    -- Insert admin role for the user
    -- Replace this UUID with the actual user ID after creating the user through Supabase Auth
    INSERT INTO public.user_roles (user_id, role)
    VALUES (admin_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    
    -- Log the admin user ID for reference
    RAISE NOTICE 'Admin user ID created: %', admin_user_id;
END;
$$;

-- Create admin user entry
SELECT create_admin_user();

-- Drop the function after use
DROP FUNCTION create_admin_user();

-- Create a view to help identify admin users
CREATE OR REPLACE VIEW admin_users AS
SELECT 
    ur.user_id,
    ur.role,
    ur.created_at as role_assigned_at
FROM public.user_roles ur
WHERE ur.role = 'admin';

-- Grant access to the view
GRANT SELECT ON admin_users TO authenticated;

-- Add some helpful comments
COMMENT ON VIEW admin_users IS 'View to identify users with admin role';

-- Create a function to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin');
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;