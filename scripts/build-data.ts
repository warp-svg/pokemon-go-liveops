import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { fetchPokemonCoreFromPokeAPI } from "../src/lib/data-sources/pokeapi";
import { fetchGoAvailability } from "../src/lib/data-sources/bulbapedia";
import { fetchLiveOpsEvents } from "../src/lib/data-sources/leekduck";
import { fetchPvpRankings } from "../src/lib/data-sources/pvpoke";
import { calculatePopularityScore } from "../src/lib/models/popularityModel";

async function main() {
  const outputDir = path.join(process.cwd(), "data", "generated");
  await mkdir(outputDir, { recursive: true });

  const core = await fetchPokemonCoreFromPokeAPI();
  const availability = await fetchGoAvailability();
  const events = await fetchLiveOpsEvents();
  const pvp = await fetchPvpRankings();

  const pokemonWithStatus = core.map((entry) => {
    const status = availability.find((item) => item.pokemonId === entry.id);
    const ranking = pvp.find((item) => item.pokemonId === entry.id);
    const popularityScore = calculatePopularityScore({
      metaScore: ranking?.metaScore ?? 50,
      isLegendary: entry.isLegendary,
      isMythical: entry.isMythical,
      isStarter: entry.name.toLowerCase() === "pikachu",
      evolutionStage: entry.generation,
      eventFrequency: events.filter((event) => event.featuredPokemon.includes(entry.id)).length,
      releaseRecency: status?.releasedInGO ? 2 : 10
    });

    return {
      id: entry.id,
      name: entry.name,
      generation: entry.generation,
      types: entry.types,
      isLegendary: entry.isLegendary,
      isMythical: entry.isMythical,
      evolvesFrom: entry.evolvesFrom,
      releasedInGO: status?.releasedInGO ?? true,
      firstReleaseDate: status?.firstReleaseDate,
      availabilityTypes: status?.availabilityTypes ?? ["wild"],
      popularityScore,
      pvpMetaScore: ranking?.metaScore ?? 50,
      greatLeagueRank: ranking?.greatLeagueRank ?? 999,
      ultraLeagueRank: ranking?.ultraLeagueRank ?? 999,
      masterLeagueRank: ranking?.masterLeagueRank ?? 999
    };
  });

  await writeFile(path.join(outputDir, "pokemon-core.json"), JSON.stringify(core, null, 2));
  await writeFile(path.join(outputDir, "pokemon-go-status.json"), JSON.stringify(availability, null, 2));
  await writeFile(path.join(outputDir, "events.json"), JSON.stringify(events, null, 2));
  await writeFile(path.join(outputDir, "pvp-rankings.json"), JSON.stringify(pvp, null, 2));
  await writeFile(path.join(outputDir, "popularity.json"), JSON.stringify(pokemonWithStatus.map((entry) => ({ pokemonId: entry.id, popularityScore: entry.popularityScore })), null, 2));
  await writeFile(path.join(outputDir, "release-timeline.json"), JSON.stringify(pokemonWithStatus, null, 2));

  console.log("Generated static data snapshot under data/generated");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
