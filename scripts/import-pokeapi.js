const fs = require('fs/promises');
const path = require('path');

async function fetchJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`PokéAPI request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

function parseIdFromUrl(url) {
  const match = url.match(/\/\d+\/?$/);
  if (!match) return null;
  const value = url.split('/').filter(Boolean).pop();
  return value ? Number(value) : null;
}

function toTitleCase(value) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

async function main() {
  const outputDir = path.join(process.cwd(), 'data', 'generated');
  await fs.mkdir(outputDir, { recursive: true });

  const listResponse = await fetchJson('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  const pokemonList = listResponse.results || [];

  if (pokemonList.length < 1000) {
    throw new Error(`Expected at least 1000 Pokémon, received ${pokemonList.length}`);
  }

  const concurrency = 12;
  const results = [];
  let index = 0;

  async function worker() {
    while (index < pokemonList.length) {
      const currentIndex = index;
      index += 1;
      const pokemonResource = pokemonList[currentIndex];
      const pokemon = await fetchJson(pokemonResource.url);
      const speciesUrl = pokemon.species?.url || pokemonResource.url.replace('/pokemon/', '/pokemon-species/');
      const species = await fetchJson(speciesUrl);

      const generation = parseIdFromUrl(species.generation?.url) ?? 0;
      const evolvesFrom = species.evolves_from_species?.url ? parseIdFromUrl(species.evolves_from_species.url) : null;
      const englishFlavor = species.flavor_text_entries?.find((entry) => entry.language?.name === 'en')?.flavor_text?.replace(/\f/g, ' ') ?? '';
      const officialArtwork = pokemon.sprites?.other?.['official-artwork']?.front_default;
      const defaultArtwork = pokemon.sprites?.other?.home?.front_default || pokemon.sprites?.front_default || '';
      const sprite = officialArtwork || defaultArtwork;
      const types = pokemon.types?.map((entry) => entry.type?.name || '') || [];
      const forms = pokemon.forms?.map((entry) => entry.name) || [];

      const baseExperience = Number(pokemon.base_experience ?? 0);
      const height = Number(pokemon.height ?? 0);
      const weight = Number(pokemon.weight ?? 0);
      const isLegendary = Boolean(species.is_legendary);
      const isMythical = Boolean(species.is_mythical);
      const isBaby = Boolean(species.is_baby);

      const popularityTier = isLegendary || isMythical
        ? 'High'
        : baseExperience >= 250
          ? 'Core'
          : baseExperience >= 150
            ? 'High'
            : baseExperience >= 80
              ? 'Mid'
              : 'Low';

      const category = isLegendary ? 'Legendary' : isMythical ? 'Mythic' : forms.length > 1 ? 'Special' : 'Standard';
      const generationRegion = {
        1: 'Kanto',
        2: 'Johto',
        3: 'Hoenn',
        4: 'Sinnoh',
        5: 'Unova',
        6: 'Kalos',
        7: 'Alola',
        8: 'Galar',
        9: 'Paldea'
      }[generation] || 'Canon';
      const releaseWindow = generation <= 3 ? 'Q1 2026' : generation <= 6 ? 'Q3 2026' : 'Q1 2027';
      const popularity = Math.max(50, Math.round(baseExperience * 0.25 + (isLegendary ? 25 : 0) + (isMythical ? 30 : 0) + (isBaby ? -8 : 0)));
      const nostalgiaFactor = Math.max(20, Math.min(95, Math.round((generation * 8) + (isLegendary ? 18 : 0) + (isMythical ? 24 : 0))));
      const pvpRelevance = Math.max(35, Math.min(95, Math.round(baseExperience * 0.06 + (types.includes('electric') ? 12 : 0) + (types.includes('psychic') ? 10 : 0))));
      const rarityFactor = Math.max(30, Math.min(95, Math.round((isLegendary ? 25 : 0) + (isMythical ? 30 : 0) + (isBaby ? 10 : 0) + (forms.length > 1 ? 8 : 0))));
      const releaseProbabilityBias = Math.max(0.5, Math.min(0.98, Number((0.6 + (baseExperience / 3000) + (isLegendary ? 0.12 : 0) + (isMythical ? 0.15 : 0)).toFixed(2))));
      const generationWeight = Number((0.9 + generation / 12).toFixed(2));
      const contentClass = isLegendary ? 'legendary' : isMythical ? 'mythic' : 'special';

      results[currentIndex] = {
        id: Number(pokemon.id),
        name: toTitleCase(pokemon.name),
        generation,
        type: types,
        types,
        height,
        weight,
        baseExperience,
        isLegendary,
        isMythical,
        isBaby,
        forms,
        evolvesFrom,
        sprite,
        species: species.name,
        released: true,
        popularityTier,
        category,
        region: generationRegion,
        releaseWindow,
        description: englishFlavor,
        popularity,
        nostalgiaFactor,
        pvpRelevance,
        rarityFactor,
        releaseProbabilityBias,
        generationWeight,
        contentClass
      };
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  const normalized = results.filter(Boolean).sort((a, b) => a.id - b.id);
  if (normalized.length < 1000) {
    throw new Error(`Expected at least 1000 Pokémon, received ${normalized.length}`);
  }

  await fs.writeFile(path.join(outputDir, 'pokemon-core.json'), JSON.stringify(normalized, null, 2));
  console.log(`Imported ${normalized.length} Pokémon from PokéAPI`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
