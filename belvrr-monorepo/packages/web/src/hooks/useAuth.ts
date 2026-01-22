import { useState, useCallback } from 'react';
import type { User, AuthState, UserRole } from '@belvrr/core';

interface UseAuthReturn extends AuthState {
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

/**
 * Placeholder auth hook - will be implemented with Firebase Auth in V1.1
 * 
 * TODO (V1.1):
 * - Import Firebase Auth
 * - Implement Google Sign-In
 * - Implement Apple Sign-In (required for App Store)
 * - Connect to Firestore for user data
 */
export function useAuth(): UseAuthReturn {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
  });

  const signInWithGoogle = useCallback(async () => {
    console.log('🚧 Auth coming in V1.1 - Google Sign-In');
    // TODO: Implement with Firebase Auth
    // import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
    // const provider = new GoogleAuthProvider();
    // await signInWithPopup(auth, provider);
  }, []);

  const signInWithApple = useCallback(async () => {
    console.log('🚧 Auth coming in V1.1 - Apple Sign-In');
    // TODO: Implement with Firebase Auth
    // import { signInWithPopup, OAuthProvider } from 'firebase/auth';
    // const provider = new OAuthProvider('apple.com');
    // await signInWithPopup(auth, provider);
  }, []);

  const signOut = useCallback(async () => {
    console.log('🚧 Auth coming in V1.1 - Sign Out');
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
    });
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    console.log('🚧 Auth coming in V1.1 - Update Profile', data);
    // TODO: Update user document in Firestore
  }, []);

  return {
    ...state,
    signInWithGoogle,
    signInWithApple,
    signOut,
    updateProfile,
  };
}

/**
 * Check if user has admin role
 */
export function useIsAdmin(): boolean {
  const { user } = useAuth();
  return user?.role === 'admin';
}
