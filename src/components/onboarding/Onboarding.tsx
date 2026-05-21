'use client'
import { useState } from 'react'
import { useStore } from '@/store'
import { saveProfile, calcMetrics, UserProfile } from '@/lib/firestore'

interface Props { onComplete: () => void }

export default function Onboarding({ onComplete }: Props) {
  const { user } = useStore()
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '', age: '', weight: '', height: '',
    gender: 'male' as 'male' | 'female',
    activityLevel: 'moderate' as UserProfile['activityLevel'],
    goal: 'lean_bulk' as UserProfile['goal'],
  })

  const f = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const metrics = form.weight && form.height && form.age && form.gender ? calcMetrics({
    weight: parseFloat(form.weight), height: parseFloat(form.height),
    age: parseInt(form.age), gender: form.gender, activityLevel: form.activityLevel,
  }) : null

  const save = async () => {
    if (!user || !metrics) return
    setSaving(true)
    await saveProfile(user.uid, {
      name: form.name, age: parseInt(form.age),
      weight: parseFloat(form.weight), height: parseFloat(form.height),
      gender: form.gender, activityLevel: form.activityLevel, goal: form.goal,
      ...metrics, onboarded: true,
    })
    onComplete()
  }

  const bmiLabel = (b: number) => b < 18.5 ? 'Underweight' : b < 25 ? 'Normal' : b < 30 ? 'Overweight' : 'Obese'
  const bmiColor = (b: number) => b < 18.5 ? '#4d9fff' : b < 25 ? '#c8f135' : b < 30 ? '#ff8c42' : '#ff4d4d'

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          {[1,2,3].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= step ? 'bg-[#c8f135]' : 'bg-[#222]'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <div className="font-mono text-[#c8f135] text-xs tracking-widest uppercase mb-2">Step 1 of 3</div>
              <h2 className="text-2xl font-bold text-white mb-1">Who are you?</h2>
              <p className="text-[#555] text-sm">Used to calculate your exact protein, calorie, and training targets.</p>
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-1 block uppercase tracking-widest">Name</label>
              <input className="inp" placeholder="Your name" value={form.name} onChange={e => f('name', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[#555] mb-1 block uppercase tracking-widest">Age</label>
                <input type="number" className="inp" placeholder="21" value={form.age} onChange={e => f('age', e.target.value)} />
              </div>
              <div>
                <label className="text-[11px] text-[#555] mb-1 block uppercase tracking-widest">Gender</label>
                <div className="flex gap-2">
                  {(['male','female'] as const).map(g => (
                    <button key={g} onClick={() => f('gender', g)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-mono border capitalize transition-all
                        ${form.gender === g ? 'border-[#c8f135] text-[#c8f135] bg-[#c8f135]/05' : 'border-[#222] text-[#555]'}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button className="btn w-full" onClick={() => form.name && form.age ? setStep(2) : null}>
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <div className="font-mono text-[#c8f135] text-xs tracking-widest uppercase mb-2">Step 2 of 3</div>
              <h2 className="text-2xl font-bold text-white mb-1">Your body stats</h2>
              <p className="text-[#555] text-sm">We'll calculate your BMI, BMR, TDEE and exact protein target.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[#555] mb-1 block uppercase tracking-widest">Weight (kg)</label>
                <input type="number" className="inp" placeholder="68" step="0.5" value={form.weight} onChange={e => f('weight', e.target.value)} />
              </div>
              <div>
                <label className="text-[11px] text-[#555] mb-1 block uppercase tracking-widest">Height (cm)</label>
                <input type="number" className="inp" placeholder="175" value={form.height} onChange={e => f('height', e.target.value)} />
              </div>
            </div>

            {/* Live calculated metrics */}
            {metrics && (
              <div className="bg-[#111] border border-[#222] rounded-xl p-4 space-y-3">
                <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase">Your stats</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[11px] text-[#555]">BMI</div>
                    <div className="font-mono text-xl font-bold" style={{ color: bmiColor(metrics.bmi) }}>{metrics.bmi}</div>
                    <div className="text-[10px]" style={{ color: bmiColor(metrics.bmi) }}>{bmiLabel(metrics.bmi)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#555]">Daily calories (TDEE)</div>
                    <div className="font-mono text-xl font-bold text-white">{metrics.tdee}</div>
                    <div className="text-[10px] text-[#444]">kcal/day</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#555]">Protein target</div>
                    <div className="font-mono text-xl font-bold text-[#ff8c42]">{metrics.proteinTarget}g</div>
                    <div className="text-[10px] text-[#444]">1.8g per kg</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#555]">BMR</div>
                    <div className="font-mono text-xl font-bold text-[#4d9fff]">{metrics.bmr}</div>
                    <div className="text-[10px] text-[#444]">base metabolic rate</div>
                  </div>
                </div>
                {/* BMI bar */}
                <div>
                  <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 flex">
                      <div className="flex-1 bg-[#4d9fff]/30" />
                      <div className="flex-1 bg-[#c8f135]/30" />
                      <div className="flex-1 bg-[#ff8c42]/30" />
                      <div className="flex-1 bg-[#ff4d4d]/30" />
                    </div>
                    <div className="absolute top-0 h-full w-1 bg-white rounded-full transition-all"
                      style={{ left: `${Math.min(95, Math.max(2, (metrics.bmi - 10) / 30 * 100))}%` }} />
                  </div>
                  <div className="flex justify-between text-[9px] text-[#444] mt-1">
                    <span>Under 18.5</span><span>18.5–25</span><span>25–30</span><span>30+</span>
                  </div>
                </div>
              </div>
            )}
            <button className="btn w-full" onClick={() => form.weight && form.height ? setStep(3) : null}>
              Continue →
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <div className="font-mono text-[#c8f135] text-xs tracking-widest uppercase mb-2">Step 3 of 3</div>
              <h2 className="text-2xl font-bold text-white mb-1">Your lifestyle</h2>
              <p className="text-[#555] text-sm">This adjusts your calorie target and training load.</p>
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-2 block uppercase tracking-widest">Activity level</label>
              <div className="space-y-2">
                {([
                  ['sedentary', 'Sedentary', 'Desk job, no exercise'],
                  ['light', 'Light', 'Light exercise 1–3x/week'],
                  ['moderate', 'Moderate', 'Moderate exercise 3–5x/week'],
                  ['active', 'Active', 'Hard exercise 6–7x/week'],
                  ['very_active', 'Very active', 'Physical job + training'],
                ] as const).map(([val, label, desc]) => (
                  <button key={val} onClick={() => f('activityLevel', val)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all
                      ${form.activityLevel === val ? 'border-[#c8f135] bg-[#c8f135]/05' : 'border-[#1a1a1a] hover:border-[#333]'}`}>
                    <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${form.activityLevel === val ? 'border-[#c8f135] bg-[#c8f135]' : 'border-[#444]'}`} />
                    <div>
                      <div className={`text-sm font-medium ${form.activityLevel === val ? 'text-[#c8f135]' : 'text-white'}`}>{label}</div>
                      <div className="text-[11px] text-[#444]">{desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-2 block uppercase tracking-widest">Goal</label>
              <div className="grid grid-cols-3 gap-2">
                {([['lean_bulk','Lean bulk'],['cut','Cut'],['maintain','Maintain']] as const).map(([val, label]) => (
                  <button key={val} onClick={() => f('goal', val)}
                    className={`p-3 rounded-lg border text-sm font-mono transition-all
                      ${form.goal === val ? 'border-[#c8f135] text-[#c8f135] bg-[#c8f135]/05' : 'border-[#222] text-[#555]'}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn w-full py-3" onClick={save} disabled={saving}>
              {saving ? 'Setting up...' : 'Start Engineer OS →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
