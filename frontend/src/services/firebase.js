/**
 * Firebase Configuration and Initialization
 * 
 * This file initializes Firebase services for the Personalized Trip Planner:
 * - Firebase Authentication (Google OAuth, Email/Password)
 * - Cloud Firestore (Database)
 * - Cloud Storage (For future use - user photos, documents)
 */

import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
// These values come from Firebase Console -> Project Settings -> General
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Validate configuration
const validateConfig = () => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'appId'];
  const missingFields = requiredFields.filter(field => !firebaseConfig[field]);
  
  if (missingFields.length > 0) {
    console.error('❌ Missing Firebase configuration:', missingFields);
    console.error('Please check your .env.local file');
    return false;
  }
  
  return true;
};

// Initialize Firebase only if config is valid
let app = null;
let auth = null;
let db = null;
let storage = null;

if (validateConfig()) {
  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    
    // Initialize services
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    // Connect to emulators in development (optional)
    if (process.env.REACT_APP_USE_FIREBASE_EMULATOR === 'true') {
      console.log('🔧 Connecting to Firebase Emulators...');
      connectAuthEmulator(auth, 'http://localhost:9099');
      connectFirestoreEmulator(db, 'localhost', 8080);
    }
    
    console.log('✅ Firebase initialized successfully');
    console.log('📱 Project ID:', firebaseConfig.projectId);
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
  }
} else {
  console.warn('⚠️ Firebase not initialized due to missing configuration');
}

// Export initialized services
export { app, auth, db, storage };
export default app;
