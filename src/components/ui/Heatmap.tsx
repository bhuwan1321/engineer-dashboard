'use client'
import { DailyLog } from '@/lib/firestore'

interface HeatmapProps {
  logs: DailyLog[]
  days?: number
}

function scoreDay(log: DailyLog | undefined): number {
  if (!log) return 0
  let s = 0
  if ((log.protein || 0) >= 130) s++
  if ((log.sleep || 0) >= 6) s++
  if (log.workout && log.workout !== 'none') s++
  return s
}

function heatColor(score: number): string {
  if (score === 0) return 'var(--color-background-secondary)'
  if (score === 1) return 'rgba(200,241,53,0.2)'
  if (score === 2) return 'rgba(200,241,53,0.5)'
  return '#c8f135'
}

function heatBorder(score: number): string {
  if (score === 0) return 'var(--color-border-tertiary)'
  if (score === 1) return 'rgba(200,241,53,0.3)'
  if (score === 2) return 'rgba(200,241,53,0.6)'
  return '#a8cc20'
}

const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAY_LABELS = ['S','M','T','W','T','F','S']

export default function Heatmap({ logs, days = 90 }: HeatmapProps) {
  // Build grid — align to week start (Sunday)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Go back `days` days then rewind to Sunday
  const start = new Date(today)
  start.setDate(start.getDate() - days)
  const dow = start.getDay()
  start.setDate(start.getDate() - dow) // align to Sunday

  const cells: { date: string; score: number; month: number; day: number; isToday: boolean }[] = []
  const cursor = new Date(start)
  while (cursor <= today) {
    const dateStr = cursor.toISOString().split('T')[0]
    const log = logs.find(l => l.date === dateStr)
    cells.push({
      date: dateStr,
      score: scoreDay(log),
      month: cursor.getMonth(),
      day: cursor.getDate(),
      isToday: cursor.getTime() === today.getTime(),
    })
    cursor.setDate(cursor.getDate() + 1)
  }

  // Group into weeks (columns of 7)
  const weeks: typeof cells[] = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }

  // Month label positions
  const monthPositions: { label: string; col: number }[] = []
  weeks.forEach((week, wi) => {
    const firstDay = week.find(c => c.day === 1)
    if (firstDay) {
      monthPositions.push({ label: MONTH_LABELS[firstDay.month], col: wi })
    }
  })

  const CELL = 14
  const GAP = 3
  const LABEL_W = 20
  const COL_W = CELL + GAP

  const totalSessions = logs.filter(l => l.workout && l.workout !== 'none').length
  const perfectDays = cells.filter(c => c.score === 3).length
  const activeDays = cells.filter(c => c.score > 0).length

  return (
    <div>
      {/* Stats row */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
        {[
          { label: 'Active days', val: activeDays, color: '#c8f135' },
          { label: 'Perfect days', val: perfectDays, color: '#ff8c42' },
          { label: 'Workout sessions', val: totalSessions, color: '#a78bfa' },
        ].map(s => (
          <div key={s.label}>
            <span style={{ fontFamily: 'Space Mono', fontSize: 18, fontWeight: 700, color: s.color }}>{s.val}</span>
            <span style={{ fontSize: 11, color: '#555', marginLeft: 6 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Day labels */}
      <div style={{ display: 'flex', marginBottom: 2, paddingLeft: LABEL_W }}>
        {DAY_LABELS.map((d, i) => (
          <div key={i} style={{
            width: CELL, fontSize: 9, color: '#444',
            textAlign: 'center', marginRight: GAP,
            fontFamily: 'Space Mono',
          }}>{d}</div>
        ))}
      </div>

      {/* Heatmap grid — weeks as rows, days as columns */}
      <div style={{ display: 'flex', gap: GAP, overflowX: 'auto', paddingBottom: 4 }}>
        {weeks.map((week, wi) => {
          const monthLabel = monthPositions.find(m => m.col === wi)
          return (
            <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
              {/* Month label */}
              <div style={{ height: 14, fontSize: 9, color: '#555', fontFamily: 'Space Mono', whiteSpace: 'nowrap' }}>
                {monthLabel?.label || ''}
              </div>
              {week.map((cell, di) => (
                <div
                  key={cell.date}
                  title={`${cell.date} — ${cell.score === 0 ? 'no data' : cell.score === 1 ? 'light' : cell.score === 2 ? 'good' : 'perfect'}`}
                  style={{
                    width: CELL,
                    height: CELL,
                    borderRadius: 3,
                    background: heatColor(cell.score),
                    border: `1px solid ${cell.isToday ? '#c8f135' : heatBorder(cell.score)}`,
                    boxSizing: 'border-box',
                    cursor: 'default',
                    outline: cell.isToday ? '1px solid #c8f135' : 'none',
                    outlineOffset: 1,
                    transition: 'transform 0.1s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.4)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
              ))}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
        <span style={{ fontSize: 10, color: '#444' }}>Less</span>
        {[0, 1, 2, 3].map(s => (
          <div key={s} style={{
            width: 12, height: 12, borderRadius: 2,
            background: heatColor(s),
            border: `1px solid ${heatBorder(s)}`,
          }} />
        ))}
        <span style={{ fontSize: 10, color: '#444' }}>More</span>
        <span style={{ fontSize: 10, color: '#333', marginLeft: 8 }}>Score = protein + sleep + workout</span>
      </div>
    </div>
  )
}
