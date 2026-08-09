import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { AppShell } from "@/components/shell";
import { Bar, Chip, GlassCard, GradientButton, Ring, SectionTitle, StatTile } from "@/components/kit";
import { rings, todayWorkout, user, weightTrend } from "@/lib/data";
import { Brain, Droplets, Flame, HeartPulse, Moon, Trophy, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Today's Dashboard — Healthify" },
      { name: "description", content: "Your rings, macros, workout, recovery score, streaks and daily challenges at a glance." },
      { property: "og:title", content: "Today's Dashboard — Healthify" },
      { property: "og:description", content: "Rings, macros, recovery and streaks in one premium dashboard." },
    ],
  }),
  component: HomePage,
});

const moods = ["😩", "😕", "😐", "🙂", "🤩"];
const challenges = [
  { icon: "🏋️", text: "Finish Push Day", xp: 50, done: false },
  { icon: "🥩", text: "Hit 165g protein", xp: 30, done: false },
  { icon: "💧", text: "Drink 8 glasses", xp: 20, done: false },
];

function HomePage() {
  const [mood, setMood] = useState<number | null>(3);
  const [xpPop, setXpPop] = useState(false);

  return (
    <AppShell>
      <header className="animate-rise mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Sunday, 9 August</p>
          <h1 className="text-2xl font-bold">Good Morning, {user.name}! 💪</h1>
        </div>
        <Link to="/gamification" className="press glass relative flex h-11 w-11 items-center justify-center rounded-full text-lg">
          {user.avatar}
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-background bg-accent" />
        </Link>
      </header>

      <GlassCard glow="brand" className="animate-rise flex items-center justify-between">
        <div className="relative">
          <Ring value={rings[0].value} goal={rings[0].goal} size={116} stroke={9} color="var(--primary)">
            <span className="num text-lg font-bold">{Math.round((rings[0].value / rings[0].goal) * 100)}%</span>
            <span className="text-[10px] text-muted-foreground">of day</span>
          </Ring>
          <div className="absolute inset-0 flex items-center justify-center">
            <Ring value={rings[1].value} goal={rings[1].goal} size={92} stroke={8} color="var(--secondary)">
              <span />
            </Ring>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Ring value={rings[2].value} goal={rings[2].goal} size={68} stroke={7} color="#38bdf8">
              <span />
            </Ring>
          </div>
        </div>
        <div className="flex-1 space-y-2.5 pl-4">
          {rings.map((r) => (
            <div key={r.label}>
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="num font-bold">
                  {r.value}/{r.goal} {r.unit}
                </span>
              </div>
              <Bar value={r.value} goal={r.goal} color={r.color} className="mt-1 h-1.5" />
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <StatTile label="Calories" value="1,840" sub="810 left of 2,650" icon={<Flame size={15} />} />
        <StatTile label="Protein" value="47 g" sub="left to hit goal" color="var(--secondary)" icon={<Zap size={15} />} />
        <StatTile label="Water" value="2 / 8" sub="glasses remaining" color="#38bdf8" icon={<Droplets size={15} />} />
        <StatTile label="Sleep Score" value="82" sub="7h 12m · Good" color="var(--gold)" icon={<Moon size={15} />} />
      </div>

      <div className="mt-5">
        <SectionTitle title="Today's Workout" />
        <GlassCard glow="mint" className="animate-rise">
          <div className="flex items-start justify-between">
            <div>
              <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-bold text-secondary">
                {todayWorkout.split}
              </span>
              <h3 className="mt-2 text-lg font-bold">{todayWorkout.name}</h3>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {todayWorkout.muscles.map((m) => (
                  <span key={m} className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] text-muted-foreground">
                    {m}
                  </span>
                ))}
              </div>
              <p className="num mt-2 text-[11px] text-muted-foreground">
                {todayWorkout.exercises} exercises · ~{todayWorkout.minutes} min · {todayWorkout.volume} target
              </p>
            </div>
            <div className="text-3xl">🏋️</div>
          </div>
          <Link to="/workout/active" className="mt-4 block">
            <GradientButton className="w-full py-3.5">Start Workout →</GradientButton>
          </Link>
        </GlassCard>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link to="/recovery" className="press">
          <GlassCard className="h-full">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <HeartPulse size={14} className="text-secondary" /> Recovery
            </div>
            <div className="mt-2 flex items-center gap-3">
              <Ring value={78} goal={100} size={58} stroke={7} color="var(--secondary)">
                <span className="num text-sm font-bold">78</span>
              </Ring>
              <div>
                <div className="text-sm font-bold text-secondary">Green</div>
                <div className="text-[10px] text-muted-foreground">Push hard today</div>
              </div>
            </div>
          </GlassCard>
        </Link>
        <Link to="/gamification" className="press">
          <GlassCard className="h-full">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Trophy size={14} className="text-gold" /> Active Streak
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="animate-flame text-3xl">🔥</span>
              <div>
                <div className="num text-2xl font-bold">{user.streak}</div>
                <div className="text-[10px] text-muted-foreground">days · record {user.stats.streakRecord}</div>
              </div>
            </div>
          </GlassCard>
        </Link>
      </div>

      <Link to="/coach" className="press mt-3 block">
        <GlassCard glow="brand">
          <div className="flex items-start gap-3">
            <div className="grad-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <Brain size={18} />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wide text-secondary">AI Coach · Tip of the day</div>
              <p className="mt-1 text-sm">
                Your bench velocity dropped 6% last session. Drop to 4×5 at 92.5 kg today and bank the recovery —
                you'll hit 105 kg next week.
              </p>
            </div>
          </div>
        </GlassCard>
      </Link>

      <div className="mt-5">
        <SectionTitle title="Mood check-in" />
        <GlassCard className="flex items-center justify-between">
          {moods.map((m, i) => (
            <button
              key={m}
              onClick={() => setMood(i)}
              className={cn(
                "press flex h-12 w-12 items-center justify-center rounded-2xl text-2xl",
                mood === i ? "grad-brand scale-110 shadow-[var(--shadow-glow)]" : "bg-white/5 grayscale",
              )}
            >
              {m}
            </button>
          ))}
        </GlassCard>
      </div>

      <div className="mt-5">
        <SectionTitle title="Today's Challenges" action="Hub →" />
        <div className="space-y-2.5">
          {challenges.map((c) => (
            <GlassCard key={c.text} className="flex items-center gap-3 p-3">
              <span className="text-xl">{c.icon}</span>
              <span className="flex-1 text-sm font-medium">{c.text}</span>
              <button
                onClick={() => setXpPop(true)}
                className="press num relative rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-bold text-gold"
              >
                +{c.xp} XP
                {xpPop && (
                  <span className="animate-floatup num absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold text-secondary">
                    +{c.xp}
                  </span>
                )}
              </button>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <SectionTitle title="Weight Trend · 7 days" action="Details →" />
        <GlassCard>
          <div className="flex items-end justify-between">
            <div>
              <div className="num text-2xl font-bold">77.3 kg</div>
              <div className="num text-[11px] text-secondary">▼ 1.1 kg this week</div>
            </div>
            <Chip active>Cutting</Chip>
          </div>
          <div className="mt-3 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightTrend}>
                <defs>
                  <linearGradient id="wt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--secondary)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--secondary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <YAxis hide domain={["dataMin - 0.4", "dataMax + 0.3"]} />
                <Tooltip
                  contentStyle={{ background: "#12121A", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, fontSize: 12 }}
                />
                <Area type="monotone" dataKey="kg" stroke="var(--secondary)" strokeWidth={2.5} fill="url(#wt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { to: "/coach" as const, icon: "🧠", label: "AI Coach" },
          { to: "/recovery" as const, icon: "🌙", label: "Recovery" },
          { to: "/social" as const, icon: "👥", label: "Feed" },
        ].map((q) => (
          <Link key={q.to} to={q.to} className="press">
            <GlassCard className="p-3 text-center">
              <div className="text-2xl">{q.icon}</div>
              <div className="mt-1 text-[11px] font-medium">{q.label}</div>
            </GlassCard>
          </Link>
        ))}
      </div>

      <Link
        to="/social"
        className="press grad-brand fixed bottom-24 right-4 z-40 flex h-13 w-13 items-center justify-center rounded-full p-4 shadow-[var(--shadow-glow)]"
        aria-label="Social feed"
      >
        <Users size={20} />
      </Link>
    </AppShell>
  );
}
