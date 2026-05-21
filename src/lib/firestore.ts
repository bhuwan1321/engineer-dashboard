import {
  collection, doc, setDoc, getDoc, getDocs,
  query, where, orderBy, deleteDoc, updateDoc,
  Timestamp, addDoc, limit
} from 'firebase/firestore'
import { db } from './firebase'

export const todayStr = () => new Date().toISOString().split('T')[0]

export async function upsertDoc(col: string, id: string, data: object) {
  await setDoc(doc(db, col, id), { ...data, updatedAt: Timestamp.now() }, { merge: true })
}

export async function getDocById(col: string, id: string) {
  const snap = await getDoc(doc(db, col, id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function deleteDocById(col: string, id: string) {
  await deleteDoc(doc(db, col, id))
}

// ── User Profile ──────────────────────────────────────────────────────────────
export interface UserProfile {
  uid: string
  name?: string
  age: number
  weight: number
  height: number
  gender: 'male' | 'female'
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  goal: 'lean_bulk' | 'cut' | 'maintain'
  bmi?: number
  bmr?: number
  tdee?: number
  proteinTarget?: number
  onboarded: boolean
}

export function calcMetrics(p: Pick<UserProfile, 'weight' | 'height' | 'age' | 'gender' | 'activityLevel'>) {
  const bmi = parseFloat((p.weight / Math.pow(p.height / 100, 2)).toFixed(1))
  const bmr = p.gender === 'male'
    ? 10 * p.weight + 6.25 * p.height - 5 * p.age + 5
    : 10 * p.weight + 6.25 * p.height - 5 * p.age - 161
  const mult = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 }
  const tdee = Math.round(bmr * mult[p.activityLevel])
  const proteinTarget = Math.round(p.weight * 1.8)
  return { bmi, bmr: Math.round(bmr), tdee, proteinTarget }
}

export async function saveProfile(uid: string, profile: Omit<UserProfile, 'uid'>) {
  await upsertDoc('profiles', uid, { ...profile, uid })
}

export async function getProfile(uid: string): Promise<UserProfile | null> {
  return getDocById('profiles', uid) as Promise<UserProfile | null>
}

// ── Daily Log ─────────────────────────────────────────────────────────────────
export interface DailyLog {
  uid: string
  date: string
  weight?: number
  protein?: number
  sleep?: number
  workout?: string
  calories?: number
  water?: number
  notes?: string
  mood?: 1 | 2 | 3 | 4 | 5
  focusScore?: number
  consistencyScore?: number
}

export async function saveDailyLog(uid: string, log: Omit<DailyLog, 'uid'>) {
  const id = `${uid}_${log.date}`
  await upsertDoc('daily_logs', id, { ...log, uid })
}

export async function getDailyLogs(uid: string, days = 60): Promise<DailyLog[]> {
  const since = new Date(); since.setDate(since.getDate() - days)
  const sinceStr = since.toISOString().split('T')[0]
  const q = query(collection(db, 'daily_logs'), where('uid', '==', uid), where('date', '>=', sinceStr), orderBy('date', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => d.data() as DailyLog)
}

// ── DSA Entry ─────────────────────────────────────────────────────────────────
export interface DSAEntry {
  id?: string
  uid: string
  date: string
  topic: string
  problem: string
  difficulty: 'easy' | 'medium' | 'hard'
  status: 'solved' | 'attempted' | 'revisit'
  platform: string
  timeMinutes?: number
  notes?: string
  understood?: boolean
  approach?: string
}

export async function saveDSAEntry(uid: string, entry: Omit<DSAEntry, 'uid' | 'id'>) {
  return addDoc(collection(db, 'dsa_entries'), { ...entry, uid, createdAt: Timestamp.now() })
}

export async function getDSAEntries(uid: string): Promise<DSAEntry[]> {
  const q = query(collection(db, 'dsa_entries'), where('uid', '==', uid), orderBy('createdAt', 'desc'), limit(500))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as DSAEntry))
}

// ── Topic Test ────────────────────────────────────────────────────────────────
export interface TopicTest {
  id?: string
  uid: string
  topic: string
  date: string
  score: number
  totalQuestions: number
  correct: number
  timeMinutes: number
  weakAreas: string[]
}

export async function saveTopicTest(uid: string, test: Omit<TopicTest, 'uid' | 'id'>) {
  return addDoc(collection(db, 'topic_tests'), { ...test, uid, createdAt: Timestamp.now() })
}

export async function getTopicTests(uid: string): Promise<TopicTest[]> {
  const q = query(collection(db, 'topic_tests'), where('uid', '==', uid), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as TopicTest))
}

