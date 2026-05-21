'use client'
import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import { getDailyLogs, getDSAEntries, getTasks, getStreaks, DailyLog, DSAEntry, Task } from '@/lib/firestore'
import { Activity, Zap, Target, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

export default function MonitorPage() {
  const { user, setStreaks, streaks } = useStore()
  const [logs, setLogs] = useState<DailyLog[]>([])
  const [dsa, setDsa] = useState<DSAEntry[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    Promise.all([getDailyLogs(user.uid, 30), getDSAEntries(user.uid), getTasks(user.uid), getStreaks(user.uid)]).then(([l, d, t, s]) => {
      setLogs(l); setDsa(d); setTasks(t)
      if (s) setStreaks(s)
      setLoading(false)
    })
  }, [user])

  if (loading) return <div className="text-[#444] font-mono text-sm p-8">Loading...</div>

  const today = new Date().toISOString().split('T')[0]
  const todayLog = logs.find(l => l.date === today)
  const last7 = logs.filter(l => {
    const d = new Date(); d.setDate(d.getDate() - 7)
    return l.date >= d.toISOString().split('T')[0]
  })

  const avgProtein = last7.length ? Math.round(last7.reduce((a, l) => a + (l.protein || 0), 0) / last7.length) : 0
  const avgSleep = last7.length ? (last7.reduce((a, l) => a + (l.sleep || 0), 0) / last7.length).toFixed(1) : '0'
  const workoutDays = last7.filter(l => l.workout && l.workout !== 'none').length
  const dsaThisWeek = dsa.filter(e => {
    const d = new Date(); d.setDate(d.getDate() - 7)
    return e.date >= d.toISOString().split('T')[0]
  }).length
  const openHighPrio = tasks.filter(t => t.priority === 'high' && t.status !== 'done').length
  const overdueAcademic = tasks.filter(t => t.category === 'academic' && t.dueDate && t.dueDate < today && t.status !== 'done').length

  const checks = [
    { label: 'Protein on target today', ok: (todayLog?.protein || 0) >= 130, detail: todayLog?.protein ? `${todayLog.protein}g logged` : 'Not logged yet' },
    { label: '7-day avg protein ≥ 130g', ok: avgProtein >= 130, detail: `avg ${avgProtein}g` },
    { label: 'Sleep ≥ 6h today', ok: (todayLog?.sleep || 0) >= 6, detail: todayLog?.sleep ? `${todayLog.sleep}h` : 'Not logged yet' },
    { label: 'Avg sleep ≥ 6h (7 days)', ok: parseFloat(avgSleep) >= 6, detail: `avg ${avgSleep}h` },
    { label: 'Workout logged today', ok: !!todayLog?.workout && todayLog.workout !== 'none', detail: todayLog?.workout || 'Not done' },
    { label: '3+ workouts this week', ok: workoutDays >= 3, detail: `${workoutDays}/7 days` },
    { label: '2+ DSA problems this week', ok: dsaThisWeek >= 2, detail: `${dsaThisWeek} solved` },
    { label: 'No overdue academic tasks', ok: overdueAcademic === 0, detail: overdueAcademic > 0 ? `${overdueAcademic} overdue` : 'All clear' },
    { label: 'No high-prio tasks pending', ok: openHighPrio === 0, detail: openHighPrio > 0 ? `${openHighPrio} open` : 'All clear' },
    { label: 'Diet streak active', ok: (streaks?.diet || 0) > 0, detail: `${streaks?.diet || 0} days` },
    { label: 'DSA streak active', ok: (streaks?.dsa || 0) > 0, detail: `${streaks?.dsa || 0} days` },
    { label: 'Workout streak active', ok: (streaks?.workout || 0) > 0, detail: `${streaks?.workout || 0} days` },
  ]

  const score = checks.filter(c => c.ok).length
  const pct = Math.round((score / checks.length) * 100)

  // 30-day heatmap data
  const heatDays = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (29 - i))
    const dateStr = d.toISOString().split('T')[0]
    const log = logs.find(l => l.date === dateStr)
    const dsaCount = dsa.filter(e => e.date === dateStr).length
    let score = 0
    if (log?.protein && log.protein >= 130) score++
    if (log?.sleep && log.sleep >= 6) score++
    if (log?.workout && log.workout !== 'none') score++
    if (dsaCount > 0) score++
    return { date: dateStr, score, day: d.getDate() }
  })

  const heatColor = (s: number) => {
    if (s === 0) return 'bg-[#1a1a1a]'
    if (s === 1) return 'bg-[#c8f135]/20'
    if (s === 2) return 'bg-[#c8f135]/45'
    if (s === 3) return 'bg-[#c8f135]/70'
    return 'bg-[#c8f135]'
  }

  return (
    <div className="space-y-5">
      <div className="font-mono text-lg font-bold text-white">System Monitor</div>

      {/* Overall score */}
      <div className="card flex items-center gap-5">
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="34" fill="none" stroke="#1a1a1a" strokeWidth="8" />
            <circle cx="40" cy="40" r="34" fill="none"
              stroke={pct >= 75 ? '#c8f135' : pct >= 50 ? '#ff8c42' : '#ff4d4d'}
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * 213.6} 213.6`} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-mono text-lg font-bold text-white">{pct}%</div>
        </div>
        <div>
          <div className="text-white font-semibold text-base mb-0.5">
            {pct >= 75 ? 'On track 🟢' : pct >= 50 ? 'Needs attention 🟡' : 'Off track 🔴'}
          </div>
          <div className="text-[#555] text-sm">{score}/{checks.length} checks passing</div>
          <div className="text-[11px] text-[#444] mt-1">across diet, workout, DSA, academics</div>
        </div>
      </div>

      {/* Streak cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Diet', val: streaks?.diet || 0, last: streaks?.lastDiet, color: '#ff8c42', emoji: '🥗' },
          { label: 'Workout', val: streaks?.workout || 0, last: streaks?.lastWorkout, color: '#a78bfa', emoji: '🏋️' },
          { label: 'DSA', val: streaks?.dsa || 0, last: streaks?.lastDsa, color: '#c8f135', emoji: '🧠' },
          { label: 'Engineering', val: streaks?.engineering || 0, last: streaks?.lastEngineering, color: '#4d9fff', emoji: '⚡' },
        ].map(s => (
          <div key={s.label} className="card text-center">
            <div className="text-2xl mb-1">{s.emoji}</div>
            <div className="font-mono text-3xl font-bold" style={{ color: s.color }}>{s.val}</div>
            <div className="text-xs text-white mt-1">{s.label}</div>
            <div className="text-[10px] text-[#444] mt-0.5">{s.last ? `last: ${s.last.slice(5)}` : 'start today'}</div>
          </div>
        ))}
      </div>

      {/* 7-day summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Avg protein', val: `${avgProtein}g`, target: '130g', ok: avgProtein >= 130 },
          { label: 'Avg sleep', val: `${avgSleep}h`, target: '6h', ok: parseFloat(avgSleep) >= 6 },
          { label: 'Workouts', val: `${workoutDays}/7`, target: '4–5', ok: workoutDays >= 4 },
          { label: 'DSA problems', val: String(dsaThisWeek), target: '5+', ok: dsaThisWeek >= 5 },
        ].map(s => (
          <div key={s.label} className="card">
            <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-1">{s.label} (7d)</div>
            <div className={`font-mono text-2xl font-bold ${s.ok ? 'text-[#c8f135]' : 'text-[#ff8c42]'}`}>{s.val}</div>
            <div className="text-[11px] text-[#444] mt-1">target: {s.target}</div>
          </div>
        ))}
      </div>

      {/* Health checks */}
      <div className="card">
        <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Health checks</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {checks.map((c, i) => (
            <div key={i} className={`flex items-center gap-2.5 p-2.5 rounded-lg border ${c.ok ? 'border-[#c8f135]/15 bg-[#c8f135]/[0.02]' : 'border-[#ff4d4d]/15 bg-[#ff4d4d]/[0.02]'}`}>
              {c.ok ? <CheckCircle size={14} className="text-[#c8f135] flex-shrink-0" /> : <AlertTriangle size={14} className="text-[#ff8c42] flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white">{c.label}</div>
                <div className={`text-[10px] ${c.ok ? 'text-[#c8f135]' : 'text-[#ff8c42]'}`}>{c.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 30-day heatmap */}
      <div className="card">
        <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">30-day activity heatmap</div>
        <div className="flex flex-wrap gap-1.5">
          {heatDays.map(d => (
            <div key={d.date} className={`w-7 h-7 rounded-md ${heatColor(d.score)} flex items-center justify-center`}
              title={`${d.date}: ${d.score}/4 checks`}>
              <span className="text-[9px] font-mono text-white/60">{d.day}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-3 items-center">
          <span className="text-[10px] text-[#444]">Score 0</span>
          {[0,1,2,3,4].map(s => <div key={s} className={`w-4 h-4 rounded ${heatColor(s)}`} />)}
          <span className="text-[10px] text-[#444]">4 = perfect day</span>
        </div>
      </div>
    </div>
  )
}
