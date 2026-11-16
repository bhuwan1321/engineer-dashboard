'use client'
import { useState, useEffect } from 'react'
import { useStore } from '@/store'
import { saveDSAEntry, getDSAEntries, saveTopicTest, getTopicTests, updateStreak, todayStr, DSAEntry, TopicTest } from '@/lib/firestore'
import { DSA_CURRICULUM, YOUTUBE_CHANNELS } from '@/lib/curriculum'
import { ExternalLink, CheckCircle, Circle, Brain, Target, TrendingUp, Youtube, AlertTriangle } from 'lucide-react'

// Extended problem bank — 20+ per topic
const EXTENDED_PROBLEMS: Record<string, { title: string; url: string; difficulty: 'easy'|'medium'|'hard'; concept: string; platform: string; mustSolve: boolean }[]> = {
  'arrays': [
    { title: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/', difficulty: 'easy', concept: 'HashMap', platform: 'LeetCode', mustSolve: true },
    { title: 'Best Time to Buy and Sell Stock', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', difficulty: 'easy', concept: 'Sliding window', platform: 'LeetCode', mustSolve: true },
    { title: 'Contains Duplicate', url: 'https://leetcode.com/problems/contains-duplicate/', difficulty: 'easy', concept: 'HashSet', platform: 'LeetCode', mustSolve: true },
    { title: 'Product of Array Except Self', url: 'https://leetcode.com/problems/product-of-array-except-self/', difficulty: 'medium', concept: 'Prefix sum', platform: 'LeetCode', mustSolve: true },
    { title: 'Maximum Subarray', url: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'medium', concept: "Kadane's", platform: 'LeetCode', mustSolve: true },
    { title: 'Majority Element', url: 'https://leetcode.com/problems/majority-element/', difficulty: 'easy', concept: 'Boyer-Moore', platform: 'LeetCode', mustSolve: false },
    { title: 'Sort Colors', url: 'https://leetcode.com/problems/sort-colors/', difficulty: 'medium', concept: 'Dutch National Flag', platform: 'LeetCode', mustSolve: true },
    { title: 'Next Permutation', url: 'https://leetcode.com/problems/next-permutation/', difficulty: 'medium', concept: 'Array manipulation', platform: 'LeetCode', mustSolve: true },
    { title: 'Find the Duplicate Number', url: 'https://leetcode.com/problems/find-the-duplicate-number/', difficulty: 'medium', concept: "Floyd's cycle", platform: 'LeetCode', mustSolve: true },
    { title: 'Set Matrix Zeroes', url: 'https://leetcode.com/problems/set-matrix-zeroes/', difficulty: 'medium', concept: 'In-place modification', platform: 'LeetCode', mustSolve: true },
    { title: 'Rotate Array', url: 'https://leetcode.com/problems/rotate-array/', difficulty: 'medium', concept: 'Reverse technique', platform: 'LeetCode', mustSolve: false },
    { title: 'Merge Intervals', url: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'medium', concept: 'Sorting + merge', platform: 'LeetCode', mustSolve: true },
    { title: 'Missing Number', url: 'https://leetcode.com/problems/missing-number/', difficulty: 'easy', concept: 'XOR / Math', platform: 'LeetCode', mustSolve: false },
    { title: 'Intersection of Two Arrays II', url: 'https://leetcode.com/problems/intersection-of-two-arrays-ii/', difficulty: 'easy', concept: 'HashMap', platform: 'LeetCode', mustSolve: false },
    { title: 'Subarray Sum Equals K', url: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'medium', concept: 'Prefix sum + HashMap', platform: 'LeetCode', mustSolve: true },
    { title: 'Trapping Rain Water', url: 'https://leetcode.com/problems/trapping-rain-water/', difficulty: 'hard', concept: 'Two pointer / stack', platform: 'LeetCode', mustSolve: true },
    { title: '3Sum', url: 'https://leetcode.com/problems/3sum/', difficulty: 'medium', concept: 'Two pointer', platform: 'LeetCode', mustSolve: true },
    { title: 'Spiral Matrix', url: 'https://leetcode.com/problems/spiral-matrix/', difficulty: 'medium', concept: 'Simulation', platform: 'LeetCode', mustSolve: false },
    { title: 'Jump Game', url: 'https://leetcode.com/problems/jump-game/', difficulty: 'medium', concept: 'Greedy', platform: 'LeetCode', mustSolve: true },
    { title: 'Pascal Triangle', url: 'https://leetcode.com/problems/pascals-triangle/', difficulty: 'easy', concept: 'DP / Math', platform: 'LeetCode', mustSolve: false },
    { title: 'Maximum Product Subarray', url: 'https://leetcode.com/problems/maximum-product-subarray/', difficulty: 'medium', concept: 'DP', platform: 'LeetCode', mustSolve: true },
    { title: 'Find Minimum in Rotated Sorted Array', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'medium', concept: 'Binary search', platform: 'LeetCode', mustSolve: true },
  ],
  'binary-search': [
    { title: 'Binary Search', url: 'https://leetcode.com/problems/binary-search/', difficulty: 'easy', concept: 'Basic BS', platform: 'LeetCode', mustSolve: true },
    { title: 'Search in Rotated Sorted Array', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'medium', concept: 'Modified BS', platform: 'LeetCode', mustSolve: true },
    { title: 'Find Minimum in Rotated Sorted Array', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'medium', concept: 'Modified BS', platform: 'LeetCode', mustSolve: true },
    { title: 'Median of Two Sorted Arrays', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', difficulty: 'hard', concept: 'BS on answer', platform: 'LeetCode', mustSolve: true },
    { title: 'Koko Eating Bananas', url: 'https://leetcode.com/problems/koko-eating-bananas/', difficulty: 'medium', concept: 'BS on answer', platform: 'LeetCode', mustSolve: true },
    { title: 'Capacity to Ship Packages', url: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', difficulty: 'medium', concept: 'BS on answer', platform: 'LeetCode', mustSolve: true },
    { title: 'First Bad Version', url: 'https://leetcode.com/problems/first-bad-version/', difficulty: 'easy', concept: 'BS', platform: 'LeetCode', mustSolve: false },
    { title: 'Find Peak Element', url: 'https://leetcode.com/problems/find-peak-element/', difficulty: 'medium', concept: 'BS', platform: 'LeetCode', mustSolve: true },
    { title: 'Search a 2D Matrix', url: 'https://leetcode.com/problems/search-a-2d-matrix/', difficulty: 'medium', concept: 'BS', platform: 'LeetCode', mustSolve: true },
    { title: 'Find First and Last Position', url: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', difficulty: 'medium', concept: 'BS lower/upper bound', platform: 'LeetCode', mustSolve: true },
    { title: 'Split Array Largest Sum', url: 'https://leetcode.com/problems/split-array-largest-sum/', difficulty: 'hard', concept: 'BS on answer', platform: 'LeetCode', mustSolve: true },
    { title: 'Magnetic Force Between Balls', url: 'https://leetcode.com/problems/magnetic-force-between-two-balls/', difficulty: 'medium', concept: 'BS on answer', platform: 'LeetCode', mustSolve: true },
  ],
}

// Topic quiz questions for self-assessment
const TOPIC_QUIZZES: Record<string, { q: string; options: string[]; answer: number; explain: string; concept?: string }[]> = {
  'arrays': [
    { q: 'What is the time complexity of Kadane\'s algorithm for maximum subarray?', options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(1)'], answer: 2, explain: 'Kadane\'s is a single pass — O(n). It keeps track of current max and global max as it goes.' },
    { q: 'In Two Sum, why do we use a HashMap instead of nested loops?', options: ['Less memory', 'O(n) vs O(n²) time', 'Easier to code', 'Works for sorted arrays'], answer: 1, explain: 'HashMap gives O(1) lookup so we do one pass: for each num, check if (target-num) exists.' },
    { q: 'Dutch National Flag algorithm solves which problem?', options: ['Finding max subarray', 'Sorting 0s, 1s, 2s', 'Two sum', 'Finding duplicates'], answer: 1, explain: '3-pointer approach: lo (0s boundary), mid (current), hi (2s boundary). O(n) one pass.' },
    { q: 'What is a prefix sum array used for?', options: ['Sorting arrays faster', 'Range sum queries in O(1)', 'Finding the maximum', 'Removing duplicates'], answer: 1, explain: 'prefix[i] = prefix[i-1] + arr[i]. Then sum(l,r) = prefix[r] - prefix[l-1] in O(1).' },
    { q: 'Subarray Sum Equals K uses prefix sum + HashMap. What do we store in the map?', options: ['Values and their indices', 'Prefix sum → count of times seen', 'Target - current value', 'Max subarray value'], answer: 1, explain: 'We store how many times each prefix sum has occurred. If prefix[j] - prefix[i] = k, we found a subarray.' },
  ],
  'binary-search': [
    { q: 'What is the invariant in binary search?', options: ['Array is sorted', 'Answer always lies in [lo, hi]', 'mid always equals target', 'Left is smaller than right'], answer: 1, explain: 'The invariant is: the answer is always within the current search space [lo, hi]. When lo > hi, we\'ve exhausted the space.' },
    { q: '"Binary search on the answer" means:', options: ['Searching in a sorted array', 'The answer range is used as search space', 'Binary searching twice', 'Using two pointers'], answer: 1, explain: 'Instead of searching for a value in an array, you binary search on the range of possible answers. Used in Koko, Aggressive Cows, etc.' },
    { q: 'For search in rotated sorted array, how do you determine which half is sorted?', options: ['Check if mid > lo', 'Check arr[lo] <= arr[mid]', 'Always search left first', 'Check if arr[mid] < arr[hi]'], answer: 1, explain: 'If arr[lo] <= arr[mid], left half is sorted. Otherwise right half is sorted. Then check if target is in the sorted half.' },
    { q: 'Lower bound in binary search gives:', options: ['First element > target', 'First element >= target', 'Last element <= target', 'Exact position of target'], answer: 1, explain: 'lower_bound returns the first position where arr[pos] >= target. upper_bound gives first position where arr[pos] > target.' },
  ],
}

type Tab = 'today' | 'week' | 'log' | 'test' | 'pattern'

export default function DSATrackerV2() {
  const { user } = useStore()
  const [tab, setTab] = useState<Tab>('today')
  const [entries, setEntries] = useState<DSAEntry[]>([])
  const [tests, setTests] = useState<TopicTest[]>([])
  const [selectedTopic, setSelectedTopic] = useState('arrays')
  const [form, setForm] = useState({ topic: 'arrays', problem: '', difficulty: 'medium' as DSAEntry['difficulty'], status: 'solved' as DSAEntry['status'], platform: 'LeetCode', timeMinutes: '', understood: true, approach: '', notes: '' })
  const [saving, setSaving] = useState(false)
  // Quiz state
  const [quizActive, setQuizActive] = useState(false)
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [quizDone, setQuizDone] = useState(false)
  const [quizStart, setQuizStart] = useState(0)

  useEffect(() => {
    if (!user) return
    Promise.all([getDSAEntries(user.uid), getTopicTests(user.uid)]).then(([e, t]) => { setEntries(e); setTests(t) })
  }, [user])

  const reload = async () => {
    if (!user) return
    const [e, t] = await Promise.all([getDSAEntries(user.uid), getTopicTests(user.uid)])
    setEntries(e); setTests(t)
  }

  const saveEntry = async () => {
    if (!user || !form.problem) return
    setSaving(true)
    await saveDSAEntry(user.uid, { ...form, date: todayStr(), timeMinutes: form.timeMinutes ? parseInt(form.timeMinutes) : undefined })
    await updateStreak(user.uid, 'dsa')
    await reload()
    setForm(f => ({ ...f, problem: '', notes: '', approach: '' }))
    setSaving(false)
  }

  // Analytics
  const thisWeek = entries.filter(e => {
    const d = new Date(); d.setDate(d.getDate() - 7)
    return e.date >= d.toISOString().split('T')[0]
  })
  const solvedThisWeek = thisWeek.filter(e => e.status === 'solved').length
  const understoodPct = entries.length ? Math.round(entries.filter(e => e.understood).length / entries.length * 100) : 0
  const avgTime = entries.filter(e => e.timeMinutes).length ?
    Math.round(entries.filter(e => e.timeMinutes).reduce((a, e) => a + (e.timeMinutes || 0), 0) / entries.filter(e => e.timeMinutes).length) : 0

  const solvedIds = new Set(entries.filter(e => e.status === 'solved').map(e => e.problem))

  // Today's problems — pick 3-4 based on topic cycle
  const dayOfWeek = new Date().getDay()
  const topicIdx = dayOfWeek % DSA_CURRICULUM.length
  const todayTopic = DSA_CURRICULUM[topicIdx]
  const todayProblems = (EXTENDED_PROBLEMS[todayTopic.id] || todayTopic.problems)
    .filter(p => !solvedIds.has(p.title)).slice(0, 4)

  // Weekly plan — 20+ problems spread across topics
  const weekPlan = DSA_CURRICULUM.map((t, i) => ({
    ...t,
    problems: (EXTENDED_PROBLEMS[t.id] || t.problems).filter(p => !solvedIds.has(p.title)).slice(0, 3),
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i % 7]
  }))

  // Quiz
  const topicQuiz = TOPIC_QUIZZES[selectedTopic] || []
  const startQuiz = () => { setQuizIdx(0); setQuizAnswers([]); setQuizDone(false); setQuizActive(true); setQuizStart(Date.now()) }
  const answerQuiz = (ans: number) => {
    const newAnswers = [...quizAnswers, ans]
    setQuizAnswers(newAnswers)
    if (quizIdx + 1 >= topicQuiz.length) {
      setQuizDone(true)
      setQuizActive(false)
      const correct = newAnswers.filter((a, i) => a === topicQuiz[i].answer).length
      const score = Math.round(correct / topicQuiz.length * 100)
      const timeMinutes = Math.round((Date.now() - quizStart) / 60000)
      if (user) saveTopicTest(user.uid, {
        topic: selectedTopic, date: todayStr(), score,
        totalQuestions: topicQuiz.length, correct, timeMinutes,
        weakAreas: topicQuiz.filter((q, i) => newAnswers[i] !== q.answer).map(q => q.concept || '')
      }).then(reload)
    } else {
      setQuizIdx(i => i + 1)
    }
  }

  // Learning pattern: topic accuracy over time
  const topicAccuracy = DSA_CURRICULUM.map(t => {
    const topicTests = tests.filter(te => te.topic === t.id)
    const lastTest = topicTests[0]
    const solved = entries.filter(e => e.topic === t.id && e.status === 'solved').length
    const total = (EXTENDED_PROBLEMS[t.id] || t.problems).length
    return {
      topic: t.name, id: t.id,
      solved, total,
      testScore: lastTest?.score || 0,
      tested: topicTests.length > 0,
      weak: lastTest?.score < 70,
      pct: Math.round(solved / total * 100)
    }
  })

  const TABS = [
    { id: 'today', label: "Today's problems" },
    { id: 'week', label: 'Week plan (20+)' },
    { id: 'log', label: 'Log entry' },
    { id: 'test', label: 'Topic test' },
    { id: 'pattern', label: 'Learning map' },
  ]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="font-mono text-lg font-bold text-white">DSA Tracker</div>
        <div className="flex gap-4 font-mono text-sm">
          <div><span className="text-[#c8f135] font-bold">{solvedThisWeek}</span><span className="text-[#444]">/20 this week</span></div>
          <div><span className="text-[#ff8c42] font-bold">{understoodPct}%</span><span className="text-[#444]"> understood</span></div>
        </div>
      </div>

      {/* Weekly goal bar */}
      <div className="card">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-[#555]">Weekly goal</span>
          <span className="font-mono text-[#c8f135]">{solvedThisWeek}/20 problems</span>
        </div>
        <div className="h-2.5 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div className="h-full bg-[#c8f135] rounded-full transition-all"
            style={{ width: `${Math.min(100, solvedThisWeek / 20 * 100)}%` }} />
        </div>
        {solvedThisWeek < 20 && (
          <div className="text-[11px] text-[#555] mt-1.5">{20 - solvedThisWeek} more to hit the goal · avg {avgTime}min/problem</div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#111] border border-[#222] rounded-lg p-1 overflow-x-auto">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id as Tab)}
            className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-all flex-shrink-0
              ${tab === t.id ? 'bg-[#c8f135] text-black font-bold' : 'text-[#555] hover:text-white'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* TODAY */}
      {tab === 'today' && (
        <div className="space-y-3">
          <div className="card border-[#c8f135]/20">
            <div className="text-[10px] font-mono tracking-widest text-[#c8f135] uppercase mb-1">Today's focus — {todayTopic.name}</div>
            <div className="text-[11px] text-[#555] mb-3">
              Watch: <a href={todayTopic.youtubePlaylist} target="_blank" rel="noreferrer" className="text-[#c8f135] hover:underline">{todayTopic.youtubeChannel} →</a>
            </div>
            <div className="space-y-2">
              {todayProblems.length === 0 ? (
                <div className="text-center py-4 text-[#c8f135] font-mono text-sm">All problems in this topic solved! 🎉</div>
              ) : todayProblems.map(p => (
                <div key={p.title} className="flex items-center gap-3 p-3 rounded-lg border border-[#1a1a1a] hover:border-[#333] transition-all">
                  <Circle size={14} className="text-[#333] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium truncate">{p.title}</div>
                    <div className="text-[11px] text-[#444]">{p.concept} · {p.platform}</div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {p.mustSolve && <span className="badge badge-purple text-[9px]">MUST</span>}
                    <span className={`badge badge-${p.difficulty === 'easy' ? 'green' : p.difficulty === 'medium' ? 'orange' : 'red'} text-[9px]`}>{p.difficulty[0].toUpperCase()}</span>
                    <a href={p.url} target="_blank" rel="noreferrer" className="text-[#444] hover:text-white ml-1"><ExternalLink size={12} /></a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Concept to understand today */}
          <div className="card">
            <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase mb-3">Don't just solve — understand</div>
            <div className="space-y-2">
              {[
                'After solving, re-solve without looking at your solution',
                'Explain the approach out loud in plain English',
                'Identify the pattern — what type of problem is this?',
                'Ask: could I recognize this in a different problem?',
                'Time yourself — under 20 min for easy, 35 min for medium',
              ].map((tip, i) => (
                <div key={i} className="flex gap-2 text-[12px] text-[#666]">
                  <span className="text-[#c8f135] flex-shrink-0 font-mono">{i+1}.</span> {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WEEK PLAN */}
      {tab === 'week' && (
        <div className="space-y-3">
          <div className="text-[11px] text-[#555]">20+ problems spread across all topics. Solve 3 per topic per day.</div>
          {weekPlan.map(t => (
            <div key={t.id} className="card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-sm text-white">{t.name}</div>
                  <div className="text-[11px] text-[#444] font-mono">{t.day} · {t.problems.filter(p => !solvedIds.has(p.title)).length} pending</div>
                </div>
                <a href={t.youtubePlaylist} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1 text-[10px] text-[#ff4d4d] hover:underline">
                  <Youtube size={11} /> Watch
                </a>
              </div>
              <div className="space-y-1.5">
                {t.problems.slice(0, 3).map(p => (
                  <div key={p.title} className={`flex items-center gap-2 text-xs py-1 ${solvedIds.has(p.title) ? 'opacity-40' : ''}`}>
                    {solvedIds.has(p.title)
                      ? <CheckCircle size={13} className="text-[#c8f135]" />
                      : <Circle size={13} className="text-[#333]" />}
                    <span className={`flex-1 ${solvedIds.has(p.title) ? 'line-through text-[#444]' : 'text-white'}`}>{p.title}</span>
                    <span className={`badge text-[9px] badge-${p.difficulty === 'easy' ? 'green' : p.difficulty === 'medium' ? 'orange' : 'red'}`}>{p.difficulty[0].toUpperCase()}</span>
                    <a href={p.url} target="_blank" rel="noreferrer" className="text-[#333] hover:text-white"><ExternalLink size={11} /></a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LOG */}
      {tab === 'log' && (
        <div className="card space-y-3">
          <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase">Log a problem</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-[11px] text-[#555] mb-1 block">Problem title</label>
              <input className="inp" placeholder="e.g. Two Sum" value={form.problem} onChange={e => setForm(f => ({ ...f, problem: e.target.value }))} />
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Topic</label>
              <select className="inp" value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}>
                {DSA_CURRICULUM.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Difficulty</label>
              <select className="inp" value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value as any }))}>
                <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Status</label>
              <select className="inp" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as any }))}>
                <option value="solved">Solved</option><option value="attempted">Attempted</option><option value="revisit">Revisit</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#555] mb-1 block">Time (min)</label>
              <input type="number" className="inp" placeholder="25" value={form.timeMinutes} onChange={e => setForm(f => ({ ...f, timeMinutes: e.target.value }))} />
            </div>
            <div className="col-span-2">
              <label className="text-[11px] text-[#555] mb-1 block">Approach / pattern used</label>
              <input className="inp" placeholder="Sliding window, Two pointer, HashMap..." value={form.approach} onChange={e => setForm(f => ({ ...f, approach: e.target.value }))} />
            </div>
            <div className="col-span-2 flex items-center gap-3">
              <input type="checkbox" id="understood" checked={form.understood}
                onChange={e => setForm(f => ({ ...f, understood: e.target.checked }))}
                className="w-4 h-4 accent-[#c8f135]" />
              <label htmlFor="understood" className="text-sm text-white cursor-pointer">
                I truly understood this — not just got it accepted
              </label>
            </div>
          </div>
          <button className="btn w-full" onClick={saveEntry} disabled={saving}>{saving ? 'Saving...' : 'Log Problem →'}</button>

          {/* Recent */}
          {entries.slice(0, 8).length > 0 && (
            <div className="border-t border-[#1a1a1a] pt-4 space-y-1.5">
              {entries.slice(0, 8).map((e, i) => (
                <div key={i} className="flex items-center gap-2 text-xs py-1">
                  <span className="text-[#444] font-mono w-14 flex-shrink-0">{e.date.slice(5)}</span>
                  <span className="flex-1 text-white truncate">{e.problem}</span>
                  {e.understood && <Brain size={11} className="text-[#c8f135] flex-shrink-0" />}
                  <span className={`badge text-[9px] badge-${e.status === 'solved' ? 'green' : 'orange'}`}>{e.status === 'solved' ? '✓' : '~'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TOPIC TEST */}
      {tab === 'test' && (
        <div className="space-y-4">
          <div>
            <label className="text-[11px] text-[#555] mb-2 block uppercase tracking-widest">Select topic to test</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(TOPIC_QUIZZES).map(t => (
                <button key={t} onClick={() => { setSelectedTopic(t); setQuizActive(false); setQuizDone(false) }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border capitalize transition-all
                    ${selectedTopic === t ? 'border-[#c8f135] text-[#c8f135]' : 'border-[#222] text-[#555]'}`}>
                  {t.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {!quizActive && !quizDone && (
            <div className="card">
              <div className="font-medium text-white mb-1">{selectedTopic.replace('-', ' ')} — concept test</div>
              <div className="text-[11px] text-[#555] mb-4">{topicQuiz.length} questions · tests logical understanding, not just problem count</div>
              {tests.filter(t => t.topic === selectedTopic).length > 0 && (
                <div className="bg-[#1a1a1a] rounded-lg p-3 mb-4">
                  <div className="text-[10px] font-mono text-[#444] uppercase mb-1">Last test result</div>
                  <div className="font-mono text-2xl font-bold" style={{ color: tests.find(t => t.topic === selectedTopic)!.score >= 70 ? '#c8f135' : '#ff4d4d' }}>
                    {tests.find(t => t.topic === selectedTopic)!.score}%
                  </div>
                  {tests.find(t => t.topic === selectedTopic)!.score < 70 && (
                    <div className="text-[11px] text-[#ff4d4d] flex items-center gap-1 mt-1">
                      <AlertTriangle size={11} /> Below 70% — revisit this topic before moving on
                    </div>
                  )}
                </div>
              )}
              <button className="btn w-full" onClick={startQuiz}>Start test →</button>
            </div>
          )}

          {quizActive && topicQuiz[quizIdx] && (
            <div className="card space-y-4">
              <div className="flex justify-between items-center">
                <div className="font-mono text-xs text-[#444]">Q{quizIdx + 1}/{topicQuiz.length}</div>
                <div className="h-1 flex-1 mx-4 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#c8f135] rounded-full transition-all" style={{ width: `${(quizIdx / topicQuiz.length) * 100}%` }} />
                </div>
              </div>
              <div className="text-base font-medium text-white">{topicQuiz[quizIdx].q}</div>
              <div className="space-y-2">
                {topicQuiz[quizIdx].options.map((opt, i) => (
                  <button key={i} onClick={() => answerQuiz(i)}
                    className="w-full text-left p-3 rounded-lg border border-[#222] text-sm text-[#888] hover:border-[#c8f135] hover:text-white transition-all">
                    <span className="font-mono text-[#444] mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {quizDone && (
            <div className="card space-y-4">
              <div className="text-[10px] font-mono tracking-widest text-[#444] uppercase">Test results</div>
              <div className="text-center py-2">
                <div className="font-mono text-5xl font-bold mb-1"
                  style={{ color: quizAnswers.filter((a,i) => a === topicQuiz[i].answer).length / topicQuiz.length >= 0.7 ? '#c8f135' : '#ff4d4d' }}>
                  {Math.round(quizAnswers.filter((a,i) => a === topicQuiz[i].answer).length / topicQuiz.length * 100)}%
                </div>
                <div className="text-[#555] text-sm">{quizAnswers.filter((a,i) => a === topicQuiz[i].answer).length}/{topicQuiz.length} correct</div>
              </div>
              <div className="space-y-3">
                {topicQuiz.map((q, i) => {
                  const correct = quizAnswers[i] === q.answer
                  return (
                    <div key={i} className={`p-3 rounded-lg border ${correct ? 'border-[#c8f135]/20 bg-[#c8f135]/[0.03]' : 'border-[#ff4d4d]/20 bg-[#ff4d4d]/[0.03]'}`}>
                      <div className="text-xs font-medium text-white mb-1">{q.q}</div>
                      {!correct && <div className="text-[11px] text-[#ff4d4d] mb-1">✗ You said: {q.options[quizAnswers[i]]}</div>}
                      <div className={`text-[11px] ${correct ? 'text-[#c8f135]' : 'text-[#ff8c42]'}`}>✓ {q.options[q.answer]}</div>
                      <div className="text-[11px] text-[#444] mt-1">{q.explain}</div>
                    </div>
                  )
                })}
              </div>
              <button className="btn w-full" onClick={startQuiz}>Retake →</button>
            </div>
          )}
        </div>
      )}

      {/* LEARNING MAP */}
      {tab === 'pattern' && (
        <div className="space-y-4">
          <div className="text-[11px] text-[#555]">Your accuracy per topic based on tests + solve rate. Red = needs attention before moving on.</div>
          <div className="space-y-2.5">
            {topicAccuracy.map(t => (
              <div key={t.id} className={`card ${t.tested && t.weak ? 'border-[#ff4d4d]/30' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-sm font-medium text-white">{t.topic}</div>
                    <div className="text-[11px] text-[#444]">{t.solved}/{t.total} solved</div>
                  </div>
                  <div className="text-right">
                    {t.tested ? (
                      <>
                        <div className="font-mono text-lg font-bold" style={{ color: t.weak ? '#ff4d4d' : '#c8f135' }}>{t.testScore}%</div>
                        <div className="text-[10px]" style={{ color: t.weak ? '#ff4d4d' : '#555' }}>{t.weak ? '⚠ weak' : 'test score'}</div>
                      </>
                    ) : (
                      <div className="text-[11px] text-[#444]">not tested</div>
                    )}
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <div className="flex-1">
                    <div className="text-[9px] text-[#444] mb-1">Problems solved</div>
                    <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div className="h-full bg-[#4d9fff] rounded-full" style={{ width: `${t.pct}%` }} />
                    </div>
                  </div>
                  {t.tested && (
                    <div className="flex-1">
                      <div className="text-[9px] text-[#444] mb-1">Test accuracy</div>
                      <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${t.testScore}%`, background: t.weak ? '#ff4d4d' : '#c8f135' }} />
                      </div>
                    </div>
                  )}
                </div>
                {t.tested && t.weak && (
                  <div className="text-[11px] text-[#ff8c42] mt-2 flex items-center gap-1">
                    <AlertTriangle size={11} /> Test score below 70% — revisit concepts before moving forward
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Adaptive recommendation */}
          <div className="card border-[#a78bfa]/20">
            <div className="text-[10px] font-mono tracking-widest text-[#a78bfa] uppercase mb-3">Adaptive recommendation</div>
            {topicAccuracy.filter(t => t.tested && t.weak).length > 0 ? (
              <div className="space-y-2">
                <div className="text-sm text-white">Focus on these weak topics first:</div>
                {topicAccuracy.filter(t => t.tested && t.weak).map(t => (
                  <div key={t.id} className="flex gap-2 text-sm text-[#ff8c42]">
                    <span>▸</span> {t.topic} — rewatch the YouTube series, redo 5+ problems
                  </div>
                ))}
              </div>
            ) : topicAccuracy.filter(t => !t.tested && t.solved > 2).length > 0 ? (
              <div>
                <div className="text-sm text-white mb-2">Ready to test these topics:</div>
                {topicAccuracy.filter(t => !t.tested && t.solved > 2).slice(0, 3).map(t => (
                  <div key={t.id} className="text-sm text-[#c8f135] flex gap-2">
                    <span>▸</span> {t.topic} — go to Topic Test tab
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-[#555]">Keep solving problems and take topic tests to get personalized recommendations.</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
