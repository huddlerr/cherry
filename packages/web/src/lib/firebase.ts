/**
 * Firebase Configuration
 * 
 * This is a placeholder for V1. Full Firebase integration comes in V1.1.
 * 
 * To enable Firebase Auth:
 * 1. npm install firebase
 * 2. Uncomment the code below
 * 3. Add your Firebase config to .env.local
 */

// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'cherry-76821',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Placeholder exports - uncomment when implementing auth
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const googleProvider = new GoogleAuthProvider();
// export const appleProvider = new OAuthProvider('apple.com');

// For now, export config for reference
export { firebaseConfig };

/**
 * V1.1 Implementation Notes:
 * 
 * 1. Install Firebase:
 *    npm install firebase
 * 
 * 2. Enable providers in Firebase Console:
 *    - Authentication > Sign-in method > Google > Enable
 *    - Authentication > Sign-in method > Apple > Enable
 * 
 * 3. For Apple Sign-In (required for App Store):
 *    - Register app in Apple Developer Console
 *    - Add Service ID and configure domain
 *    - Add OAuth redirect URL to Firebase
 * 
 * 4. Firestore Rules (firestore.rules):
 *    rules_version = '2';
 *    service cloud.firestore {
 *      match /databases/{database}/documents {
 *        match /users/{userId} {
 *          allow read, write: if request.auth != null && request.auth.uid == userId;
 *        }
 *      }
 *    }
 */
