export interface RubricLevel {
  score: number;
  anchor: string;
  condition: string;
  exampleHigh: string;
  exampleLow: string;
}
export interface RubricDimension {
  key: string;
  label: string;
  weight: string;
  description: string;
  levels: RubricLevel[];
}

export const sustainabilityRubric: RubricDimension[] = [
  {
    key: 'mr', label: 'Mineral Reduction Impact', weight: '20%',
    description: 'How completely does the solution reduce or eliminate reliance on nickel, cobalt, manganese, and copper — the four minerals driving interest in deep-sea extraction?',
    levels: [
      { score: 5, anchor: 'Complete elimination', condition: 'Zero Ni, Co, Mn, Cu in core chemistry or process. Only earth-abundant materials. No indirect dependencies through key components.', exampleHigh: 'Form Energy, Altris, HiNa Battery, TIAMAT, NGK Insulators (zero all four target minerals)', exampleLow: '' },
      { score: 4, anchor: 'Near-full displacement', condition: 'Eliminates 3 of 4 target minerals entirely. Remaining mineral is indirect or substitutable in principle without redesign.', exampleHigh: 'Niron Magnetics (zero rare earths in magnets), Lyten (zero Co/Ni in Li-S, retains Li)', exampleLow: '' },
      { score: 3, anchor: 'Significant reduction', condition: 'Eliminates or reduces >60% of 2+ target minerals. Residual dependency on 1–2 minerals remains but substantially lower than incumbent.', exampleHigh: 'Beyonder (zero Co/Ni, retains Li), Rechargion Energy (zero Co/Li via Na-ion)', exampleLow: '' },
      { score: 2, anchor: 'Partial reduction', condition: 'Reduces 1–2 minerals by 20–60% per unit output. Still significantly reliant on at least 2 of the 4 minerals.', exampleHigh: 'BacTech Environmental, EcoMetales (modest Cu/Ni reduction from waste streams)', exampleLow: 'ACCUREC, SungEel — recirculate the same minerals, no substitution' },
      { score: 1, anchor: 'No displacement', condition: '<20% net displacement from target minerals. Uses same minerals as incumbent at similar or greater quantities.', exampleHigh: '', exampleLow: 'ACCUREC, Cirba Solutions, SungEel HiTech — identical mineral chemistry in and out (recirculation only)' },
    ]
  },
  {
    key: 'eb', label: 'Environmental Benefit', weight: '20%',
    description: 'Net environmental improvement versus conventional deep-sea or land-based mining. Considers lifecycle emissions, water use, land disturbance, toxic waste, and biodiversity impact.',
    levels: [
      { score: 5, anchor: 'Transformative', condition: 'Independently validated lifecycle CO₂ savings >60% vs incumbent. Eliminates toxic effluents or tailings entirely. Negligible water consumption or operates on waste water.', exampleHigh: 'Form Energy (iron/air zero emissions), Duesenfeld (>96% recovery, HF-free, German Sustainability Award 2024), Fortum (closed-loop certified)', exampleLow: '' },
      { score: 4, anchor: 'Significant', condition: 'Credibly reported or third-party estimated CO₂ savings of 30–60%. Substantially reduces one major environmental harm (toxic waste OR water OR land disturbance).', exampleHigh: 'EnergyX (DLE — 80%+ water saving vs evaporation ponds), Vulcan Energy (Zero Carbon Lithium™, €250M EIB validation)', exampleLow: '' },
      { score: 3, anchor: 'Moderate', condition: 'Environmental claims plausible but company-reported only — no independent validation. OR improvement real but narrow (one category only).', exampleHigh: 'ABR (60%+ CO₂ claimed but unaudited), BatX Energies (recycling claim unverified at scale)', exampleLow: '' },
      { score: 2, anchor: 'Limited or unclear', condition: 'Environmental benefit asserted but not quantified, or benefit in one area offset by harm in another. No third-party data.', exampleHigh: 'Hinckley Recycling (basic e-waste processing, limited environmental data)', exampleLow: 'Pure research institutes without process data' },
      { score: 1, anchor: 'Negligible or unknown', condition: 'No credible environmental claim beyond "better than mining." No lifecycle data. May involve new forms of harm not yet assessed.', exampleHigh: '', exampleLow: 'Argonne, Helmholtz, MIT, KAUST REST (pure research — no process data)' },
    ]
  },
  {
    key: 'ce', label: 'Circular Economy Alignment', weight: '15%',
    description: 'Does the solution close material loops — recovering minerals already in circulation to reduce virgin extraction demand? Scores recovery rates, loop closure, and supply chain integration. Note: mineral-free solutions (iron-air, salt water) score 1 here by design — offset by their mineral reduction score.',
    levels: [
      { score: 5, anchor: 'Full closed loop', condition: '>90% recovery at battery-grade purity. Materials flow directly back into new battery or product manufacturing. Integrated offtake agreements from recycler to CAM manufacturer.', exampleHigh: 'Redwood Materials (CAM + anode foil production, VW/Panasonic/Toyota), Fortum (Harjavalta + Hydrovolt supply chain, OEM agreements), Cirba Solutions (10,000+ collection points, full chain)', exampleLow: '' },
      { score: 4, anchor: 'High recovery, partial loop', condition: 'Recovery rates 70–90% at commercial or pilot scale. Materials recovered at battery-grade purity but not yet fully looped to CAM manufacturing — may go to intermediaries.', exampleHigh: 'ACCUREC, SungEel HiTech, Duesenfeld, Stena Recycling (high recovery, supply to refiners not direct CAM production)', exampleLow: '' },
      { score: 3, anchor: 'Partial recovery', condition: 'Recovery demonstrated at pilot or lab scale, or recovery rates 40–70% but not yet at battery-grade purity. Loop is incomplete.', exampleHigh: 'ABR (pilot-scale direct recycling), BatX Energies (pilot-to-commercial transition)', exampleLow: '' },
      { score: 2, anchor: 'Indirect or early stage', condition: 'Circular economy impact is theoretical or indirect. Technology could enable circularity but has not demonstrated material recovery in practice.', exampleHigh: 'Early-stage recycling concepts, TRL 3–4 battery concepts without defined end-of-life', exampleLow: '' },
      { score: 1, anchor: 'No circular contribution', condition: 'Solution does not recover or recycle materials and does not contribute to closing any material loop. Mineral-free solutions score 1 here by design — their strength is in mineral reduction.', exampleHigh: '', exampleLow: 'Form Energy, Aqua-Cell Energy (zero minerals but no recycling — score 1 by design, offset by mineral reduction score of 5)' },
    ]
  },
  {
    key: 'mf', label: 'Maturity & Feasibility', weight: '15%',
    description: 'How close is the solution to commercial deployment, and how credible is its path to scale? Anchored to TRL but corroborated by funding, partnerships, and commercial contracts. TRL 1–2 caps overall sustainability score at 2.0; TRL 1–3 caps at 2.8.',
    levels: [
      { score: 5, anchor: 'Commercial scale (TRL 8–9)', condition: 'Operating at commercial scale with paying customers. Revenue generating. Technology de-risked. Listed company or major revenue stream.', exampleHigh: 'Redwood Materials, SungEel HiTech, ACCUREC, NGK Insulators (TRL 9, revenue generating)', exampleLow: '' },
      { score: 4, anchor: 'Commercial launch (TRL 7–8)', condition: 'Product or process commercially launched or in final pre-commercial validation. Offtake agreements or first commercial contracts. Post-Series B funding.', exampleHigh: 'Altilium (Plymouth plant, JLR agreement), Duesenfeld (ANDRITZ licensing), TIAMAT (first Na-ion 18650 commercial)', exampleLow: '' },
      { score: 3, anchor: 'Pilot validated (TRL 5–6)', condition: 'Pilot or demonstration plant operating in real conditions. Series A raised. Technology de-risked technically but not commercially.', exampleHigh: 'EnergyX (Chile pilot, Phase 1 drilling), Vulcan Energy (DLE pilot operational)', exampleLow: '' },
      { score: 2, anchor: 'Proof of concept (TRL 3–4)', condition: 'Lab or bench-scale validation complete. Core concept proven. Seed/grant funded only. No pilot. Significant engineering and scale-up risk.', exampleHigh: '3DC (GMS samples shipped, mass production planned), Genomines (phytomining feasibility)', exampleLow: '' },
      { score: 1, anchor: 'Research stage (TRL 1–2)', condition: 'Academic research only. No prototype. No external funding beyond academic grants. No company or spinout formed around this specific work.', exampleHigh: '', exampleLow: 'KAUST ammonium-ion, Argonne, Helmholtz, MIT, TU Darmstadt (TRL 1–3 pure research)' },
    ]
  },
  {
    key: 'sc', label: 'Scalability & Systemic Impact', weight: '15%',
    description: 'If successful, how much primary mineral extraction could this solution displace at global scale? Considers addressable market, replicability, and systemic displacement potential.',
    levels: [
      { score: 5, anchor: 'Gigatonne-scale potential', condition: 'Targets mainstream energy storage or mobility markets consuming millions of tonnes of minerals annually. Technology geographically unconstrained. 10–20% market share would displace significant global mining volumes.', exampleHigh: 'Redwood Materials, Stena Recycling, Cirba Solutions, SVOLT Energy (multi-geography, mass market, strong demand pull)', exampleLow: '' },
      { score: 4, anchor: 'Large segment potential', condition: 'Targets a large but specific segment. Significant displacement within that segment. Modular or licensable design with geographic expansion demonstrated.', exampleHigh: 'EnergyX (DLE large but brine-constrained), Cyclic Materials (REE recycling — large market but specific waste streams)', exampleLow: '' },
      { score: 3, anchor: 'Meaningful niche', condition: 'Targets a real but bounded market. Displacement significant at niche level but unlikely to move the needle on global mineral demand. May face feedstock or geography constraints.', exampleHigh: 'Cornish Lithium (single-country DLE), Genomines (phytomining — site-specific soil types)', exampleLow: '' },
      { score: 2, anchor: 'Limited scale ceiling', condition: 'Scaling constrained by technology, feedstock, geography, or market size. Impact on global mineral demand would be small even at full deployment.', exampleHigh: 'Bowen Basin Circularity (shared infrastructure needs multi-mine buy-in), SLS Energy (East Africa scale)', exampleLow: '' },
      { score: 1, anchor: 'Demonstration only', condition: 'Unlikely to scale beyond demonstration or pilot. Global mineral displacement is negligible. Value is primarily as proof of concept.', exampleHigh: '', exampleLow: 'Inno-Neat (3 prototypes, 250 households), University South Pacific (TRL 3 concept, Pacific island focus)' },
    ]
  },
  {
    key: 'se', label: 'Social Equity & Inclusion', weight: '10%',
    description: 'Does the solution advance justice and inclusion — through diverse leadership, benefit to underrepresented communities, or geographic equity in who benefits from the clean energy transition?',
    levels: [
      { score: 5, anchor: 'Central to the mission', condition: 'Equity is the founding purpose or primary value proposition. Founder(s) from underrepresented groups AND solution designed to benefit marginalised communities directly.', exampleHigh: 'Aki Recycling (First Nations-led, Indigenous economic inclusion as core mission), Olokun Minerals (Black female founders, ocean-aligned mission, CBS coverage)', exampleLow: '' },
      { score: 4, anchor: 'Strong equity signals', condition: 'Female-founded OR Global South-headquartered AND solution has meaningful positive community impact. Equity is part of the value proposition, not just a descriptor.', exampleHigh: 'Aatral ESP (female-founded, emerging market off-grid focus), Green Li-ion (female-founded, Global South HQ, modular model accessible to emerging markets)', exampleLow: '' },
      { score: 3, anchor: 'Moderate signals', condition: 'One diversity signal (female/Global South/youth) but community benefit is indirect or incidental. OR Global North solution with meaningful Global South operations or partnerships.', exampleHigh: 'Botree Recycling (female co-founder, BRICS recognition), Lithion Recycling (female leadership, Latin America expansion)', exampleLow: '' },
      { score: 2, anchor: 'Weak or indirect signals', condition: 'No diversity signals in leadership. Solution may benefit communities indirectly but this is not a stated goal. Standard European or North American corporate or scaleup with no equity dimension.', exampleHigh: 'Most established European recycling corporates (ACCUREC, Duesenfeld, Fortum)', exampleLow: '' },
      { score: 1, anchor: 'No equity dimension', condition: 'All-male leadership in Global North. No stated community benefit beyond commercial returns. No diversity data. No community benefit claimed.', exampleHigh: '', exampleLow: 'Redwood Materials, Stena Recycling, NG Nordic (no diversity signals; global North corporate; no community benefit claimed)' },
    ]
  },
  {
    key: 'ev', label: 'External Validation', weight: '5%',
    description: 'Has the solution received independent verification of its claims through third-party funding, peer-reviewed research, prestigious awards, or strategic partnerships with credible actors?',
    levels: [
      { score: 5, anchor: 'Tier-1 validation', condition: 'Two or more of: Nature/Science publication; DOE/Innovate UK/EU Horizon >€5M grant; strategic investment from Tier-1 OEM or major commodity trader; listed on major stock exchange.', exampleHigh: 'Altilium (Royal Society Chemistry paper + JLR partnership + £30M Innovate UK), Redwood Materials (DOE $2B loan + VW/Toyota/Panasonic + $6B valuation)', exampleLow: '' },
      { score: 4, anchor: 'Strong validation', condition: 'One Tier-1 signal OR multiple strong signals: $10M+ Series A, EU Horizon project participation, Global Cleantech 100, named Tier-1 OEM partnership.', exampleHigh: 'Cyclic Materials ($75M Series C T. Rowe Price + Cleantech 100), Lyten ($625M raised + Stellantis + TIME100)', exampleLow: '' },
      { score: 3, anchor: 'Credible validation', condition: 'Pre-seed or seed from credible investors. Government grants <€5M. Named in Volta Foundation/BloombergNEF/IDTechEx reports. EIC Accelerator or Techstars participation.', exampleHigh: 'Aqua-Cell Energy (Canadian cleantech programme + university partnerships), Nascent Batteries (Volta Foundation 2025 Battery Report)', exampleLow: '' },
      { score: 2, anchor: 'Limited validation', condition: 'Recognition from startup competitions, local innovation awards, or national media only. No institutional funding or independent technical review.', exampleHigh: 'Aloe Ecell (National Startup Award India, no external funding), Nexus Power (Indian startup recognition only)', exampleLow: '' },
      { score: 1, anchor: 'Self-reported only', condition: 'All claims company-reported. No external funding. No published research. No named partnerships with credible organisations. Or solution is so early that no external validation is yet possible.', exampleHigh: '', exampleLow: 'Very early TRL 1–2 concepts, university research without publications or named spinouts' },
    ]
  },
];

