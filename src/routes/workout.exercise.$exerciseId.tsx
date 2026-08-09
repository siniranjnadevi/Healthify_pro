import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, PageHeader } from "@/components/shell";
import { BodyMap, Bar, Chip, GlassCard, GradientButton, Ring, SectionTitle } from "@/components/kit";
import { exercises } from "@/lib/data";

export const Route = createFileRoute("/workout/exercise/$exerciseId")({
  head: () => ({
    meta: [
      { title: "Exercise Detail — Healthify" },
      { name: "description", content: "Log sets, reps, weight, RPE and tempo with muscle activation diagrams and rest timer." },
      { property: "og:title", content: "Exercise Detail — Healthify" },
      { property: "og:description", content: "Muscle activation map, set logger, RPE and rest timer." },
    ],
  }),
  component: ExerciseDetail,
});

const muscleMap: Record<string, string[]> = {
  Chest: ["Chest", "Shoulders", "Triceps"],
  Back: ["Back", "Biceps", "Shoulders"],
  Shoulders: ["Shoulders", "Triceps"],
  Legs: ["Legs", "Glutes", "Hamstrings", "Calves"],
  Biceps: ["Biceps"],
  Triceps: ["Triceps", "Chest"],
  Core: ["Core"],
};

function ExerciseDetail() {
  const { exerciseId } = useParams({ from: "/workout/exercise/$exerciseId" });
  const ex = exercises.find((e) => e.id === exerciseId) ?? exercises[0]!;
  const active = muscleMap[ex.muscle] ?? [ex.muscle];

  const [sets, setSets] = useState([
    { w: 60, r: 10, rpe: 6, warm: true, done: true },
    { w: 85, r: 8, rpe: 8, warm: false, done: true },
    { w: 95, r: 6, rpe: 9, warm: false, done: true },
    { w: 102.5, r: 5, rpe: 10, warm: false, done: false },
  ]);
  const [rest, setRest] = useState(0);
  const [rpe, setRpe] = useState(9);
  const [tempo, setTempo] = useState("3-1-2");
  const [notes, setNotes] = useState("Elbows tucked ~45°, pause on chest.");
  const [pr, setPr] = useState(false);

  useEffect(() => {
    if (rest <= 0) return;
    const t = setTimeout(() => setRest((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [rest]);

  const best = sets.filter((s) => !s.warm).reduce((m, s) => Math.max(m, s.w), 0);
  const oneRm = Math.round(best * (1 + 5 / 30) * 10) / 10;

  return (
    <AppShell>
      <PageHeader title={ex.name} subtitle={`${ex.muscle} · ${ex.equip}`} back="/workout" />

      {pr && (
        <div className="animate-popin mb-4 flex items-center gap-3 rounded-2xl bg-[image:var(--gradient-heat)] p-3 text-background">
          <span className="text-2xl">🏆</span>
          <div>
            <div className="text-sm font-bold">New Personal Record!</div>
            <div className="num text-[11px]">102.5 kg × 5 · +2.5 kg over previous best</div>
          </div>
        </div>
      )}

      <GlassCard>
        <SectionTitle title="Muscles activated" />
        <BodyMap active={active} />
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {active.map((m, i) => (
            <span key={m} className="rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-semibold text-accent">
              {m} {i === 0 ? "· Primary" : "· Secondary"}
            </span>
          ))}
        </div>
      </GlassCard>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <GlassCard>
          <div className="text-[11px] text-muted-foreground">Estimated 1RM</div>
          <div className="num text-2xl font-bold text-secondary">{oneRm} kg</div>
        </GlassCard>
        <GlassCard>
          <div className="text-[11px] text-muted-foreground">Lifetime PR</div>
          <div className="num text-2xl font-bold text-gold">{ex.pr}</div>
        </GlassCard>
      </div>

      <div className="mt-5">
        <SectionTitle title="Set logger" />
        <GlassCard className="space-y-2">
          <div className="grid grid-cols-[28px_1fr_1fr_54px_36px] gap-2 px-1 text-[10px] uppercase tracking-wide text-muted-foreground">
            <span>#</span>
            <span>kg</span>
            <span>reps</span>
            <span>RPE</span>
            <span />
          </div>
          {sets.map((s, i) => (
            <div key={i} className="grid grid-cols-[28px_1fr_1fr_54px_36px] items-center gap-2">
              <span className={`num text-[11px] font-bold ${s.warm ? "text-gold" : "text-muted-foreground"}`}>
                {s.warm ? "W" : i}
              </span>
              <input
                value={s.w}
                onChange={(e) =>
                  setSets(sets.map((x, j) => (j === i ? { ...x, w: Number(e.target.value) || 0 } : x)))
                }
                className="num rounded-lg bg-white/6 px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                value={s.r}
                onChange={(e) =>
                  setSets(sets.map((x, j) => (j === i ? { ...x, r: Number(e.target.value) || 0 } : x)))
                }
                className="num rounded-lg bg-white/6 px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
              <span className="num text-center text-xs text-muted-foreground">{s.rpe}</span>
              <button
                onClick={() => {
                  setSets(sets.map((x, j) => (j === i ? { ...x, done: !x.done } : x)));
                  if (!s.done) {
                    setRest(90);
                    if (s.w >= 102.5) setPr(true);
                  }
                }}
                className={`press flex h-7 w-7 items-center justify-center rounded-lg text-xs ${
                  s.done ? "bg-secondary text-secondary-foreground" : "bg-white/8 text-muted-foreground"
                }`}
              >
                ✓
              </button>
            </div>
          ))}
          <button
            onClick={() => setSets([...sets, { w: 102.5, r: 5, rpe: 9, warm: false, done: false }])}
            className="press w-full rounded-xl border border-dashed border-border py-2 text-xs text-muted-foreground"
          >
            + Add set
          </button>
        </GlassCard>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <GlassCard className="flex flex-col items-center">
          <div className="mb-2 text-[11px] text-muted-foreground">Rest Timer</div>
          <Ring value={rest} goal={90} size={92} color={rest > 0 ? "var(--accent)" : "var(--primary)"}>
            <span className="num text-lg font-bold">
              {String(Math.floor(rest / 60))}:{String(rest % 60).padStart(2, "0")}
            </span>
          </Ring>
          <div className="mt-2 flex gap-2">
            <Chip onClick={() => setRest(90)}>90s</Chip>
            <Chip onClick={() => setRest(0)}>Reset</Chip>
          </div>
        </GlassCard>
        <div className="space-y-3">
          <GlassCard>
            <div className="mb-1 flex justify-between text-[11px]">
              <span className="text-muted-foreground">RPE</span>
              <span className="num font-bold text-accent">{rpe}/10</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={rpe}
              onChange={(e) => setRpe(+e.target.value)}
              className="w-full accent-[var(--accent)]"
            />
            <Bar value={rpe} goal={10} color="var(--accent)" className="mt-2 h-1.5" />
          </GlassCard>
          <GlassCard>
            <div className="text-[11px] text-muted-foreground">Tempo (ecc-pause-con)</div>
            <input
              value={tempo}
              onChange={(e) => setTempo(e.target.value)}
              className="num w-full bg-transparent text-lg font-bold outline-none"
            />
          </GlassCard>
        </div>
      </div>

      <GlassCard className="mt-3">
        <div className="mb-1 text-[11px] text-muted-foreground">Notes</div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full resize-none bg-transparent text-sm outline-none"
        />
      </GlassCard>

      <GradientButton className="mt-5 w-full py-3.5">Save Exercise</GradientButton>
    </AppShell>
  );
}
