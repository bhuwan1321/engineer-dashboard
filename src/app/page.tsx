'use client'
import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import { AuthProvider, useAuth } from '@/components/layout/AuthProvider'
import Sidebar from '@/components/layout/Sidebar'
import Dashboard from '@/components/layout/Dashboard'
import DietTracker from '@/components/diet/DietTracker'
import WorkoutTrackerV2 from '@/components/workout/WorkoutTrackerV2'
import StriverSheet from '@/components/dsa/StriverSheet'
import EngineeringTracker from '@/components/engineering/EngineeringTracker'
import AcademicsTracker from '@/components/academics/AcademicsTracker'
import MonitorPage from '@/components/monitor/MonitorPage'
import AnalyticsPage from '@/components/analytics/AnalyticsPage'
import Onboarding from '@/components/onboarding/Onboarding'
import { getProfile, getStreaks } from '@/lib/firestore'
import { Chrome } from 'lucide-react'

function AuthGate() {
  const { signIn } = useAuth()
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        <div className="font-mono text-[#c8f135] text-xs tracking-widest uppercase mb-6">Engineer OS v2</div>
        <h1 className="text-3xl font-bold text-white mb-3">Build yourself systematically</h1>
        <p className="text-[#555] text-sm mb-2 leading-relaxed">
          Striver's A2Z DSA sheet · Fitness tracking · Academics · Interview prep — one dashboard.
        </p>
        <p className="text-[#333] text-xs mb-8">Syncs to Firebase. Works across all devices.</p>
        <button onClick={signIn}
          className="btn w-full flex items-center justify-center gap-2 text-sm py-3">
          <Chrome size={16} /> Sign in with Google
        </button>
        <p className="text-[#222] text-xs mt-4">Your data is private to your Google account</p>
      </div>
    </div>
  )
}

function AppShell() {
  const { user, setProfile, profile, setStreaks, activeTab } = useStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    Promise.all([getProfile(user.uid), getStreaks(user.uid)]).then(([p, s]) => {
      if (p) setProfile(p)
      if (s) setStreaks(s)
      setLoading(false)
    })
  }, [user])

  if (!user) return <AuthGate />
  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="font-mono text-[#444] text-sm">Loading...</div>
    </div>
  )
  if (!profile?.onboarded) return <Onboarding onComplete={async () => {
    const p = await getProfile(user.uid)
    if (p) setProfile(p)
  }} />

  const pages: Record<string, React.ReactNode> = {
    dashboard:   <Dashboard />,
    diet:        <DietTracker />,
    workout:     <WorkoutTrackerV2 />,
    dsa:         <StriverSheet />,
    analytics:   <AnalyticsPage />,
    engineering: <EngineeringTracker />,
    academics:   <AcademicsTracker />,
    monitor:     <MonitorPage />,
  }

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        <div className="max-w-4xl mx-auto">
          {pages[activeTab] ?? <Dashboard />}
        </div>
      </main>
    </div>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  )
}
