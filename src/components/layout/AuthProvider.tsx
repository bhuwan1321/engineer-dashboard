'use client'
import { createContext, useContext, useEffect, ReactNode } from 'react'
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useStore } from '@/store'

const AuthContext = createContext<{
  signIn: () => Promise<void>
  signOutUser: () => Promise<void>
}>({ signIn: async () => {}, signOutUser: async () => {} })

export function AuthProvider({ children }: { children: ReactNode }) {
  const setUser = useStore(s => s.setUser)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return () => unsub()
  }, [setUser])

  const signIn = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const signOutUser = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ signIn, signOutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
