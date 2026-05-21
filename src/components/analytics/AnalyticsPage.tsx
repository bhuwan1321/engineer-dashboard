'use client'
import { useState, useEffect } from 'react'
import { useStore } from '@/store'
import { savePerformanceMetric, getPerformanceMetrics, getDailyLogs, getDSAEntries, PerformanceMetric, todayStr } from '@/lib/firestore'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const METRICS = [
  { key: 'focus', label: 'Focus', desc: 'How locked in were you? No distractions, deep work.', color: '#c8f135' },
  { key: 'consistency', label: 'Consistency', desc: 'Did you show up exactly as planned?', color: '#4d9fff' },
  { key: 'accuracy', label: 'Accuracy', desc: 'Quality of output — correct solutions, clean form.', color: '#ff8c42' },
  { key: 'precision', label: 'Precision', desc: 'Efficiency — max output per unit of time spent.', color: '#a78bfa' },
]

export default function AnalyticsPage() {
  const { user } = useStore()
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [logs, setLogs] = useState<any[]>([])
  const [dsaEntries, setDsaEntries] = useState<any[]>([])
  const [form, setForm] = useState({ category: 'dsa' as PerformanceMetric['category'], focus: 70, consistency: 70, accuracy: 70, precision: 70, notes: '' })
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<'overview' | 'log' | 'heatmap'>('overview')

  const load = async () => {
    if (!user) return
    const [m, l, d] = await Promise.all([getPerformanceMetrics(user.uid, 60), getDailyLogs(user.uid, 60), getDSAEntries(user.uid)])
    setMetrics(m); setLogs(l); setDsaEntries(d)
  }

  useEffect(() => { load() }, [user])

  const save = async () => {
    if (!user) return
    setSaving(true)
    await savePerformanceMetric(user.uid, { ...form, date: todayStr() })
    await load()
    setSaving(false)
  }

  // Aggregate scores by date
  const byDate: Record<string, { focus: number[], consistency: number[], accuracy: number[], precision: number[] }> = {}
  metrics.forEach(m => {
    if (!byDate[m.date]) byDate[m.date] = { focus: [], consistency: [], accuracy: [], precision: [] }
    byDate[m.date].focus.push(m.focus)
    byDate[m.date].consistency.push(m.consistency)
    byDate[m.date].accuracy.push(m.accuracy)
    byDate[m.date].precision.push(m.precision)
  })

  const chartData = Object.entries(byDate).sort(([a],[b]) => a.localeCompare(b)).slice(-21).map(([date, vals]) => ({
    date: date.slice(5),
    focus: Math.round(vals.focus.reduce((a,b)=>a+b,0)/vals.focus.length),
    consistency: Math.round(vals.consistency.reduce((a,b)=>a+b,0)/vals.consistency.length),
    accuracy: Math.round(vals.accuracy.reduce((a,b)=>a+b,0)/vals.accuracy.length),
    precision: Math.round(vals.precision.reduce((a,b)=>a+b,0)/vals.precision.length),
  }))

  // Overall averages
  const avg = (arr: number[]) => arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length) : 0
  const overallFocus = avg(metrics.map(m => m.focus))
  const overallConsistency = avg(metrics.map(m => m.consistency))
  const overallAccuracy = avg(metrics.map(m => m.accuracy))
  const overallPrecision = avg(metrics.map(m => m.precision))
  const performanceScore = Math.round((overallFocus + overallConsistency + overallAccuracy + overallPrecision) / 4)

  const radarData = [
    { metric: 'Focus', value: overallFocus },
    { metric: 'Consistency', value: overallConsistency },
    { metric: 'Accuracy', value: overallAccuracy },
    { metric: 'Precision', value: overallPrecision },
  ]

  // 60-day heatmap (4 pillars merged)
  const heatmapDays = Array.from({ length: 60 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (59 - i))
    const dateStr = d.toISOString().split('T')[0]
    const log = logs.find(l => l.date === dateStr)
    const dsa = dsaEntries.filter(e => e.date === dateStr).length
    const dayMetrics = metrics.filter(m => m.date === dateStr)
    let score = 0
    if (log?.protein && log.protein >= 100) score++
    if (log?.sleep && log.sleep >= 6) score++
    if (log?.workout && log.workout !== 'none') score++
    if (dsa > 0) score++
    if (dayMetrics.length > 0) {
      const avgScore = avg(dayMetrics.flatMap(m => [m.focus, m.consistency, m.accuracy, m.precision]))
      if (avgScore >= 70) score++
    }
    return { date: dateStr, score, day: d.getDate(), month: d.toLocaleString('default', { month: 'short' }) }
  })

  const heatColor = (s: number) => {
    if (s === 0) return '#111'
    if (s === 1) return 'rgba(200,241,53,0.15)'
    if (s === 2) return 'rgba(200,241,53,0.35)'
    if (s === 3) return 'rgba(200,241,53,0.6)'
    if (s === 4) return 'rgba(200,241,53,0.8)'
    return '#c8f135'
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
      <div className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-xs font-mono">
        <div className="text-[#666] mb-1">{label}</div>
        {payload.map((p: any) => <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</div>)}
      </div>
    )
  }

  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'S', color: '#c8f135', label: 'Elite' }
    if (score >= 80) return { grade: 'A', color: '#4d9fff', label: 'Strong' }
    if (score >= 70) return { grade: 'B', color: '#a78bfa', label: 'Good' }
    if (score >= 60) return { grade: 'C', color: '#ff8c42', label: 'Average' }
    return { grade: 'D', color: '#ff4d4d', label: 'Needs work' }
  }

  const TABS = [{ id: 'overview', label: 'Overview' }, { id: 'log', label: 'Log today' }, { id: 'heatmap', label: 'Heatmap' }]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="font-mono text-lg font-bold text-white">Performance Analytics</div>
        {performanceScore > 0 && (
          <div className="text-center">
            <div className="font-mono text-3xl font-bold" style={{ color: getGrade(performanceScore).color }}>
              {getGrade(performanceScore).grade}
            </div>
            <div className="text-[10px] text-[#444]">{getGrade(performanceScore).label}</div>
          </div>
        )}
      </div>

      <div className="flex gap-1 bg-[#111] border border-[#222] rounded-lg p-1">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id as any)}
            className={`flex-1 py-1.5 rounded-md text-xs font-mono transition-all
              ${tab === t.id ? 'bg-[#c8f135] text-black font-bold' : 'text-[#555] hover:text-white'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-4">
          {/* Score cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {METRICS.map(m => {
              const val = m.key === 'focus' ? overallFocus : m.key === 'consistency' ? overallConsistency : m.key === 'accuracy' ? overallAccuracy : overallPrecision
              const g = getGrade(val)
              return (
                <div key={m.key} className="card">
                  <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-2">{m.label}</div>
                  <div className="flex items-end gap-2 mb-2">
                    <div className="font-mono text-3xl font-bold" style={{ color: m.color }}>{val || '—'}</div>
                    {val > 0 && <div className="font-mono text-sm mb-1" style={{ color: g.color }}>{g.grade}</div>}
                  </div>
                  <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${val}%`, background: m.color }} />
                  </div>
                  <div className="text-[10px] text-[#444] mt-1.5">{m.desc}</div>
                </div>
              )
            })}
          </div>

          {/* Radar + Line chart */}
          {metrics.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="card">
                <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-2">Performance radar</div>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#222" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: '#555', fontSize: 11, fontFamily: 'Space Mono' }} />
                    <Radar name="Score" dataKey="value" stroke="#c8f135" fill="#c8f135" fillOpacity={0.15} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              {chartData.length > 1 && (
                <div className="card">
                  <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-2">Trend (21 days)</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={chartData}>
                      <XAxis dataKey="date" tick={{ fill: '#444', fontSize: 9 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} tick={{ fill: '#444', fontSize: 9 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="focus" stroke="#c8f135" dot={false} strokeWidth={1.5} name="Focus" />
                      <Line type="monotone" dataKey="consistency" stroke="#4d9fff" dot={false} strokeWidth={1.5} name="Consistency" />
                      <Line type="monotone" dataKey="accuracy" stroke="#ff8c42" dot={false} strokeWidth={1.5} name="Accuracy" />
                      <Line type="monotone" dataKey="precision" stroke="#a78bfa" dot={false} strokeWidth={1.5} name="Precision" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          )}

          {/* What each metric means */}
          <div className="card">
            <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">How to improve each metric</div>
            <div className="space-y-3">
              {[
                { label: 'Focus ↑', color: '#c8f135', tip: 'Phone in another room. Pomodoro 25/5. One tab open. No music with lyrics.' },
                { label: 'Consistency ↑', color: '#4d9fff', tip: 'Same time every day. Log everything, even bad days. Reduce friction — gym bag ready the night before.' },
                { label: 'Accuracy ↑', color: '#ff8c42', tip: 'For DSA: understand the pattern, not just the answer. For gym: film yourself occasionally, check form.' },
                { label: 'Precision ↑', color: '#a78bfa', tip: 'Time-box tasks. Stop when the timer ends. Track time per problem. Cut warmup fluff.' },
              ].map(t => (
                <div key={t.label} className="flex gap-3">
                  <div className="font-mono text-xs font-bold w-24 flex-shrink-0 pt-0.5" style={{ color: t.color }}>{t.label}</div>
                  <div className="text-[12px] text-[#666]">{t.tip}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'log' && (
        <div className="card space-y-4">
          <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase">Rate today's performance</div>
          <div>
            <label className="text-[11px] text-[#555] mb-2 block">Category</label>
            <div className="flex gap-2 flex-wrap">
              {(['dsa','workout','study','overall'] as const).map(c => (
                <button key={c} onClick={() => setForm(f => ({ ...f, category: c }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border capitalize transition-all
                    ${form.category === c ? 'border-[#c8f135] text-[#c8f135]' : 'border-[#222] text-[#555]'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          {METRICS.map(m => {
            const val = form[m.key as keyof typeof form] as number
            return (
              <div key={m.key}>
                <div className="flex justify-between mb-1">
                  <label className="text-[11px] text-[#555] uppercase tracking-widest">{m.label}</label>
                  <span className="font-mono text-sm font-bold" style={{ color: m.color }}>{val}/100</span>
                </div>
                <input type="range" min={0} max={100} value={val}
                  onChange={e => setForm(f => ({ ...f, [m.key]: parseInt(e.target.value) }))}
                  className="w-full" style={{ accentColor: m.color }} />
                <div className="text-[10px] text-[#444] mt-0.5">{m.desc}</div>
              </div>
            )
          })}
          <div>
            <label className="text-[11px] text-[#555] mb-1 block uppercase tracking-widest">Notes (optional)</label>
            <input className="inp" placeholder="What went well / what blocked you?" value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
          </div>
          <button className="btn w-full" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Log Performance →'}</button>
        </div>
      )}

      {tab === 'heatmap' && (
        <div className="card space-y-4">
          <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase">60-day activity heatmap</div>
          <div className="text-[11px] text-[#555]">Each cell = 1 day. Score 0–5: protein hit + sleep + workout + DSA + performance rating.</div>

          {/* Heatmap grid — 10 rows of 6 */}
          <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(10, 1fr)' }}>
            {heatmapDays.map((d, i) => (
              <div key={i} title={`${d.date}: score ${d.score}/5`}
                className="aspect-square rounded-md flex items-center justify-center cursor-default transition-all hover:scale-110"
                style={{ background: heatColor(d.score) }}>
                <span className="text-[8px] font-mono" style={{ color: d.score >= 3 ? '#0a0a0a' : '#444' }}>{d.day}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#444]">0</span>
            {[0,1,2,3,4,5].map(s => (
              <div key={s} className="w-4 h-4 rounded" style={{ background: heatColor(s) }} />
            ))}
            <span className="text-[10px] text-[#444]">5 = perfect day</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#1a1a1a]">
            <div className="text-center">
              <div className="font-mono text-xl font-bold text-[#c8f135]">{heatmapDays.filter(d => d.score >= 3).length}</div>
              <div className="text-[10px] text-[#444]">great days</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-xl font-bold text-white">{heatmapDays.filter(d => d.score > 0).length}</div>
              <div className="text-[10px] text-[#444]">active days</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-xl font-bold text-[#ff4d4d]">{heatmapDays.filter(d => d.score === 0).length}</div>
              <div className="text-[10px] text-[#444]">missed days</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
