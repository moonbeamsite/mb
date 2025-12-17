#!/usr/bin/env node

/**
 * Script to create an admin user in Supabase
 * This script creates a user account and assigns admin role
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service role key needed for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - VITE_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nPlease add these to your .env file');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  const adminEmail = 'admin@moonbeam.com';
  const adminPassword = 'Admin123!@#';
  
  console.log('🚀 Creating admin user...');
  
  try {
    // Create user account
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        first_name: 'Admin',
        last_name: 'User',
        role: 'admin'
      }
    });

    if (authError) {
      console.error('❌ Error creating user:', authError.message);
      return;
    }

    console.log('✅ User created successfully');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('🆔 User ID:', authData.user.id);

    // Assign admin role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: authData.user.id,
        role: 'admin'
      });

    if (roleError) {
      console.error('❌ Error assigning admin role:', roleError.message);
      return;
    }

    console.log('✅ Admin role assigned successfully');
    console.log('\n🎉 Admin account created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('   Email: admin@moonbeam.com');
    console.log('   Password: Admin123!@#');
    console.log('\n🔗 You can now login at: /auth');
    console.log('🛡️  Access admin panel at: /admin');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Run the script
createAdminUser();