import { useState, useMemo, useCallback } from 'react'
import { LayoutGrid, Table2, SlidersHorizontal, X } from 'lucide-react'
import { technologies } from '../data/technologies'
import type { Filters, SortField, SortDir, Technology } from '../types'
import FilterSidebar from '../components/FilterSidebar'
import TechCard from '../components/TechCard'
import TableView from '../components/TableView'

const DEFAULT_FILTERS: Filters = {
  search: '', categories: [], diversity: [], types: [], regions: [], sustGrades: [], replGrades: []
}

function getSortVal(t: Technology, field: SortField): number | string {
  switch (field) {
    case 'name': return t.name
    case 'country': return t.country
    case 'trl': return t.trl
    case 'combined': return (t.sust.weighted + t.repl.weighted) / 2
    case 'sust.weighted': return t.sust.weighted
    case 'repl.weighted': return t.repl.weighted
    case 'sust.mr': return t.sust.mr
    case 'sust.eb': return t.sust.eb
    case 'sust.ce': return t.sust.ce
    case 'sust.mf': return t.sust.mf
    case 'sust.sc': return t.sust.sc
    case 'sust.se': return t.sust.se
    case 'sust.ev': return t.sust.ev
    case 'repl.cr': return t.repl.cr
    case 'repl.pf': return t.repl.pf
    case 'repl.sc': return t.repl.sc
    case 'repl.md': return t.repl.md
    case 'repl.ma': return t.repl.ma
    default: return 0
  }
}

export default function ExplorerPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [sortField, setSortField] = useState<SortField>('combined')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [view, setView] = useState<'grid' | 'table'>('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = technologies
    if (filters.search) {
      const q = filters.search.toLowerCase()
      list = list.filter(t => t.name.toLowerCase().includes(q) || t.country.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
    }
    if (filters.categories.length > 0) {
      list = list.filter(t => filters.categories.some(c => t.category.toLowerCase().includes(c.toLowerCase())))
    }
    if (filters.diversity.length > 0) {
      list = list.filter(t => filters.diversity.some(d => t.diversity.some(td => td.toLowerCase().includes(d.toLowerCase()))))
    }
    if (filters.types.length > 0) {
      list = list.filter(t => filters.types.includes(t.type))
    }
    if (filters.regions.length > 0) {
      list = list.filter(t => filters.regions.includes(t.region))
    }
    if (filters.sustGrades.length > 0) {
      list = list.filter(t => filters.sustGrades.includes(t.sust.grade))
    }
    if (filters.replGrades.length > 0) {
      list = list.filter(t => filters.replGrades.includes(t.repl.grade))
    }

    list = [...list].sort((a, b) => {
      const av = getSortVal(a, sortField)
      const bv = getSortVal(b, sortField)
      const cmp = typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number)
      return sortDir === 'desc' ? -cmp : cmp
    })
    return list
  }, [filters, sortField, sortDir])

  const handleSortFromTable = useCallback((f: SortField) => {
    if (f === sortField) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortField(f); setSortDir('desc') }
  }, [sortField])

  return (
    <div className="flex h-[calc(100vh-56px)] relative">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0 overflow-hidden">
        <FilterSidebar
          filters={filters} setFilters={setFilters}
          sortField={sortField} setSortField={setSortField}
          sortDir={sortDir} setSortDir={setSortDir}
          resultCount={filtered.length} totalCount={technologies.length}
        />
      </aside>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-50 w-72 flex flex-col shadow-2xl">
            <FilterSidebar
              filters={filters} setFilters={setFilters}
              sortField={sortField} setSortField={setSortField}
              sortDir={sortDir} setSortDir={setSortDir}
              resultCount={filtered.length} totalCount={technologies.length}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50"
            >
              <SlidersHorizontal size={12} />
              Filters
            </button>
            <span className="text-xs text-gray-500">
              <span className="font-semibold text-gray-900">{filtered.length}</span> of {technologies.length} technologies
            </span>
          </div>
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setView('grid')}
              className={`p-2 transition-colors ${view === 'grid' ? 'bg-[#0D1B2A] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              title="Card view"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setView('table')}
              className={`p-2 transition-colors ${view === 'table' ? 'bg-[#0D1B2A] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              title="Table view"
            >
              <Table2 size={14} />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <div className="text-sm font-semibold text-gray-700 mb-1">No technologies match your filters</div>
              <div className="text-xs text-gray-400">Try removing some filters or clearing the search</div>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-3">
              {filtered.map(t => <TechCard key={t.id} tech={t} />)}
            </div>
          ) : (
            <TableView
              techs={filtered}
              sortField={sortField}
              sortDir={sortDir}
              onSort={handleSortFromTable}
            />
          )}
        </div>
      </div>
    </div>
  )
}
