import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from '../firebase/firebase.init';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);

  // Google Auth Provider
  const googleProvider = new GoogleAuthProvider();

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Core authentication methods
  const authActions = {
    createUser: async (email, password, profile = {}) => {
      setLoading(true);
      setAuthError(null);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (profile.displayName || profile.photoURL) {
          await updateProfile(auth.currentUser, profile);
        }
        await sendEmailVerification(auth.currentUser);
        setAuthSuccess('Account created successfully! Please verify your email.');
        return userCredential;
      } catch (error) {
        setAuthError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },

  signIn: async (email, password) => {
  setLoading(true);
  setAuthError(null);
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    await axios.post(
      `${API_URL}/jwt`,
      { email: result.user.email },
      { withCredentials: true }
    );
 setAuthSuccess('Login successful!'); // ✅ Add this
    return result;
  } catch (error) {
    // ✅ Friendly error mapping
    if (error.code === 'auth/user-not-found') {
      setAuthError("No account found with this email. Try signing up.");
    } else if (error.code === 'auth/wrong-password') {
      setAuthError("Incorrect password. Please try again.");
    } else if (error.code === 'auth/invalid-email') {
      setAuthError("Invalid email format.");
    } else {
      setAuthError("Login failed. Please check your credentials.");
    }

    throw error; // still throw for internal handling
  } finally {
    setLoading(false);
  }
},
     
    signInWithGoogle: async () => {
      setLoading(true);
      setAuthError(null);
      try {
        return await signInWithPopup(auth, googleProvider);
      } catch (error) {
        setAuthError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },

    logOut: async () => {
  setLoading(true);
  try {
    await signOut(auth);
    await axios.post(`${API_URL}/logout`, {}, { 
      withCredentials: true 
    });
  } catch (error) {
    setAuthError(error.message);
    throw error;
  } finally {
    setLoading(false);
  }
},
    


    resetPassword: async (email) => {
      setLoading(true);
      setAuthError(null);
      try {
        await sendPasswordResetEmail(auth, email);
        setAuthSuccess('Password reset email sent! Check your inbox.');
      } catch (error) {
        setAuthError(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  // Helper functions
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    return regex.test(password);
  };

  // Context value
  const authContextValue = {
    user,
    loading,
    error: authError,
    success: authSuccess,
    ...authActions,
    validatePassword,
    clearAuthState: () => {
      setAuthError(null);
      setAuthSuccess(null);
    }
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;