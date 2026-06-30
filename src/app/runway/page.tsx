import { PortfolioChart } from "@/components/analytics/portfolio-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRunwaySeries } from "@/lib/calculations/analytics";
import { getRunwayProjection } from "@/lib/calculations/runway-model";
import { generateReleaseSimulation } from "@/lib/simulation/releaseEngine";

export default function RunwayPage() {
  const projection = getRunwayProjection(6, 120, 720);
  const runway = getRunwaySeries();
  const simulation = generateReleaseSimulation({ months: 6 });

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Content Runway</p>
        <h1 className="mt-2 text-3xl font-semibold">Burn-down view of remaining content maturity</h1>
      </header>

      <Card>
        <CardHeader>
          <CardDescription>Projected runway</CardDescription>
          <CardTitle>{projection.runwayMonths.toFixed(1)} months</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">Starting budget: {projection.startingBudget} · Burn rate: {projection.burnRate}</p>
        </CardContent>
      </Card>

      <PortfolioChart data={runway.map((entry) => ({ category: entry.category, released: entry.released, remaining: entry.remaining }))} />

      <Card>
        <CardHeader>
          <CardDescription>Simulation trend</CardDescription>
          <CardTitle>Engagement vs fatigue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {simulation.map((month) => (
              <div key={`${month.year}-${month.month}`} className="rounded-xl border border-slate-800 p-3 text-sm text-slate-400">
                <p className="font-medium text-slate-200">Month {month.month}</p>
                <p>Engagement {month.engagementScore}</p>
                <p>Fatigue {month.fatigueScore}</p>
                <p>Diversity {month.diversityScore}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