export const replacementRubric: RubricDimension[] = [
  {
    key: 'cr', label: 'Commercial Readiness', weight: '30%',
    description: 'How far has this moved from lab to market? Anchored to verified TRL with corroborating commercial evidence — not aspirational claims. This is the highest-weighted dimension because no amount of promising chemistry can substitute for deployment. TRL ≤ 3 caps the overall replacement score at 2.8.',
    levels: [
      { score: 5, anchor: 'TRL 9 — commercial scale', condition: 'Industrial commercial scale. Revenue generating. Multiple customers. Technology de-risked. Listed company or $100M+ revenue stream.', exampleHigh: 'Redwood Materials, Cirba Solutions, SungEel HiTech, ACCUREC, NGK Insulators, Proterial', exampleLow: '' },
      { score: 4, anchor: 'TRL 7–8 — commercial launch', condition: 'Commercial launch. First revenue or binding offtake. Post-Series B funding. OEM or utility agreements in place. No TRL 6–7 solution qualifies regardless of funding level.', exampleHigh: 'Altilium (Plymouth plant + JLR), Duesenfeld (ANDRITZ licensing + commercial operations), TIAMAT (first Na-ion 18650 commercially produced in Europe)', exampleLow: '' },
      { score: 3, anchor: 'TRL 5–6 — pilot validated', condition: 'Pilot or demonstration plant operating in real or representative conditions. Series A raised. No commercial revenue yet. Technology de-risked technically.', exampleHigh: 'EnergyX (Chile pilot, Phase 1 drilling confirmed), Vulcan Energy (DLE pilot), Cyclic Materials (first Spoke facility operational Mesa Arizona)', exampleLow: '' },
      { score: 2, anchor: 'TRL 3–4 — proof of concept', condition: 'Lab or bench-scale validation complete. Core concept proven but not demonstrated at pilot scale. Seed/grant funded only. Significant engineering and scale-up risk.', exampleHigh: '3DC (GMS samples shipped, Sendai mass-production facility under construction), Genomines (phytomining feasibility with South African partners)', exampleLow: '' },
      { score: 1, anchor: 'TRL 1–2 — pure research', condition: 'Academic research only. No prototype. No company or spinout formed around this specific work. No funding beyond academic grants. Commercial application is speculative.', exampleHigh: '', exampleLow: 'Argonne, Helmholtz Institute, MIT Materials Science, KAUST REST, TU Darmstadt, TU Delft (TRL 1–3 pure research)' },
    ]
  },
  {
    key: 'pf', label: 'Performance vs Incumbent', weight: '25%',
    description: 'Does this match or beat the thing it aims to replace on the metrics that actually matter to buyers? Energy density, cycle life, output purity, uptime — whichever is decisive for this technology\'s market.',
    levels: [
      { score: 5, anchor: 'Exceeds incumbent', condition: 'Outperforms incumbent on the primary metric buyers care about. Verified by third-party testing or commercial adoption. No critical performance deficit in target market.', exampleHigh: 'Cirba Solutions (>95% recovery verified, multiple commercial customers), NGK Insulators (5+ GWh grid storage deployed)', exampleLow: '' },
      { score: 4, anchor: 'At parity', condition: 'Matches incumbent on primary metric. May have inferior performance on secondary metrics but those are acceptable in target market. Independent testing or commercial adoption supports claims.', exampleHigh: 'ACCUREC, SungEel HiTech (industrial-grade output purity at commercial scale), Fortum (closed-loop hydromet matched vs smelting-based)', exampleLow: '' },
      { score: 3, anchor: 'Approaching parity', condition: 'Within 15% of incumbent on primary metric. Competitive for some real applications today but buyers must accept trade-offs on at least one important dimension.', exampleHigh: 'Altris vs LFP for stationary storage (energy density competitive, EV gap remains), Beyonder vs NMC for industrial high-power (similar energy, lower density)', exampleLow: '' },
      { score: 2, anchor: 'Significant gap', condition: '15–40% below incumbent. Competitive only in very specific niche conditions where buyers accept lower performance for other benefits (cost, minerals, safety).', exampleHigh: 'Aatral ESP (Na-ion vs LFP for off-grid — competitive in cost-sensitive niche, significant density gap)', exampleLow: 'Nascent Batteries (TRL 3–4 drop-in claims aspirational — no independent validation)' },
      { score: 1, anchor: 'Severe gap', condition: '>40% below incumbent on primary metric. Not competitive in any realistic use case without fundamental technological breakthroughs.', exampleHigh: '', exampleLow: 'Aloe Ecell (aloe vera vs alkaline — fundamental energy density gap), Nexus Power (bio-organic agricultural waste battery — not competitive)' },
    ]
  },
  {
    key: 'sc', label: 'Scalability to Mass Market', weight: '20%',
    description: 'Can this realistically reach the volume needed to move the needle on global mineral demand within 10 years? Considers manufacturing complexity, capex intensity, geography, and supply chain replicability.',
    levels: [
      { score: 5, anchor: 'Mass market ready', condition: 'Operating at or rapidly approaching mass market scale. Technology geographically unconstrained. Feedstock is abundant. Manufacturing expanding with clear demand pull.', exampleHigh: 'Redwood Materials, Stena Recycling, Cirba Solutions (mass-market, multi-geography, strong pull), SVOLT Energy (Great Wall Motor scale)', exampleLow: '' },
      { score: 4, anchor: 'Strong scaling trajectory', condition: 'Already demonstrated replication across multiple sites or geographies. Manufacturing expansion underway with committed capital. Supply chain constraints actively being addressed.', exampleHigh: 'ACE Green Recycling (India + Armenia + Africa), Attero Recycling (India national scale), Lithion Recycling (Canada + Latin America expansion)', exampleLow: '' },
      { score: 3, anchor: 'Scalable with effort', condition: 'Modular or licensable technology with a credible path to scale. Key barriers (capex, regulation, feedstock) are solvable but not yet solved. Realistic 10-year potential is meaningful.', exampleHigh: 'EnergyX (DLE — large but geography-constrained to brine deposits), Vulcan Energy (Rhine Valley brine DLE), Cornish Lithium (UK geothermal)', exampleLow: '' },
      { score: 2, anchor: 'Heavily constrained', condition: 'Scaling constrained by severe structural barrier: single geography, feedstock bottleneck, or extreme capex that limits deployment to a handful of sites globally.', exampleHigh: 'Genomines phytomining (specific soil types only, kg/ha/year yields inherently low)', exampleLow: 'Bowen Basin Circularity (shared infrastructure needs multi-mine buy-in not yet secured)' },
      { score: 1, anchor: 'Not scalable', condition: 'Unlikely to scale beyond demonstration or pilot. Impact on global mineral supply is negligible. Value is primarily as proof of concept.', exampleHigh: '', exampleLow: 'Inno-Neat (3 prototypes, 250 households), University South Pacific (TRL 3 concept), Energy Flow (iron-sulfur TRL 3–4 pre-pilot)' },
    ]
  },
  {
    key: 'md', label: 'Mineral Displacement Depth', weight: '15%',
    description: 'How completely does this reduce or eliminate nickel, cobalt, manganese, and copper from the value chain? Measures substitution depth — partial reduction scores lower than full elimination.',
    levels: [
      { score: 5, anchor: 'Complete elimination', condition: 'Zero Ni, Co, Mn, Cu in core chemistry or process. Uses only earth-abundant, widely available materials. No indirect dependencies through key components.', exampleHigh: 'Form Energy (iron/air — iron, water, air only), Altris (Prussian White — sodium, iron, wood carbon), HiNa Battery, TIAMAT, NGK Insulators, KAUST ammonium-ion', exampleLow: '' },
      { score: 4, anchor: 'Near-full displacement', condition: 'Eliminates three of the four target minerals. Remaining mineral is indirect, trace, or could be substituted without fundamental redesign.', exampleHigh: 'Niron Magnetics (iron nitride — zero rare earths), Lyten (zero Co/Ni in Li-S, retains lithium), Linova Energy (polymer cathode — zero Co/Ni/Mn/Cu)', exampleLow: '' },
      { score: 3, anchor: 'Significant reduction', condition: 'Eliminates or reduces by >60% two or more target minerals. Residual dependency on 1–2 minerals remains but substantially lower than incumbent.', exampleHigh: 'Beyonder (zero Co/Ni via active carbon cathode), Our Next Energy LFP (zero Co/Ni, retains Li)', exampleLow: '' },
      { score: 2, anchor: 'Partial reduction', condition: 'Reduces 1–2 minerals by 20–60% per unit of output. Still significantly reliant on at least two of the four minerals.', exampleHigh: 'Noveon Magnets (20% less heavy rare earth content from recycled feedstock)', exampleLow: 'BacTech (modest Cu/Ni reduction from tailings — primarily responsible mining, not elimination)' },
      { score: 1, anchor: 'No displacement', condition: '<20% net displacement across Ni, Co, Mn, Cu. Uses same minerals as incumbent or recovers and re-enters identical minerals (circular but not eliminative).', exampleHigh: '', exampleLow: 'ACCUREC, Cirba Solutions, SungEel HiTech — identical mineral chemistry in, identical out (recirculation only — score 3 on circular economy dimension)' },
    ]
  },
  {
    key: 'ma', label: 'Market Adoption Friction', weight: '10%',
    description: 'How hard is it for the target market to actually switch to this? Reverse-scored: low friction = high score. Considers drop-in compatibility, regulatory barriers, switching costs, and OEM willingness.',
    levels: [
      { score: 5, anchor: 'Frictionless', condition: 'Drop-in replacement with no infrastructure change required. Fully certified and approved in target markets. Multiple binding commercial agreements. Buyers are actively pulling for the technology.', exampleHigh: 'Redwood Materials, Stena Recycling, Fortum, ACCUREC, Umicore (fully integrated into supply chains; EU Battery Regulation creates structural pull)', exampleLow: '' },
      { score: 4, anchor: 'Low friction', condition: 'Near-drop-in compatibility with existing systems. Regulatory approval achieved or imminent. Multiple OEM agreements in place. Customers can adopt without fundamental operational changes.', exampleHigh: 'ACE Green Recycling (Glencore 15-year offtake reduces sales risk), Altilium (JLR partnership), Duesenfeld (ANDRITZ licensing deals)', exampleLow: '' },
      { score: 3, anchor: 'Moderate friction', condition: 'Adaptation is needed but manageable. Regulatory pathway is clear even if not complete. At least one OEM or major industry partner has publicly committed to or piloted the technology.', exampleHigh: 'TIAMAT (Stellantis Ventures investor + Clarios automotive Na-ion agreement), Altris (Clarios low-voltage Na-ion partnership for automotive)', exampleLow: '' },
      { score: 2, anchor: 'High friction', condition: 'Significant re-engineering required by customers. Regulatory approval is a multi-year process. No established OEM partnerships. Buyers must take substantial technical or financial risk.', exampleHigh: 'Aatral ESP (no OEM agreements, no regulatory approval), Aqua-Cell Energy (no commercial agreements, no regulatory pathway confirmed)', exampleLow: '' },
      { score: 1, anchor: 'Extreme friction', condition: 'Complete replacement of existing infrastructure required. No established route to market. Prohibitive switching cost for virtually all potential customers.', exampleHigh: '', exampleLow: 'Aloe Ecell (requires entirely new primary battery infrastructure), Nexus Power (bio-organic — no route to market at any scale), Energy Flow (TRL 3–4 — no market path defined)' },
    ]
  },
];

export const gatingNotes = [
  'Sustainability score capped at 2.0 if TRL contains "1–2" or "TRL 2" — pure research cannot score above "Early Stage" on sustainability.',
  'Sustainability score capped at 2.8 if TRL contains "1–3" or "1–4" — proof-of-concept research cannot score "High Potential" or above.',
  'Replacement score capped at 2.8 if TRL ≤ 3 — a technology cannot be "High Potential" for replacement if it has not yet reached pilot validation.',
  'These caps are structural: a research institute with a score of 5 on mineral reduction and 5 on environmental benefit will still be capped at 2.0 on sustainability if it is TRL 1–2. Commercial readiness is the gating condition for overall potential.',
];
