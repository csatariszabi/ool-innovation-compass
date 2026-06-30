import type { Grade } from '../types'

const GRADE_COLORS: Record<Grade, { bg: string; text: string; border: string }> = {
  A: { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0' },
  B: { bg: '#F0FDF4', text: '#166534', border: '#BBF7D0' },
  C: { bg: '#FEFCE8', text: '#854D0E', border: '#FEF08A' },
  D: { bg: '#FFF7ED', text: '#9A3412', border: '#FED7AA' },
  E: { bg: '#FFF1F2', text: '#9F1239', border: '#FECDD3' },
}

export function GradeBadge({ grade, size = 'md' }: { grade: Grade; size?: 'sm' | 'md' | 'lg' }) {
  const c = GRADE_COLORS[grade]
  const sz = size === 'sm' ? 'w-6 h-6 text-xs' : size === 'lg' ? 'w-10 h-10 text-lg' : 'w-8 h-8 text-sm'
  return (
    <div
      className={`${sz} inline-flex items-center justify-center rounded-full font-bold border`}
      style={{ background: c.bg, color: c.text, borderColor: c.border }}
    >
      {grade}
    </div>
  )
}

export function scoreColor(score: number): string {
  if (score >= 4.5) return '#0CA30C'
  if (score >= 3.5) return '#1BAF7A'
  if (score >= 2.5) return '#C9A800'
  if (score >= 1.5) return '#EB6834'
  return '#E34948'
}

export function dimScoreColor(score: number): string {
  if (score >= 5) return '#0CA30C'
  if (score >= 4) return '#1BAF7A'
  if (score >= 3) return '#C9A800'
  if (score >= 2) return '#EB6834'
  return '#E34948'
}

export function ScoreDisplay({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' | 'lg' }) {
  const fs = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-4xl' : 'text-2xl'
  return (
    <span className={`${fs} font-bold font-mono`} style={{ color: scoreColor(score) }}>
      {score.toFixed(2)}
    </span>
  )
}

export function ScoreBar({ score, label, abbr }: { score: number; label: string; abbr: string }) {
  const color = dimScoreColor(score)
  return (
    <div className="flex items-center gap-2 group">
      <span className="text-[10px] font-mono text-gray-400 w-8 flex-shrink-0 group-hover:text-gray-600 transition-colors" title={label}>{abbr}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(score / 5) * 100}%`, background: color }}
        />
      </div>
      <span className="text-[10px] font-mono font-semibold w-4 text-right" style={{ color }}>{score}</span>
    </div>
  )
}

export function RubricScoreChip({ score }: { score: number }) {
  const color = dimScoreColor(score)
  const bg = score >= 5 ? '#ECFDF5' : score >= 4 ? '#F0FDF4' : score >= 3 ? '#FEFCE8' : score >= 2 ? '#FFF7ED' : '#FFF1F2'
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border"
      style={{ color, background: bg, borderColor: color + '50' }}
    >
      {score}
    </span>
  )
}
