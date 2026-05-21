'use client'
import { useState, useEffect } from 'react'
import { useStore } from '@/store'
import { saveDSAEntry, getDSAEntries, updateStreak, DSAEntry, todayStr } from '@/lib/firestore'
import { DSA_CURRICULUM, YOUTUBE_CHANNELS, SDE_ROADMAP } from '@/lib/curriculum'
import { ExternalLink, CheckCircle, Circle, Youtube, Map } from 'lucide-react'

type Tab = 'today' | 'curriculum' | 'log' | 'roadmap' | 'youtube'

export default function DSATracker() {
  const { user } = useStore()
  const [tab, setTab] = useState<Tab>('today')
  const [entries, setEntries] = useState<DSAEntry[]>([])
  const [form, setForm] = useState({ topic: '', problem: '', difficulty: 'medium' as DSAEntry['difficulty'], status: 'solved' as DSAEntry['status'], platform: 'LeetCode', timeMinutes: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState(DSA_CURRICULUM[0].id)

  useEffect(() => {
    if (!user) return
    getDSAEntries(user.uid).then(setEntries)
  }, [user])

  const save = async () => {
    if (!user || !form.problem || !form.topic) return
    setSaving(true)
    await saveDSAEntry(user.uid, { ...form, date: todayStr(), timeMinutes: form.timeMinutes ? parseInt(form.timeMinutes) : undefined })
    await updateStreak(user.uid, 'dsa')
    const fresh = await getDSAEntries(user.uid)
    setEntries(fresh)
    setForm(f => ({ ...f, problem: '', notes: '' }))
    setSaving(false)
  }

  const todayEntries = entries.filter(e => e.date === todayStr())
  const totalSolved = entries.filter(e => e.status === 'solved').length
  const byTopic = DSA_CURRICULUM.reduce((acc, t) => {
    acc[t.id] = entries.filter(e => e.topic === t.id).length
    return acc
  }, {} as Record<string, number>)

  const currentTopic = DSA_CURRICULUM.find(t => t.id === selectedTopic)!

  // Daily problem suggestion based on day of week
  const dayOfWeek = new Date().getDay()
  const suggestedTopic = DSA_CURRICULUM[dayOfWeek % DSA_CURRICULUM.length]
  const solvedIds = new Set(entries.filter(e => e.status === 'solved').map(e => e.problem))
  const todayProblem = suggestedTopic.problems.find(p => !solvedIds.has(p.title))

  const TABS: { id: Tab; label: string }[] = [
    { id: 'today', label: "Today's Problem" },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'log', label: 'Log Entry' },
    { id: 'roadmap', label: 'SDE Roadmap' },
    { id: 'youtube', label: 'Resources' },
  ]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="font-mono text-lg font-bold text-white">DSA Tracker</div>
        <div className="flex gap-3 font-mono text-sm">
          <span className="text-[#c8f135]">{totalSolved}</span><span className="text-[#444]">solved</span>
          <span className="text-[#ff8c42]">{todayEntries.length}</span><span className="text-[#444]">today</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#111] border border-[#222] rounded-lg p-1 overflow-x-auto">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-all
              ${tab === t.id ? 'bg-[#c8f135] text-black font-bold' : 'text-[#555] hover:text-white'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* TODAY */}
      {tab === 'today' && (
        <div className="space-y-4">
          {todayProblem ? (
            <div className="card border-[#c8f135]/20">
              <div className="text-[10px] font-mono tracking-widest text-[#c8f135] uppercase mb-3">
                Today's Problem — {suggestedTopic.name}
              </div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="text-white font-semibold text-base mb-1">{todayProblem.title}</div>
                  <div className="flex gap-2">
                    <span className={`badge badge-${todayProblem.difficulty === 'easy' ? 'green' : todayProblem.difficulty === 'medium' ? 'orange' : 'red'}`}>
                      {todayProblem.difficulty.toUpperCase()}
                    </span>
                    <span className="badge badge-muted">{todayProblem.platform}</span>
                    <span className="badge badge-blue">{todayProblem.concept}</span>
                    {todayProblem.mustSolve && <span className="badge badge-purple">MUST SOLVE</span>}
                  </div>
                </div>
                <a href={todayProblem.url} target="_blank" rel="noreferrer"
                  className="btn flex items-center gap-1.5 whitespace-nowrap text-xs">
                  Solve <ExternalLink size={11} />
                </a>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-3 text-[12px] text-[#555]">
                Watch: <a href={suggestedTopic.youtubePlaylist} target="_blank" rel="noreferrer"
                  className="text-[#c8f135] hover:underline">{suggestedTopic.youtubeChannel} →</a>
              </div>
            </div>
          ) : (
            <div className="card text-center py-8">
              <CheckCircle size={32} className="text-[#c8f135] mx-auto mb-2" />
              <div className="text-white font-medium">All problems in this topic solved!</div>
              <div className="text-[#555] text-sm mt-1">Move to the next topic</div>
            </div>
          )}

          {/* Today log */}
          {todayEntries.length > 0 && (
            <div className="card">
              <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Solved today</div>
              <div className="space-y-2">
                {todayEntries.map((e, i) => (
                  <div key={i} className="flex items-center gap-2 py-1">
                    <CheckCircle size={14} className="text-[#c8f135] flex-shrink-0" />
                    <span className="text-sm text-white">{e.problem}</span>
                    <span className={`badge badge-${e.difficulty === 'easy' ? 'green' : e.difficulty === 'medium' ? 'orange' : 'red'} ml-auto`}>{e.difficulty}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress bars */}
          <div className="card">
            <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Topic progress</div>
            <div className="space-y-2.5">
              {DSA_CURRICULUM.map(t => {
                const done = byTopic[t.id] || 0
                const total = t.problems.length
                const pct = Math.min(100, Math.round((done / total) * 100))
                return (
                  <div key={t.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#888]">{t.name}</span>
                      <span className="font-mono text-[#555]">{done}/{total}</span>
                    </div>
                    <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div className="h-full bg-[#c8f135] rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* CURRICULUM */}
      {tab === 'curriculum' && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {DSA_CURRICULUM.map(t => (
              <button key={t.id} onClick={() => setSelectedTopic(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all
                  ${selectedTopic === t.id ? 'border-[#c8f135] text-[#c8f135] bg-[#c8f135]/05' : 'border-[#222] text-[#555] hover:border-[#444]'}`}>
                Wk{t.week} {t.name}
              </button>
            ))}
          </div>
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-white font-semibold">{currentTopic.name}</div>
                <div className="text-[11px] text-[#555]">Week {currentTopic.week}</div>
              </div>
              <a href={currentTopic.youtubePlaylist} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-[11px] text-[#ff4d4d] hover:underline">
                <Youtube size={13} /> {currentTopic.youtubeChannel}
              </a>
            </div>
            <div className="space-y-2">
              {currentTopic.problems.map(p => {
                const solved = solvedIds.has(p.title)
                return (
                  <div key={p.id} className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all
                    ${solved ? 'border-[#c8f135]/20 bg-[#c8f135]/[0.03]' : 'border-[#1a1a1a] hover:border-[#333]'}`}>
                    {solved ? <CheckCircle size={15} className="text-[#c8f135] flex-shrink-0" /> : <Circle size={15} className="text-[#333] flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${solved ? 'text-[#555] line-through' : 'text-white'}`}>{p.title}</div>
                      <div className="text-[11px] text-[#444]">{p.concept} · {p.platform}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {p.mustSolve && <span className="badge badge-purple text-[9px]">MUST</span>}
                      <span className={`badge badge-${p.difficulty === 'easy' ? 'green' : p.difficulty === 'medium' ? 'orange' : 'red'} text-[9px]`}>{p.difficulty.toUpperCase()}</span>
                      <a href={p.url} target="_blank" rel="noreferrer" className="text-[#444] hover:text-white ml-1">
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* LOG ENTRY */}
      {tab === 'log' && (
        <div className="card space-y-3">
          <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase">Log a Problem</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-[11px] text-[#555] mb-1 block">Problem title</label>
              <input className="inp" placeholder="e.g. Two Sum" value={form.problem} onChange={e => setForm(f => ({ ...f, problem: e.target.value }))} />
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Topic</label>
              <select className="inp" value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}>
                <option value="">Select topic</option>
                {DSA_CURRICULUM.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Platform</label>
              <select className="inp" value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}>
                <option>LeetCode</option><option>GFG</option><option>Codeforces</option><option>HackerRank</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Difficulty</label>
              <select className="inp" value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value as DSAEntry['difficulty'] }))}>
                <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Status</label>
              <select className="inp" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as DSAEntry['status'] }))}>
                <option value="solved">Solved</option><option value="attempted">Attempted</option><option value="revisit">Need revisit</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Time (minutes)</label>
              <input type="number" className="inp" placeholder="25" value={form.timeMinutes} onChange={e => setForm(f => ({ ...f, timeMinutes: e.target.value }))} />
            </div>
            <div className="col-span-2">
              <label className="text-[11px] text-[#555] mb-1 block">Notes / approach</label>
              <input className="inp" placeholder="Used sliding window pattern..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
            </div>
          </div>
          <button className="btn w-full" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Log Problem →'}</button>

          {/* Recent entries */}
          {entries.length > 0 && (
            <div className="mt-4 border-t border-[#222] pt-4">
              <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Recent (last 10)</div>
              <div className="space-y-1.5">
                {entries.slice(0, 10).map((e, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm py-1 border-b border-[#111] last:border-0">
                    <span className="text-[#555] font-mono text-[10px] w-20">{e.date}</span>
                    <span className="text-white flex-1">{e.problem}</span>
                    <span className={`badge badge-${e.status === 'solved' ? 'green' : e.status === 'attempted' ? 'orange' : 'blue'} text-[9px]`}>{e.status}</span>
                    <span className={`badge badge-${e.difficulty === 'easy' ? 'green' : e.difficulty === 'medium' ? 'orange' : 'red'} text-[9px]`}>{e.difficulty[0].toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SDE ROADMAP */}
      {tab === 'roadmap' && (
        <div className="space-y-3">
          {SDE_ROADMAP.map(phase => (
            <div key={phase.phase} className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 rounded-full border-2 border-[#c8f135] flex items-center justify-center font-mono text-[11px] text-[#c8f135] font-bold flex-shrink-0">
                  {phase.phase}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{phase.title}</div>
                  <div className="text-[11px] font-mono text-[#444]">Weeks {phase.weeks}</div>
                </div>
              </div>
              <div className="pl-10 space-y-1.5">
                {phase.topics.map((t, i) => (
                  <div key={i} className="flex items-start gap-2 text-[12px] text-[#777]">
                    <span className="text-[#333] mt-0.5">▸</span> {t}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* YOUTUBE */}
      {tab === 'youtube' && (
        <div className="space-y-3">
          <div className="card">
            <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Recommended channels</div>
            <div className="space-y-2">
              {YOUTUBE_CHANNELS.map(c => (
                <a key={c.name} href={c.url} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-[#1a1a1a] hover:border-[#333] transition-all group">
                  <Youtube size={18} className="text-[#ff4d4d] flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm text-white font-medium group-hover:text-[#c8f135] transition-colors">{c.name}</div>
                    <div className="text-[11px] text-[#444]">{c.focus}</div>
                  </div>
                  <ExternalLink size={12} className="text-[#333] group-hover:text-[#c8f135]" />
                </a>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Striver's sheets</div>
            <div className="space-y-2">
              {[
                { name: 'A2Z DSA Sheet', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/', desc: '455 problems, full curriculum' },
                { name: 'SDE Sheet', url: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/', desc: 'Top interview problems' },
                { name: 'DP Series Playlist', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0qUlt5H_kiKYaNSqJ81PMMY', desc: '56 videos covering all DP patterns' },
                { name: 'NeetCode 150', url: 'https://neetcode.io/practice', desc: '150 must-solve LeetCode problems' },
              ].map(l => (
                <a key={l.name} href={l.url} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-[#1a1a1a] hover:border-[#c8f135]/30 transition-all group">
                  <Map size={16} className="text-[#c8f135] flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm text-white font-medium">{l.name}</div>
                    <div className="text-[11px] text-[#444]">{l.desc}</div>
                  </div>
                  <ExternalLink size={12} className="text-[#333] group-hover:text-[#c8f135]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
