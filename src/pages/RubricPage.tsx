import { Leaf, Zap, AlertTriangle } from 'lucide-react'
import { sustainabilityRubric, replacementRubric, gatingNotes } from '../data/rubric'
import RubricAccordion from '../components/RubricAccordion'

export default function RubricPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Scoring Rubrics</h1>
        <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
          All scores are evidence-anchored — each level (1–5) requires specific, verifiable conditions, not
          qualitative judgement. Expand any dimension to see the exact criteria and real examples from the dataset.
        </p>
      </div>

      {/* Gating rules callout */}
      <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-amber-900 mb-2">TRL Gating Rules</div>
            <ul className="space-y-1.5">
              {gatingNotes.map((note, i) => (
                <li key={i} className="text-xs text-amber-800 leading-relaxed flex gap-2">
                  <span className="flex-shrink-0 font-mono text-amber-500">{i + 1}.</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sustainability */}
      <section className="mb-10" id="sustainability">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#1B4332] flex items-center justify-center flex-shrink-0">
            <Leaf size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Sustainability Level Analysis</h2>
            <p className="text-xs text-gray-500">7 dimensions · Weights sum to 100%</p>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: 'Mineral Reduction', weight: '20%' },
            { label: 'Environmental Benefit', weight: '20%' },
            { label: 'Circular Economy', weight: '15%' },
            { label: 'Maturity', weight: '15%' },
            { label: 'Scalability', weight: '15%' },
            { label: 'Social Equity', weight: '10%' },
            { label: 'External Validation', weight: '5%' },
          ].map(d => (
            <div key={d.label} className="bg-[#1B4332]/5 border border-[#1B4332]/10 rounded-lg px-3 py-2 flex items-center justify-between">
              <span className="text-xs text-[#1B4332] font-medium">{d.label}</span>
              <span className="text-xs font-bold text-[#1B4332] ml-2">{d.weight}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {sustainabilityRubric.map(dim => <RubricAccordion key={dim.key} dim={dim} />)}
        </div>
      </section>

      {/* Replacement */}
      <section id="replacement">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#1A237E] flex items-center justify-center flex-shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Scaling & Replacement Potential</h2>
            <p className="text-xs text-gray-500">5 dimensions · Weights sum to 100%</p>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { label: 'Commercial Readiness', weight: '30%' },
            { label: 'Performance vs Incumbent', weight: '25%' },
            { label: 'Scalability', weight: '20%' },
            { label: 'Mineral Displacement', weight: '15%' },
            { label: 'Market Adoption', weight: '10%' },
          ].map(d => (
            <div key={d.label} className="bg-[#1A237E]/5 border border-[#1A237E]/10 rounded-lg px-3 py-2 flex items-center justify-between">
              <span className="text-xs text-[#1A237E] font-medium">{d.label}</span>
              <span className="text-xs font-bold text-[#1A237E] ml-2">{d.weight}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {replacementRubric.map(dim => <RubricAccordion key={dim.key} dim={dim} />)}
        </div>
      </section>

      {/* Grade bands */}
      <section className="mt-10 bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Grade Bands (both frameworks)</h3>
        <div className="grid grid-cols-5 gap-3">
          {[
            { grade: 'A', range: '≥ 4.0', label: 'Commercially ready / Replacing incumbents now', bg: '#ECFDF5', border: '#A7F3D0', text: '#065F46' },
            { grade: 'B', range: '≥ 3.2', label: 'High potential — could replace within 3–5 years', bg: '#F0FDF4', border: '#BBF7D0', text: '#166534' },
            { grade: 'C', range: '≥ 2.4', label: 'Promising — real technology, major gaps remain', bg: '#FEFCE8', border: '#FEF08A', text: '#854D0E' },
            { grade: 'D', range: '≥ 1.6', label: 'Early stage — commercialisation unstarted', bg: '#FFF7ED', border: '#FED7AA', text: '#9A3412' },
            { grade: 'E', range: '< 1.6', label: 'Foundational research — not a replacement candidate yet', bg: '#FFF1F2', border: '#FECDD3', text: '#9F1239' },
          ].map(b => (
            <div key={b.grade} className="text-center">
              <div
                className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-base font-bold border mb-2"
                style={{ background: b.bg, borderColor: b.border, color: b.text }}
              >
                {b.grade}
              </div>
              <div className="text-xs font-semibold text-gray-600 mb-1">{b.range}</div>
              <div className="text-[10px] text-gray-400 leading-tight">{b.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
