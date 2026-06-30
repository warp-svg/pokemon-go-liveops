export interface PokemonCoreCandidate {
  id: number;
  name: string;
  generation: number;
  types: string[];
  isLegendary: boolean;
  isMythical: boolean;
  evolvesFrom: number | null;
}

const fallbackSeed: PokemonCoreCandidate[] = [
  { id: 25, name: "Pikachu", generation: 1, types: ["Electric"], isLegendary: false, isMythical: false, evolvesFrom: null },
  { id: 150, name: "Mewtwo", generation: 1, types: ["Psychic"], isLegendary: true, isMythical: false, evolvesFrom: null },
  { id: 151, name: "Mew", generation: 1, types: ["Psychic"], isLegendary: false, isMythical: true, evolvesFrom: null },
  { id: 382, name: "Kyogre", generation: 3, types: ["Water"], isLegendary: true, isMythical: false, evolvesFrom: null },
  { id: 386, name: "Deoxys", generation: 3, types: ["Psychic"], isLegendary: false, isMythical: true, evolvesFrom: null },
  { id: 493, name: "Arceus", generation: 4, types: ["Normal"], isLegendary: false, isMythical: true, evolvesFrom: null }
];

export async function fetchPokemonCoreFromPokeAPI(): Promise<PokemonCoreCandidate[]> {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12", {
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error(`PokéAPI responded with ${response.status}`);
    }

    const data = (await response.json()) as { results: Array<{ name: string }> };
    return data.results.slice(0, 6).map((entry, index) => ({
      id: 25 + index,
      name: entry.name.charAt(0).toUpperCase() + entry.name.slice(1),
      generation: index < 2 ? 1 : 4,
      types: ["Normal"],
      isLegendary: index === 1,
      isMythical: index === 2,
      evolvesFrom: null
    }));
  } catch {
    return fallbackSeed;
  }
}
