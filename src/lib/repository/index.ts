import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data", "generated");

async function readJson<T>(file: string): Promise<T> {
  const filePath = path.join(dataDir, file);
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content) as T;
  } catch {
    return [] as T;
  }
}

export async function getAllPokemon() {
  return readJson<Array<{
    id: number;
    name: string;
    generation: number;
    types: string[];
    height: number;
    weight: number;
    baseExperience: number;
    isLegendary: boolean;
    isMythical: boolean;
    isBaby: boolean;
    forms: string[];
    evolvesFrom: string | null;
    sprite: string;
    species: string;
    released?: boolean;
    popularityTier?: string;
    category?: string;
    region?: string;
    releaseWindow?: string;
    description?: string;
    popularity?: number;
    nostalgiaFactor?: number;
    pvpRelevance?: number;
    rarityFactor?: number;
    releaseProbabilityBias?: number;
    generationWeight?: number;
    contentClass?: string;
  }>>("pokemon-core.json");
}

export async function getPokemonById(id: number) {
  const all = await getAllPokemon();
  return all.find((entry) => entry.id === id) ?? null;
}

export async function getReleasedPokemon() {
  const all = await getAllPokemon();
  return all.filter((entry) => entry.released !== false);
}

export async function getUnreleasedPokemon() {
  const all = await getAllPokemon();
  return all.filter((entry) => entry.released === false);
}

export async function getEvents() {
  return readJson<Array<{ name: string; startDate: string; endDate: string; type: string; featuredPokemon: number[]; mechanicsIntroduced: string[]; bonuses: string[] }>>("events.json");
}

export async function getPvPData() {
  return readJson<Array<{ pokemonId: number; greatLeagueRank: number; ultraLeagueRank: number; masterLeagueRank: number; metaScore: number }>>("pvp-rankings.json");
}

export async function getPopularityScores() {
  return readJson<Array<{ pokemonId: number; popularityScore: number }>>("popularity.json");
}
