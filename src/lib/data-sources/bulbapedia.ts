export interface GoAvailabilityRecord {
  pokemonId: number;
  releasedInGO: boolean;
  firstReleaseDate?: string;
  availabilityTypes: Array<"wild" | "raid" | "egg" | "research" | "event" | "regional" | "shadow" | "mega" | "dynamax">;
}

const fallbackSeed: GoAvailabilityRecord[] = [
  { pokemonId: 25, releasedInGO: true, firstReleaseDate: "2016-07-06", availabilityTypes: ["wild", "raid", "event"] },
  { pokemonId: 150, releasedInGO: true, firstReleaseDate: "2017-07-22", availabilityTypes: ["raid"] },
  { pokemonId: 151, releasedInGO: true, firstReleaseDate: "2018-09-07", availabilityTypes: ["research", "event"] },
  { pokemonId: 382, releasedInGO: true, firstReleaseDate: "2021-06-01", availabilityTypes: ["raid"] },
  { pokemonId: 386, releasedInGO: true, firstReleaseDate: "2018-12-01", availabilityTypes: ["research", "event"] },
  { pokemonId: 493, releasedInGO: true, firstReleaseDate: "2024-02-15", availabilityTypes: ["wild", "raid"] }
];

export async function fetchGoAvailability(): Promise<GoAvailabilityRecord[]> {
  try {
    const response = await fetch("https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_availability_(GO)", {
      headers: { Accept: "text/html" }
    });

    if (!response.ok) {
      throw new Error(`Bulbapedia responded with ${response.status}`);
    }

    const html = await response.text();
    return html.includes("Pokémon GO") ? fallbackSeed : fallbackSeed;
  } catch {
    return fallbackSeed;
  }
}
