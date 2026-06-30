import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PokemonRecord, ReleaseRecord } from "@/lib/domain/types";

interface OverviewKpisProps {
  snapshot: {
    totalPokemon: number;
    released: number;
    unreleased: number;
    averageConfidence: number;
    focusStrength: number;
    activeMechanics: number;
    upcomingEvents: number;
  };
  releases: ReleaseRecord[];
  pokemon: PokemonRecord[];
}

export function OverviewKpis({ snapshot, releases, pokemon }: OverviewKpisProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader>
          <CardDescription>Portfolio size</CardDescription>
          <CardTitle className="text-3xl">{snapshot.totalPokemon}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">{snapshot.released} released · {snapshot.unreleased} remaining</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Release confidence</CardDescription>
          <CardTitle className="text-3xl">{snapshot.averageConfidence.toFixed(2)}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">Average score across {releases.length} planned launches</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Campaign focus</CardDescription>
          <CardTitle className="text-3xl">{snapshot.focusStrength}%</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">Alignment to high-impact event windows</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Momentum levers</CardDescription>
          <CardTitle className="text-3xl">{snapshot.activeMechanics}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">{pokemon.filter((entry) => entry.released).length} live entries active</p>
        </CardContent>
      </Card>
    </div>
  );
}