// ── Performance Metrics ───────────────────────────────────────────────────────
export interface PerformanceMetric {
  id?: string
  uid: string
  date: string
  category: 'dsa' | 'workout' | 'study' | 'overall'
  focus: number
  consistency: number
  accuracy: number
  precision: number
  notes?: string
}

export async function savePerformanceMetric(uid: string, metric: Omit<PerformanceMetric, 'uid' | 'id'>) {
  const id = `${uid}_${metric.date}_${metric.category}`
  await upsertDoc('performance_metrics', id, { ...metric, uid })
}

export async function getPerformanceMetrics(uid: string, days = 60): Promise<PerformanceMetric[]> {
  const since = new Date(); since.setDate(since.getDate() - days)
  const sinceStr = since.toISOString().split('T')[0]
  const q = query(collection(db, 'performance_metrics'), where('uid', '==', uid), where('date', '>=', sinceStr), orderBy('date', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as PerformanceMetric))
}

// ── Workout Session ───────────────────────────────────────────────────────────
export interface ExerciseSet { name: string; sets: { reps: number; weight?: number; completed: boolean }[] }
export interface WorkoutSession {
  id?: string; uid: string; date: string; workoutType: string
  exercises: ExerciseSet[]; totalVolume?: number; durationMinutes?: number
}

export async function saveWorkoutSession(uid: string, session: Omit<WorkoutSession, 'uid' | 'id'>) {
  return addDoc(collection(db, 'workout_sessions'), { ...session, uid, createdAt: Timestamp.now() })
}

export async function getWorkoutSessions(uid: string, days = 30): Promise<WorkoutSession[]> {
  const since = new Date(); since.setDate(since.getDate() - days)
  const sinceStr = since.toISOString().split('T')[0]
  const q = query(collection(db, 'workout_sessions'), where('uid', '==', uid), where('date', '>=', sinceStr), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as WorkoutSession))
}

// ── Tasks ─────────────────────────────────────────────────────────────────────
export interface Task {
  id?: string; uid: string; title: string
  category: 'project' | 'academic' | 'interview' | 'other'
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'med' | 'high'
  dueDate?: string; subject?: string; estimatedHours?: number; notes?: string; createdAt?: Timestamp
}

export async function saveTask(uid: string, task: Omit<Task, 'uid' | 'id'>) {
  return addDoc(collection(db, 'tasks'), { ...task, uid, createdAt: Timestamp.now() })
}
export async function updateTask(id: string, data: Partial<Task>) {
  await updateDoc(doc(db, 'tasks', id), { ...data, updatedAt: Timestamp.now() })
}
export async function getTasks(uid: string): Promise<Task[]> {
  const q = query(collection(db, 'tasks'), where('uid', '==', uid), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Task))
}
export async function deleteTask(id: string) { await deleteDoc(doc(db, 'tasks', id)) }

// ── Streaks ───────────────────────────────────────────────────────────────────
export interface StreakData {
  uid: string; diet: number; workout: number; engineering: number; dsa: number
  lastDiet?: string; lastWorkout?: string; lastEngineering?: string; lastDsa?: string
}

export async function getStreaks(uid: string): Promise<StreakData | null> {
  return getDocById('streaks', uid) as Promise<StreakData | null>
}

export async function updateStreak(uid: string, field: 'diet' | 'workout' | 'engineering' | 'dsa') {
  const today = todayStr()
  const snap = await getDocById('streaks', uid) as StreakData | null
  const lastKey = `last${field.charAt(0).toUpperCase() + field.slice(1)}` as keyof StreakData
  const last = snap?.[lastKey] as string | undefined
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1)
  const yStr = yesterday.toISOString().split('T')[0]
  let current = (snap?.[field] as number) || 0
  if (last === today) return
  current = last === yStr ? current + 1 : 1
  await upsertDoc('streaks', uid, { uid, [field]: current, [lastKey]: today })
}
