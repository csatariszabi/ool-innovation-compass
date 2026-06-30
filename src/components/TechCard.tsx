import { useState } from 'react'
import { ChevronDown, ChevronUp, MapPin, Calendar } from 'lucide-react'
import type { Technology } from '../types'
import { GradeBadge, ScoreDisplay, ScoreBar, scoreColor } from './ScoreComponents'

const SUST_DIMS = [
  { key: 'mr' as const, label: 'Mineral Reduction Impact', abbr: 'MR' },
  { key: 'eb' as const, label: 'Environmental Benefit', abbr: 'EB' },
  { key: 'ce' as const, label: 'Circular Economy', abbr: 'CE' },
  { key: 'mf' as const, label: 'Maturity & Feasibility', abbr: 'MF' },
  { key: 'sc' as const, label: 'Scalability', abbr: 'SC' },
  { key: 'se' as const, label: 'Social Equity', abbr: 'SE' },
  { key: 'ev' as const, label: 'External Validation', abbr: 'EV' },
]
const REPL_DIMS = [
  { key: 'cr' as const, label: 'Commercial Readiness', abbr: 'CR' },
  { key: 'pf' as const, label: 'Performance vs Incumbent', abbr: 'PF' },
  { key: 'sc' as const, label: 'Scalability', abbr: 'SC' },
  { key: 'md' as const, label: 'Mineral Displacement', abbr: 'MD' },
  { key: 'ma' as const, label: 'Market Adoption', abbr: 'MA' },
]

const TYPE_COLORS: Record<string, string> = {
  'Startup': 'bg-violet-50 text-violet-700 border-violet-200',
  'Scaleup': 'bg-blue-50 text-blue-700 border-blue-200',
  'University Spinout': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Corporate': 'bg-slate-50 text-slate-700 border-slate-200',
  'Research': 'bg-amber-50 text-amber-700 border-amber-200',
  'Project': 'bg-teal-50 text-teal-700 border-teal-200',
}

export default function TechCard({ tech }: { tech: Technology }) {
  const [expanded, setExpanded] = useState(false)
  const combined = Math.round(((tech.sust.weighted + tech.repl.weighted) / 2) * 100) / 100
  const typeClass = TYPE_COLORS[tech.type] ?? 'bg-gray-50 text-gray-700 border-gray-200'

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all duration-150">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className={`text-[10px] font-medium border rounded px-1.5 py-0.5 ${typeClass}`}>{tech.type}</span>
              {tech.diversity.map(d => (
                <span key={d} className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-1.5 py-0.5">{d}</span>
              ))}
            </div>
            <h3 className="font-semibold text-sm text-gray-900 leading-tight">{tech.name}</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <MapPin size={10} />
                {tech.country}
              </span>
              <span className="text-xs text-gray-400 font-mono">{tech.trl}</span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar size={10} />
                {tech.established}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-center">
              <div className="text-[9px] text-gray-400 mb-0.5">Combined</div>
              <span className="text-lg font-bold font-mono" style={{ color: scoreColor(combined) }}>{combined.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Score panels */}
      <div className="grid grid-cols-2 divide-x divide-gray-100">
        {/* Sustainability */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-[#1B4332] uppercase tracking-wider">Sustainability</span>
            <div className="flex items-center gap-1.5">
              <GradeBadge grade={tech.sust.grade} size="sm" />
              <ScoreDisplay score={tech.sust.weighted} size="sm" />
            </div>
          </div>
          <div className="space-y-1">
            {SUST_DIMS.map(d => (
              <ScoreBar key={d.key} score={tech.sust[d.key]} label={d.label} abbr={d.abbr} />
            ))}
          </div>
        </div>

        {/* Replacement */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-[#1A237E] uppercase tracking-wider">Replacement</span>
            <div className="flex items-center gap-1.5">
              <GradeBadge grade={tech.repl.grade} size="sm" />
              <ScoreDisplay score={tech.repl.weighted} size="sm" />
            </div>
          </div>
          <div className="space-y-1">
            {REPL_DIMS.map(d => (
              <ScoreBar key={d.key} score={tech.repl[d.key]} label={d.label} abbr={d.abbr} />
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 leading-tight">
              <span className="font-medium text-gray-500">Replaces: </span>{tech.repl.replaces}
            </p>
          </div>
        </div>
      </div>

      {/* Expand button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-1 py-1.5 text-[10px] text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors border-t border-gray-100"
      >
        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        {expanded ? 'Hide analysis' : 'Show full analysis'}
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] font-semibold text-[#1B4332] uppercase tracking-wider mb-1.5">Sustainability verdict</div>
              <p className="text-xs text-gray-700 leading-relaxed">{tech.sust.verdict}</p>
              <div className="mt-2 p-2 bg-amber-50 border border-amber-100 rounded-lg">
                <div className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider mb-1">Critical gap</div>
                <p className="text-xs text-amber-800 leading-relaxed">{tech.sust.gap}</p>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-[#1A237E] uppercase tracking-wider mb-1.5">Replacement verdict</div>
              <div className="mb-2 p-2 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="text-[10px] font-semibold text-blue-700 uppercase tracking-wider mb-1">Replaces</div>
                <p className="text-xs text-blue-800 leading-relaxed">{tech.repl.replaces}</p>
              </div>
              <div className="p-2 bg-amber-50 border border-amber-100 rounded-lg">
                <div className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider mb-1">Critical gap</div>
                <p className="text-xs text-amber-800 leading-relaxed">{tech.repl.gap}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
