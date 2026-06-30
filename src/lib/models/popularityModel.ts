export interface PopularityScoreInput {
  metaScore: number;
  isLegendary: boolean;
  isMythical: boolean;
  isStarter: boolean;
  evolutionStage: number;
  eventFrequency: number;
  releaseRecency: number;
}

export function calculatePopularityScore(input: PopularityScoreInput): number {
  const metaBoost = input.metaScore * 0.4;
  const legendaryBoost = input.isLegendary ? 12 : 0;
  const mythicalBoost = input.isMythical ? 14 : 0;
  const starterBoost = input.isStarter ? 8 : 0;
  const evolutionBoost = Math.max(0, 10 - input.evolutionStage * 2);
  const eventBoost = input.eventFrequency * 2.5;
  const recencyBoost = Math.max(0, 100 - input.releaseRecency * 2);

  const score = metaBoost + legendaryBoost + mythicalBoost + starterBoost + evolutionBoost + eventBoost + recencyBoost;
  return Math.max(0, Math.min(100, Math.round(score)));
}
