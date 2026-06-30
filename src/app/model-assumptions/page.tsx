import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const assumptions = [
  {
    title: "Scoring model",
    body: "Each Pokémon is scored using a weighted blend of popularity, nostalgia, PvP relevance, rarity, and generation weight to create a deterministic release-priority signal."
  },
  {
    title: "Simulation rules",
    body: "The release engine ranks remaining content, enforces spacing constraints, and avoids repeated flagship releases too closely together."
  },
  {
    title: "Data sources",
    body: "The dashboard uses local mock datasets designed to approximate public-facing content cadence patterns rather than a live backend feed."
  },
  {
    title: "Known limitations",
    body: "The model is a planning abstraction, not a true forecast. It is intended to support strategic decision framing, not precise revenue prediction."
  }
];

export default function ModelAssumptionsPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Model Assumptions</p>
        <h1 className="mt-2 text-3xl font-semibold">How the planning model works and where it stops</h1>
      </header>

      <div className="grid gap-4">
        {assumptions.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardDescription>Assumption</CardDescription>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
