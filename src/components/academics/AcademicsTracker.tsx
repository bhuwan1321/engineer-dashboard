'use client'
import { useState, useEffect } from 'react'
import { useStore } from '@/store'
import { saveTask, getTasks, updateTask, deleteTask, Task } from '@/lib/firestore'
import { Plus, Trash2, CheckCircle, Circle, BookOpen, Calendar } from 'lucide-react'

const SUBJECTS = ['OS', 'DBMS', 'CN', 'DSA', 'TOC', 'SE', 'Maths', 'Other']

export default function AcademicsTracker() {
  const { user } = useStore()
  const [tasks, setTasks] = useState<Task[]>([])
  const [form, setForm] = useState({ title: '', subject: 'OS', dueDate: '', estimatedHours: '', notes: '', priority: 'med' as Task['priority'] })
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [activeSubject, setActiveSubject] = useState<string>('all')

  const load = async () => {
    if (!user) return
    const all = await getTasks(user.uid)
    setTasks(all.filter(t => t.category === 'academic'))
  }

  useEffect(() => { load() }, [user])

  const add = async () => {
    if (!user || !form.title) return
    setSaving(true)
    await saveTask(user.uid, { ...form, category: 'academic', status: 'todo', estimatedHours: form.estimatedHours ? parseFloat(form.estimatedHours) : undefined })
    await load()
    setForm(f => ({ ...f, title: '', notes: '', dueDate: '' }))
    setShowForm(false)
    setSaving(false)
  }

  const toggle = async (t: Task) => {
    if (!t.id) return
    const next: Record<string, Task['status']> = { todo: 'in-progress', 'in-progress': 'done', done: 'todo' }
    await updateTask(t.id, { status: next[t.status] })
    await load()
  }

  const remove = async (id: string) => { await deleteTask(id); await load() }

  const grouped = SUBJECTS.reduce((acc, s) => {
    acc[s] = tasks.filter(t => t.subject === s)
    return acc
  }, {} as Record<string, Task[]>)

  const filtered = activeSubject === 'all' ? tasks : tasks.filter(t => t.subject === activeSubject)
  const today = new Date().toISOString().split('T')[0]
  const upcoming = tasks.filter(t => t.dueDate && t.dueDate >= today && t.status !== 'done').sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''))

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="font-mono text-lg font-bold text-white">Academics</div>
        <button className="btn text-xs flex items-center gap-1.5" onClick={() => setShowForm(s => !s)}>
          <Plus size={13} /> Add Task
        </button>
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div className="card border-[#ff8c42]/20">
          <div className="text-[10px] font-mono tracking-widest text-[#ff8c42] uppercase mb-3 flex items-center gap-1.5">
            <Calendar size={11} /> Upcoming deadlines
          </div>
          <div className="space-y-1.5">
            {upcoming.slice(0, 5).map(t => {
              const days = Math.ceil((new Date(t.dueDate!).getTime() - new Date(today).getTime()) / 86400000)
              return (
                <div key={t.id} className="flex items-center gap-2 text-sm">
                  <span className={`font-mono text-[11px] w-16 flex-shrink-0 ${days <= 3 ? 'text-[#ff4d4d]' : 'text-[#ff8c42]'}`}>
                    {days === 0 ? 'TODAY' : `${days}d`}
                  </span>
                  <span className="text-white">{t.title}</span>
                  <span className="badge badge-blue text-[9px] ml-auto">{t.subject}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Subject progress */}
      <div className="card">
        <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Subject progress</div>
        <div className="space-y-2.5">
          {SUBJECTS.filter(s => grouped[s]?.length > 0).map(s => {
            const total = grouped[s].length
            const done = grouped[s].filter(t => t.status === 'done').length
            const pct = total ? Math.round((done / total) * 100) : 0
            return (
              <div key={s}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#888] font-mono">{s}</span>
                  <span className="text-[#555] font-mono">{done}/{total} ({pct}%)</span>
                </div>
                <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#4d9fff] rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card border-[#4d9fff]/20 space-y-3">
          <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase">New Academic Task</div>
          <input className="inp" placeholder="Task title (e.g. OS unit 3 revision)" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Subject</label>
              <select className="inp" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Priority</label>
              <select className="inp" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value as Task['priority'] }))}>
                <option value="high">High</option><option value="med">Medium</option><option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Due date / exam date</label>
              <input type="date" className="inp" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Study hours needed</label>
              <input type="number" className="inp" placeholder="4" value={form.estimatedHours} onChange={e => setForm(f => ({ ...f, estimatedHours: e.target.value }))} />
            </div>
            <div className="col-span-2">
              <label className="text-[11px] text-[#555] mb-1 block">Notes</label>
              <input className="inp" placeholder="Unit 3 & 4, practise previous papers" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn flex-1" onClick={add} disabled={saving}>{saving ? 'Adding...' : 'Add Task'}</button>
            <button className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Filter by subject */}
      <div className="flex gap-1.5 flex-wrap">
        <button onClick={() => setActiveSubject('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all
            ${activeSubject === 'all' ? 'border-[#4d9fff] text-[#4d9fff]' : 'border-[#222] text-[#444] hover:border-[#333]'}`}>
          All
        </button>
        {SUBJECTS.filter(s => grouped[s]?.length > 0).map(s => (
          <button key={s} onClick={() => setActiveSubject(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all
              ${activeSubject === s ? 'border-[#4d9fff] text-[#4d9fff]' : 'border-[#222] text-[#444] hover:border-[#333]'}`}>
            {s} ({grouped[s]?.length})
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="card text-center py-10 text-[#444] font-mono text-sm">No tasks yet. Add exam or study tasks above.</div>
        )}
        {filtered.map(t => {
          const overdue = t.dueDate && t.dueDate < today && t.status !== 'done'
          const daysLeft = t.dueDate ? Math.ceil((new Date(t.dueDate).getTime() - new Date(today).getTime()) / 86400000) : null
          return (
            <div key={t.id} className={`card flex items-start gap-3 ${t.status === 'done' ? 'opacity-50' : ''} ${overdue ? 'border-[#ff4d4d]/30' : ''}`}>
              <button onClick={() => toggle(t)} className="mt-0.5 flex-shrink-0">
                {t.status === 'done' ? <CheckCircle size={17} className="text-[#c8f135]" /> : <Circle size={17} className="text-[#333]" />}
              </button>
              <div className="flex-1">
                <div className={`text-sm font-medium text-white ${t.status === 'done' ? 'line-through' : ''}`}>{t.title}</div>
                {t.notes && <div className="text-[11px] text-[#444] mt-0.5">{t.notes}</div>}
                <div className="flex flex-wrap gap-2 mt-1.5 items-center">
                  <span className="badge badge-blue text-[9px]">{t.subject}</span>
                  {daysLeft !== null && (
                    <span className={`text-[10px] font-mono ${overdue ? 'text-[#ff4d4d]' : daysLeft <= 3 ? 'text-[#ff8c42]' : 'text-[#444]'}`}>
                      {overdue ? 'OVERDUE' : daysLeft === 0 ? 'TODAY' : `${daysLeft}d left`}
                    </span>
                  )}
                  {t.estimatedHours && <span className="text-[10px] text-[#444]">{t.estimatedHours}h needed</span>}
                  <span className={`badge badge-${t.priority === 'high' ? 'red' : t.priority === 'med' ? 'orange' : 'muted'} text-[9px]`}>{t.priority}</span>
                </div>
              </div>
              <button onClick={() => t.id && remove(t.id)} className="text-[#333] hover:text-[#ff4d4d] transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          )
        })}
      </div>

      {/* Study tips */}
      <div className="card">
        <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Study strategy for engineers</div>
        <div className="space-y-2">
          {[
            ['Pomodoro for studying', '25 min study, 5 min break. 4 rounds = 2h session.'],
            ['Previous year papers', 'Most important for uni exams. Do the last 5 years.'],
            ['Teach to learn', "Explaining a concept out loud (even to no one) shows you what you don't know."],
            ['DSA + academics on same day', 'Morning academics, evening DSA. Keeps both tracks moving.'],
          ].map(([t, d]) => (
            <div key={t} className="flex gap-2 py-2 border-b border-[#1a1a1a] last:border-0">
              <BookOpen size={13} className="text-[#4d9fff] flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm text-white">{t}</div>
                <div className="text-[11px] text-[#444]">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
