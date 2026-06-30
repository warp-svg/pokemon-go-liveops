export interface LiveOpsEventRecord {
  name: string;
  startDate: string;
  endDate: string;
  type: "community_day" | "raid_day" | "go_fest" | "season" | "spotlight" | "research";
  featuredPokemon: number[];
  mechanicsIntroduced: string[];
  bonuses: string[];
}

const fallbackSeed: LiveOpsEventRecord[] = [
  {
    name: "Community Day: Pikachu",
    startDate: "2026-07-12",
    endDate: "2026-07-12",
    type: "community_day",
    featuredPokemon: [25],
    mechanicsIntroduced: ["Incense boost"],
    bonuses: ["Bonus XP", "Extra Stardust"]
  },
  {
    name: "GO Fest: Raid Surge",
    startDate: "2026-08-01",
    endDate: "2026-08-03",
    type: "go_fest",
    featuredPokemon: [150, 382],
    mechanicsIntroduced: ["Raid bonuses"],
    bonuses: ["Raid passes", "Catch bonus"]
  }
];

export async function fetchLiveOpsEvents(): Promise<LiveOpsEventRecord[]> {
  try {
    const response = await fetch("https://leekduck.com/events/", {
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error(`LeekDuck responded with ${response.status}`);
    }

    const data = (await response.json()) as LiveOpsEventRecord[];
    return data.length > 0 ? data : fallbackSeed;
  } catch {
    return fallbackSeed;
  }
}
