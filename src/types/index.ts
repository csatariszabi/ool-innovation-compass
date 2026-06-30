export type Grade = 'A' | 'B' | 'C' | 'D' | 'E';

export interface SustScores {
  mr: number; // Mineral Reduction Impact 20%
  eb: number; // Environmental Benefit 20%
  ce: number; // Circular Economy Alignment 15%
  mf: number; // Maturity & Feasibility 15%
  sc: number; // Scalability & Systemic Impact 15%
  se: number; // Social Equity & Inclusion 10%
  ev: number; // External Validation 5%
  weighted: number;
  grade: Grade;
  verdict: string;
  gap: string;
}

export interface ReplScores {
  cr: number; // Commercial Readiness 30%
  pf: number; // Performance vs Incumbent 25%
  sc: number; // Scalability to Mass Market 20%
  md: number; // Mineral Displacement Depth 15%
  ma: number; // Market Adoption Friction 10%
  weighted: number;
  grade: Grade;
  replaces: string;
  gap: string;
}

export interface Technology {
  id: number;
  name: string;
  category: string;
  type: string;
  country: string;
  region: string;
  trl: string;
  established: number;
  diversity: string[];
  sust: SustScores;
  repl: ReplScores;
}

export type SortField =
  | 'name' | 'country' | 'trl'
  | 'sust.weighted' | 'repl.weighted' | 'combined'
  | 'sust.mr' | 'sust.eb' | 'sust.ce' | 'sust.mf' | 'sust.sc' | 'sust.se' | 'sust.ev'
  | 'repl.cr' | 'repl.pf' | 'repl.sc' | 'repl.md' | 'repl.ma';

export type SortDir = 'asc' | 'desc';

export interface Filters {
  search: string;
  categories: string[];
  diversity: string[];
  types: string[];
  regions: string[];
  sustGrades: Grade[];
  replGrades: Grade[];
}
