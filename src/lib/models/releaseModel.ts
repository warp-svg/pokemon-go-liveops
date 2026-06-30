export interface ReleaseCandidateModel {
  id: number;
  name: string;
  generation: number;
  types: string[];
  isLegendary: boolean;
  isMythical: boolean;
  evolvedFrom: number | null;
  releasedInGO: boolean;
  popularityScore: number;
  pvpMetaScore: number;
}
