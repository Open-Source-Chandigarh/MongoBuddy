import React, { createContext, useEffect, useState } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Handle different auth events
        if (event === 'SIGNED_IN') {
          console.log('User signed in:', session?.user?.email);
          // Initialize user checkpoint record if it doesn't exist
          await initializeUserCheckpoint(session?.user);
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  // Initialize user checkpoint record
  const initializeUserCheckpoint = async (user) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_checkpoints')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // No record exists, create one
        const { error: insertError } = await supabase
          .from('user_checkpoints')
          .insert({
            user_id: user.id,
            current_checkpoint: 1,
            total_modules_completed: 0,
            total_time_spent: 0,
            achievements: [],
            streak_days: 0
          });

        if (insertError) {
          console.error('Error creating user checkpoint:', insertError);
        }
      }
    } catch (error) {
      console.error('Error initializing user checkpoint:', error);
    }
  };

  // Sign up with email and password
  const signUp = async (email, password, userData = {}) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData // Additional user metadata
        }
      });

      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Reset password error:', error);
      return { error };
    }
  };

  // Update password
  const updatePassword = async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Update password error:', error);
      return { error };
    }
  };

  // Get user profile with progress data
  const getUserProfile = async () => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('user_checkpoints')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    getUserProfile,
    // Helper properties
    isAuthenticated: !!user,
    userEmail: user?.email || '',
    userId: user?.id || null
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Remove useAuth and withAuth exports from this file.
// Move them to a new file, e.g., src/contexts/useAuth.js and src/contexts/withAuth.js.