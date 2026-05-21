'use client'
import { useStore } from '@/store'
import { useAuth } from './AuthProvider'
import {
  LayoutDashboard, Salad, Dumbbell, Brain,
  Code2, BookOpen, Activity, BarChart3, LogOut, ChevronRight
} from 'lucide-react'

const NAV = [
  { id: 'dashboard',   label: 'Dashboard',    Icon: LayoutDashboard },
  { id: 'diet',        label: 'Diet',          Icon: Salad },
  { id: 'workout',     label: 'Workout',       Icon: Dumbbell },
  { id: 'dsa',         label: 'DSA (A2Z)',     Icon: Brain },
  { id: 'analytics',   label: 'Analytics',     Icon: BarChart3 },
  { id: 'engineering', label: 'Engineering',   Icon: Code2 },
  { id: 'academics',   label: 'Academics',     Icon: BookOpen },
  { id: 'monitor',     label: 'Monitor',       Icon: Activity },
]

export default function Sidebar() {
  const { activeTab, setActiveTab, user, streaks, profile } = useStore()
  const { signOutUser } = useAuth()

  const streakItems = [
    { label: 'Diet',  val: streaks?.diet || 0,    color: '#ff8c42' },
    { label: 'Gym',   val: streaks?.workout || 0, color: '#a78bfa' },
    { label: 'DSA',   val: streaks?.dsa || 0,     color: '#c8f135' },
    { label: 'Code',  val: streaks?.engineering || 0, color: '#4d9fff' },
  ]

  return (
    <aside className="w-56 min-h-screen bg-[#111] border-r border-[#222] flex flex-col sticky top-0 h-screen overflow-hidden">
      {/* Logo + user */}
      <div className="px-5 py-5 border-b border-[#222]">
        <div className="font-mono text-[11px] text-[#c8f135] tracking-widest uppercase">Engineer OS</div>
        {profile?.name && <div className="text-[12px] text-white mt-0.5 font-medium">{profile.name}</div>}
        {user && <div className="text-[10px] text-[#444] truncate mt-0.5">{user.email}</div>}
        {profile && (
          <div className="flex gap-2 mt-2 text-[10px] font-mono text-[#444]">
            <span>BMI {profile.bmi}</span>
            <span>·</span>
            <span>{profile.proteinTarget}g protein</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-3 flex flex-col gap-0.5 overflow-y-auto">
        {NAV.map(({ id, label, Icon }) => {
          const active = activeTab === id
          return (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all w-full text-left
                ${active
                  ? 'bg-[rgba(200,241,53,0.08)] text-[#c8f135] border border-[rgba(200,241,53,0.18)]'
                  : 'text-[#555] hover:text-white hover:bg-[#1a1a1a] border border-transparent'}`}>
              <Icon size={15} />
              <span>{label}</span>
              {active && <ChevronRight size={12} className="ml-auto opacity-50" />}
            </button>
          )
        })}
      </nav>

      {/* Streaks */}
      <div className="px-3 pb-2">
        <div className="bg-[#1a1a1a] border border-[#222] rounded-xl p-3">
          <div className="font-mono text-[9px] tracking-widest text-[#333] uppercase mb-2">Streaks</div>
          <div className="grid grid-cols-2 gap-2">
            {streakItems.map(s => (
              <div key={s.label} className="text-center">
                <div className="font-mono text-xl font-bold" style={{ color: s.color }}>{s.val}</div>
                <div className="text-[10px] text-[#333]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sign out */}
      {user && (
        <button onClick={signOutUser}
          className="flex items-center gap-2 px-5 py-3 text-[#333] hover:text-[#ff4d4d] text-[12px] transition-colors border-t border-[#222]">
          <LogOut size={13} />
          <span>Sign out</span>
        </button>
      )}
    </aside>
  )
}
