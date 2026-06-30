import pokemonJson from "../../../data/pokemon.json";
import releasesJson from "../../../data/releases.json";
import eventsJson from "../../../data/events.json";
import mechanicsJson from "../../../data/mechanics.json";
import popularityJson from "../../../data/popularity.json";
import type { EventRecord, FilterState, MechanicsRecord, PokemonRecord, PopularityTier, ReleaseRecord } from "./types";

export const pokemonData = pokemonJson as PokemonRecord[];
export const releaseData = releasesJson as ReleaseRecord[];
export const eventData = eventsJson as EventRecord[];
export const mechanicsData = mechanicsJson as MechanicsRecord[];
export const popularityData = popularityJson as PopularityTier[];

export function getFilteredPokemon(filters: FilterState) {
  return pokemonData.filter((entry) => {
    const generationMatch = filters.generation === "all" || entry.generation.toString() === filters.generation;
    const releasedMatch = filters.released === "all" || (filters.released === "released" ? entry.released : !entry.released);
    const typeMatch = filters.type === "all" || entry.type.includes(filters.type);
    const popularityMatch = filters.popularityTier === "all" || entry.popularityTier === filters.popularityTier;

    return generationMatch && releasedMatch && typeMatch && popularityMatch;
  });
}

export function getTimelineData() {
  return [
    ...releaseData.map((item) => ({ ...item, kind: "release" as const })),
    ...eventData.map((item) => ({ ...item, kind: "event" as const }))
  ].sort((a, b) => (a.year - b.year) || (a.month - b.month));
}
