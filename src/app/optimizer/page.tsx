import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getOptimizerProjection } from "@/lib/calculations/analytics";
import { generateReleaseSimulation } from "@/lib/simulation/releaseEngine";

export default function OptimizerPage() {
  const result = getOptimizerProjection({ budget: 250, cadence: 2, confidence: 0.8 });
  const simulation = generateReleaseSimulation({ months: 6 });

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Release Optimizer</p>
        <h1 className="mt-2 text-3xl font-semibold">Deterministic scenario planning for engagement and pacing</h1>
      </header>

      <Card>
        <CardHeader>
          <CardDescription>Planning controls</CardDescription>
          <CardTitle>Simulation inputs</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm text-slate-400">Budget</label>
            <Input defaultValue="250" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-400">Cadence</label>
            <Input defaultValue="2" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-400">Confidence</label>
            <Input defaultValue="0.8" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Projected output</CardDescription>
          <CardTitle>Monthly engagement score</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-semibold">{result.engagementScore}</p>
          <p className="mt-2 text-sm text-slate-400">Recommendation: {result.recommendation}</p>
          <p className="mt-2 text-sm text-slate-400">Monthly lift estimate: +{result.monthlyLift}%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Explainability panel</CardDescription>
          <CardTitle>Why the optimizer selected each month’s content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {simulation.map((month) => (
            <div key={`${month.year}-${month.month}`} className="rounded-xl border border-slate-800 p-4">
              <p className="text-sm font-medium">Month {month.month}</p>
              <p className="mt-1 text-sm text-slate-400">Engagement {month.engagementScore} · Fatigue {month.fatigueScore} · Diversity {month.diversityScore}</p>
              <div className="mt-3 space-y-2">
                {month.pokemonReleases.map((release) => (
                  <div key={release.pokemon.id} className="rounded-lg border border-slate-800 bg-slate-900/80 p-3 text-sm text-slate-300">
                    <p className="font-medium">{release.pokemon.name}</p>
                    <ul className="mt-2 list-disc pl-5 text-slate-400">
                      {release.reason.map((item) => (
                        <li key={item.label}>{item.label}: {item.detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
