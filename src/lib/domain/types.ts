export interface PokemonRecord {
  id: string;
  name: string;
  generation: number;
  released: boolean;
  type: string[];
  popularityTier: string;
  category: string;
  region: string;
  releaseWindow: string;
  description: string;
  popularity: number;
  nostalgiaFactor: number;
  pvpRelevance: number;
  rarityFactor: number;
  releaseProbabilityBias: number;
  generationWeight: number;
  contentClass: string;
}

export interface ScoredPokemonRecord extends PokemonRecord {
  engagement_score: number;
  release_priority_score: number;
  content_value_score: number;
  nostalgia_score: number;
  pvp_relevance_score: number;
}

export interface ReleaseRecord {
  id: string;
  title: string;
  year: number;
  month: number;
  focus: string;
  confidence: number;
  category: string;
  description: string;
}

export interface EventRecord {
  id: string;
  title: string;
  year: number;
  month: number;
  impact: "high" | "medium" | "low";
  description: string;
}

export interface MechanicsRecord {
  id: string;
  name: string;
  description: string;
  adoption: number;
}

export interface PopularityTier {
  tier: string;
  score: number;
  description: string;
}

export interface FilterState {
  generation: string;
  released: string;
  type: string;
  popularityTier: string;
}

export interface SimulationWeights {
  engagement: number;
  nostalgia: number;
  pvp: number;
  rarity: number;
  diversity: number;
  pacing: number;
}

export interface SimulationConstraints {
  maxPerMonth: number;
  minSpacingMonths: number;
  legendaryGapMonths: number;
}

export interface SimulationReason {
  label: string;
  detail: string;
}

export interface SimulationMonth {
  month: number;
  year: number;
  pokemonReleases: Array<{
    pokemon: ScoredPokemonRecord;
    reason: SimulationReason[];
  }>;
  mechanicDrops: string[];
  eventType: string;
  engagementScore: number;
  fatigueScore: number;
  diversityScore: number;
  explainability: SimulationReason[];
}

export interface Insight {
  title: string;
  finding: string;
  evidence: string[];
  recommendation: string;
  severity: "low" | "medium" | "high" | "critical";
  confidence: number;
}
