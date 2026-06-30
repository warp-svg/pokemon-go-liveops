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
