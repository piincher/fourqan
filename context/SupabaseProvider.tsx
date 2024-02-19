import { createClient } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { SupabaseContext } from './SupabaseContext';

// We are using Expo Secure Store to persist session info
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

type SupabaseProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const SupabaseProvider = (props: SupabaseProviderProps) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isNavigationReady, setNavigationReady] = useState(false);

  const supabase = createClient(
    'https://ofudmgehfdfnzjlybgbz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdWRtZ2VoZmRmbnpqbHliZ2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4NTQ3MTcsImV4cCI6MjAxNDQzMDcxN30.fF9A3EvLVZz45h5WGXnEXyiXepu7uPhNs1qb9Q8MgOM',
    {
      auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    },
  );

  const getGoogleOAuthUrl = async (): Promise<string | null> => {
    const result = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'fourqan://google-auth',
      },
    });

    return result.data.url;
  };
  const LinkedInOAuthUrl = async (): Promise<string | null> => {
    const result = await supabase.auth.signInWithOAuth({
      provider: 'linkedin',
      options: {
        redirectTo: 'fourqan://linkedin-auth',
      },
    });

    console.log('result', result);

    return result.data.url;
  };
  const setOAuthSession = async (tokens: {
    access_token: string;
    refresh_token: string;
  }) => {
    const { data, error } = await supabase.auth.setSession({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });
    console.log('session', data, error);

    if (error) throw error;
    setLoggedIn(data.session !== null);
  };

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setLoggedIn(true);
  };

  const emailOtp = async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: 'ikouma269@gmail.com',
    });

    console.log('data', data, error);
  };
  const register = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    console.log('data', data);
  };

  const forgotPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setLoggedIn(false);
  };

  const checkIfUserIsLoggedIn = async () => {
    const result = await supabase.auth.getSession();
    setLoggedIn(result.data.session !== null);
    setNavigationReady(true);
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  return (
    <SupabaseContext.Provider
      value={{
        isLoggedIn,
        login,
        register,
        forgotPassword,
        logout,
        getGoogleOAuthUrl,
        setOAuthSession,
        emailOtp,
        LinkedInOAuthUrl,
      }}
    >
      {isNavigationReady ? props.children : null}
    </SupabaseContext.Provider>
  );
};
