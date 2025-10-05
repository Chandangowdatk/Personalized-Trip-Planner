/**
 * Auth Context - Firebase Authentication Integration
 * 
 * Manages authentication state across the application:
 * - Listens to Firebase auth state changes
 * - Creates/retrieves user profiles from Firestore
 * - Provides auth methods to components
 * - Manages loading states
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import authService from '../services/authService';
import userService from '../services/userService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Subscribe to Firebase auth state changes
  useEffect(() => {
    console.log('🔐 Setting up auth state listener...');
    
    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          console.log('✅ User authenticated:', firebaseUser.email);
          
          // Get ID token for backend authentication
          const token = await firebaseUser.getIdToken();
          
          // Get or create user profile from Firestore
          let userProfile = await userService.getUserProfile(firebaseUser.uid);
          
          if (!userProfile) {
            // New user - create profile
            console.log('📝 New user detected, creating profile...');
            await userService.createUserProfile(firebaseUser.uid, {
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              authProvider: firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'email',
              emailVerified: firebaseUser.emailVerified
            });
            
            // Fetch the newly created profile
            userProfile = await userService.getUserProfile(firebaseUser.uid);
          } else {
            // Existing user - update last login
            await userService.updateLastLogin(firebaseUser.uid);
          }
          
          // Set user state with combined data
          const displayName = firebaseUser.displayName || userProfile?.displayName || 'Traveler';
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: displayName, // Map displayName to name for consistency
            displayName: displayName,
            photoURL: firebaseUser.photoURL || userProfile?.photoURL,
            emailVerified: firebaseUser.emailVerified,
            token: token,
            // Include profile data
            ...userProfile
          });
          
        } else {
          // User signed out
          console.log('👋 User signed out');
          setUser(null);
        }
      } catch (error) {
        console.error('❌ Error in auth state change:', error);
        setError(error.message);
        toast.error('Authentication error. Please try again.');
      } finally {
        setLoading(false);
      }
    });

    // Cleanup subscription
    return () => {
      console.log('🔌 Cleaning up auth listener');
      unsubscribe();
    };
  }, []);

  /**
   * Sign in with Google OAuth
   */
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await authService.signInWithGoogle();
      
      if (result.isNewUser) {
        toast.success('🎉 Welcome! Your account has been created.');
      } else {
        toast.success('👋 Welcome back!');
      }
      
      return result.user;
    } catch (error) {
      console.error('❌ Google sign-in error:', error);
      setError(error.message);
      toast.error(error.message || 'Failed to sign in with Google');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign up with Email and Password
   */
  const signUpWithEmail = async (email, password, displayName) => {
    try {
      setLoading(true);
      setError(null);
      
      const user = await authService.signUpWithEmail(email, password, displayName);
      
      toast.success('🎉 Account created! Please verify your email.');
      return user;
    } catch (error) {
      console.error('❌ Sign-up error:', error);
      setError(error.message);
      toast.error(error.message || 'Failed to create account');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign in with Email and Password
   */
  const signInWithEmail = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const user = await authService.signInWithEmail(email, password);
      
      toast.success('👋 Welcome back!');
      return user;
    } catch (error) {
      console.error('❌ Sign-in error:', error);
      setError(error.message);
      toast.error(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign out
   */
  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await authService.signOut();
      setUser(null);
      
      toast.success('👋 Signed out successfully');
    } catch (error) {
      console.error('❌ Sign-out error:', error);
      setError(error.message);
      toast.error('Failed to sign out');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset password
   */
  const resetPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      await authService.resetPassword(email);
      
      toast.success('📧 Password reset email sent!');
    } catch (error) {
      console.error('❌ Password reset error:', error);
      setError(error.message);
      toast.error(error.message || 'Failed to send reset email');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update user preferences
   */
  const updatePreferences = async (preferences) => {
    try {
      if (!user) {
        throw new Error('No user signed in');
      }
      
      await userService.updatePreferences(user.id, preferences);
      
      // Update local state
      setUser(prev => ({
        ...prev,
        preferences: preferences
      }));
      
      toast.success('✅ Preferences updated');
    } catch (error) {
      console.error('❌ Error updating preferences:', error);
      toast.error('Failed to update preferences');
      throw error;
    }
  };

  /**
   * Get fresh user token
   */
  const getToken = async (forceRefresh = false) => {
    try {
      return await authService.getIdToken(forceRefresh);
    } catch (error) {
      console.error('❌ Error getting token:', error);
      throw error;
    }
  };

  const value = {
    // State
    user,
    loading,
    error,
    isAuthenticated: !!user,
    
    // Methods
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    resetPassword,
    updatePreferences,
    getToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
