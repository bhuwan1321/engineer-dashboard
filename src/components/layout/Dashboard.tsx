'use client'
import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import { getDailyLogs, getDSAEntries, getTasks, getStreaks, DailyLog, DSAEntry, Task } from '@/lib/firestore'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Zap, Moon, Beef, Brain, Code2, CheckSquare } from 'lucide-react'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-xs font-mono">
      <div className="text-[#666] mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { user, streaks, setStreaks } = useStore()
  const [logs, setLogs] = useState<DailyLog[]>([])
  const [dsaEntries, setDsaEntries] = useState<DSAEntry[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    Promise.all([
      getDailyLogs(user.uid, 30),
      getDSAEntries(user.uid),
      getTasks(user.uid),
      getStreaks(user.uid),
    ]).then(([l, d, t, s]) => {
      setLogs(l)
      setDsaEntries(d)
      setTasks(t)
      if (s) setStreaks(s)
      setLoading(false)
    })
  }, [user])

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-[#444] font-mono text-sm">Loading...</div>
  )

  const today = new Date().toISOString().split('T')[0]
  const todayLog = logs.find(l => l.date === today)
  const last14 = [...logs].reverse().slice(0, 14).reverse()
  const chartData = last14.map(l => ({
    date: l.date.slice(5),
    weight: l.weight,
    protein: l.protein,
    sleep: l.sleep,
  }))

  const avgProtein = logs.length ? Math.round(logs.reduce((a, l) => a + (l.protein || 0), 0) / logs.length) : 0
  const avgSleep = logs.length ? (logs.reduce((a, l) => a + (l.sleep || 0), 0) / logs.length).toFixed(1) : '—'
  const dsaThisWeek = dsaEntries.filter(e => {
    const d = new Date(e.date)
    const now = new Date()
    return (now.getTime() - d.getTime()) < 7 * 86400000
  }).length
  const openTasks = tasks.filter(t => t.status !== 'done').length
  const highPrio = tasks.filter(t => t.priority === 'high' && t.status !== 'done')

  const statCards = [
    { label: 'Weight', val: todayLog?.weight ? `${todayLog.weight}kg` : '—', Icon: TrendingUp, color: '#c8f135', sub: 'today' },
    { label: 'Protein', val: todayLog?.protein ? `${todayLog.protein}g` : '—', Icon: Beef, color: '#ff8c42', sub: `avg ${avgProtein}g` },
    { label: 'Sleep', val: todayLog?.sleep ? `${todayLog.sleep}h` : '—', Icon: Moon, color: '#4d9fff', sub: `avg ${avgSleep}h` },
    { label: 'Streak', val: String(streaks?.diet || 0), Icon: Zap, color: '#ff4d4d', sub: 'diet days' },
    { label: 'DSA this week', val: String(dsaThisWeek), Icon: Brain, color: '#a78bfa', sub: 'problems solved' },
    { label: 'Open tasks', val: String(openTasks), Icon: CheckSquare, color: '#4d9fff', sub: 'across all areas' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-lg font-bold text-white mb-1">Dashboard</div>
        <div className="text-[#555] text-sm">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {statCards.map(({ label, val, Icon, color, sub }) => (
          <div key={label} className="card">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase">{label}</div>
              <Icon size={14} style={{ color }} />
            </div>
            <div className="font-mono text-2xl font-bold text-white">{val}</div>
            <div className="text-[11px] text-[#555] mt-1">{sub}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      {chartData.length > 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card">
            <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-4">Weight trend</div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={chartData}>
                <XAxis dataKey="date" tick={{ fill: '#444', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#444', fontSize: 10 }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="weight" stroke="#c8f135" strokeWidth={2} dot={false} name="kg" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-4">Protein intake</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData}>
                <XAxis dataKey="date" tick={{ fill: '#444', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#444', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="protein" fill="#ff8c42" radius={[3, 3, 0, 0]} name="g" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* High priority tasks */}
      {highPrio.length > 0 && (
        <div className="card">
          <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">🔴 High priority tasks</div>
          <div className="space-y-2">
            {highPrio.slice(0, 5).map(t => (
              <div key={t.id} className="flex items-center justify-between py-2 border-b border-[#1a1a1a] last:border-0">
                <div>
                  <div className="text-sm text-white">{t.title}</div>
                  {t.dueDate && <div className="text-[11px] text-[#555]">Due: {t.dueDate}</div>}
                </div>
                <span className={`badge badge-${t.category === 'academic' ? 'blue' : t.category === 'interview' ? 'purple' : 'orange'}`}>
                  {t.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Streak summary */}
      <div className="card">
        <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-4">Streaks</div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Diet', val: streaks?.diet || 0, last: streaks?.lastDiet, color: '#ff8c42' },
            { label: 'Workout', val: streaks?.workout || 0, last: streaks?.lastWorkout, color: '#a78bfa' },
            { label: 'DSA', val: streaks?.dsa || 0, last: streaks?.lastDsa, color: '#c8f135' },
            { label: 'Engineering', val: streaks?.engineering || 0, last: streaks?.lastEngineering, color: '#4d9fff' },
          ].map(s => (
            <div key={s.label} className="bg-[#1a1a1a] border border-[#222] rounded-xl p-3 text-center">
              <div className="font-mono text-3xl font-bold mb-1" style={{ color: s.color }}>{s.val}</div>
              <div className="text-[11px] text-white font-medium">{s.label}</div>
              <div className="text-[10px] text-[#444] mt-0.5">{s.last ? `last: ${s.last}` : 'start today'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
