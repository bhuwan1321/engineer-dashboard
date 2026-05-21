'use client'
import { useState, useEffect } from 'react'
import { useStore } from '@/store'
import { STRIVER_A2Z, getTotalProblems, getMustSolveCount, Step, SubTopic } from '@/lib/striver'
import { getDSAEntries, saveDSAEntry, updateStreak, todayStr, DSAEntry } from '@/lib/firestore'
import { ExternalLink, ChevronDown, ChevronRight, CheckCircle, Circle, Youtube, Lock, Unlock, Brain } from 'lucide-react'

const STEP_COLORS = ['#c8f135','#4d9fff','#ff8c42','#a78bfa','#ff4d4d','#4d9fff','#c8f135','#ff8c42','#a78bfa','#4d9fff','#c8f135','#ff8c42','#a78bfa','#4d9fff','#c8f135','#ff8c42']

export default function StriverSheet() {
  const { user } = useStore()
  const [entries, setEntries] = useState<DSAEntry[]>([])
  const [expandedStep, setExpandedStep] = useState<number | null>(1)
  const [expandedSub, setExpandedSub] = useState<string | null>('1.1')
  const [filter, setFilter] = useState<'all' | 'pending' | 'solved' | 'must'>('all')
  const [saving, setSaving] = useState<string | null>(null)
  const [view, setView] = useState<'sheet' | 'today' | 'stats'>('sheet')

  const load = async () => {
    if (!user) return
    const e = await getDSAEntries(user.uid)
    setEntries(e)
  }

  useEffect(() => { load() }, [user])

  const solvedSet = new Set(entries.filter(e => e.status === 'solved').map(e => e.problem))
  const attemptedSet = new Set(entries.filter(e => e.status === 'attempted').map(e => e.problem))
  const revisitSet = new Set(entries.filter(e => e.status === 'revisit').map(e => e.problem))

  const markSolved = async (title: string, topic: string, difficulty: 'easy' | 'medium' | 'hard') => {
    if (!user) return
    setSaving(title)
    if (solvedSet.has(title)) {
      // toggle off — just mark as revisit
      await saveDSAEntry(user.uid, { topic, problem: title, difficulty, status: 'revisit', date: todayStr(), platform: 'LeetCode', understood: false })
    } else {
      await saveDSAEntry(user.uid, { topic, problem: title, difficulty, status: 'solved', date: todayStr(), platform: 'LeetCode', understood: true })
      await updateStreak(user.uid, 'dsa')
    }
    await load()
    setSaving(null)
  }

  const totalProbs = getTotalProblems()
  const mustSolve = getMustSolveCount()
  const totalSolved = STRIVER_A2Z.reduce((t, step) =>
    t + step.subTopics.reduce((st, sub) =>
      st + sub.problems.filter(p => solvedSet.has(p.title)).length, 0), 0)
  const mustSolved = STRIVER_A2Z.reduce((t, step) =>
    t + step.subTopics.reduce((st, sub) =>
      st + sub.problems.filter(p => p.mustSolve && solvedSet.has(p.title)).length, 0), 0)

  // Today's recommended problems — pick from current incomplete step
  const currentStep = STRIVER_A2Z.find(s =>
    s.subTopics.some(sub => sub.problems.some(p => !solvedSet.has(p.title)))
  )
  const todayProbs = currentStep?.subTopics.flatMap(sub =>
    sub.problems.filter(p => !solvedSet.has(p.title) && p.mustSolve).slice(0, 2)
  ).slice(0, 5) || []

  // Step-by-step completion
  const stepProgress = STRIVER_A2Z.map(step => {
    const total = step.subTopics.reduce((t, sub) => t + sub.problems.length, 0)
    const solved = step.subTopics.reduce((t, sub) => t + sub.problems.filter(p => solvedSet.has(p.title)).length, 0)
    return { step: step.step, total, solved, pct: total ? Math.round(solved / total * 100) : 0 }
  })

  const diffColor = (d: string) => d === 'easy' ? 'badge-green' : d === 'medium' ? 'badge-orange' : 'badge-red'

  const getProblemStatus = (title: string) => {
    if (solvedSet.has(title)) return 'solved'
    if (revisitSet.has(title)) return 'revisit'
    if (attemptedSet.has(title)) return 'attempted'
    return 'pending'
  }

  const TABS = [{ id: 'sheet', label: 'Full Sheet' }, { id: 'today', label: "Today's Plan" }, { id: 'stats', label: 'Stats' }]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-lg font-bold text-white">Striver's A2Z Sheet</div>
          <div className="text-[#555] text-sm mt-0.5">{totalProbs} problems · {STRIVER_A2Z.length} steps · follow in order</div>
        </div>
        <a href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/"
          target="_blank" rel="noreferrer"
          className="flex items-center gap-1.5 text-[11px] text-[#c8f135] border border-[#c8f135]/30 rounded-lg px-3 py-1.5 hover:bg-[#c8f135]/05 transition-all flex-shrink-0">
          <ExternalLink size={11} /> Official sheet
        </a>
      </div>

      {/* Overall progress */}
      <div className="card">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[
            { label: 'Total solved', val: totalSolved, total: totalProbs, color: '#c8f135' },
            { label: 'Must-solve done', val: mustSolved, total: mustSolve, color: '#ff8c42' },
            { label: 'Steps started', val: stepProgress.filter(s => s.solved > 0).length, total: STRIVER_A2Z.length, color: '#4d9fff' },
            { label: 'Steps complete', val: stepProgress.filter(s => s.pct === 100).length, total: STRIVER_A2Z.length, color: '#a78bfa' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-1">{s.label}</div>
              <div className="font-mono text-2xl font-bold" style={{ color: s.color }}>{s.val}<span className="text-[#333] text-sm">/{s.total}</span></div>
              <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden mt-2">
                <div className="h-full rounded-full transition-all" style={{ width: `${Math.round(s.val/s.total*100)}%`, background: s.color }} />
              </div>
            </div>
          ))}
        </div>
        <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div className="h-full bg-[#c8f135] rounded-full transition-all" style={{ width: `${Math.round(totalSolved/totalProbs*100)}%` }} />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-[#444] mt-1">
          <span>0%</span>
          <span>{Math.round(totalSolved/totalProbs*100)}% complete</span>
          <span>100%</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#111] border border-[#222] rounded-lg p-1">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setView(t.id as any)}
            className={`flex-1 py-1.5 rounded-md text-xs font-mono transition-all
              ${view === t.id ? 'bg-[#c8f135] text-black font-bold' : 'text-[#555] hover:text-white'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* TODAY'S PLAN */}
      {view === 'today' && (
        <div className="space-y-3">
          {currentStep && (
            <div className="card border-[#c8f135]/20">
              <div className="text-[10px] font-mono tracking-widest text-[#c8f135] uppercase mb-1">Currently on</div>
              <div className="text-base font-semibold text-white mb-0.5">Step {currentStep.step}: {currentStep.title}</div>
              <div className="text-[11px] text-[#555] mb-3">{currentStep.description}</div>
              <a href="https://www.youtube.com/@takeUforward" target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-[11px] text-[#ff4d4d] hover:underline">
                <Youtube size={12} /> Watch Striver's videos for this step first
              </a>
            </div>
          )}

          <div className="card">
            <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Today's must-solve problems</div>
            {todayProbs.length === 0 ? (
              <div className="text-center py-6 text-[#c8f135] font-mono text-sm">All must-solve done in current step! 🎉</div>
            ) : (
              <div className="space-y-2">
                {todayProbs.map(p => (
                  <div key={p.title} className="flex items-center gap-3 p-3 rounded-lg border border-[#1a1a1a] hover:border-[#333] transition-all">
                    <button onClick={() => markSolved(p.title, currentStep?.title || '', p.difficulty)} disabled={saving === p.title}>
                      {solvedSet.has(p.title)
                        ? <CheckCircle size={16} className="text-[#c8f135]" />
                        : <Circle size={16} className="text-[#333]" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${solvedSet.has(p.title) ? 'line-through text-[#444]' : 'text-white'}`}>{p.title}</div>
                      <div className="text-[11px] text-[#444]">{p.platform}</div>
                    </div>
                    <span className={`badge ${diffColor(p.difficulty)} text-[9px]`}>{p.difficulty[0].toUpperCase()}</span>
                    <a href={p.url} target="_blank" rel="noreferrer" className="text-[#444] hover:text-[#c8f135] transition-colors">
                      <ExternalLink size={13} />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rules to follow */}
          <div className="card">
            <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Rules for each problem</div>
            <div className="space-y-2">
              {[
                ['Watch Striver\'s video FIRST', 'Don\'t try to brute force before understanding the approach'],
                ['Code without looking after watching', 'Close the video, code it yourself'],
                ['Re-solve after 2 days', 'Come back and solve it cold — no hints'],
                ['Mark understood only if you can explain it', 'Explain the approach to yourself in plain English'],
                ['Minimum 5 problems per day', '3 new + 2 revision — this is how retention works'],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-2 py-1.5 border-b border-[#111] last:border-0">
                  <span className="text-[#c8f135] flex-shrink-0 mt-0.5">▸</span>
                  <div>
                    <div className="text-sm text-white">{t}</div>
                    <div className="text-[11px] text-[#444]">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STATS */}
      {view === 'stats' && (
        <div className="space-y-3">
          <div className="card">
            <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Progress per step</div>
            <div className="space-y-2.5">
              {STRIVER_A2Z.map((step, i) => {
                const prog = stepProgress[i]
                return (
                  <div key={step.step}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[#888]">
                        <span className="font-mono" style={{ color: STEP_COLORS[i] }}>Step {step.step}</span>
                        <span className="text-[#555] ml-2">{step.title}</span>
                      </span>
                      <span className="font-mono text-[#555]">{prog.solved}/{prog.total}</span>
                    </div>
                    <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${prog.pct}%`, background: STEP_COLORS[i] }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Difficulty breakdown */}
          <div className="card">
            <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">By difficulty</div>
            <div className="grid grid-cols-3 gap-3">
              {(['easy','medium','hard'] as const).map(d => {
                const allProbs = STRIVER_A2Z.flatMap(s => s.subTopics.flatMap(sub => sub.problems.filter(p => p.difficulty === d)))
                const solved = allProbs.filter(p => solvedSet.has(p.title)).length
                return (
                  <div key={d} className="text-center">
                    <div className={`font-mono text-2xl font-bold`} style={{ color: d === 'easy' ? '#c8f135' : d === 'medium' ? '#ff8c42' : '#ff4d4d' }}>
                      {solved}
                    </div>
                    <div className="text-[11px] text-[#555] capitalize">{d}</div>
                    <div className="text-[10px] text-[#333]">of {allProbs.length}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recent activity */}
          <div className="card">
            <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Recent activity</div>
            {entries.length === 0 ? (
              <div className="text-[#444] text-sm text-center py-4">No entries yet — start solving!</div>
            ) : (
              <div className="space-y-1.5">
                {entries.slice(0, 10).map((e, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5 border-b border-[#111] last:border-0">
                    <span className="text-[#444] font-mono text-[10px] w-14 flex-shrink-0">{e.date.slice(5)}</span>
                    <span className="flex-1 text-sm text-white truncate">{e.problem}</span>
                    {e.understood && <Brain size={11} className="text-[#c8f135] flex-shrink-0" />}
                    <span className={`badge ${diffColor(e.difficulty)} text-[9px]`}>{e.difficulty[0].toUpperCase()}</span>
                    <span className={`badge text-[9px] ${e.status === 'solved' ? 'badge-green' : 'badge-orange'}`}>
                      {e.status === 'solved' ? '✓' : '~'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* FULL SHEET */}
      {view === 'sheet' && (
        <div className="space-y-3">
          {/* Filter */}
          <div className="flex gap-2 flex-wrap">
            {(['all','pending','solved','must'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border capitalize transition-all
                  ${filter === f ? 'border-[#c8f135] text-[#c8f135] bg-[#c8f135]/05' : 'border-[#222] text-[#444] hover:border-[#333]'}`}>
                {f === 'must' ? 'must-solve only' : f}
              </button>
            ))}
          </div>

          {STRIVER_A2Z.map((step, stepIdx) => {
            const prog = stepProgress[stepIdx]
            const isExpanded = expandedStep === step.step
            const color = STEP_COLORS[stepIdx]
            const isLocked = stepIdx > 0 && stepProgress[stepIdx - 1].pct < 50

            return (
              <div key={step.step} className={`card transition-all ${isLocked ? 'opacity-60' : ''}`}>
                {/* Step header */}
                <button
                  className="w-full flex items-center gap-3 text-left"
                  onClick={() => setExpandedStep(isExpanded ? null : step.step)}>
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
                    style={{ borderColor: color, color: prog.pct === 100 ? '#0a0a0a' : color, background: prog.pct === 100 ? color : 'transparent' }}>
                    {prog.pct === 100 ? '✓' : step.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold text-white truncate">{step.title}</div>
                      {isLocked && <Lock size={11} className="text-[#444] flex-shrink-0" />}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="h-1 flex-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${prog.pct}%`, background: color }} />
                      </div>
                      <span className="font-mono text-[10px] text-[#444] flex-shrink-0">{prog.solved}/{prog.total}</span>
                    </div>
                  </div>
                  {isExpanded ? <ChevronDown size={15} className="text-[#444] flex-shrink-0" /> : <ChevronRight size={15} className="text-[#444] flex-shrink-0" />}
                </button>

                {/* Step content */}
                {isExpanded && (
                  <div className="mt-4 border-t border-[#1a1a1a] pt-4 space-y-3">
                    <div className="text-[11px] text-[#555] leading-relaxed">{step.description}</div>

                    {step.subTopics.map(sub => {
                      const subExpanded = expandedSub === sub.id
                      const subSolved = sub.problems.filter(p => solvedSet.has(p.title)).length
                      const filtered = sub.problems.filter(p => {
                        if (filter === 'pending') return !solvedSet.has(p.title)
                        if (filter === 'solved') return solvedSet.has(p.title)
                        if (filter === 'must') return p.mustSolve
                        return true
                      })

                      return (
                        <div key={sub.id} className="bg-[#1a1a1a] rounded-xl overflow-hidden">
                          <button
                            className="w-full flex items-center gap-3 p-3 text-left hover:bg-[#222] transition-all"
                            onClick={() => setExpandedSub(subExpanded ? null : sub.id)}>
                            <div className="font-mono text-[10px] text-[#444] w-8 flex-shrink-0">{sub.id}</div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-white truncate">{sub.title}</div>
                              <div className="text-[10px] text-[#444] mt-0.5">{subSolved}/{sub.problems.length} solved</div>
                            </div>
                            {subExpanded ? <ChevronDown size={13} className="text-[#444]" /> : <ChevronRight size={13} className="text-[#444]" />}
                          </button>

                          {subExpanded && (
                            <div className="px-3 pb-3 space-y-1">
                              {/* Concept box */}
                              <div className="bg-[#111] rounded-lg p-3 mb-3">
                                <div className="text-[9px] font-mono text-[#c8f135] uppercase tracking-widest mb-1">Why this topic matters</div>
                                <div className="text-[11px] text-[#666] leading-relaxed">{sub.concept}</div>
                              </div>

                              {filtered.length === 0 && (
                                <div className="text-[#444] text-xs text-center py-3">No problems match filter</div>
                              )}

                              {filtered.map(p => {
                                const status = getProblemStatus(p.title)
                                const isSolved = status === 'solved'
                                return (
                                  <div key={p.title}
                                    className={`flex items-center gap-2.5 p-2.5 rounded-lg transition-all border
                                      ${isSolved ? 'border-[#c8f135]/15 bg-[#c8f135]/[0.02]' : 'border-transparent hover:border-[#333]'}`}>
                                    <button
                                      onClick={() => markSolved(p.title, sub.id, p.difficulty)}
                                      disabled={saving === p.title}
                                      className="flex-shrink-0 transition-transform hover:scale-110">
                                      {saving === p.title
                                        ? <div className="w-4 h-4 border border-[#444] rounded-full border-t-[#c8f135] animate-spin" />
                                        : isSolved
                                          ? <CheckCircle size={15} className="text-[#c8f135]" />
                                          : status === 'attempted'
                                            ? <Circle size={15} className="text-[#ff8c42]" />
                                            : <Circle size={15} className="text-[#333]" />}
                                    </button>
                                    <div className="flex-1 min-w-0">
                                      <div className={`text-[13px] font-medium truncate ${isSolved ? 'line-through text-[#555]' : 'text-white'}`}>
                                        {p.title}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                      {p.mustSolve && !isSolved && <span className="badge badge-purple text-[9px]">MUST</span>}
                                      <span className={`badge ${diffColor(p.difficulty)} text-[9px]`}>{p.difficulty[0].toUpperCase()}</span>
                                      <span className="badge badge-muted text-[9px]">{p.platform === 'LeetCode' ? 'LC' : p.platform}</span>
                                      <a href={p.url} target="_blank" rel="noreferrer"
                                        className="text-[#333] hover:text-[#c8f135] transition-colors ml-1">
                                        <ExternalLink size={12} />
                                      </a>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
