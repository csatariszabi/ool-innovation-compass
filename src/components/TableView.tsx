import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import type { Technology, SortField, SortDir } from '../types'
import { GradeBadge, dimScoreColor, scoreColor } from './ScoreComponents'

interface Props {
  techs: Technology[]
  sortField: SortField
  sortDir: SortDir
  onSort: (f: SortField) => void
}

function Th({ label, field, current, dir, onSort }: {
  label: string; field: SortField; current: SortField; dir: SortDir; onSort: (f: SortField) => void
}) {
  const active = current === field
  return (
    <th
      className={`px-2 py-2 text-left text-[10px] font-semibold uppercase tracking-wider cursor-pointer select-none whitespace-nowrap hover:bg-gray-100 transition-colors ${active ? 'text-[#0D1B2A]' : 'text-gray-500'}`}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        {active ? (dir === 'desc' ? <ArrowDown size={10} /> : <ArrowUp size={10} />) : <ArrowUpDown size={10} className="opacity-30" />}
      </div>
    </th>
  )
}

function ScoreCell({ score }: { score: number }) {
  return (
    <td className="px-2 py-2 text-center">
      <span className="text-xs font-mono font-semibold" style={{ color: dimScoreColor(score) }}>{score}</span>
    </td>
  )
}

export default function TableView({ techs, sortField, sortDir, onSort }: Props) {
  const combined = (t: Technology) => Math.round(((t.sust.weighted + t.repl.weighted) / 2) * 100) / 100

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-xs border-collapse">
        <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
          <tr>
            <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500 sticky left-0 bg-gray-50">#</th>
            <Th label="Company" field="name" current={sortField} dir={sortDir} onSort={onSort} />
            <th className="px-2 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-500">Category</th>
            <Th label="Country" field="country" current={sortField} dir={sortDir} onSort={onSort} />
            <Th label="TRL" field="trl" current={sortField} dir={sortDir} onSort={onSort} />
            {/* Sustainability */}
            <th className="px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border-l border-emerald-100" colSpan={9}>Sustainability</th>
            {/* Replacement */}
            <th className="px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 border-l border-blue-100" colSpan={7}>Replacement</th>
            <Th label="Combined" field="combined" current={sortField} dir={sortDir} onSort={onSort} />
          </tr>
          <tr className="border-b border-gray-200">
            <th className="bg-gray-50" />
            <th className="bg-gray-50" />
            <th className="bg-gray-50" />
            <th className="bg-gray-50" />
            <th className="bg-gray-50" />
            {/* Sust sub-headers */}
            {(['MR','EB','CE','MF','SC','SE','EV'] as const).map(a => (
              <Th key={a} label={a} field={`sust.${a.toLowerCase()}` as SortField} current={sortField} dir={sortDir} onSort={onSort} />
            ))}
            <Th label="/5" field="sust.weighted" current={sortField} dir={sortDir} onSort={onSort} />
            <th className="px-2 py-2 text-[10px] font-semibold text-gray-500 bg-emerald-50">Grade</th>
            {/* Repl sub-headers */}
            {(['CR','PF','SC','MD','MA'] as const).map(a => (
              <Th key={a} label={a} field={`repl.${a.toLowerCase()}` as SortField} current={sortField} dir={sortDir} onSort={onSort} />
            ))}
            <Th label="/5" field="repl.weighted" current={sortField} dir={sortDir} onSort={onSort} />
            <th className="px-2 py-2 text-[10px] font-semibold text-gray-500 bg-blue-50">Grade</th>
            <th className="bg-gray-50" />
          </tr>
        </thead>
        <tbody>
          {techs.map((t, i) => (
            <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-3 py-2 text-gray-400 font-mono sticky left-0 bg-white">{i + 1}</td>
              <td className="px-2 py-2 font-semibold text-gray-900 whitespace-nowrap max-w-[180px] truncate" title={t.name}>{t.name}</td>
              <td className="px-2 py-2 text-gray-500 max-w-[120px] truncate text-[10px]" title={t.category}>{t.category}</td>
              <td className="px-2 py-2 text-gray-600">{t.country}</td>
              <td className="px-2 py-2 text-gray-500 font-mono text-[10px]">{t.trl}</td>
              {/* Sustainability scores */}
              <ScoreCell score={t.sust.mr} />
              <ScoreCell score={t.sust.eb} />
              <ScoreCell score={t.sust.ce} />
              <ScoreCell score={t.sust.mf} />
              <ScoreCell score={t.sust.sc} />
              <ScoreCell score={t.sust.se} />
              <ScoreCell score={t.sust.ev} />
              <td className="px-2 py-2 text-center border-l border-emerald-50">
                <span className="font-mono font-bold" style={{ color: scoreColor(t.sust.weighted) }}>{t.sust.weighted.toFixed(2)}</span>
              </td>
              <td className="px-2 py-2 text-center bg-emerald-50/30">
                <GradeBadge grade={t.sust.grade} size="sm" />
              </td>
              {/* Replacement scores */}
              <ScoreCell score={t.repl.cr} />
              <ScoreCell score={t.repl.pf} />
              <ScoreCell score={t.repl.sc} />
              <ScoreCell score={t.repl.md} />
              <ScoreCell score={t.repl.ma} />
              <td className="px-2 py-2 text-center border-l border-blue-50">
                <span className="font-mono font-bold" style={{ color: scoreColor(t.repl.weighted) }}>{t.repl.weighted.toFixed(2)}</span>
              </td>
              <td className="px-2 py-2 text-center bg-blue-50/30">
                <GradeBadge grade={t.repl.grade} size="sm" />
              </td>
              {/* Combined */}
              <td className="px-2 py-2 text-center">
                <span className="font-mono font-bold text-sm" style={{ color: scoreColor(combined(t)) }}>{combined(t).toFixed(2)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
