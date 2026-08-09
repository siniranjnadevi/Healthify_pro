import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/shell";
import { Bar, GlassCard, GradientButton, SectionTitle } from "@/components/kit";
import { badges, leaderboard, missions, user } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gamification")({
  head: () => ({
    meta: [
      { title: "Gamification Hub — Healthify" },
      { name: "description", content: "Level up with XP, streaks, daily and weekly missions, badges, leaderboards and unlockable avatars." },
      { property: "og:title", content: "Gamification Hub — Healthify" },
      { property: "og:description", content: "XP, streaks, missions, badges and friend leaderboards." },
    ],
  }),
  component: Hub,
});

function Hub() {
  const [tab, setTab] = useState<"missions" | "badges" | "leaderboard" | "unlocks">("missions");
  const [levelUp, setLevelUp] = useState(false);

  return (
    <AppShell>
      <PageHeader title="Rewards" subtitle="Season 4 · 12 days left" back="/home" />

      <GlassCard glow="brand" className="animate-rise">
        <div className="flex items-center gap-4">
          <button onClick={() => setLevelUp(true)} className="press animate-pulseglow grad-brand flex h-16 w-16 items-center justify-center rounded-2xl text-3xl">
            {user.avatar}
          </button>
          <div className="flex-1">
            <div className="text-lg font-bold">
              Level {user.level} · <span className="grad-text">{user.title}</span>
            </div>
            <div className="num mt-1 flex justify-between text-[11px] text-muted-foreground">
              <span>
                {user.xp} / {user.xpToNext} XP
              </span>
              <span className="text-gold">🪙 {user.coins}</span>
            </div>
            <Bar value={user.xp} goal={user.xpToNext} className="mt-1.5" />
          </div>
        </div>
      </GlassCard>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {[
          ["Workout", 27, "🔥"],
          ["Protein", 14, "🥩"],
          ["Water", 9, "💧"],
        ].map(([l, d, i]) => (
          <GlassCard key={l as string} className="p-3 text-center">
            <div className="animate-flame text-2xl">{i}</div>
            <div className="num mt-1 text-lg font-bold">{d}</div>
            <div className="text-[10px] text-muted-foreground">{l} streak</div>
          </GlassCard>
        ))}
      </div>

      <div className="glass mt-4 flex rounded-full p-1">
        {(["missions", "badges", "leaderboard", "unlocks"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "press flex-1 rounded-full py-2 text-[11px] font-semibold capitalize",
              tab === t ? "grad-brand text-primary-foreground" : "text-muted-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "missions" && (
        <div className="animate-rise mt-4 space-y-4">
          <div>
            <SectionTitle title="Daily missions" />
            <div className="space-y-2">
              {missions.daily.map((m) => (
                <GlassCard key={m.text} className="flex items-center gap-3 p-3">
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-lg text-[11px]",
                      m.done ? "bg-secondary text-secondary-foreground" : "bg-white/8 text-muted-foreground",
                    )}
                  >
                    ✓
                  </span>
                  <span className={cn("flex-1 text-sm", m.done && "text-muted-foreground line-through")}>{m.text}</span>
                  <span className="num rounded-full bg-gold/15 px-2 py-1 text-[10px] font-bold text-gold">+{m.xp}</span>
                </GlassCard>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle title="Weekly missions" />
            <div className="space-y-2">
              {missions.weekly.map((m) => (
                <GlassCard key={m.text} className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{m.text}</span>
                    <span className="num rounded-full bg-gold/15 px-2 py-1 text-[10px] font-bold text-gold">+{m.xp}</span>
                  </div>
                  <div className="num mt-2 flex justify-between text-[10px] text-muted-foreground">
                    <span>
                      {m.progress} / {m.total}
                    </span>
                  </div>
                  <Bar value={m.progress} goal={m.total} color="var(--secondary)" className="mt-1 h-1.5" />
                </GlassCard>
              ))}
            </div>
          </div>
          <GlassCard glow="mint">
            <div className="text-[11px] font-bold uppercase tracking-wide text-secondary">Monthly challenge</div>
            <div className="mt-1 text-sm font-bold">{missions.monthly.text}</div>
            <Bar value={missions.monthly.progress} goal={missions.monthly.total} color="var(--gold)" className="mt-2" />
            <div className="num mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>
                {missions.monthly.progress.toLocaleString()} / {missions.monthly.total.toLocaleString()} kg
              </span>
              <span className="text-gold">Reward: {missions.monthly.badge}</span>
            </div>
          </GlassCard>
        </div>
      )}

      {tab === "badges" && (
        <div className="animate-rise mt-4 grid grid-cols-3 gap-3">
          {badges.map((b) => (
            <GlassCard key={b.name} className={cn("p-3 text-center", !b.earned && "opacity-35 grayscale")}>
              <div className="text-3xl">{b.icon}</div>
              <div className="mt-1.5 text-[10px] font-semibold leading-tight">{b.name}</div>
              {!b.earned && <div className="mt-1 text-[9px] text-muted-foreground">Locked</div>}
            </GlassCard>
          ))}
        </div>
      )}

      {tab === "leaderboard" && (
        <div className="animate-rise mt-4 space-y-2">
          {leaderboard.map((p) => (
            <GlassCard
              key={p.name}
              className={cn("flex items-center gap-3 p-3", p.me && "border-primary/50 bg-primary/12")}
            >
              <span className="num w-5 text-sm font-bold text-muted-foreground">{p.rank}</span>
              <span className="text-2xl">{p.avatar}</span>
              <span className="flex-1 text-sm font-semibold">{p.name}</span>
              <span className="num text-sm font-bold text-gold">{p.xp.toLocaleString()} XP</span>
            </GlassCard>
          ))}
        </div>
      )}

      {tab === "unlocks" && (
        <div className="animate-rise mt-4 space-y-4">
          <div>
            <SectionTitle title="Avatars" />
            <div className="grid grid-cols-4 gap-3">
              {["🦾", "🐯", "🦅", "🐺", "🦊", "🦁", "🐉", "👽"].map((a, i) => (
                <GlassCard key={a} className={cn("p-3 text-center text-3xl", i > 3 && "opacity-35 grayscale")}>
                  {a}
                </GlassCard>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle title="Themes" />
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Nebula", "linear-gradient(135deg,#6C63FF,#00D4AA)"],
                ["Ember", "linear-gradient(135deg,#FF6B6B,#F5B342)"],
                ["Carbon", "linear-gradient(135deg,#2b2b38,#0A0A0F)"],
                ["Ice", "linear-gradient(135deg,#38bdf8,#a5f3fc)"],
              ].map(([n, g], i) => (
                <div key={n} className={cn("rounded-2xl p-4 text-xs font-bold text-background", i > 1 && "opacity-40")} style={{ backgroundImage: g }}>
                  {n}
                  {i > 1 && <span className="ml-1">🔒</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {levelUp && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-md">
          <div className="animate-popin text-7xl">🎖️</div>
          <h2 className="animate-rise mt-4 text-4xl font-bold grad-text">LEVEL UP!</h2>
          <p className="animate-rise mt-2 text-sm text-muted-foreground">Level 13 · Steel Titan unlocked</p>
          <div className="animate-floatup num mt-4 text-xl font-bold text-gold">+320 XP</div>
          <GradientButton className="mt-8 px-8 py-3.5" onClick={() => setLevelUp(false)}>
            Claim reward
          </GradientButton>
        </div>
      )}
    </AppShell>
  );
}
