import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell, PageHeader } from "@/components/shell";
import { Bar, Chip, GlassCard, SectionTitle, StatTile } from "@/components/kit";
import { measurements, proteinMuscle, strengthProgress, weightLong } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress & Body Metrics — Healthify" },
      { name: "description", content: "Weight graphs, body measurements, body fat, strength curves and before/after progress photos." },
      { property: "og:title", content: "Progress & Body Metrics — Healthify" },
      { property: "og:description", content: "Track weight, measurements, strength and photos over time." },
    ],
  }),
  component: Progress,
});

const tabs = ["Weight", "Body", "Strength", "Photos"] as const;
const tip = { background: "#12121A", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, fontSize: 12 };

function Progress() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Weight");
  const [slide, setSlide] = useState(50);

  return (
    <AppShell>
      <PageHeader title="Progress" subtitle="8 weeks tracked · updated today" />

      <div className="glass mb-4 flex rounded-full p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "press flex-1 rounded-full py-2 text-xs font-semibold",
              tab === t ? "grad-brand text-primary-foreground" : "text-muted-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Weight" && (
        <div className="animate-rise space-y-3">
          <GlassCard glow="brand">
            <div className="flex items-end justify-between">
              <div>
                <div className="num text-3xl font-bold">77.3 kg</div>
                <div className="num text-xs text-secondary">▼ 4.8 kg in 8 weeks</div>
              </div>
              <Chip active>8W</Chip>
            </div>
            <div className="mt-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weightLong}>
                  <defs>
                    <linearGradient id="w2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,.06)" />
                  <XAxis dataKey="d" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
                  <Tooltip contentStyle={tip} />
                  <Area type="monotone" dataKey="kg" stroke="var(--primary)" strokeWidth={3} fill="url(#w2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
          <div className="grid grid-cols-3 gap-3">
            <StatTile label="BMI" value="24.4" sub="Healthy" />
            <StatTile label="FFMI" value="21.8" sub="Advanced" color="var(--secondary)" />
            <StatTile label="Lean Mass" value="65.4" sub="kg" color="var(--gold)" />
          </div>
          <GlassCard>
            <SectionTitle title="Calories vs Weight" />
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightLong}>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,.06)" />
                  <XAxis dataKey="d" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="l" hide domain={["dataMin - 1", "dataMax + 1"]} />
                  <YAxis yAxisId="r" orientation="right" hide />
                  <Tooltip contentStyle={tip} />
                  <Line yAxisId="l" type="monotone" dataKey="kg" stroke="var(--secondary)" strokeWidth={2.5} dot={false} />
                  <Line yAxisId="r" type="monotone" dataKey="kcal" stroke="var(--accent)" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
          <GlassCard>
            <SectionTitle title="Protein vs Lean Mass" />
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={proteinMuscle}>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,.06)" />
                  <XAxis dataKey="d" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="l" hide domain={[100, 200]} />
                  <YAxis yAxisId="r" hide domain={[60, 68]} />
                  <Tooltip contentStyle={tip} />
                  <Line yAxisId="l" type="monotone" dataKey="protein" stroke="var(--primary)" strokeWidth={2.5} dot={false} />
                  <Line yAxisId="r" type="monotone" dataKey="lean" stroke="var(--gold)" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      )}

      {tab === "Body" && (
        <div className="animate-rise space-y-3">
          <GlassCard>
            <SectionTitle title="Measurements (cm)" />
            <div className="space-y-3">
              {measurements.map((m) => (
                <div key={m.part}>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{m.part}</span>
                    <span className="num font-bold">
                      {m.value}{" "}
                      <span className={m.delta > 0 ? "text-secondary" : "text-accent"}>
                        {m.delta > 0 ? "▲" : "▼"} {Math.abs(m.delta)}
                      </span>
                    </span>
                  </div>
                  <Bar value={m.value} goal={120} className="mt-1 h-1.5" />
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard glow="mint" className="flex items-center gap-4">
            <svg width="80" height="130" viewBox="0 0 60 100">
              <defs>
                <linearGradient id="bf" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="var(--secondary)" />
                  <stop offset="86%" stopColor="var(--secondary)" />
                  <stop offset="86%" stopColor="rgba(255,255,255,.08)" />
                </linearGradient>
              </defs>
              <path
                d="M30 4 a6 6 0 0 1 0 12 q10 2 12 10 l-2 18 -4 2 -1 24 -2 26 h-6 l-2 -26 -2 0 -2 26 h-6 l-2 -26 -1 -24 -4 -2 -2 -18 q2 -8 12 -10 a6 6 0 0 1 0 -12 z"
                fill="url(#bf)"
                stroke="rgba(255,255,255,.2)"
              />
            </svg>
            <div>
              <div className="text-[11px] text-muted-foreground">Body fat</div>
              <div className="num text-4xl font-bold text-secondary">13.6%</div>
              <div className="num text-[11px] text-muted-foreground">▼ 3.9% since Week 1</div>
              <div className="num mt-2 text-[11px]">Lean 65.4 kg · Fat 11.9 kg</div>
            </div>
          </GlassCard>
        </div>
      )}

      {tab === "Strength" && (
        <div className="animate-rise space-y-3">
          <GlassCard glow="brand">
            <SectionTitle title="Main lifts · estimated 1RM" />
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={strengthProgress}>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,.06)" />
                  <XAxis dataKey="d" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip contentStyle={tip} />
                  <Line type="monotone" dataKey="bench" stroke="var(--primary)" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="squat" stroke="var(--secondary)" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="dead" stroke="var(--accent)" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
          <div className="grid grid-cols-3 gap-3">
            <StatTile label="Bench" value="102.5" sub="+17.5 kg" />
            <StatTile label="Squat" value="142.5" sub="+22.5 kg" color="var(--secondary)" />
            <StatTile label="Deadlift" value="180" sub="+40 kg" color="var(--accent)" />
          </div>
          <GlassCard>
            <SectionTitle title="Muscle gain timeline" />
            <div className="space-y-3">
              {[
                ["Week 2", "First 1 kg of lean mass", "var(--primary)"],
                ["Week 4", "Arms +0.6 cm, bench +7.5 kg", "var(--secondary)"],
                ["Week 6", "Body fat under 15%", "var(--gold)"],
                ["Week 8", "Lean mass 65.4 kg — all-time high", "var(--accent)"],
              ].map(([w, t, c]) => (
                <div key={w} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: c }} />
                  <div>
                    <div className="num text-[11px] text-muted-foreground">{w}</div>
                    <div className="text-sm">{t}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {tab === "Photos" && (
        <div className="animate-rise space-y-3">
          <GlassCard>
            <SectionTitle title="Before / After" />
            <div className="relative h-64 overflow-hidden rounded-xl">
              <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#1b1b28,#242435)] text-6xl">
                🧍
              </div>
              <div
                className="absolute inset-y-0 left-0 flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#0f2b26,#123c33)] text-6xl"
                style={{ width: `${slide}%` }}
              >
                🧍‍♂️
              </div>
              <div className="absolute inset-y-0 w-0.5 bg-white/80" style={{ left: `${slide}%` }} />
              <span className="num absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[10px]">Week 1 · 82.1 kg</span>
              <span className="num absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[10px]">Week 8 · 77.3 kg</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={slide}
              onChange={(e) => setSlide(+e.target.value)}
              className="mt-3 w-full accent-[var(--primary)]"
            />
          </GlassCard>
          <GlassCard>
            <SectionTitle title="Photo calendar" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded-xl bg-white/5 text-2xl"
                >
                  {i < 8 ? "🧍" : <span className="text-[10px] text-muted-foreground">—</span>}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </AppShell>
  );
}
