'use client'
import { useState, useEffect } from 'react'
import { useStore } from '@/store'
import { saveTask, getTasks, updateTask, deleteTask, updateStreak, Task } from '@/lib/firestore'
import { Plus, Trash2, CheckCircle, Circle, Clock } from 'lucide-react'

const CATEGORIES = ['project', 'academic', 'interview', 'other'] as const
const PRIORITIES = ['high', 'med', 'low'] as const
const STATUSES = ['todo', 'in-progress', 'done'] as const

const statusColor: Record<string, string> = { todo: 'muted', 'in-progress': 'orange', done: 'green' }
const prioColor: Record<string, string> = { high: 'red', med: 'orange', low: 'muted' }

export default function EngineeringTracker() {
  const { user } = useStore()
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<'all' | Task['category']>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | Task['status']>('all')
  const [form, setForm] = useState({ title: '', category: 'project' as Task['category'], priority: 'med' as Task['priority'], dueDate: '', subject: '', estimatedHours: '', notes: '' })
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    if (!user) return
    const t = await getTasks(user.uid)
    setTasks(t)
  }

  useEffect(() => { load() }, [user])

  const add = async () => {
    if (!user || !form.title) return
    setSaving(true)
    await saveTask(user.uid, { ...form, status: 'todo', estimatedHours: form.estimatedHours ? parseFloat(form.estimatedHours) : undefined })
    await updateStreak(user.uid, 'engineering')
    await load()
    setForm(f => ({ ...f, title: '', dueDate: '', notes: '' }))
    setShowForm(false)
    setSaving(false)
  }

  const toggleStatus = async (t: Task) => {
    if (!t.id) return
    const next: Record<string, Task['status']> = { todo: 'in-progress', 'in-progress': 'done', done: 'todo' }
    await updateTask(t.id, { status: next[t.status] })
    await load()
  }

  const remove = async (id: string) => {
    await deleteTask(id)
    await load()
  }

  const filtered = tasks.filter(t => {
    if (filter !== 'all' && t.category !== filter) return false
    if (statusFilter !== 'all' && t.status !== statusFilter) return false
    return true
  })

  const stats = {
    total: tasks.length,
    done: tasks.filter(t => t.status === 'done').length,
    high: tasks.filter(t => t.priority === 'high' && t.status !== 'done').length,
    overdue: tasks.filter(t => t.dueDate && t.dueDate < new Date().toISOString().split('T')[0] && t.status !== 'done').length,
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="font-mono text-lg font-bold text-white">Engineering Tasks</div>
        <button className="btn text-xs flex items-center gap-1.5" onClick={() => setShowForm(s => !s)}>
          <Plus size={13} /> Add Task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total', val: stats.total, color: 'text-white' },
          { label: 'Done', val: stats.done, color: 'text-[#c8f135]' },
          { label: 'High prio', val: stats.high, color: 'text-[#ff4d4d]' },
          { label: 'Overdue', val: stats.overdue, color: 'text-[#ff8c42]' },
        ].map(s => (
          <div key={s.label} className="card text-center">
            <div className={`font-mono text-2xl font-bold ${s.color}`}>{s.val}</div>
            <div className="text-[10px] text-[#444] mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card border-[#c8f135]/20 space-y-3">
          <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase">New Task</div>
          <input className="inp" placeholder="Task title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Category</label>
              <select className="inp" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Task['category'] }))}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Priority</label>
              <select className="inp" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value as Task['priority'] }))}>
                {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Due date</label>
              <input type="date" className="inp" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Est. hours</label>
              <input type="number" className="inp" placeholder="2" value={form.estimatedHours} onChange={e => setForm(f => ({ ...f, estimatedHours: e.target.value }))} />
            </div>
            <div className="col-span-2">
              <label className="text-[11px] text-[#555] mb-1 block">Subject / notes</label>
              <input className="inp" placeholder="e.g. OS assignment / Next.js project" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn flex-1" onClick={add} disabled={saving}>{saving ? 'Adding...' : 'Add Task'}</button>
            <button className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <div className="flex gap-1 bg-[#111] border border-[#222] rounded-lg p-1">
          {(['all', ...CATEGORIES] as const).map(c => (
            <button key={c} onClick={() => setFilter(c as any)}
              className={`px-2.5 py-1 rounded text-xs font-mono capitalize transition-all
                ${filter === c ? 'bg-[#222] text-white' : 'text-[#444] hover:text-white'}`}>{c}</button>
          ))}
        </div>
        <div className="flex gap-1 bg-[#111] border border-[#222] rounded-lg p-1">
          {(['all', ...STATUSES] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s as any)}
              className={`px-2.5 py-1 rounded text-xs font-mono capitalize transition-all
                ${statusFilter === s ? 'bg-[#222] text-white' : 'text-[#444] hover:text-white'}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="card text-center py-10 text-[#444] font-mono text-sm">No tasks. Add one above ↑</div>
        )}
        {filtered.map(t => {
          const overdue = t.dueDate && t.dueDate < new Date().toISOString().split('T')[0] && t.status !== 'done'
          return (
            <div key={t.id} className={`card flex items-start gap-3 transition-all
              ${t.status === 'done' ? 'opacity-50' : ''}
              ${overdue ? 'border-[#ff4d4d]/30' : ''}`}>
              <button onClick={() => toggleStatus(t)} className="mt-0.5 flex-shrink-0">
                {t.status === 'done'
                  ? <CheckCircle size={18} className="text-[#c8f135]" />
                  : t.status === 'in-progress'
                  ? <Circle size={18} className="text-[#ff8c42]" />
                  : <Circle size={18} className="text-[#333]" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium text-white ${t.status === 'done' ? 'line-through' : ''}`}>{t.title}</div>
                {t.notes && <div className="text-[11px] text-[#444] mt-0.5">{t.notes}</div>}
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <span className={`badge badge-${prioColor[t.priority]} text-[9px]`}>{t.priority.toUpperCase()}</span>
                  <span className={`badge badge-${statusColor[t.status]} text-[9px]`}>{t.status}</span>
                  <span className={`badge badge-blue text-[9px]`}>{t.category}</span>
                  {t.dueDate && (
                    <span className={`flex items-center gap-0.5 text-[10px] ${overdue ? 'text-[#ff4d4d]' : 'text-[#444]'}`}>
                      <Clock size={10} /> {t.dueDate}
                    </span>
                  )}
                  {t.estimatedHours && <span className="text-[10px] text-[#444]">{t.estimatedHours}h</span>}
                </div>
              </div>
              <button onClick={() => t.id && remove(t.id)} className="text-[#333] hover:text-[#ff4d4d] transition-colors flex-shrink-0 mt-0.5">
                <Trash2 size={14} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
