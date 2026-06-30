import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { RubricDimension } from '../data/rubric'
import { RubricScoreChip } from './ScoreComponents'

export default function RubricAccordion({ dim }: { dim: RubricDimension }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">{dim.label}</span>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded px-1.5 py-0.5">{dim.weight}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex gap-1">
            {dim.levels.map(l => <RubricScoreChip key={l.score} score={l.score} />)}
          </div>
          {open ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-100">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed">{dim.description}</p>
          </div>
          <div className="divide-y divide-gray-100">
            {[...dim.levels].reverse().map(level => (
              <div key={level.score} className="p-4 grid grid-cols-[36px_120px_1fr_1fr] gap-4 items-start hover:bg-gray-50/50 transition-colors">
                <RubricScoreChip score={level.score} />
                <div>
                  <div className="text-xs font-semibold text-gray-700">{level.anchor}</div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Evidence required</div>
                  <p className="text-xs text-gray-600 leading-relaxed">{level.condition}</p>
                </div>
                <div>
                  {level.exampleHigh && (
                    <div className="mb-2">
                      <div className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider mb-1">Example — this score</div>
                      <p className="text-xs text-gray-600 leading-relaxed">{level.exampleHigh}</p>
                    </div>
                  )}
                  {level.exampleLow && (
                    <div>
                      <div className="text-[10px] font-semibold text-red-500 uppercase tracking-wider mb-1">Example — below this score</div>
                      <p className="text-xs text-gray-600 leading-relaxed">{level.exampleLow}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
