const fs = require('fs/promises');
const path = require('path');

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

async function main() {
  const outputDir = path.join(process.cwd(), 'data', 'generated');
  await fs.mkdir(outputDir, { recursive: true });

  let core = [];
  try {
    const data = await fetchJson('https://pokeapi.co/api/v2/pokemon?limit=20');
    const results = data.results || [];
    core = results.slice(0, 8).map((entry, index) => ({
      id: `pkm-${String(index + 1).padStart(3, '0')}`,
      name: entry.name.charAt(0).toUpperCase() + entry.name.slice(1),
      generation: [1, 1, 2, 3, 4, 5, 5, 6][index] ?? 6,
      released: index % 2 === 0,
      type: [['Electric'], ['Psychic'], ['Water'], ['Fire'], ['Grass'], ['Normal'], ['Fairy'], ['Dragon']][index] || ['Normal'],
      popularityTier: ['Core', 'High', 'Mid', 'Core', 'High', 'Mid', 'Core', 'High'][index] || 'Mid',
      category: index === 0 ? 'Special' : index === 1 ? 'Legendary' : 'Mythic',
      region: ['Kanto', 'Kanto', 'Hoenn', 'Johto', 'Sinnoh', 'Unova', 'Kalos', 'Alola'][index] || 'Kanto',
      releaseWindow: index < 3 ? 'Q3 2026' : 'Q1 2027',
      description: `${entry.name} is included in the build-time generated snapshot.`,
      popularity: 70 + index * 4,
      nostalgiaFactor: 30 + index * 6,
      pvpRelevance: 60 + index * 5,
      rarityFactor: 55 + index * 7,
      releaseProbabilityBias: 0.7 + index * 0.03,
      generationWeight: 0.9 + index * 0.05,
      contentClass: index === 1 ? 'legendary' : index === 2 ? 'mythic' : 'special'
    }));
  } catch {
    core = [
      {
        id: 'pkm-001',
        name: 'Pikachu',
        generation: 1,
        released: true,
        type: ['Electric'],
        popularityTier: 'Core',
        category: 'Special',
        region: 'Kanto',
        releaseWindow: 'Q3 2026',
        description: 'Seeded fallback Pokémon entry.',
        popularity: 82,
        nostalgiaFactor: 84,
        pvpRelevance: 77,
        rarityFactor: 58,
        releaseProbabilityBias: 0.79,
        generationWeight: 0.95,
        contentClass: 'special'
      },
      {
        id: 'pkm-002',
        name: 'Mewtwo',
        generation: 1,
        released: false,
        type: ['Psychic'],
        popularityTier: 'High',
        category: 'Legendary',
        region: 'Kanto',
        releaseWindow: 'Q4 2026',
        description: 'Seeded fallback legendary entry.',
        popularity: 91,
        nostalgiaFactor: 61,
        pvpRelevance: 86,
        rarityFactor: 92,
        releaseProbabilityBias: 0.9,
        generationWeight: 1.08,
        contentClass: 'legendary'
      }
    ];
  }

  const events = [
    {
      id: 'evt-001',
      title: 'Community Day: Pikachu',
      year: 2026,
      month: 7,
      impact: 'high',
      description: 'Core event with boosted spawn rate.',
      startDate: '2026-07-12',
      endDate: '2026-07-12',
      type: 'community_day',
      featuredPokemon: [core[0]?.id],
      mechanicsIntroduced: ['Incense boost'],
      bonuses: ['Bonus XP', 'Extra Stardust']
    },
    {
      id: 'evt-002',
      title: 'GO Fest: Raid Surge',
      year: 2026,
      month: 8,
      impact: 'high',
      description: 'Raid-heavy event driving high-value content.',
      startDate: '2026-08-01',
      endDate: '2026-08-03',
      type: 'go_fest',
      featuredPokemon: [core[1]?.id],
      mechanicsIntroduced: ['Raid bonuses'],
      bonuses: ['Raid passes', 'Catch bonus']
    }
  ];

  const pvp = core.map((entry, index) => ({
    pokemonId: entry.id,
    greatLeagueRank: 10 + index,
    ultraLeagueRank: 12 + index,
    masterLeagueRank: 8 + index,
    metaScore: 70 + index * 5
  }));

  const popularity = core.map((entry, index) => ({
    tier: entry.popularityTier,
    score: 60 + index * 8,
    description: `${entry.popularityTier} popularity tier`
  }));

  await fs.writeFile(path.join(outputDir, 'pokemon-core.json'), JSON.stringify(core, null, 2));
  await fs.writeFile(path.join(outputDir, 'pokemon-go-status.json'), JSON.stringify(core.map((entry) => ({
    pokemonId: entry.id,
    releasedInGO: entry.released,
    firstReleaseDate: entry.released ? '2026-01-01' : undefined,
    availabilityTypes: ['wild', 'raid']
  })), null, 2));
  await fs.writeFile(path.join(outputDir, 'events.json'), JSON.stringify(events, null, 2));
  await fs.writeFile(path.join(outputDir, 'pvp-rankings.json'), JSON.stringify(pvp, null, 2));
  await fs.writeFile(path.join(outputDir, 'popularity.json'), JSON.stringify(popularity, null, 2));
  await fs.writeFile(path.join(outputDir, 'release-timeline.json'), JSON.stringify(core, null, 2));

  console.log('Generated static data snapshot under data/generated');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
