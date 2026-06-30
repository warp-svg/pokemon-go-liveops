import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { getTimelineData } from "@/lib/domain/data";

export default async function TimelinePage() {
  const timeline = getTimelineData();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Release Timeline</p>
        <h1 className="mt-2 text-3xl font-semibold">Chronological release and event planning view</h1>
      </header>

      <Card>
        <CardHeader>
          <CardDescription>Filter by year</CardDescription>
          <CardTitle>Timeline navigator</CardTitle>
        </CardHeader>
        <CardContent>
          <Select defaultValue="2026">
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </Select>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {timeline.map((entry) => (
          <Card key={`${entry.kind}-${entry.id}`}>
            <CardContent className="flex flex-col gap-2 pt-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{entry.kind}</p>
                <h2 className="text-lg font-semibold">{entry.title}</h2>
                <p className="mt-2 text-sm text-slate-400">{entry.description}</p>
              </div>
              <div className="text-sm text-slate-400">
                <p>Month {entry.month} · {entry.year}</p>
                {"focus" in entry ? <p>Focus: {entry.focus}</p> : null}
                {"impact" in entry ? <p>Impact: {entry.impact}</p> : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
