import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const prompts = [
  {
    question: "How much meaningful content remains?",
    answer: "The current portfolio still has enough depth for three to four quarters of deliberate pacing, provided flagship launches remain spaced and paired with strong event support."
  },
  {
    question: "Where should we concentrate release energy?",
    answer: "The best leverage comes from aligning seasonal events with a single premium flagship drop instead of forcing multiple overlapping launches."
  }
];

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Ask the Director</p>
        <h1 className="mt-2 text-3xl font-semibold">UI-only mock for future LLM integration</h1>
      </header>

      <Card>
        <CardHeader>
          <CardDescription>Ask a planning question</CardDescription>
          <CardTitle>Director assistant</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="e.g. What should we prioritize next quarter?" />
          <div className="space-y-3">
            {prompts.map((prompt) => (
              <div key={prompt.question} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <p className="font-medium">{prompt.question}</p>
                <p className="mt-2 text-sm text-slate-400">{prompt.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
