import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getOptimizerProjection } from "@/lib/calculations/analytics";

export default function OptimizerPage() {
  const result = getOptimizerProjection({ budget: 250, cadence: 2, confidence: 0.8 });

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Release Optimizer</p>
        <h1 className="mt-2 text-3xl font-semibold">Scenario planning for engagement and pacing</h1>
      </header>

      <Card>
        <CardHeader>
          <CardDescription>Planning controls</CardDescription>
          <CardTitle>Mock simulation inputs</CardTitle>
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
    </div>
  );
}
