'use client'
import { useState } from 'react'
import { useStore } from '@/store'
import { saveUserProfile, calcBMI, calcTDEE, UserProfile } from '@/lib/firestore'

const STEPS = ['basics', 'body', 'goal'] as const
type Step = typeof STEPS[number]

const GOALS = [
  { id: 'lean', label: 'Get lean', sub: 'Lose fat, keep muscle', emoji: '🔥' },
  { id: 'bulk', label: 'Build muscle', sub: 'Gain size and strength', emoji: '💪' },
  { id: 'maintain', label: 'Maintain', sub: 'Stay consistent', emoji: '⚖️' },
]
const ACTIVITY = [
  { id: 'sedentary', label: 'Sedentary', sub: 'Desk job, no exercise' },
  { id: 'light', label: 'Light', sub: 'Walk occasionally, some gym' },
  { id: 'moderate', label: 'Moderate', sub: '3–5 workouts/week' },
  { id: 'active', label: 'Very active', sub: '6+ workouts/week' },
]

export default function OnboardingModal({ onDone }: { onDone: () => void }) {
  const { user } = useStore()
  const [step, setStep] = useState<Step>('basics')
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '',
    age: '',
    weightKg: '',
    heightCm: '',
    goal: 'lean' as UserProfile['goal'],
    activityLevel: 'moderate' as UserProfile['activityLevel'],
  })

  const stepIdx = STEPS.indexOf(step)

  const bmi = form.weightKg && form.heightCm
    ? calcBMI(parseFloat(form.weightKg), parseFloat(form.heightCm))
    : null

  const tdee = form.weightKg && form.heightCm && form.age
    ? calcTDEE(parseFloat(form.weightKg), parseFloat(form.heightCm), parseInt(form.age), form.activityLevel)
    : null

  const proteinTarget = form.weightKg
    ? Math.round(parseFloat(form.weightKg) * 2.2 * (form.goal === 'bulk' ? 1 : 0.9))
    : null

  const calorieTarget = tdee
    ? form.goal === 'lean' ? tdee - 300 : form.goal === 'bulk' ? tdee + 250 : tdee
    : null

  const next = () => {
    const idx = STEPS.indexOf(step)
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1])
  }

  const back = () => {
    const idx = STEPS.indexOf(step)
    if (idx > 0) setStep(STEPS[idx - 1])
  }

  const save = async () => {
    if (!user) return
    setSaving(true)
    await saveUserProfile(user.uid, {
      name: form.name,
      age: form.age ? parseInt(form.age) : undefined,
      weightKg: form.weightKg ? parseFloat(form.weightKg) : undefined,
      heightCm: form.heightCm ? parseFloat(form.heightCm) : undefined,
      goal: form.goal,
      activityLevel: form.activityLevel,
      targetProtein: proteinTarget || undefined,
      targetCalories: calorieTarget || undefined,
      completedOnboarding: true,
    })
    setSaving(false)
    onDone()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: '#111', border: '1px solid #222', borderRadius: 16,
        width: '100%', maxWidth: 480, padding: '2rem',
      }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: '1.75rem' }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{
              height: 3, flex: 1, borderRadius: 2,
              background: i <= stepIdx ? '#c8f135' : '#222',
              transition: 'background 0.3s'
            }} />
          ))}
        </div>

        {/* STEP 1 — basics */}
        {step === 'basics' && (
          <div>
            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: '#c8f135', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Step 1 of 3</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: 'white', marginBottom: 6 }}>Let's set you up</div>
            <div style={{ fontSize: 13, color: '#555', marginBottom: '1.5rem' }}>This personalises your protein targets and calorie goals.</div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, color: '#555', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Your name</label>
              <input className="inp" placeholder="e.g. Arjun" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: '#555', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Age</label>
              <input className="inp" type="number" placeholder="e.g. 20" value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} />
            </div>
          </div>
        )}

        {/* STEP 2 — body */}
        {step === 'body' && (
          <div>
            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: '#c8f135', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Step 2 of 3</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: 'white', marginBottom: 6 }}>Body stats</div>
            <div style={{ fontSize: 13, color: '#555', marginBottom: '1.5rem' }}>Used to calculate BMI, TDEE and protein targets.</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 11, color: '#555', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Weight (kg)</label>
                <input className="inp" type="number" placeholder="68" step="0.5" value={form.weightKg} onChange={e => setForm(f => ({ ...f, weightKg: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: '#555', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Height (cm)</label>
                <input className="inp" type="number" placeholder="175" value={form.heightCm} onChange={e => setForm(f => ({ ...f, heightCm: e.target.value }))} />
              </div>
            </div>

            {/* Live BMI preview */}
            {bmi && (
              <div style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: 10, padding: '12px 16px', display: 'flex', gap: 20 }}>
                <div>
                  <div style={{ fontFamily: 'Space Mono', fontSize: 24, fontWeight: 700, color: bmi < 18.5 ? '#4d9fff' : bmi < 25 ? '#c8f135' : bmi < 30 ? '#ff8c42' : '#ff4d4d' }}>{bmi}</div>
                  <div style={{ fontSize: 11, color: '#555' }}>BMI</div>
                </div>
                <div style={{ borderLeft: '1px solid #222', paddingLeft: 20 }}>
                  <div style={{ fontSize: 13, color: 'white', fontWeight: 500, marginBottom: 2 }}>
                    {bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal range' : bmi < 30 ? 'Overweight' : 'Obese'}
                  </div>
                  <div style={{ fontSize: 11, color: '#555' }}>
                    {bmi < 18.5 ? 'Aim to gain weight + muscle' : bmi < 25 ? 'You\'re in a healthy range' : 'Aim to lose fat while preserving muscle'}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3 — goal */}
        {step === 'goal' && (
          <div>
            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: '#c8f135', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Step 3 of 3</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: 'white', marginBottom: 6 }}>Your goal</div>
            <div style={{ fontSize: 13, color: '#555', marginBottom: '1rem' }}>Sets your calorie and protein targets automatically.</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '1.25rem' }}>
              {GOALS.map(g => (
                <button key={g.id} onClick={() => setForm(f => ({ ...f, goal: g.id as UserProfile['goal'] }))}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 14px', borderRadius: 10, cursor: 'pointer',
                    background: form.goal === g.id ? 'rgba(200,241,53,0.07)' : '#1a1a1a',
                    border: `1px solid ${form.goal === g.id ? '#c8f135' : '#222'}`,
                    textAlign: 'left', transition: 'all 0.15s'
                  }}>
                  <span style={{ fontSize: 20 }}>{g.emoji}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'white' }}>{g.label}</div>
                    <div style={{ fontSize: 11, color: '#555' }}>{g.sub}</div>
                  </div>
                </button>
              ))}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: 11, color: '#555', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Activity level</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {ACTIVITY.map(a => (
                  <button key={a.id} onClick={() => setForm(f => ({ ...f, activityLevel: a.id as UserProfile['activityLevel'] }))}
                    style={{
                      padding: '8px 10px', borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                      background: form.activityLevel === a.id ? 'rgba(200,241,53,0.07)' : '#1a1a1a',
                      border: `1px solid ${form.activityLevel === a.id ? '#c8f135' : '#222'}`,
                      transition: 'all 0.15s'
                    }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'white' }}>{a.label}</div>
                    <div style={{ fontSize: 10, color: '#555' }}>{a.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated targets preview */}
            {tdee && (
              <div style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: 10, padding: '12px 16px' }}>
                <div style={{ fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10, fontFamily: 'Space Mono' }}>Your personalised targets</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, textAlign: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'Space Mono', fontSize: 20, fontWeight: 700, color: '#ff8c42' }}>{proteinTarget}g</div>
                    <div style={{ fontSize: 10, color: '#555' }}>Protein/day</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Space Mono', fontSize: 20, fontWeight: 700, color: '#c8f135' }}>{calorieTarget}</div>
                    <div style={{ fontSize: 10, color: '#555' }}>Calories/day</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Space Mono', fontSize: 20, fontWeight: 700, color: '#4d9fff' }}>{tdee}</div>
                    <div style={{ fontSize: 10, color: '#555' }}>TDEE</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Nav buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: '1.5rem' }}>
          {stepIdx > 0 && (
            <button className="btn-ghost" onClick={back} style={{ flex: 1 }}>← Back</button>
          )}
          {step !== 'goal' ? (
            <button className="btn" onClick={next} style={{ flex: 2 }}>Continue →</button>
          ) : (
            <button className="btn" onClick={save} disabled={saving} style={{ flex: 2 }}>
              {saving ? 'Saving...' : 'Start tracking →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
