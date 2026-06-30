import { mechanicsData } from "@/lib/domain/data";
import type { ScoredPokemonRecord, SimulationConstraints, SimulationMonth, SimulationWeights } from "@/lib/domain/types";
import { getRankedPokemonCandidates } from "@/lib/scoring/pokemonScoring";

const defaultWeights: SimulationWeights = {
  engagement: 0.35,
  nostalgia: 0.2,
  pvp: 0.2,
  rarity: 0.15,
  diversity: 0.1,
  pacing: 0.15
};

const defaultConstraints: SimulationConstraints = {
  maxPerMonth: 2,
  minSpacingMonths: 2,
  legendaryGapMonths: 4
};

function getMechanicPool(month: number) {
  const ordered = [...mechanicsData].sort((a, b) => b.adoption - a.adoption);
  if (month % 3 === 0) return [ordered[0].name, ordered[1].name];
  if (month % 2 === 0) return [ordered[0].name];
  return [ordered[2].name];
}

function getEventType(month: number) {
  if (month % 4 === 0) return "Seasonal flagship";
  if (month % 3 === 0) return "Raid clustering";
  return "Retention pulse";
}

export function generateReleaseSimulation({
  months = 12,
  weights = defaultWeights,
  constraints = defaultConstraints,
  pool = getRankedPokemonCandidates()
}: {
  months?: number;
  weights?: SimulationWeights;
  constraints?: SimulationConstraints;
  pool?: ScoredPokemonRecord[];
} = {}): SimulationMonth[] {
  const remaining = [...pool];
  const schedule: SimulationMonth[] = [];
  const recentAppearance = new Map<string, number>();

  for (let monthIndex = 1; monthIndex <= months; monthIndex += 1) {
    const selected: SimulationMonth["pokemonReleases"] = [];
    const available = remaining.filter((entry) => {
      const lastSeen = recentAppearance.get(entry.id) ?? -999;
      const spacingOk = monthIndex - lastSeen >= constraints.minSpacingMonths;
      const legendarySpacingOk = entry.contentClass !== "legendary" || monthIndex - (recentAppearance.get(entry.id) ?? -999) >= constraints.legendaryGapMonths;
      return spacingOk && legendarySpacingOk;
    });

    const ranked = available
      .map((entry) => {
        const diversityBoost = entry.contentClass === "mythic" ? 8 : 0;
        const pacingBoost = monthIndex % 3 === 0 ? 6 : 0;
        const score =
          entry.engagement_score * weights.engagement +
          entry.nostalgia_score * weights.nostalgia +
          entry.pvp_relevance_score * weights.pvp +
          entry.rarityFactor * weights.rarity +
          diversityBoost * weights.diversity +
          pacingBoost * weights.pacing;

        return { entry, score };
      })
      .sort((a, b) => b.score - a.score);

    const picks = ranked.slice(0, constraints.maxPerMonth);

    picks.forEach(({ entry }) => {
      selected.push({
        pokemon: entry,
        reason: [
          { label: "engagement", detail: `engagement score ${entry.engagement_score}` },
          { label: "nostalgia", detail: `nostalgia score ${entry.nostalgia_score}` },
          { label: "spacing", detail: `passes release cadence guardrail` }
        ]
      });
      recentAppearance.set(entry.id, monthIndex);
    });

    const engagementScore = Math.round(
      selected.reduce((sum, item) => sum + item.pokemon.engagement_score, 0) / Math.max(selected.length, 1)
    );
    const fatigueScore = Math.round(100 - selected.reduce((sum, item) => sum + item.pokemon.releaseProbabilityBias * 10, 0) / Math.max(selected.length, 1));
    const diversityScore = Math.round(60 + selected.length * 10 + (monthIndex % 2 === 0 ? 8 : 0));

    schedule.push({
      month: monthIndex,
      year: 2026,
      pokemonReleases: selected,
      mechanicDrops: getMechanicPool(monthIndex),
      eventType: getEventType(monthIndex),
      engagementScore,
      fatigueScore,
      diversityScore,
      explainability: selected.flatMap((item) => item.reason)
    });
  }

  return schedule;
}
