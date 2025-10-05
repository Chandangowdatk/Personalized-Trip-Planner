/**
 * Authentication Service
 * 
 * Handles all authentication operations:
 * - Google OAuth Sign-in
 * - Email/Password Sign-up and Sign-in
 * - Password Reset
 * - Sign-out
 * - User state management
 */

import { 
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './firebase';

// Google OAuth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

/**
 * Authentication Service Object
 */
const authService = {
  /**
   * Sign in with Google OAuth
   * @returns {Promise<User>} Firebase User object
   */
  signInWithGoogle: async () => {
    try {
      console.log('🔐 Initiating Google Sign-in...');
      const result = await signInWithPopup(auth, googleProvider);
      
      // Get user info
      const user = result.user;
      console.log('✅ Google Sign-in successful:', user.email);
      
      // Get OAuth credential (optional - for backend verification)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      
      return {
        user,
        token,
        isNewUser: result._tokenResponse?.isNewUser || false
      };
    } catch (error) {
      console.error('❌ Google Sign-in error:', error);
      
      // Handle specific errors
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in popup was closed. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Sign-in popup was blocked. Please allow popups for this site.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        throw new Error('Sign-in cancelled. Please try again.');
      }
      
      throw error;
    }
  },

  /**
   * Sign up with Email and Password
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} displayName - User's display name
   * @returns {Promise<User>} Firebase User object
   */
  signUpWithEmail: async (email, password, displayName) => {
    try {
      console.log('📝 Creating account for:', email);
      
      // Create user account
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      // Update profile with display name
      if (displayName) {
        await updateProfile(user, { displayName });
        console.log('✅ Profile updated with display name:', displayName);
      }
      
      // Send verification email
      await sendEmailVerification(user);
      console.log('📧 Verification email sent to:', email);
      
      console.log('✅ Account created successfully');
      return user;
    } catch (error) {
      console.error('❌ Sign-up error:', error);
      
      // Handle specific errors
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('This email is already registered. Please sign in instead.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password is too weak. Please use at least 6 characters.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address.');
      }
      
      throw error;
    }
  },

  /**
   * Sign in with Email and Password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<User>} Firebase User object
   */
  signInWithEmail: async (email, password) => {
    try {
      console.log('🔐 Signing in with email:', email);
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Sign-in successful');
      return result.user;
    } catch (error) {
      console.error('❌ Sign-in error:', error);
      
      // Handle specific errors
      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email. Please sign up first.');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address.');
      } else if (error.code === 'auth/user-disabled') {
        throw new Error('This account has been disabled. Please contact support.');
      }
      
      throw error;
    }
  },

  /**
   * Sign out current user
   * @returns {Promise<void>}
   */
  signOut: async () => {
    try {
      console.log('👋 Signing out...');
      await firebaseSignOut(auth);
      console.log('✅ Sign-out successful');
    } catch (error) {
      console.error('❌ Sign-out error:', error);
      throw error;
    }
  },

  /**
   * Send password reset email
   * @param {string} email - User email
   * @returns {Promise<void>}
   */
  resetPassword: async (email) => {
    try {
      console.log('📧 Sending password reset email to:', email);
      await sendPasswordResetEmail(auth, email);
      console.log('✅ Password reset email sent');
    } catch (error) {
      console.error('❌ Password reset error:', error);
      
      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address.');
      }
      
      throw error;
    }
  },

  /**
   * Get current user's ID token
   * @param {boolean} forceRefresh - Force token refresh
   * @returns {Promise<string>} ID token
   */
  getIdToken: async (forceRefresh = false) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user is currently signed in');
      }
      
      const token = await user.getIdToken(forceRefresh);
      return token;
    } catch (error) {
      console.error('❌ Error getting ID token:', error);
      throw error;
    }
  },

  /**
   * Get current user
   * @returns {User|null} Current user or null
   */
  getCurrentUser: () => {
    return auth.currentUser;
  },

  /**
   * Subscribe to authentication state changes
   * @param {Function} callback - Callback function to handle auth state changes
   * @returns {Function} Unsubscribe function
   */
  onAuthStateChanged: (callback) => {
    return onAuthStateChanged(auth, callback);
  },

  /**
   * Check if user is signed in
   * @returns {boolean}
   */
  isSignedIn: () => {
    return auth.currentUser !== null;
  },

  /**
   * Reload current user data
   * @returns {Promise<void>}
   */
  reloadUser: async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        console.log('✅ User data reloaded');
      }
    } catch (error) {
      console.error('❌ Error reloading user:', error);
      throw error;
    }
  }
};

export default authService;
