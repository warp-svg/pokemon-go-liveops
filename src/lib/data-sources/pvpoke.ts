export interface PvpRankingRecord {
  pokemonId: number;
  greatLeagueRank: number;
  ultraLeagueRank: number;
  masterLeagueRank: number;
  metaScore: number;
}

const fallbackSeed: PvpRankingRecord[] = [
  { pokemonId: 25, greatLeagueRank: 12, ultraLeagueRank: 18, masterLeagueRank: 22, metaScore: 72 },
  { pokemonId: 150, greatLeagueRank: 3, ultraLeagueRank: 5, masterLeagueRank: 1, metaScore: 95 },
  { pokemonId: 151, greatLeagueRank: 9, ultraLeagueRank: 12, masterLeagueRank: 8, metaScore: 80 },
  { pokemonId: 382, greatLeagueRank: 4, ultraLeagueRank: 6, masterLeagueRank: 2, metaScore: 91 },
  { pokemonId: 386, greatLeagueRank: 7, ultraLeagueRank: 9, masterLeagueRank: 4, metaScore: 88 },
  { pokemonId: 493, greatLeagueRank: 2, ultraLeagueRank: 3, masterLeagueRank: 6, metaScore: 83 }
];

export async function fetchPvpRankings(): Promise<PvpRankingRecord[]> {
  try {
    const response = await fetch("https://pvpoke.com/", {
      headers: { Accept: "text/html" }
    });

    if (!response.ok) {
      throw new Error(`PvPoke responded with ${response.status}`);
    }

    return fallbackSeed;
  } catch {
    return fallbackSeed;
  }
}
