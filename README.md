# OOL Innovation Compass

An interactive data tool for the **Ocean Opportunity Lab** (Responsible AI Consortium) analysing 136 technologies that could replace deep-sea mining of critical minerals (nickel, cobalt, manganese, copper).

## Features

- **Explorer page** — filter, sort, and browse all 136 technologies with dual sustainability and replacement potential scores
- **Card view** — visual score bars for all 12 dimensions at a glance
- **Table view** — full sortable spreadsheet with all scores
- **Rubric page** — complete evidence-anchored scoring criteria for both frameworks
- Filters: solution category, diversity category, org type, region, grade (A–E)
- Sort by: any individual dimension, overall score, combined score, name, country, TRL

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v3
- React Router v6
- Lucide React icons
- All data is static — no backend or API

## Local development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to GitHub Pages

### Automatic (recommended)

1. Push to GitHub
2. Go to **Settings → Pages → Source** and select **GitHub Actions**
3. The workflow in `.github/workflows/deploy.yml` will build and deploy automatically on every push to `main`

### Manual

```bash
npm run deploy
```

### Configuration

Before deploying, update the `base` in `vite.config.ts` to match your repo name:

```ts
export default defineConfig({
  base: '/your-actual-repo-name/',
})
```

## Updating data

All 136 technology records live in `src/data/technologies.ts`. Each entry uses the `mk()` helper function:

```ts
mk(
  id,          // unique number
  name,        // company name
  category,    // solution category string
  type,        // org type (Startup | Scaleup | University Spinout | Corporate | Research | Project)
  country,     // country name
  region,      // region (Africa | Asia | Europe | Latin America | Middle East | North America | Oceania)
  trl,         // TRL string, e.g. "TRL 6–7"
  established, // year as number
  diversity,   // string array of diversity tags
  // Sustainability scores (1–5 each)
  mr, eb, ce, mf, sc, se, ev,
  sVerdict,    // one-sentence sustainability verdict
  sGap,        // one-sentence sustainability critical gap
  // Replacement scores (1–5 each)
  cr, pf, rsc, md, ma,
  replaces,    // what incumbent product this targets
  rGap,        // replacement critical gap
)
```

Weighted scores and grades are calculated automatically from the raw dimension scores.

## Scoring framework

### Sustainability (7 dimensions)
| Dimension | Weight | Key |
|---|---|---|
| Mineral Reduction Impact | 20% | mr |
| Environmental Benefit | 20% | eb |
| Circular Economy Alignment | 15% | ce |
| Maturity & Feasibility | 15% | mf |
| Scalability & Systemic Impact | 15% | sc |
| Social Equity & Inclusion | 10% | se |
| External Validation | 5% | ev |

### Replacement Potential (5 dimensions)
| Dimension | Weight | Key |
|---|---|---|
| Commercial Readiness | 30% | cr |
| Performance vs Incumbent | 25% | pf |
| Scalability to Mass Market | 20% | sc |
| Mineral Displacement Depth | 15% | md |
| Market Adoption Friction | 10% | ma |

### TRL gating rules
- Sustainability score capped at **2.0** if TRL 1–2
- Sustainability score capped at **2.8** if TRL 1–3 or 1–4
- Replacement score capped at **2.8** if TRL ≤ 3

### Grade bands (both frameworks)
| Grade | Score | Meaning |
|---|---|---|
| A | ≥ 4.0 | Commercially ready |
| B | ≥ 3.2 | High potential |
| C | ≥ 2.4 | Promising |
| D | ≥ 1.6 | Early stage |
| E | < 1.6 | Foundational research |

## Project context

Built for the **Responsible AI Consortium** student project in partnership with the **Ocean Opportunity Lab, Norway**. The project examines how AI and emerging technologies can support the transition away from extractive deep-sea mining models.
