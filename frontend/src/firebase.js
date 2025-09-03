// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add your Firebase configuration
// You'll need to replace this with your actual Firebase config from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCZrhvPxHObHQX7fo8gxIluR74xtTA8ChY",
  authDomain: "mongobuddy-d5dc8.firebaseapp.com",
  projectId: "mongobuddy-d5dc8",
  storageBucket: "mongobuddy-d5dc8.firebasestorage.app",
  messagingSenderId: "69172953843",
  appId: "1:69172953843:web:be8c57d577d4cdf72ead86",
  measurementId: "G-9LGHR1PK78"
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
