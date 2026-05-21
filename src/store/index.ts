'use client'
import { create } from 'zustand'
import { User } from 'firebase/auth'
import { StreakData, UserProfile } from '@/lib/firestore'

interface AppStore {
  user: User | null
  setUser: (u: User | null) => void
  streaks: StreakData | null
  setStreaks: (s: StreakData | null) => void
  profile: UserProfile | null
  setProfile: (p: UserProfile | null) => void
  activeTab: string
  setActiveTab: (t: string) => void
}

export const useStore = create<AppStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  streaks: null,
  setStreaks: (streaks) => set({ streaks }),
  profile: null,
  setProfile: (profile) => set({ profile }),
  activeTab: 'dashboard',
  setActiveTab: (activeTab) => set({ activeTab }),
}))
