# Admin Account Setup Guide

This guide will help you create an admin account for your Moonbeam application.

## Method 1: Using Supabase Dashboard (Recommended)

### Step 1: Create User Account
1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Users**
3. Click **Add User** button
4. Fill in the details:
   - **Email**: `admin@moonbeam.com`
   - **Password**: `Admin123!@#`
   - **Auto Confirm User**: ✅ (Check this box)
5. Click **Create User**

### Step 2: Assign Admin Role
1. Copy the **User ID** from the newly created user (it's a UUID like `123e4567-e89b-12d3-a456-426614174000`)
2. Go to **SQL Editor** in your Supabase dashboard
3. Run this SQL query (replace `USER_ID_HERE` with the actual user ID):

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_ID_HERE', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

### Step 3: Verify Admin Account
Run this query to verify the admin role was assigned:

```sql
SELECT 
    ur.user_id,
    ur.role,
    ur.created_at
FROM public.user_roles ur
WHERE ur.role = 'admin';
```

## Method 2: Using the Script (Advanced)

If you have Node.js and the Supabase service role key:

1. Install dependencies:
```bash
npm install @supabase/supabase-js dotenv
```

2. Add your service role key to `.env`:
```
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

3. Run the script:
```bash
node scripts/create-admin.js
```

## Login Credentials

After setup, you can login with:
- **Email**: `admin@moonbeam.com`
- **Password**: `Admin123!@#`

## Accessing Admin Features

1. **Login**: Go to `/auth` and login with the admin credentials
2. **Admin Panel**: Navigate to `/admin` to access admin features
3. **Menu Management**: Use the "Manage Images" button on the menu page

## Security Notes

⚠️ **Important**: Change the default password after first login!

1. Login with the default credentials
2. Go to your profile/account settings
3. Update the password to something secure
4. Consider enabling 2FA if available

## Troubleshooting

### User Creation Issues
- Make sure "Auto Confirm User" is checked
- Verify email format is correct
- Check if user already exists

### Role Assignment Issues
- Verify the user ID is correct (UUID format)
- Make sure the user_roles table exists
- Check RLS policies are properly set

### Login Issues
- Verify email and password are correct
- Check if email confirmation is required
- Ensure the user account is active

## Additional Admin Users

To create more admin users, repeat the process with different email addresses:
- `admin2@moonbeam.com`
- `manager@moonbeam.com`
- etc.

## Database Schema Reference

The admin system uses these tables:
- `auth.users` - Supabase auth users
- `public.user_roles` - Role assignments
- `public.dishes` - Menu items (admin can manage)
- `public.products` - Store products (admin can manage)
- `public.blogs` - Blog posts (admin can manage)
- `public.journal_entries` - Journal entries (admin can manage)

## Available Roles

- `admin` - Full access to all features
- `moderator` - Limited admin access (future use)
- `user` - Regular user access (default)