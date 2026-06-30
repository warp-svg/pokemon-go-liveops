import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateInsights } from "@/lib/insights/generateInsights";

export default function InsightsPage() {
  const insights = generateInsights();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Strategic Insights</p>
        <h1 className="mt-2 text-3xl font-semibold">Decision-oriented findings derived from the planning model</h1>
      </header>

      <div className="grid gap-4">
        {insights.map((insight) => (
          <Card key={insight.title}>
            <CardHeader>
              <CardDescription>{insight.severity} priority · confidence {Math.round(insight.confidence * 100)}%</CardDescription>
              <CardTitle>{insight.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-400">{insight.finding}</p>
              <div className="rounded-xl border border-slate-800 p-3">
                <p className="text-sm font-medium">Evidence</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-400">
                  {insight.evidence.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-slate-200">Recommendation: {insight.recommendation}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
