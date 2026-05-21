'use client'
import { useState, useEffect, useRef } from 'react'
import { useStore } from '@/store'
import { saveWorkoutSession, getWorkoutSessions, updateStreak, todayStr, ExerciseSet } from '@/lib/firestore'
import { WORKOUT_PLAN, Exercise } from '@/lib/exercises'
import { Play, Pause, RotateCcw, ChevronDown, ChevronUp, ExternalLink, Check, X } from 'lucide-react'

function RepCounter({ exercise, onComplete }: { exercise: Exercise; onComplete: (sets: ExerciseSet['sets']) => void }) {
  const [currentSet, setCurrentSet] = useState(0)
  const [sets, setSets] = useState<{ reps: number; completed: boolean }[]>(
    Array(exercise.sets).fill(null).map(() => ({ reps: 0, completed: false }))
  )
  const [resting, setResting] = useState(false)
  const [restTime, setRestTime] = useState(0)
  const restRef = useRef<NodeJS.Timeout>()
  const restSeconds = parseInt(exercise.rest) || 60

  const completeSet = (reps: number) => {
    const newSets = [...sets]
    newSets[currentSet] = { reps, completed: true }
    setSets(newSets)
    if (currentSet < exercise.sets - 1) {
      setCurrentSet(c => c + 1)
      setResting(true)
      setRestTime(restSeconds)
      restRef.current = setInterval(() => {
        setRestTime(t => {
          if (t <= 1) { clearInterval(restRef.current); setResting(false); return 0 }
          return t - 1
        })
      }, 1000)
    } else {
      onComplete(newSets)
    }
  }

  useEffect(() => () => clearInterval(restRef.current), [])

  const targetReps = parseInt(exercise.reps.split('-')[0]) || 12
  const maxReps = parseInt(exercise.reps.split('-')[1] || exercise.reps) || targetReps

  return (
    <div className="space-y-3">
      {/* Set indicators */}
      <div className="flex gap-2">
        {sets.map((s, i) => (
          <div key={i} className={`flex-1 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold border transition-all
            ${s.completed ? 'bg-[#c8f135] text-black border-[#c8f135]' : i === currentSet ? 'border-[#c8f135] text-[#c8f135]' : 'border-[#222] text-[#444]'}`}>
            {s.completed ? `${s.reps}✓` : `Set ${i + 1}`}
          </div>
        ))}
      </div>

      {resting ? (
        <div className="text-center py-4">
          <div className="font-mono text-5xl font-bold text-[#4d9fff] mb-2">{restTime}s</div>
          <div className="text-[#555] text-sm">Rest — next set: {currentSet + 1}</div>
          <button onClick={() => { clearInterval(restRef.current); setResting(false) }}
            className="mt-3 btn-ghost text-xs">Skip rest</button>
        </div>
      ) : !sets[currentSet]?.completed ? (
        <div className="space-y-3">
          <div className="text-center">
            <div className="text-[#555] text-sm mb-1">Set {currentSet + 1} — target {exercise.reps} reps</div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 12 }, (_, i) => {
              const reps = i + 1 <= maxReps ? i + 1 : targetReps + i
              return (
                <button key={reps} onClick={() => completeSet(reps)}
                  className={`py-2 rounded-lg text-sm font-mono border transition-all hover:border-[#c8f135] hover:text-[#c8f135]
                    ${reps >= targetReps && reps <= maxReps ? 'border-[#c8f135]/30 text-[#888]' : 'border-[#222] text-[#444]'}`}>
                  {reps}
                </button>
              )
            })}
          </div>
          <div className="flex gap-2">
            <button onClick={() => completeSet(0)} className="btn-ghost flex-1 text-xs flex items-center justify-center gap-1">
              <X size={12} /> Skipped
            </button>
            <button onClick={() => completeSet(targetReps)} className="btn flex-1 text-xs flex items-center justify-center gap-1">
              <Check size={12} /> Done ({targetReps} reps)
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-3 text-[#c8f135] font-mono text-sm">All sets complete! ✓</div>
      )}
    </div>
  )
}

