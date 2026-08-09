import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/shell";
import { Chip, GlassCard, GradientButton, SectionTitle } from "@/components/kit";
import { coachQuickActions, coachSeed } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";

export const Route = createFileRoute("/coach")({
  head: () => ({
    meta: [
      { title: "AI Coach — Healthify" },
      { name: "description", content: "Chat with your AI coach for workout analysis, diet reviews, meal swaps and weekly progress reports." },
      { property: "og:title", content: "AI Coach — Healthify" },
      { property: "og:description", content: "Your always-on AI coach for training, nutrition and recovery." },
    ],
  }),
  component: Coach,
});

function Coach() {
  const [msgs, setMsgs] = useState(coachSeed.map((m) => ({ ...m })));
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user" as const, text }]);
    setInput("");
    setTimeout(
      () =>
        setMsgs((m) => [
          ...m,
          {
            role: "ai" as const,
            text: "Looked at your last 7 sessions and today's intake. You're recovering well (HRV 68, sleep 7h12m) and your bench trend is +2.5 kg/week. Keep protein above 160g and I'd add one back-off set on your main lift tomorrow.",
          },
        ]),
      700,
    );
  };

  return (
    <AppShell>
      <PageHeader title="AI Coach" subtitle="Trained on your 8 weeks of data" back="/home" />

      <GlassCard glow="brand" className="animate-rise flex items-center gap-3">
        <div className="animate-pulseglow grad-brand flex h-14 w-14 items-center justify-center rounded-2xl text-2xl">
          🤖
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wide text-secondary">Daily motivation</div>
          <p className="mt-0.5 text-sm">
            27 days straight. Most people quit at 9. You're not most people — go take the bench PR today.
          </p>
        </div>
      </GlassCard>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
        {coachQuickActions.map((a) => (
          <Chip key={a} onClick={() => send(a)}>
            {a}
          </Chip>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "gap-2")}>
            {m.role === "ai" && (
              <span className="grad-brand mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs">
                🤖
              </span>
            )}
            <div
              className={cn(
                "animate-rise max-w-[78%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm",
                m.role === "user" ? "grad-brand text-primary-foreground" : "glass",
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <SectionTitle title="Weekly review" />
        <GlassCard>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              ["Sessions", "5/6"],
              ["Avg protein", "154g"],
              ["Recovery", "76"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="num text-lg font-bold text-secondary">{v}</div>
                <div className="text-[10px] text-muted-foreground">{k}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Strong week. The only gap is Saturday nutrition — you averaged 142g protein on weekends vs 165g weekdays.
          </p>
          <GradientButton variant="outline" className="mt-3 w-full">
            Monthly Progress Report
          </GradientButton>
        </GlassCard>
      </div>

      <div className="fixed inset-x-0 bottom-20 z-40 mx-auto max-w-md px-4">
        <div className="glass flex items-center gap-2 rounded-full px-4 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask your coach anything…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button onClick={() => send(input)} className="press grad-brand flex h-9 w-9 items-center justify-center rounded-full">
            <Send size={15} />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
