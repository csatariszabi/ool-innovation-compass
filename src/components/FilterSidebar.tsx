import { X, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import type { Filters, Grade, SortField, SortDir } from '../types'
import { GradeBadge } from './ScoreComponents'

const CATEGORIES = [
  'Transition Mineral-Free',
  'Transition Mineral-Reducing',
  'New Materials Replacing Transition Minerals',
  'More Responsible Landbased Mining',
  'Circular Minerals (Urban Mining)',
  'Mining-Free Transition Minerals',
  'Responsible Mining',
]
const DIVERSITY_OPTS = ['Female Founded / Lead', 'Global South', 'Indigenous / Small Island State', 'Student/Youth']
const TYPE_OPTS = ['Startup', 'Scaleup', 'University Spinout', 'Corporate', 'Research', 'Project']
const REGION_OPTS = ['Africa', 'Asia', 'Europe', 'Latin America', 'Middle East', 'North America', 'Oceania']
const GRADES: Grade[] = ['A', 'B', 'C', 'D', 'E']

const SORT_OPTIONS: { label: string; value: SortField }[] = [
  { label: 'Combined Score', value: 'combined' },
  { label: 'Sustainability Score', value: 'sust.weighted' },
  { label: 'Replacement Score', value: 'repl.weighted' },
  { label: 'Name', value: 'name' },
  { label: 'Country', value: 'country' },
  { label: 'TRL', value: 'trl' },
  { label: 'S: Mineral Reduction', value: 'sust.mr' },
  { label: 'S: Environmental Benefit', value: 'sust.eb' },
  { label: 'S: Circular Economy', value: 'sust.ce' },
  { label: 'S: Maturity', value: 'sust.mf' },
  { label: 'S: Scalability', value: 'sust.sc' },
  { label: 'S: Social Equity', value: 'sust.se' },
  { label: 'S: External Validation', value: 'sust.ev' },
  { label: 'R: Commercial Readiness', value: 'repl.cr' },
  { label: 'R: Performance', value: 'repl.pf' },
  { label: 'R: Scalability', value: 'repl.sc' },
  { label: 'R: Mineral Displacement', value: 'repl.md' },
  { label: 'R: Market Adoption', value: 'repl.ma' },
]

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2.5 px-3 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
      >
        {title}
        {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>
      {open && <div className="px-3 pb-3">{children}</div>}
    </div>
  )
}

function MultiCheck({ options, selected, onChange, short }: {
  options: string[]; selected: string[]; onChange: (v: string[]) => void; short?: boolean
}) {
  const toggle = (v: string) => onChange(selected.includes(v) ? selected.filter(x => x !== v) : [...selected, v])
  return (
    <div className="space-y-1">
      {options.map(o => (
        <label key={o} className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={selected.includes(o)}
            onChange={() => toggle(o)}
            className="w-3 h-3 rounded border-gray-300 text-[#1B4332] accent-[#1B4332]"
          />
          <span className={`text-xs text-gray-600 group-hover:text-gray-900 transition-colors leading-tight ${short ? '' : ''}`}>{o}</span>
        </label>
      ))}
    </div>
  )
}

interface Props {
  filters: Filters
  setFilters: (f: Filters) => void
  sortField: SortField
  setSortField: (f: SortField) => void
  sortDir: SortDir
  setSortDir: (d: SortDir) => void
  resultCount: number
  totalCount: number
  onClose?: () => void
}

export default function FilterSidebar({ filters, setFilters, sortField, setSortField, sortDir, setSortDir, resultCount, totalCount, onClose }: Props) {
  const update = (key: keyof Filters, val: unknown) => setFilters({ ...filters, [key]: val })
  const hasFilters = filters.categories.length > 0 || filters.diversity.length > 0 || filters.types.length > 0 || filters.regions.length > 0 || filters.sustGrades.length > 0 || filters.replGrades.length > 0 || filters.search !== ''

  const reset = () => setFilters({ search: '', categories: [], diversity: [], types: [], regions: [], sustGrades: [], replGrades: [] })

  return (
    <div className="bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 flex-shrink-0">
        <div>
          <div className="text-xs font-semibold text-gray-900">Filters & Sort</div>
          <div className="text-[10px] text-gray-400 mt-0.5">
            Showing <span className="font-semibold text-gray-700">{resultCount}</span> of {totalCount}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {hasFilters && (
            <button onClick={reset} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors" title="Reset filters">
              <RotateCcw size={12} />
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Search */}
        <div className="p-3 border-b border-gray-100">
          <input
            type="text"
            placeholder="Search companies…"
            value={filters.search}
            onChange={e => update('search', e.target.value)}
            className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#1B4332] placeholder:text-gray-400"
          />
        </div>

        {/* Sort */}
        <Section title="Sort By">
          <div className="space-y-1.5">
            <select
              value={sortField}
              onChange={e => setSortField(e.target.value as SortField)}
              className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1B4332] bg-white"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <div className="flex rounded-lg overflow-hidden border border-gray-200">
              {(['desc', 'asc'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setSortDir(d)}
                  className={`flex-1 py-1.5 text-[10px] font-medium transition-colors ${sortDir === d ? 'bg-[#0D1B2A] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                >
                  {d === 'desc' ? '↓ Highest first' : '↑ Lowest first'}
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* Grade filters */}
        <Section title="Sustainability Grade">
          <div className="flex gap-1.5 flex-wrap">
            {GRADES.map(g => (
              <button
                key={g}
                onClick={() => {
                  const sel = filters.sustGrades.includes(g)
                    ? filters.sustGrades.filter(x => x !== g)
                    : [...filters.sustGrades, g]
                  update('sustGrades', sel)
                }}
                className={`transition-all rounded-full ${filters.sustGrades.includes(g) ? 'ring-2 ring-offset-1 ring-gray-400' : 'opacity-50 hover:opacity-75'}`}
              >
                <GradeBadge grade={g} size="sm" />
              </button>
            ))}
          </div>
        </Section>

        <Section title="Replacement Grade">
          <div className="flex gap-1.5 flex-wrap">
            {GRADES.map(g => (
              <button
                key={g}
                onClick={() => {
                  const sel = filters.replGrades.includes(g)
                    ? filters.replGrades.filter(x => x !== g)
                    : [...filters.replGrades, g]
                  update('replGrades', sel)
                }}
                className={`transition-all rounded-full ${filters.replGrades.includes(g) ? 'ring-2 ring-offset-1 ring-gray-400' : 'opacity-50 hover:opacity-75'}`}
              >
                <GradeBadge grade={g} size="sm" />
              </button>
            ))}
          </div>
        </Section>

        <Section title="Solution Category" defaultOpen={false}>
          <MultiCheck options={CATEGORIES} selected={filters.categories} onChange={v => update('categories', v)} />
        </Section>

        <Section title="Diversity Category" defaultOpen={false}>
          <MultiCheck options={DIVERSITY_OPTS} selected={filters.diversity} onChange={v => update('diversity', v)} />
        </Section>

        <Section title="Organisation Type" defaultOpen={false}>
          <MultiCheck options={TYPE_OPTS} selected={filters.types} onChange={v => update('types', v)} />
        </Section>

        <Section title="Region" defaultOpen={false}>
          <MultiCheck options={REGION_OPTS} selected={filters.regions} onChange={v => update('regions', v)} />
        </Section>
      </div>
    </div>
  )
}