function ExerciseCard({ exercise, onComplete }: { exercise: Exercise; onComplete: (sets: ExerciseSet['sets']) => void }) {
  const [expanded, setExpanded] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [done, setDone] = useState(false)

  const handleComplete = (sets: ExerciseSet['sets']) => {
    setDone(true)
    onComplete(sets)
  }

  return (
    <div className={`card transition-all ${done ? 'border-[#c8f135]/30 opacity-80' : ''}`}>
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(e => !e)}>
        <div className="flex items-center gap-3">
          {done && <Check size={16} className="text-[#c8f135] flex-shrink-0" />}
          <div>
            <div className="font-medium text-sm text-white">{exercise.name}</div>
            <div className="text-[11px] text-[#444]">{exercise.sets}×{exercise.reps} · {exercise.rest} rest · {exercise.muscleGroup}</div>
          </div>
        </div>
        {expanded ? <ChevronUp size={15} className="text-[#444]" /> : <ChevronDown size={15} className="text-[#444]" />}
      </div>

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-[#1a1a1a] pt-4">
          {/* Video */}
          {exercise.youtubeId && (
            <div>
              {showVideo ? (
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${exercise.youtubeId}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                    allowFullScreen
                  />
                </div>
              ) : (
                <button onClick={() => setShowVideo(true)}
                  className="w-full bg-[#ff4d4d]/10 border border-[#ff4d4d]/20 rounded-lg p-3 flex items-center gap-3 hover:bg-[#ff4d4d]/15 transition-all">
                  <div className="w-8 h-8 rounded-full bg-[#ff4d4d] flex items-center justify-center flex-shrink-0">
                    <Play size={14} fill="white" className="text-white ml-0.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-white font-medium">Watch form guide</div>
                    <div className="text-[11px] text-[#555]">YouTube · {exercise.name}</div>
                  </div>
                  <ExternalLink size={13} className="text-[#444] ml-auto" />
                </button>
              )}
            </div>
          )}

          {/* Form cues */}
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-2">Form cues</div>
            <div className="space-y-1">
              {exercise.cues.map((c, i) => (
                <div key={i} className="flex gap-2 text-[12px] text-[#666]">
                  <span className="text-[#c8f135] flex-shrink-0">▸</span> {c}
                </div>
              ))}
            </div>
          </div>

          {/* Variations */}
          {(exercise.beginner || exercise.advanced) && (
            <div className="grid grid-cols-2 gap-2">
              {exercise.beginner && (
                <div className="bg-[#1a1a1a] rounded-lg p-2.5">
                  <div className="text-[9px] font-mono text-[#4d9fff] uppercase tracking-widest mb-1">Easier</div>
                  <div className="text-[11px] text-[#888]">{exercise.beginner}</div>
                </div>
              )}
              {exercise.advanced && (
                <div className="bg-[#1a1a1a] rounded-lg p-2.5">
                  <div className="text-[9px] font-mono text-[#ff8c42] uppercase tracking-widest mb-1">Harder</div>
                  <div className="text-[11px] text-[#888]">{exercise.advanced}</div>
                </div>
              )}
            </div>
          )}

          {/* Rep counter */}
          {!done && (
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-2">Rep counter</div>
              <RepCounter exercise={exercise} onComplete={handleComplete} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function WorkoutTrackerV2() {
  const { user } = useStore()
  const [sessions, setSessions] = useState<any[]>([])
  const [completedExercises, setCompletedExercises] = useState<Record<string, ExerciseSet['sets']>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [timer, setTimer] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>()

  const dayOfWeek = new Date().getDay()
  const todayPlan = WORKOUT_PLAN[dayOfWeek === 0 ? 6 : dayOfWeek - 1]
  const completedCount = Object.keys(completedExercises).length
  const totalExercises = todayPlan.exercises.filter(e => e.youtubeId !== '' || e.sets > 0).length

  useEffect(() => {
    if (!user) return
    getWorkoutSessions(user.uid).then(setSessions)
  }, [user])

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [timerRunning])

  const handleExerciseComplete = (name: string, sets: ExerciseSet['sets']) => {
    setCompletedExercises(prev => ({ ...prev, [name]: sets }))
  }

  const saveSession = async () => {
    if (!user || Object.keys(completedExercises).length === 0) return
    setSaving(true)
    const exercises: ExerciseSet[] = Object.entries(completedExercises).map(([name, sets]) => ({ name, sets }))
    const totalVolume = exercises.reduce((total, ex) =>
      total + ex.sets.reduce((s, set) => s + (set.reps * (set.weight || 1)), 0), 0)
    await saveWorkoutSession(user.uid, {
      date: todayStr(), workoutType: todayPlan.type,
      exercises, totalVolume, durationMinutes: Math.round(timer / 60)
    })
    await updateStreak(user.uid, 'workout')
    setSaved(true)
    setSaving(false)
  }

  const fmt = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`

  // Volume history
  const volumeByDay = sessions.slice(0, 7).map(s => ({
    date: s.date.slice(5),
    volume: s.totalVolume || 0,
    type: s.workoutType
  }))

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-lg font-bold text-white">{todayPlan.day} — {todayPlan.type}</div>
          <div className="text-[#555] text-sm">{todayPlan.focus}</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl font-bold text-white">{fmt(timer)}</div>
          <div className="flex gap-2 mt-1 justify-end">
            <button onClick={() => setTimerRunning(r => !r)} className="btn-ghost p-1.5">
              {timerRunning ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button onClick={() => { setTimer(0); setTimerRunning(false) }} className="btn-ghost p-1.5">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="card">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-[#555]">Today's progress</span>
          <span className="font-mono text-[#c8f135]">{completedCount}/{totalExercises} exercises</span>
        </div>
        <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div className="h-full bg-[#c8f135] rounded-full transition-all"
            style={{ width: `${totalExercises ? (completedCount / totalExercises) * 100 : 0}%` }} />
        </div>
      </div>

      {/* Warmup */}
      {todayPlan.warmup.length > 0 && (
        <div className="card border-[#4d9fff]/20">
          <div className="text-[10px] font-mono tracking-widest text-[#4d9fff] uppercase mb-2">Warmup (5 min)</div>
          <div className="space-y-1">
            {todayPlan.warmup.map((w, i) => (
              <div key={i} className="text-[12px] text-[#666] flex gap-2">
                <span className="text-[#4d9fff]">▸</span> {w}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exercise cards */}
      <div className="space-y-3">
        {todayPlan.exercises.map(ex => (
          <ExerciseCard key={ex.name} exercise={ex} onComplete={sets => handleExerciseComplete(ex.name, sets)} />
        ))}
      </div>

      {/* Cooldown */}
      {todayPlan.cooldown.length > 0 && (
        <div className="card border-[#a78bfa]/20">
          <div className="text-[10px] font-mono tracking-widest text-[#a78bfa] uppercase mb-2">Cooldown (5 min)</div>
          <div className="space-y-1">
            {todayPlan.cooldown.map((c, i) => (
              <div key={i} className="text-[12px] text-[#666] flex gap-2">
                <span className="text-[#a78bfa]">▸</span> {c}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save session */}
      {completedCount > 0 && !saved && (
        <button className="btn w-full py-3" onClick={saveSession} disabled={saving}>
          {saving ? 'Saving...' : `Save Session (${completedCount} exercises · ${fmt(timer)}) →`}
        </button>
      )}
      {saved && (
        <div className="card border-[#c8f135]/30 text-center text-[#c8f135] font-mono text-sm py-3">
          Session saved ✓ Streak updated
        </div>
      )}
    </div>
  )
}
