import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from "../firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function signup(email, password, profile) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    if (profile && (profile.displayName || profile.photoURL)) {
      try {
        await updateProfile(userCredential.user, {
          displayName: profile.displayName,
          photoURL: profile.photoURL
        })
      } catch (e) {
        console.warn('No se pudo actualizar el perfil:', e)
      }
    }
    return userCredential
  }

  async function login(email, password) {
    return await signInWithEmailAndPassword(auth, email, password)
  }

  async function logout() {
    await firebaseSignOut(auth)
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    return await signInWithPopup(auth, provider)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser ? { uid: currentUser.uid, email: currentUser.email, displayName: currentUser.displayName, photoURL: currentUser.photoURL } : null)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = { user, signup, login, logout, signInWithGoogle }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
