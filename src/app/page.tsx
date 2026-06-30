import { OverviewKpis } from "@/components/analytics/overview-kpis";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getExecutiveSnapshot, getRunwaySeries } from "@/lib/calculations/analytics";
import { getEventData, getMechanicsData, getPokemonData, getReleaseData } from "@/lib/data-loader";

export default async function HomePage() {
  const [pokemon, releases, events, mechanics] = await Promise.all([
    getPokemonData(),
    getReleaseData(),
    getEventData(),
    getMechanicsData()
  ]);

  const snapshot = getExecutiveSnapshot();
  const runway = getRunwaySeries();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Executive Summary</p>
        <h1 className="mt-2 text-3xl font-semibold">Pokémon GO LiveOps Strategy Lab</h1>
        <p className="mt-3 max-w-2xl text-slate-400">An internal strategy dashboard for sequencing content, timing releases, and protecting long-term engagement.</p>
      </header>

      <OverviewKpis snapshot={snapshot} releases={releases} pokemon={pokemon} />

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardDescription>Upcoming events</CardDescription>
            <CardTitle>Momentum calendar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between rounded-xl border border-slate-800 px-3 py-2">
                <span>{event.title}</span>
                <span className="text-sm text-slate-400">{event.impact}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Mechanics snapshot</CardDescription>
            <CardTitle>Execution levers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mechanics.map((mechanic) => (
              <div key={mechanic.id} className="rounded-xl border border-slate-800 px-3 py-2">
                <p className="font-medium">{mechanic.name}</p>
                <p className="mt-1 text-sm text-slate-400">{mechanic.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardDescription>Runway signal</CardDescription>
          <CardTitle>Most durable remaining content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {runway.map((entry) => (
              <div key={entry.category} className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-400">
                <span className="font-medium text-slate-200">{entry.category}</span> · {entry.remaining} remaining
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
