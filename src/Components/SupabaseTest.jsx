import React, { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';

const SupabaseTest = () => {
  const [status, setStatus] = useState('Testing connection...');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test basic connection
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          setStatus(`Connection Error: ${error.message}`);
          return;
        }
        
        setStatus('Supabase connected successfully!');
        setUser(data.session?.user || null);
        
        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log('Auth event:', event);
            setUser(session?.user || null);
          }
        );

        return () => subscription.unsubscribe();
      } catch (err) {
        setStatus(`Unexpected error: ${err.message}`);
      }
    };

    testConnection();
  }, []);

  const testSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: 'test@test.com',
        password: 'testpassword123'
      });
      
      if (error) {
        setStatus(`Signup Error: ${error.message}`);
      } else {
        setStatus(`Signup Success: ${data.user?.email}`);
      }
    } catch (err) {
      setStatus(`Signup Error: ${err.message}`);
    }
  };

  const testSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@test.com',
        password: 'testpassword123'
      });
      
      if (error) {
        setStatus(`Signin Error: ${error.message}`);
      } else {
        setStatus(`Signin Success: ${data.user?.email}`);
      }
    } catch (err) {
      setStatus(`Signin Error: ${err.message}`);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">🔧 Supabase Connection Test</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold">Status:</h3>
        <p className="text-sm">{status}</p>
      </div>
      
      {user && (
        <div className="mb-4">
          <h3 className="font-semibold">Current User:</h3>
          <p className="text-sm">{user.email}</p>
        </div>
      )}
      
      <div className="space-y-2">
        <button
          onClick={testSignUp}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Test Sign Up
        </button>
        
        <button
          onClick={testSignIn}
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Test Sign In
        </button>
      </div>
    </div>
  );
};

export default SupabaseTest;