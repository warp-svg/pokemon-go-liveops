import { writeFile } from "fs/promises";
import path from "path";
import { calculatePopularityScore } from "../src/lib/models/popularityModel";

export async function buildPopularity(outputDir: string, input: Array<{ id: number; name: string; generation: number; types: string[]; isLegendary: boolean; isMythical: boolean; evolvesFrom: number | null; releasedInGO: boolean; firstReleaseDate?: string; availabilityTypes: string[]; popularityScore?: number; pvpMetaScore?: number; greatLeagueRank?: number; ultraLeagueRank?: number; masterLeagueRank?: number }>) {
  const popularity = input.map((entry) => ({
    pokemonId: entry.id,
    popularityScore: entry.popularityScore ?? calculatePopularityScore({
      metaScore: entry.pvpMetaScore ?? 50,
      isLegendary: entry.isLegendary,
      isMythical: entry.isMythical,
      isStarter: entry.name.toLowerCase() === "pikachu",
      evolutionStage: entry.generation,
      eventFrequency: 0,
      releaseRecency: entry.releasedInGO ? 2 : 10
    })
  }));

  await writeFile(path.join(outputDir, "popularity.json"), JSON.stringify(popularity, null, 2));
  return popularity;
}
