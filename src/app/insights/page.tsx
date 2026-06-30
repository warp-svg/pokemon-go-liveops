import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStrategicInsights } from "@/lib/calculations/analytics";

export default function InsightsPage() {
  const insights = getStrategicInsights();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Strategic Insights</p>
        <h1 className="mt-2 text-3xl font-semibold">Consulting-style recommendations for the LiveOps leadership team</h1>
      </header>

      <div className="grid gap-4">
        {insights.map((insight) => (
          <Card key={insight.title}>
            <CardHeader>
              <CardDescription>{insight.priority} priority</CardDescription>
              <CardTitle>{insight.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
