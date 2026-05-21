'use client'
import { useState, useEffect } from 'react'
import { useStore } from '@/store'
import { saveDailyLog, getDailyLogs, updateStreak, todayStr, DailyLog } from '@/lib/firestore'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const SPLIT = [
  { day: 'Monday', type: 'Push', exercises: ['Push-ups 4×15', 'Dumbbell Press 4×10', 'Shoulder Press 3×12', 'Lateral Raises 3×15', 'Tricep Dips 3×12'] },
  { day: 'Tuesday', type: 'Pull', exercises: ['Pull-ups / Rows 4×10', 'Dumbbell Row 4×12', 'Face Pulls 3×15', 'Bicep Curls 3×12', 'Hammer Curls 3×12'] },
  { day: 'Wednesday', type: 'Rest', exercises: ['Light walk 20 min', 'Stretching', 'Foam rolling'] },
  { day: 'Thursday', type: 'Legs', exercises: ['Squats 4×12', 'RDLs 3×10', 'Lunges 3×12 each', 'Calf Raises 4×20', 'Glute Bridge 3×15'] },
  { day: 'Friday', type: 'Upper Body', exercises: ['Push-ups 3×15', 'Rows 3×12', 'Shoulder Press 3×10', 'Bicep Curls 3×12', 'Tricep Extensions 3×12'] },
  { day: 'Saturday', type: 'Flex/Cardio', exercises: ['20 min walk/jog', 'Core work', 'Stretching', 'Optional light workout'] },
  { day: 'Sunday', type: 'Rest', exercises: ['Full rest', 'Recovery focus', 'Meal prep'] },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-xs font-mono">
      <div className="text-[#666]">{label}</div>
      {payload.map((p: any) => <div key={p.name} style={{ color: p.color }}>{p.value} {p.name}</div>)}
    </div>
  )
}

export default function WorkoutTracker() {
  const { user } = useStore()
  const [logs, setLogs] = useState<DailyLog[]>([])
  const [workout, setWorkout] = useState('none')
  const [date, setDate] = useState(todayStr())
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user) return
    getDailyLogs(user.uid, 30).then(setLogs)
  }, [user])

  const save = async () => {
    if (!user) return
    setSaving(true)
    await saveDailyLog(user.uid, { date, workout })
    if (workout !== 'none') await updateStreak(user.uid, 'workout')
    const fresh = await getDailyLogs(user.uid, 30)
    setLogs(fresh)
    setSaving(false)
  }

  const today = new Date().getDay() // 0=Sun
  const todayPlan = SPLIT[today === 0 ? 6 : today - 1]

  const chartData = [...logs].reverse().map(l => ({
    date: l.date.slice(5),
    done: l.workout && l.workout !== 'none' ? 1 : 0,
  }))

  const workoutTypes = ['push', 'pull', 'legs', 'upper', 'cardio', 'none']

  return (
    <div className="space-y-5">
      <div className="font-mono text-lg font-bold text-white">Workout Tracker</div>

      {/* Today's plan */}
      <div className="card border-[#a78bfa]/20">
        <div className="text-[10px] font-mono tracking-widest text-[#a78bfa] uppercase mb-2">Today's Plan — {todayPlan.day}</div>
        <div className="text-lg font-bold text-white mb-3">{todayPlan.type}</div>
        <div className="space-y-1.5">
          {todayPlan.exercises.map((ex, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-[#888]">
              <span className="text-[#a78bfa]">▸</span> {ex}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly split */}
      <div className="card">
        <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Weekly Split</div>
        <div className="grid grid-cols-7 gap-1.5">
          {SPLIT.map((s, i) => {
            const isToday = (today === 0 ? 6 : today - 1) === i
            return (
              <div key={s.day} className={`rounded-lg p-2 text-center border transition-all
                ${isToday ? 'border-[#a78bfa] bg-[#a78bfa]/10' : 'border-[#222] bg-[#1a1a1a]'}`}>
                <div className="text-[9px] text-[#444] mb-1">{s.day.slice(0, 3).toUpperCase()}</div>
                <div className={`text-[10px] font-mono font-bold ${isToday ? 'text-[#a78bfa]' : 'text-[#555]'}`}>
                  {s.type.split('/')[0].trim().slice(0, 5)}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Log workout */}
      <div className="card">
        <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Log Workout</div>
        <div className="mb-3">
          <label className="text-[11px] text-[#555] mb-1 block">Date</label>
          <input type="date" className="inp" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="text-[11px] text-[#555] mb-2 block">Type</label>
          <div className="flex flex-wrap gap-2">
            {workoutTypes.map(w => (
              <button key={w} onClick={() => setWorkout(w)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border capitalize transition-all
                  ${workout === w ? 'border-[#a78bfa] text-[#a78bfa] bg-[#a78bfa]/10' : 'border-[#222] text-[#555] hover:border-[#444]'}`}>
                {w === 'none' ? 'Rest' : w}
              </button>
            ))}
          </div>
        </div>
        <button className="btn w-full" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Log →'}</button>
      </div>

      {/* Tips */}
      <div className="card">
        <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">With 6h sleep — rules to follow</div>
        <div className="space-y-2">
          {[
            ['Keep sessions to 45–60 min', 'No marathon sessions. Quality over volume.'],
            ['On bad sleep nights — reduce intensity', "Don't skip, just do 70% effort."],
            ['Progressive overload is the only metric', 'One more rep or slightly more weight than last week.'],
            ['Post-workout protein immediately', 'Eggs / whey / paneer within 45 minutes.'],
          ].map(([title, sub]) => (
            <div key={title} className="flex gap-2 py-2 border-b border-[#1a1a1a] last:border-0">
              <span className="text-[#c8f135] mt-0.5">▸</span>
              <div>
                <div className="text-sm text-white">{title}</div>
                <div className="text-[11px] text-[#444]">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {chartData.length > 1 && (
        <div className="card">
          <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Workout consistency (30 days)</div>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={chartData}>
              <XAxis dataKey="date" tick={{ fill: '#444', fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="done" fill="#a78bfa" radius={[2, 2, 0, 0]} name="workout" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
