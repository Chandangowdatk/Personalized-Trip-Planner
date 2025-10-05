/**
 * User Service - Firestore Operations
 * 
 * Handles all user-related database operations:
 * - Create user profile in Firestore
 * - Get user data
 * - Update user preferences
 * - Update user statistics
 */

import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * User Service Object
 */
const userService = {
  /**
   * Create a new user profile in Firestore
   * This is called when a user signs up for the first time
   * 
   * @param {string} userId - Firebase Auth UID
   * @param {Object} userData - User data from authentication
   * @returns {Promise<void>}
   */
  createUserProfile: async (userId, userData) => {
    try {
      console.log('📝 Creating user profile for:', userId);
      
      const userRef = doc(db, 'users', userId);
      
      // Check if user already exists
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        console.log('ℹ️ User profile already exists');
        return;
      }
      
      // Default user profile structure
      const userProfile = {
        // Basic Info
        email: userData.email || null,
        displayName: userData.displayName || userData.name || 'Traveler',
        photoURL: userData.photoURL || null,
        
        // Authentication
        authProvider: userData.authProvider || 'email', // 'google' | 'email'
        emailVerified: userData.emailVerified || false,
        
        // Timestamps
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        
        // Account Status
        status: 'active', // 'active' | 'suspended' | 'deleted'
        
        // User Preferences (can be updated later)
        preferences: {
          // Travel Style
          budget: 'moderate', // 'budget' | 'moderate' | 'luxury'
          travelStyle: 'balanced', // 'balanced' | 'relaxed' | 'adventurous' | 'cultural'
          
          // Interests (array of tags)
          interests: [],
          
          // Constraints
          dietaryRestrictions: [], // ['vegetarian', 'vegan', 'halal', 'gluten-free']
          accessibilityNeeds: [], // ['wheelchair', 'visual-impairment', 'hearing-impairment']
          
          // Group Settings
          defaultGroupSize: 1,
          travelingWith: 'solo', // 'solo' | 'partner' | 'family' | 'friends' | 'group'
          
          // Preferences
          preferredTransport: [], // ['flight', 'train', 'bus', 'car']
          accommodationType: [], // ['hotel', 'hostel', 'airbnb', 'resort']
          activityPace: 'moderate', // 'slow' | 'moderate' | 'fast'
          
          // Communication
          language: 'en',
          notificationPreferences: {
            email: true,
            push: true,
            sms: false
          }
        },
        
        // User Statistics
        stats: {
          tripsPlanned: 0,
          tripsCompleted: 0,
          destinationsVisited: 0,
          totalSpent: 0,
          messagesExchanged: 0,
          itinerariesGenerated: 0,
          bookingsCompleted: 0
        },
        
        // Travel History (populated over time)
        travelHistory: []
      };
      
      await setDoc(userRef, userProfile);
      console.log('✅ User profile created successfully');
    } catch (error) {
      console.error('❌ Error creating user profile:', error);
      throw error;
    }
  },

  /**
   * Get user profile from Firestore
   * 
   * @param {string} userId - Firebase Auth UID
   * @returns {Promise<Object|null>} User profile data or null
   */
  getUserProfile: async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return { id: userSnap.id, ...userSnap.data() };
      } else {
        console.warn('⚠️ User profile not found:', userId);
        return null;
      }
    } catch (error) {
      console.error('❌ Error getting user profile:', error);
      throw error;
    }
  },

  /**
   * Update user's last login timestamp
   * 
   * @param {string} userId - Firebase Auth UID
   * @returns {Promise<void>}
   */
  updateLastLogin: async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        lastLoginAt: serverTimestamp()
      });
    } catch (error) {
      console.error('❌ Error updating last login:', error);
      // Don't throw - this is not critical
    }
  },

  /**
   * Update user preferences
   * 
   * @param {string} userId - Firebase Auth UID
   * @param {Object} preferences - Updated preferences object
   * @returns {Promise<void>}
   */
  updatePreferences: async (userId, preferences) => {
    try {
      console.log('🔧 Updating user preferences...');
      const userRef = doc(db, 'users', userId);
      
      await updateDoc(userRef, {
        preferences: preferences,
        updatedAt: serverTimestamp()
      });
      
      console.log('✅ Preferences updated successfully');
    } catch (error) {
      console.error('❌ Error updating preferences:', error);
      throw error;
    }
  },

  /**
   * Update specific preference fields
   * 
   * @param {string} userId - Firebase Auth UID
   * @param {Object} updates - Object with preference fields to update
   * @returns {Promise<void>}
   */
  updatePreferenceFields: async (userId, updates) => {
    try {
      const userRef = doc(db, 'users', userId);
      
      // Convert flat updates to nested structure
      const nestedUpdates = {};
      Object.keys(updates).forEach(key => {
        nestedUpdates[`preferences.${key}`] = updates[key];
      });
      
      nestedUpdates.updatedAt = serverTimestamp();
      
      await updateDoc(userRef, nestedUpdates);
      console.log('✅ Preference fields updated');
    } catch (error) {
      console.error('❌ Error updating preference fields:', error);
      throw error;
    }
  },

  /**
   * Update user statistics
   * 
   * @param {string} userId - Firebase Auth UID
   * @param {Object} stats - Stats to increment/update
   * @returns {Promise<void>}
   */
  updateStats: async (userId, stats) => {
    try {
      const userRef = doc(db, 'users', userId);
      
      // Build update object with increments
      const updates = { updatedAt: serverTimestamp() };
      
      Object.keys(stats).forEach(key => {
        updates[`stats.${key}`] = increment(stats[key]);
      });
      
      await updateDoc(userRef, updates);
      console.log('✅ Stats updated');
    } catch (error) {
      console.error('❌ Error updating stats:', error);
      throw error;
    }
  },

  /**
   * Increment a single stat
   * 
   * @param {string} userId - Firebase Auth UID
   * @param {string} statName - Name of the stat to increment
   * @param {number} value - Value to increment by (default: 1)
   * @returns {Promise<void>}
   */
  incrementStat: async (userId, statName, value = 1) => {
    try {
      const userRef = doc(db, 'users', userId);
      
      await updateDoc(userRef, {
        [`stats.${statName}`]: increment(value),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('❌ Error incrementing stat:', error);
      // Don't throw - stats are not critical
    }
  },

  /**
   * Add entry to travel history
   * 
   * @param {string} userId - Firebase Auth UID
   * @param {Object} trip - Trip data to add
   * @returns {Promise<void>}
   */
  addTravelHistory: async (userId, trip) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const travelHistory = userData.travelHistory || [];
        
        // Add new trip to history
        travelHistory.push({
          ...trip,
          addedAt: new Date()
        });
        
        await updateDoc(userRef, {
          travelHistory: travelHistory,
          updatedAt: serverTimestamp()
        });
        
        console.log('✅ Travel history updated');
      }
    } catch (error) {
      console.error('❌ Error adding travel history:', error);
      throw error;
    }
  },

  /**
   * Update user profile fields
   * 
   * @param {string} userId - Firebase Auth UID
   * @param {Object} updates - Fields to update
   * @returns {Promise<void>}
   */
  updateProfile: async (userId, updates) => {
    try {
      const userRef = doc(db, 'users', userId);
      
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      console.log('✅ Profile updated');
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      throw error;
    }
  },

  /**
   * Update user profile photo URL
   * 
   * @param {string} userId - Firebase Auth UID
   * @param {string} photoURL - URL of the profile photo
   * @returns {Promise<void>}
   */
  updateProfilePhoto: async (userId, photoURL) => {
    try {
      console.log('📸 Updating profile photo...');
      const userRef = doc(db, 'users', userId);
      
      await updateDoc(userRef, {
        photoURL: photoURL,
        updatedAt: serverTimestamp()
      });
      
      console.log('✅ Profile photo updated successfully');
    } catch (error) {
      console.error('❌ Error updating profile photo:', error);
      throw error;
    }
  }
};

export default userService;
