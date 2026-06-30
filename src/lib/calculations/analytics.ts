import { eventData, mechanicsData, pokemonData, popularityData, releaseData } from "@/lib/domain/data";
import type { FilterState } from "@/lib/domain/types";

export function getExecutiveSnapshot() {
  const released = pokemonData.filter((entry) => entry.released).length;
  const unreleased = pokemonData.length - released;
  const meanConfidence = releaseData.reduce((total, item) => total + item.confidence, 0) / releaseData.length;
  const focusStrength = Math.round(meanConfidence * 100);

  return {
    totalPokemon: pokemonData.length,
    released,
    unreleased,
    averageConfidence: Number(meanConfidence.toFixed(2)),
    focusStrength,
    activeMechanics: mechanicsData.length,
    upcomingEvents: eventData.length
  };
}

export function getRunwaySeries() {
  const categories = Array.from(new Set(pokemonData.map((entry) => entry.category)));

  return categories.map((category) => {
    const entries = pokemonData.filter((entry) => entry.category === category);
    const released = entries.filter((entry) => entry.released).length;
    const remaining = entries.length - released;

    return {
      category,
      released,
      remaining,
      total: entries.length
    };
  });
}

export function getStrategicInsights() {
  const released = pokemonData.filter((entry) => entry.released).length;
  const runway = getRunwaySeries();
  const healthiest = runway.reduce((best, current) => (current.remaining > best.remaining ? current : best), runway[0]);

  return [
    {
      title: "Release cadence is still healthy",
      description: `The portfolio still carries ${released} released and ${pokemonData.length - released} unreleased items, giving leadership room to spread major launches without over-saturating the calendar.`,
      priority: "High"
    },
    {
      title: "High-value content remains concentrated",
      description: `The strongest remaining runway sits in ${healthiest.category.toLowerCase()} content, where the backlog is broadest and likely to support several quarters of steady engagement.`,
      priority: "Medium"
    },
    {
      title: "Mechanics adoption is a leverage point",
      description: "Mechanics with durable adoption should be used as the backbone for event-based campaigns rather than isolated one-off drops.",
      priority: "High"
    }
  ];
}

export function getOptimizerProjection({ budget, cadence, confidence }: { budget: number; cadence: number; confidence: number }) {
  const balance = budget / 100;
  const cadenceScore = cadence * 14;
  const confidenceScore = confidence * 20;
  const engagementScore = Math.round(balance * 8 + cadenceScore + confidenceScore);
  const recommendation = engagementScore > 90 ? "Accelerate" : engagementScore > 70 ? "Maintain" : "Conserve";

  return {
    engagementScore,
    recommendation,
    monthlyLift: Math.round((engagementScore / 100) * 18)
  };
}

export function getPopularityLegend() {
  return popularityData;
}

export function getFilterOptions() {
  const generations = Array.from(new Set(pokemonData.map((entry) => entry.generation.toString()))).sort();
  const types = Array.from(new Set(pokemonData.flatMap((entry) => entry.type))).sort();
  const popularity = Array.from(new Set(pokemonData.map((entry) => entry.popularityTier))).sort();

  return {
    generations: ["all", ...generations],
    types: ["all", ...types],
    popularity: ["all", ...popularity]
  };
}

export function getFilterDefaults(): FilterState {
  return {
    generation: "all",
    released: "all",
    type: "all",
    popularityTier: "all"
  };
}
