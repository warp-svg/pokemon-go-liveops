import { fetchPokemonCoreFromPokeAPI } from "../src/lib/data-sources/pokeapi";
import { writeFile } from "fs/promises";
import path from "path";

export async function buildPokemonCore(outputDir: string) {
  const core = await fetchPokemonCoreFromPokeAPI();
  await writeFile(path.join(outputDir, "pokemon-core.json"), JSON.stringify(core, null, 2));
  return core;
}
