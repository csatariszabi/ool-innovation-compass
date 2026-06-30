import { Routes, Route, NavLink } from 'react-router-dom'
import { Compass, BookOpen } from 'lucide-react'
import ExplorerPage from './pages/ExplorerPage'
import RubricPage from './pages/RubricPage'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-[#0D1B2A] shadow-lg">
        <div className="max-w-screen-2xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            <Compass size={20} className="text-[#40916C]" />
            <span className="text-white font-semibold tracking-tight text-base">OOL Innovation Compass</span>
            <span className="hidden sm:inline text-xs text-[#40916C] font-mono ml-2 border border-[#2D6A4F] rounded px-1.5 py-0.5">
              136 technologies · Ocean Opportunity Lab
            </span>
          </div>
          <div className="flex items-center gap-1">
            <NavLink to="/" end className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-all ${isActive ? 'bg-[#1B4332] text-white' : 'text-gray-300 hover:text-white hover:bg-white/5'}`
            }>
              <Compass size={14} />
              <span>Explorer</span>
            </NavLink>
            <NavLink to="/rubrics" className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-all ${isActive ? 'bg-[#1A237E] text-white' : 'text-gray-300 hover:text-white hover:bg-white/5'}`
            }>
              <BookOpen size={14} />
              <span>Rubrics</span>
            </NavLink>
          </div>
        </div>
      </nav>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ExplorerPage />} />
          <Route path="/rubrics" element={<RubricPage />} />
        </Routes>
      </main>
    </div>
  )
}
