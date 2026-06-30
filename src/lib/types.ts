export interface PokemonEntry {
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

export interface ReleaseEntry {
  id: string;
  title: string;
  year: number;
  month: number;
  focus: string;
  confidence: number;
  category: string;
  description: string;
}

export interface EventEntry {
  id: string;
  title: string;
  year: number;
  month: number;
  impact: "high" | "medium" | "low";
  description: string;
}

export interface MechanicsEntry {
  id: string;
  name: string;
  description: string;
  adoption: number;
}
