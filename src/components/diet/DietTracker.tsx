'use client'
import { useState, useEffect } from 'react'
import { useStore } from '@/store'
import { saveDailyLog, getDailyLogs, updateStreak, DailyLog, todayStr } from '@/lib/firestore'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const MEALS = [
  { time: '07:30', label: 'Breakfast', target: 35, example: '3 eggs + 80g muesli + 300ml milk = ~35g protein' },
  { time: '10:00', label: 'Mid-morning', target: 15, example: 'Peanuts + banana + curd = ~15g protein' },
  { time: '13:00', label: 'Lunch', target: 40, example: 'Dal + paneer/chicken + sabzi = ~40g protein' },
  { time: '17:00', label: 'Evening', target: 15, example: 'Roasted chana + milk = ~15g protein' },
  { time: '19:30', label: 'Post-workout / Dinner', target: 35, example: 'Eggs / paneer + 2 roti + sabzi = ~35g protein' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-xs font-mono">
      <div className="text-[#666]">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</div>
      ))}
    </div>
  )
}

export default function DietTracker() {
  const { user } = useStore()
  const [form, setForm] = useState({ date: todayStr(), weight: '', protein: '', sleep: '', calories: '', water: '', mood: '3', notes: '' })
  const [logs, setLogs] = useState<DailyLog[]>([])
  const [saving, setSaving] = useState(false)
  const [muesliGrams, setMuesliGrams] = useState(80)

  useEffect(() => {
    if (!user) return
    getDailyLogs(user.uid, 30).then(l => {
      setLogs(l)
      const today = l.find(x => x.date === todayStr())
      if (today) setForm(f => ({ ...f, weight: String(today.weight || ''), protein: String(today.protein || ''), sleep: String(today.sleep || ''), notes: today.notes || '' }))
    })
  }, [user])

  const save = async () => {
    if (!user) return
    setSaving(true)
    await saveDailyLog(user.uid, {
      date: form.date,
      weight: form.weight ? parseFloat(form.weight) : undefined,
      protein: form.protein ? parseInt(form.protein) : undefined,
      sleep: form.sleep ? parseFloat(form.sleep) : undefined,
      calories: form.calories ? parseInt(form.calories) : undefined,
      water: form.water ? parseInt(form.water) : undefined,
      mood: form.mood ? parseInt(form.mood) as 1|2|3|4|5 : undefined,
      notes: form.notes,
    })
    await updateStreak(user.uid, 'diet')
    const fresh = await getDailyLogs(user.uid, 30)
    setLogs(fresh)
    setSaving(false)
  }

  const chartData = [...logs].reverse().map(l => ({ date: l.date.slice(5), protein: l.protein, weight: l.weight, sleep: l.sleep }))

  // Muesli calculator
  const muesliProtein = Math.round((muesliGrams * 9.7) / 100)
  const muesliCalories = Math.round((muesliGrams * 367) / 100)

  return (
    <div className="space-y-5">
      <div className="font-mono text-lg font-bold text-white">Diet Tracker</div>

      {/* Muesli calculator */}
      <div className="card border-[#c8f135]/20 bg-[#c8f135]/[0.03]">
        <div className="text-[10px] font-mono tracking-widest text-[#c8f135] uppercase mb-3">🥣 Yoga Bar Muesli Calculator</div>
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1">
            <label className="text-[11px] text-[#555] mb-1 block">Grams to eat</label>
            <input type="range" min={40} max={200} step={10} value={muesliGrams}
              onChange={e => setMuesliGrams(Number(e.target.value))}
              className="w-full accent-[#c8f135]" />
          </div>
          <div className="text-3xl font-mono font-bold text-[#c8f135] w-20 text-right">{muesliGrams}g</div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#1a1a1a] rounded-lg p-3 text-center">
            <div className="font-mono text-xl font-bold text-white">{muesliProtein}g</div>
            <div className="text-[11px] text-[#555]">Protein</div>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-3 text-center">
            <div className="font-mono text-xl font-bold text-white">{muesliCalories}</div>
            <div className="text-[11px] text-[#555]">Calories</div>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg p-3 text-center">
            <div className="font-mono text-xl font-bold text-[#ff8c42]">{130 - muesliProtein - 10 - 14}g</div>
            <div className="text-[11px] text-[#555]">Still needed</div>
          </div>
        </div>
        <div className="text-[11px] text-[#555] mt-2">Tip: Add 300ml milk (+10g) + 2 eggs (+14g) = total {muesliProtein + 24}g at breakfast</div>
      </div>

      {/* Meal plan */}
      <div className="card">
        <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Daily meal targets (130–140g total)</div>
        <div className="space-y-2">
          {MEALS.map(m => (
            <div key={m.time} className="flex gap-3 items-start py-2 border-b border-[#1a1a1a] last:border-0">
              <div className="font-mono text-[11px] text-[#c8f135] w-12 flex-shrink-0 pt-0.5">{m.time}</div>
              <div className="flex-1">
                <div className="text-sm text-white font-medium">{m.label} <span className="text-[#ff8c42] font-mono text-xs">~{m.target}g</span></div>
                <div className="text-[11px] text-[#444]">{m.example}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Log form */}
      <div className="card">
        <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-4">Log Today</div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-[11px] text-[#555] mb-1 block">Date</label>
            <input type="date" className="inp" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          </div>
          <div>
            <label className="text-[11px] text-[#555] mb-1 block">Body weight (kg)</label>
            <input type="number" className="inp" placeholder="68.5" step="0.1" value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} />
          </div>
          <div>
            <label className="text-[11px] text-[#555] mb-1 block">Protein (g)</label>
            <input type="number" className="inp" placeholder="135" value={form.protein} onChange={e => setForm(f => ({ ...f, protein: e.target.value }))} />
          </div>
          <div>
            <label className="text-[11px] text-[#555] mb-1 block">Sleep (hrs)</label>
            <input type="number" className="inp" placeholder="6.5" step="0.5" value={form.sleep} onChange={e => setForm(f => ({ ...f, sleep: e.target.value }))} />
          </div>
          <div>
            <label className="text-[11px] text-[#555] mb-1 block">Calories (optional)</label>
            <input type="number" className="inp" placeholder="2200" value={form.calories} onChange={e => setForm(f => ({ ...f, calories: e.target.value }))} />
          </div>
          <div>
            <label className="text-[11px] text-[#555] mb-1 block">Water (glasses)</label>
            <input type="number" className="inp" placeholder="8" value={form.water} onChange={e => setForm(f => ({ ...f, water: e.target.value }))} />
          </div>
          <div className="col-span-2">
            <label className="text-[11px] text-[#555] mb-1 block">Notes</label>
            <input type="text" className="inp" placeholder="Deadline week / felt strong / etc." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
          </div>
        </div>
        <button className="btn w-full" onClick={save} disabled={saving}>
          {saving ? 'Saving...' : 'Save Log →'}
        </button>
      </div>

      {/* Charts */}
      {chartData.length > 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card">
            <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Protein (30 days)</div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={chartData}>
                <XAxis dataKey="date" tick={{ fill: '#444', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#444', fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={130} stroke="#c8f135" strokeDasharray="4 4" strokeOpacity={0.4} />
                <Line type="monotone" dataKey="protein" stroke="#ff8c42" strokeWidth={2} dot={false} name="g" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Weight (30 days)</div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={chartData}>
                <XAxis dataKey="date" tick={{ fill: '#444', fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#444', fontSize: 9 }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="weight" stroke="#c8f135" strokeWidth={2} dot={false} name="kg" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}
