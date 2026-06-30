import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { getFilterDefaults, getFilterOptions } from "@/lib/calculations/analytics";
import { getFilteredPokemon } from "@/lib/domain/data";
import { getPopularityTierLabel, getTypeSummary } from "@/lib/mapping/pokemon";

export default async function CoveragePage() {
  const filters = getFilterDefaults();
  const options = getFilterOptions();
  const filtered = getFilteredPokemon(filters);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Content Coverage</p>
        <h1 className="mt-2 text-3xl font-semibold">Portfolio coverage and release readiness</h1>
      </header>

      <Card>
        <CardHeader>
          <CardDescription>Filter the portfolio</CardDescription>
          <CardTitle>Content coverage controls</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm text-slate-400">Generation</label>
            <Select defaultValue={filters.generation}>
              {options.generations.map((generation) => (
                <option key={generation} value={generation}>
                  {generation === "all" ? "All" : `Gen ${generation}`}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-400">Release state</label>
            <Select defaultValue={filters.released}>
              <option value="all">All</option>
              <option value="released">Released</option>
              <option value="unreleased">Unreleased</option>
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-400">Type</label>
            <Select defaultValue={filters.type}>
              {options.types.map((type) => (
                <option key={type} value={type}>
                  {type === "all" ? "All" : type}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-400">Popularity tier</label>
            <Select defaultValue={filters.popularityTier}>
              {options.popularity.map((tier) => (
                <option key={tier} value={tier}>
                  {tier === "all" ? "All" : tier}
                </option>
              ))}
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filtered.map((entry) => (
          <Card key={entry.id}>
            <CardContent className="flex flex-col gap-3 pt-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">{entry.name}</h2>
                  <span className="rounded-full border border-slate-700 px-2 py-0.5 text-xs text-slate-400">{entry.category}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{entry.description}</p>
              </div>
              <div className="text-sm text-slate-400">
                <p>Type: {getTypeSummary(entry.type)}</p>
                <p>Tier: {getPopularityTierLabel(entry.popularityTier)}</p>
                <p>Release window: {entry.releaseWindow}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
