import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/shell";
import { BodyMap, Bar, GlassCard, GradientButton, Ring, SectionTitle } from "@/components/kit";
import { sleepStages } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recovery")({
  head: () => ({
    meta: [
      { title: "Recovery & Wellness — Healthify" },
      { name: "description", content: "Recovery score, sleep stages, HRV, soreness map, stress, mood and water tracking." },
      { property: "og:title", content: "Recovery & Wellness — Healthify" },
      { property: "og:description", content: "Know when to push and when to rest." },
    ],
  }),
  component: Recovery,
});

function Recovery() {
  const [sore, setSore] = useState<string[]>(["Chest", "Legs"]);
  const [stress, setStress] = useState(4);
  const [energy, setEnergy] = useState(7);
  const [mood, setMood] = useState(3);
  const [glasses, setGlasses] = useState(6);

  return (
    <AppShell>
      <PageHeader title="Recovery" subtitle="Last night · 7h 12m sleep" back="/home" />

      <GlassCard glow="mint" className="animate-rise flex flex-col items-center">
        <Ring value={78} goal={100} size={168} stroke={14} color="var(--secondary)">
          <span className="num text-4xl font-bold">78</span>
          <span className="text-[11px] text-muted-foreground">Recovery Score</span>
        </Ring>
        <div className="mt-3 rounded-full bg-secondary/15 px-3 py-1 text-xs font-bold text-secondary">
          GREEN · Train hard today
        </div>
      </GlassCard>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <GlassCard>
          <div className="text-[11px] text-muted-foreground">HRV</div>
          <div className="num text-2xl font-bold text-secondary">68 ms</div>
          <div className="num text-[10px] text-muted-foreground">▲ 6 vs 30-day avg</div>
        </GlassCard>
        <GlassCard>
          <div className="text-[11px] text-muted-foreground">Resting HR</div>
          <div className="num text-2xl font-bold">54 bpm</div>
          <div className="num text-[10px] text-muted-foreground">▼ 2 vs avg</div>
        </GlassCard>
      </div>

      <div className="mt-5">
        <SectionTitle title="Sleep" />
        <GlassCard>
          <div className="flex items-end justify-between">
            <div>
              <div className="num text-2xl font-bold">7h 12m</div>
              <div className="text-[11px] text-muted-foreground">Quality: Good · 82/100</div>
            </div>
            <span className="text-3xl">🌙</span>
          </div>
          <div className="mt-3 flex h-3 overflow-hidden rounded-full">
            {sleepStages.map((s) => (
              <div key={s.stage} style={{ width: `${(s.h / 7.2) * 100}%`, background: s.color }} />
            ))}
          </div>
          <div className="mt-2 grid grid-cols-4 gap-2 text-center">
            {sleepStages.map((s) => (
              <div key={s.stage}>
                <div className="num text-xs font-bold" style={{ color: s.color }}>
                  {s.h}h
                </div>
                <div className="text-[10px] text-muted-foreground">{s.stage}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mt-5">
        <SectionTitle title="Muscle soreness" />
        <GlassCard>
          <p className="mb-2 text-center text-[11px] text-muted-foreground">Tap a muscle group to mark soreness</p>
          <BodyMap
            active={sore}
            onToggle={(m) => setSore((s) => (s.includes(m) ? s.filter((x) => x !== m) : [...s, m]))}
          />
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {sore.length === 0 ? (
              <span className="text-[11px] text-muted-foreground">No soreness reported 🎉</span>
            ) : (
              sore.map((s) => (
                <span key={s} className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-semibold text-accent">
                  {s}
                </span>
              ))
            )}
          </div>
        </GlassCard>
      </div>

      <div className="mt-3 space-y-3">
        <GlassCard>
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-muted-foreground">Stress level</span>
            <span className="num font-bold text-accent">{stress}/10</span>
          </div>
          <input type="range" min={1} max={10} value={stress} onChange={(e) => setStress(+e.target.value)} className="w-full accent-[var(--accent)]" />
        </GlassCard>
        <GlassCard>
          <div className="mb-1 flex justify-between text-xs">
            <span className="text-muted-foreground">Energy level</span>
            <span className="num font-bold text-secondary">{energy}/10</span>
          </div>
          <Bar value={energy} goal={10} color="var(--secondary)" />
          <input type="range" min={1} max={10} value={energy} onChange={(e) => setEnergy(+e.target.value)} className="mt-2 w-full accent-[var(--secondary)]" />
        </GlassCard>
        <GlassCard>
          <div className="mb-2 text-xs text-muted-foreground">Mood</div>
          <div className="flex justify-between">
            {["😩", "😕", "😐", "🙂", "🤩"].map((m, i) => (
              <button
                key={m}
                onClick={() => setMood(i)}
                className={cn(
                  "press flex h-11 w-11 items-center justify-center rounded-2xl text-xl",
                  mood === i ? "grad-brand scale-110" : "bg-white/5 grayscale",
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mt-3">
        <div className="text-[11px] font-bold uppercase tracking-wide text-gold">Rest day recommendation</div>
        <p className="mt-1 text-sm">
          Take Wednesday off. Your chest and quads are still sore, and last week's volume was 14% above your 4-week
          average. Active recovery: 25 min zone-2 walk + mobility.
        </p>
      </GlassCard>

      <div className="mt-5">
        <SectionTitle title="Water tracker" />
        <GlassCard className="flex items-center gap-5">
          <div className="relative h-36 w-20 overflow-hidden rounded-b-3xl rounded-t-xl border-2 border-white/15">
            <div
              className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,#38bdf8,#0ea5e9)] transition-[height] duration-700"
              style={{ height: `${(glasses / 8) * 100}%` }}
            >
              <div className="animate-wave h-2 w-[200%] bg-white/25" />
            </div>
            <span className="num absolute inset-0 flex items-center justify-center text-sm font-bold">
              {Math.round((glasses / 8) * 100)}%
            </span>
          </div>
          <div className="flex-1">
            <div className="num text-2xl font-bold">{glasses} / 8 glasses</div>
            <div className="num text-[11px] text-muted-foreground">{(glasses * 0.25).toFixed(2)} L of 2.00 L</div>
            <div className="mt-3 flex gap-2">
              <GradientButton className="flex-1 px-3 py-2" onClick={() => setGlasses((g) => Math.min(12, g + 1))}>
                +250 ml
              </GradientButton>
              <GradientButton variant="outline" className="px-3 py-2" onClick={() => setGlasses((g) => Math.max(0, g - 1))}>
                −
              </GradientButton>
            </div>
            <div className="mt-2 text-[10px] text-muted-foreground">Reminders every 90 min · 9 AM – 9 PM</div>
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
