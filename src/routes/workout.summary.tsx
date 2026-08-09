import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/shell";
import { BodyMap, Bar, GlassCard, GradientButton, Ring, SectionTitle } from "@/components/kit";

export const Route = createFileRoute("/workout/summary")({
  head: () => ({
    meta: [
      { title: "Workout Summary — Healthify" },
      { name: "description", content: "Total volume, personal records, muscle heatmap, workout score and XP earned." },
      { property: "og:title", content: "Workout Summary — Healthify" },
      { property: "og:description", content: "See your volume, PRs, score and XP for the session." },
    ],
  }),
  component: Summary,
});

function Summary() {
  const [xp, setXp] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setXp((x) => (x < 320 ? x + 8 : 320)), 30);
    return () => clearInterval(t);
  }, []);

  return (
    <AppShell nav={false}>
      <div className="animate-rise pt-4 text-center">
        <div className="animate-popin text-5xl">🎯</div>
        <h1 className="mt-3 text-3xl font-bold">Session complete</h1>
        <p className="text-xs text-muted-foreground">Push Day — Chest & Triceps · 1h 04m</p>
      </div>

      <GlassCard glow="brand" className="animate-rise mt-6 flex items-center justify-between">
        <Ring value={94} goal={100} size={112} stroke={10} color="var(--secondary)">
          <span className="num text-2xl font-bold">94</span>
          <span className="text-[10px] text-muted-foreground">Workout Score</span>
        </Ring>
        <div className="flex-1 pl-4">
          <div className="text-sm font-bold text-secondary">Elite session</div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Top 8% of your last 30 sessions. Intensity, volume and set quality all above baseline.
          </p>
        </div>
      </GlassCard>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <GlassCard>
          <div className="text-[11px] text-muted-foreground">Total volume</div>
          <div className="num text-2xl font-bold">8,840 kg</div>
          <div className="num text-[10px] text-secondary">+420 kg vs last week</div>
        </GlassCard>
        <GlassCard>
          <div className="text-[11px] text-muted-foreground">Sets · Reps</div>
          <div className="num text-2xl font-bold">24 · 187</div>
          <div className="num text-[10px] text-muted-foreground">avg RPE 8.4</div>
        </GlassCard>
      </div>

      <div className="animate-popin mt-3 rounded-2xl bg-[image:var(--gradient-heat)] p-4 text-background">
        <div className="text-[11px] font-bold uppercase tracking-wide">Personal records broken</div>
        <div className="mt-2 space-y-1.5">
          <div className="num flex justify-between text-sm font-bold">
            <span>🏆 Barbell Bench Press</span>
            <span>102.5 kg × 5</span>
          </div>
          <div className="num flex justify-between text-sm font-bold">
            <span>🏆 Rope Pushdown</span>
            <span>42.5 kg × 12</span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <SectionTitle title="Muscle groups worked" />
        <GlassCard>
          <BodyMap active={["Chest", "Shoulders", "Triceps"]} />
          <div className="mt-3 space-y-2">
            {[
              ["Chest", 100],
              ["Triceps", 74],
              ["Shoulders", 48],
            ].map(([m, v]) => (
              <div key={m as string}>
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">{m}</span>
                  <span className="num font-bold">{v}%</span>
                </div>
                <Bar value={v as number} goal={100} color="var(--accent)" className="mt-1 h-1.5" />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard glow="mint" className="mt-3 flex items-center justify-between">
        <div>
          <div className="text-[11px] text-muted-foreground">XP earned</div>
          <div className="num text-3xl font-bold text-gold">+{xp}</div>
          <div className="text-[10px] text-muted-foreground">Level 12 · 460 XP to Level 13</div>
        </div>
        <span className="animate-flame text-4xl">⚡</span>
      </GlassCard>

      <div className="mt-5 flex gap-2">
        <GradientButton variant="outline" className="flex-1 py-3.5">
          Share to feed
        </GradientButton>
        <Link to="/home" className="flex-1">
          <GradientButton className="w-full py-3.5">Done</GradientButton>
        </Link>
      </div>
    </AppShell>
  );
}
