import { pokemonData } from "@/lib/domain/data";
import { getRankedPokemonCandidates } from "@/lib/scoring/pokemonScoring";
import { generateReleaseSimulation } from "@/lib/simulation/releaseEngine";
import type { Insight } from "@/lib/domain/types";

export function generateInsights() {
  const ranked = getRankedPokemonCandidates();
  const simulation = generateReleaseSimulation({ months: 6 });
  const fallbackPool = ranked.length > 0 ? ranked : pokemonData.slice(0, 3);
  const firstCandidate = fallbackPool[0];
  const secondCandidate = fallbackPool[1];

  const exhaustionRisk = {
    title: "Content exhaustion risk",
    finding: `${fallbackPool.slice(0, 2).map((entry) => entry?.name ?? "the lead candidate").join(" and ")} are carrying the highest release priority, which suggests the plan is front-loading the strongest content pool.`,
    evidence: [
      `${firstCandidate?.name ?? "The lead candidate"} leads the release priority queue`,
      `${secondCandidate?.name ?? "The second candidate"} is the second-highest leverage candidate`
    ],
    recommendation: "Spread flagship candidates across the next two quarters to avoid over-concentrating the highest-value content.",
    severity: "high" as const,
    confidence: 0.83
  };

  const overusedContent = {
    title: "Overused content types",
    finding: "Legendary and mythic content is dominating the planning queue, creating a concentration risk for the portfolio.",
    evidence: [
      `${ranked.filter((entry) => entry.contentClass === "legendary").length} legendary candidates remain in the active queue`,
      `${ranked.filter((entry) => entry.contentClass === "mythic").length} mythic candidates remain in the active queue`
    ],
    recommendation: "Reserve at least one lower-risk special or seasonal release every other month to preserve diversity.",
    severity: "medium" as const,
    confidence: 0.77
  };

  const mechanics = {
    title: "Underused mechanics",
    finding: "The current simulation still relies heavily on a small set of mechanics, leaving room for more differentiated event design.",
    evidence: [
      `Simulation months average ${simulation.reduce((sum, month) => sum + month.mechanicDrops.length, 0) / simulation.length} mechanic drops per month`,
      "Seasonal event framing is being used as the primary demand-shaping lever"
    ],
    recommendation: "Introduce more varied mechanic pairing so each launch has a distinct engagement architecture.",
    severity: "medium" as const,
    confidence: 0.74
  };

  const balance = {
    title: "Engagement imbalance",
    finding: "The current model is skewing slightly toward high-engagement flagship content over sustained PvP and collection support.",
    evidence: [
      `Average simulated engagement score is ${simulation.reduce((sum, month) => sum + month.engagementScore, 0) / simulation.length}`,
      `Average diversity score is ${simulation.reduce((sum, month) => sum + month.diversityScore, 0) / simulation.length}`
    ],
    recommendation: "Allocate one monthly slot to lower-variance content to stabilize retention and collection loops.",
    severity: "medium" as const,
    confidence: 0.79
  };

  const nostalgia = {
    title: "Nostalgia burnout",
    finding: "The queue shows a moderate tendency to recur around nostalgia-heavy entries, which can thin the novelty effect over time.",
    evidence: [
      `${ranked.filter((entry) => entry.nostalgia_score > 70).length} high-nostalgia candidates remain in the queue`,
      "The scoring model rewards nostalgic affinity heavily for retention"
    ],
    recommendation: "Blend older-generation nostalgia with newer-generation content to reduce fatigue and maintain freshness.",
    severity: "low" as const,
    confidence: 0.71
  };

  return [exhaustionRisk, overusedContent, mechanics, balance, nostalgia] as Insight[];
}
