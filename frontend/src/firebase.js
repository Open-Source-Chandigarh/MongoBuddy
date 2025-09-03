// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add your Firebase configuration
// You'll need to replace this with your actual Firebase config from the Firebase Console
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();

// // Auth functions
// export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
// export const signInWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
// export const signUpWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
// export const logOut = () => signOut(auth);

export default app;
