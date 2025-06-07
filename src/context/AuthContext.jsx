// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  updateProfile, 
  updateEmail as updateUserEmail,
  updatePassword as updateUserPassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";
import { auth } from "../firebase/config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Email/Password signup (existing)
  function signup(email, password, displayName) {
    return createUserWithEmailAndPassword(auth, email, password).then((result) => {
      return updateProfile(result.user, {
        displayName: displayName,
      });
    });
  }

  // Email/Password login (existing)
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Google login
  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    // Optional: Add additional scopes if needed
    // provider.addScope('profile');
    // provider.addScope('email');
    return signInWithPopup(auth, provider);
  }

  // Logout (existing)
  function logout() {
    return signOut(auth);
  }

  // Update user profile
  async function updateUserProfile(displayName, photoURL) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user is currently logged in');
      
      await updateProfile(user, {
        displayName: displayName || user.displayName,
        photoURL: photoURL || user.photoURL
      });
      
      // Update current user state
      setCurrentUser({
        ...user,
        displayName: displayName || user.displayName,
        photoURL: photoURL || user.photoURL
      });
      
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }

  // Update email
  async function updateEmail(newEmail) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user is currently logged in');
      
      await updateUserEmail(user, newEmail);
      
      // Update current user state
      setCurrentUser({
        ...user,
        email: newEmail
      });
      
      return true;
    } catch (error) {
      console.error("Error updating email:", error);
      throw error;
    }
  }

  // Update password
  async function updatePassword(newPassword) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user is currently logged in');
      
      await updateUserPassword(user, newPassword);
      return true;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
    updateProfile: updateUserProfile,
    updateEmail,
    updatePassword
  };

  return (
    <AuthContext.Provider value={{
      currentUser, 
      signup, 
      login, 
      logout, 
      loginWithGoogle, 
      updateProfile: updateUserProfile 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
