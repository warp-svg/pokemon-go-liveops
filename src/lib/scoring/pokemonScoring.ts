import { pokemonData } from "@/lib/domain/data";
import type { PokemonRecord, ScoredPokemonRecord } from "@/lib/domain/types";

export function scorePokemonEntries(entries: PokemonRecord[] = pokemonData): ScoredPokemonRecord[] {
  return entries.map((entry) => {
    const engagement_score = Math.round(
      0.35 * entry.popularity +
        0.2 * entry.nostalgiaFactor +
        0.2 * entry.pvpRelevance +
        0.15 * entry.rarityFactor +
        0.1 * entry.generationWeight * 20
    );

    const nostalgia_score = Math.round(entry.nostalgiaFactor * 0.8 + entry.generationWeight * 12);
    const pvp_relevance_score = Math.round(entry.pvpRelevance * 0.9 + entry.generationWeight * 6);
    const release_priority_score = Math.round(
      engagement_score * 0.45 + entry.releaseProbabilityBias * 40 + entry.rarityFactor * 0.2
    );
    const content_value_score = Math.round(
      engagement_score * 0.4 + entry.releaseProbabilityBias * 25 + (entry.category === "Legendary" ? 14 : 0)
    );

    return {
      ...entry,
      engagement_score,
      release_priority_score,
      content_value_score,
      nostalgia_score,
      pvp_relevance_score
    };
  });
}

export function getRankedPokemonCandidates(entries: PokemonRecord[] = pokemonData) {
  return scorePokemonEntries(entries)
    .filter((entry) => !entry.released)
    .sort((a, b) => b.release_priority_score - a.release_priority_score || b.engagement_score - a.engagement_score);
}
