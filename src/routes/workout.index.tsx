import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/shell";
import { Chip, GlassCard, GradientButton, SectionTitle } from "@/components/kit";
import { exercises, muscleFilters, templates, todayWorkout, workoutHistory } from "@/lib/data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/workout/")({
  head: () => ({
    meta: [
      { title: "Workouts & Exercise Library — Healthify" },
      { name: "description", content: "Today's training plan, program templates, workout history and a searchable exercise library." },
      { property: "og:title", content: "Workouts & Exercise Library — Healthify" },
      { property: "og:description", content: "Plan, log and browse 1,200+ exercises with muscle targeting." },
    ],
  }),
  component: WorkoutHome,
});

function WorkoutHome() {
  const [tab, setTab] = useState<"today" | "templates" | "history">("today");
  const [muscle, setMuscle] = useState("All");
  const [q, setQ] = useState("");

  const list = exercises.filter(
    (e) => (muscle === "All" || e.muscle === muscle) && e.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <AppShell>
      <PageHeader title="Workout" subtitle="Week 6 · Push / Pull / Legs" />

      <div className="glass mb-4 flex rounded-full p-1">
        {(["today", "templates", "history"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`press flex-1 rounded-full py-2 text-xs font-semibold capitalize ${
              tab === t ? "grad-brand text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "today" && (
        <GlassCard glow="mint" className="animate-rise">
          <h3 className="text-lg font-bold">{todayWorkout.name}</h3>
          <p className="num mt-1 text-[11px] text-muted-foreground">
            {todayWorkout.exercises} exercises · ~{todayWorkout.minutes} min
          </p>
          <div className="mt-3 space-y-2">
            {exercises.slice(0, 6).map((e, i) => (
              <Link
                key={e.id}
                to="/workout/exercise/$exerciseId"
                params={{ exerciseId: e.id }}
                className="press flex items-center gap-3 rounded-xl bg-white/5 p-2.5"
              >
                <span className="num flex h-7 w-7 items-center justify-center rounded-lg bg-white/8 text-[11px] font-bold">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{e.name}</div>
                  <div className="num text-[11px] text-muted-foreground">
                    {e.sets} · PR {e.pr}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">›</span>
              </Link>
            ))}
          </div>
          <Link to="/workout/active" className="mt-4 block">
            <GradientButton className="w-full py-3.5">Start Workout →</GradientButton>
          </Link>
        </GlassCard>
      )}

      {tab === "templates" && (
        <div className="animate-rise space-y-3">
          {templates.map((t) => (
            <GlassCard key={t.name} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold">{t.name}</div>
                <div className="num text-[11px] text-muted-foreground">
                  {t.weeks} weeks · {t.exercises} exercises
                </div>
              </div>
              <Chip active>{t.tag}</Chip>
            </GlassCard>
          ))}
        </div>
      )}

      {tab === "history" && (
        <div className="animate-rise space-y-3">
          {workoutHistory.map((h) => (
            <GlassCard key={h.name} className="flex items-center justify-between">
              <div>
                <div className="text-[11px] text-muted-foreground">{h.date}</div>
                <div className="text-sm font-bold">{h.name}</div>
                <div className="num text-[11px] text-muted-foreground">
                  {h.volume} {h.prs > 0 && <span className="text-gold">· {h.prs} PR</span>}
                </div>
              </div>
              <div className="text-right">
                <div className="num text-xl font-bold text-secondary">{h.score}</div>
                <div className="text-[10px] text-muted-foreground">score</div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      <div className="mt-6">
        <SectionTitle title="Exercise Library" />
        <div className="glass mb-3 flex items-center gap-2 rounded-full px-4 py-2.5">
          <Search size={15} className="text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search 1,200+ exercises"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto pb-1">
          {muscleFilters.map((m) => (
            <Chip key={m} active={muscle === m} onClick={() => setMuscle(m)}>
              {m}
            </Chip>
          ))}
        </div>
        <div className="space-y-2">
          {list.map((e) => (
            <Link
              key={e.id}
              to="/workout/exercise/$exerciseId"
              params={{ exerciseId: e.id }}
              className="press glass flex items-center gap-3 rounded-2xl p-3"
            >
              <div className="grad-brand flex h-10 w-10 items-center justify-center rounded-xl text-sm">💪</div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{e.name}</div>
                <div className="text-[11px] text-muted-foreground">
                  {e.muscle} · {e.equip}
                </div>
              </div>
              <span className="num rounded-full bg-gold/15 px-2 py-1 text-[10px] font-bold text-gold">{e.pr}</span>
            </Link>
          ))}
          {list.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">No exercises found.</p>}
        </div>
      </div>
    </AppShell>
  );
}
