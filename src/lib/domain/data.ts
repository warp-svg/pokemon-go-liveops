import { readFileSync } from "fs";
import path from "path";
import type { EventRecord, FilterState, MechanicsRecord, PokemonRecord, PopularityTier, ReleaseRecord } from "./types";

const dataDir = path.join(process.cwd(), "data");
const generatedDir = path.join(dataDir, "generated");

function loadJsonSync<T>(fileName: string, fallbackFileName?: string): T {
  const candidatePaths = [path.join(generatedDir, fileName)];
  if (fallbackFileName) {
    candidatePaths.push(path.join(dataDir, fallbackFileName));
  }

  for (const candidatePath of candidatePaths) {
    try {
      return JSON.parse(readFileSync(candidatePath, "utf8")) as T;
    } catch {
      // continue to the next fallback
    }
  }

  return [] as T;
}

export const pokemonData = loadJsonSync<PokemonRecord[]>("pokemon-core.json", "pokemon.json");
export const releaseData = loadJsonSync<ReleaseRecord[]>("release-timeline.json", "releases.json");
export const eventData = loadJsonSync<EventRecord[]>("events.json", "events.json");
export const mechanicsData = loadJsonSync<MechanicsRecord[]>("mechanics.json", "mechanics.json");
export const popularityData = loadJsonSync<PopularityTier[]>("popularity.json", "popularity.json");

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
