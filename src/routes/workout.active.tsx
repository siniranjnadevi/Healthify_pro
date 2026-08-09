import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/shell";
import { BodyMap, Bar, GlassCard, GradientButton, Ring, SectionTitle, Sheet } from "@/components/kit";
import { exercises } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/workout/active")({
  head: () => ({
    meta: [
      { title: "Active Workout — Healthify" },
      { name: "description", content: "Live set tracking with supersets, dropsets, rest timer, muscle heatmap and live workout score." },
      { property: "og:title", content: "Active Workout — Healthify" },
      { property: "og:description", content: "Track every set live with rest timers and a muscle heatmap." },
    ],
  }),
  component: ActiveWorkout,
});

const plan = exercises.slice(0, 6);

function ActiveWorkout() {
  const [idx, setIdx] = useState(0);
  const [elapsed, setElapsed] = useState(1284);
  const [rest, setRest] = useState(0);
  const [superset, setSuperset] = useState(false);
  const [dropset, setDropset] = useState(false);
  const [done, setDone] = useState<Record<number, number>>({ 0: 4, 1: 3, 2: 1 });
  const current = plan[idx]!;

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (rest <= 0) return;
    const t = setTimeout(() => setRest((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [rest]);

  const totalSets = plan.length * 4;
  const completed = Object.values(done).reduce((a, b) => a + b, 0);
  const score = Math.min(100, 55 + Math.round((completed / totalSets) * 45));
  const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <AppShell nav={false}>
      <header className="animate-rise mb-4 flex items-center justify-between">
        <Link to="/workout" className="text-xs font-semibold text-muted-foreground">
          ✕ End
        </Link>
        <div className="num text-lg font-bold">{mmss(elapsed)}</div>
        <Link to="/workout/summary" className="text-xs font-semibold text-secondary">
          Finish →
        </Link>
      </header>

      <GlassCard glow="brand" className="animate-rise">
        <div className="flex items-start justify-between">
          <div>
            <div className="num text-[11px] text-muted-foreground">
              Exercise {idx + 1} of {plan.length}
            </div>
            <h1 className="mt-1 text-xl font-bold">{current.name}</h1>
            <div className="text-[11px] text-muted-foreground">
              {current.muscle} · target {current.sets}
            </div>
          </div>
          <Ring value={score} goal={100} size={64} color="var(--secondary)">
            <span className="num text-sm font-bold">{score}</span>
            <span className="text-[8px] text-muted-foreground">score</span>
          </Ring>
        </div>

        <div className="mt-4 space-y-2">
          {[1, 2, 3, 4].map((s) => {
            const isDone = (done[idx] ?? 0) >= s;
            return (
              <button
                key={s}
                onClick={() => {
                  setDone({ ...done, [idx]: isDone ? s - 1 : s });
                  if (!isDone) setRest(90);
                }}
                className={cn(
                  "press flex w-full items-center gap-3 rounded-xl p-3 text-left",
                  isDone ? "bg-secondary/15 ring-1 ring-secondary/40" : "bg-white/5",
                  s === 1 && "ring-1 ring-gold/30",
                )}
              >
                <span className="num w-6 text-[11px] font-bold text-muted-foreground">{s === 1 ? "W" : s - 1}</span>
                <span className="num flex-1 text-sm font-semibold">
                  {s === 1 ? "60" : 85 + s * 5} kg × {s === 1 ? 12 : 9 - s} reps
                </span>
                {s === 1 && <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[9px] font-bold text-gold">WARM-UP</span>}
                {dropset && s === 4 && (
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[9px] font-bold text-accent">DROP</span>
                )}
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-lg text-[11px]",
                    isDone ? "bg-secondary text-secondary-foreground" : "bg-white/8 text-muted-foreground",
                  )}
                >
                  ✓
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex gap-2">
          <Toggle on={superset} onClick={() => setSuperset(!superset)} label="Superset" />
          <Toggle on={dropset} onClick={() => setDropset(!dropset)} label="Dropset" />
        </div>
        {superset && (
          <div className="animate-rise mt-3 rounded-xl border border-dashed border-secondary/40 p-3">
            <div className="text-[11px] font-bold text-secondary">Superset with</div>
            <div className="mt-1 text-sm">{plan[(idx + 1) % plan.length]!.name}</div>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <GradientButton
            variant="outline"
            className="flex-1"
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
          >
            ← Prev
          </GradientButton>
          <GradientButton className="flex-1" onClick={() => setIdx((i) => Math.min(plan.length - 1, i + 1))}>
            Next →
          </GradientButton>
        </div>
      </GlassCard>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <GlassCard>
          <div className="text-[11px] text-muted-foreground">Estimated 1RM</div>
          <div className="num text-2xl font-bold text-secondary">118.6 kg</div>
          <div className="num text-[10px] text-muted-foreground">Epley · from 102.5×5</div>
        </GlassCard>
        <GlassCard>
          <div className="text-[11px] text-muted-foreground">Volume so far</div>
          <div className="num text-2xl font-bold">6,240 kg</div>
          <Bar value={6240} goal={8420} className="mt-2 h-1.5" />
        </GlassCard>
      </div>

      <div className="mt-5">
        <SectionTitle title="Muscle heatmap" />
        <GlassCard>
          <BodyMap active={["Chest", "Shoulders", "Triceps"]} />
        </GlassCard>
      </div>

      <div className="mt-5">
        <SectionTitle title="Up next" />
        <div className="space-y-2">
          {plan.map((e, i) => (
            <button
              key={e.id}
              onClick={() => setIdx(i)}
              className={cn(
                "press glass flex w-full items-center gap-3 rounded-2xl p-3 text-left",
                i === idx && "border-primary/50 bg-primary/12",
              )}
            >
              <span className="num w-5 text-[11px] text-muted-foreground">{i + 1}</span>
              <span className="flex-1 text-sm font-semibold">{e.name}</span>
              <span className="num text-[11px] text-muted-foreground">{done[i] ?? 0}/4</span>
            </button>
          ))}
        </div>
      </div>

      <Sheet open={rest > 0} onClose={() => setRest(0)} title="Rest">
        <div className="flex flex-col items-center">
          <Ring value={rest} goal={90} size={160} stroke={12} color="var(--accent)">
            <span className="num text-3xl font-bold">{mmss(rest)}</span>
            <span className="text-[11px] text-muted-foreground">until next set</span>
          </Ring>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Next: <span className="num font-bold text-foreground">102.5 kg × 5</span>
          </p>
          <div className="mt-5 flex w-full gap-2">
            <GradientButton variant="outline" className="flex-1" onClick={() => setRest(rest + 30)}>
              +30s
            </GradientButton>
            <GradientButton className="flex-1" onClick={() => setRest(0)}>
              Skip rest
            </GradientButton>
          </div>
        </div>
      </Sheet>
    </AppShell>
  );
}

function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "press flex-1 rounded-xl px-3 py-2 text-xs font-semibold",
        on ? "grad-brand text-primary-foreground" : "bg-white/6 text-muted-foreground",
      )}
    >
      {label} {on ? "ON" : "OFF"}
    </button>
  );
}
