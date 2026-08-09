import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/shell";
import { Bar, Chip, GlassCard, GradientButton, Ring } from "@/components/kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Healthify — Your AI-Powered Fitness Universe" },
      {
        name: "description",
        content:
          "Healthify is the all-in-one health platform: AI coaching, workout logging, nutrition tracking, recovery scores and gamified streaks.",
      },
      { property: "og:title", content: "Healthify — Your AI-Powered Fitness Universe" },
      {
        property: "og:description",
        content: "AI coaching, gamification, social feed and complete health tracking in one premium app.",
      },
    ],
  }),
  component: Onboarding,
});

const goals = [
  { id: "fat", icon: "🔥", title: "Fat Loss", desc: "Lean out, keep strength" },
  { id: "muscle", icon: "💪", title: "Muscle Gain", desc: "Build size & power" },
  { id: "endur", icon: "🏃", title: "Endurance", desc: "Go longer, recover faster" },
  { id: "gen", icon: "✨", title: "General Fitness", desc: "Feel great every day" },
];
const activity = [
  { id: "sed", icon: "🪑", title: "Sedentary", desc: "Desk job, little movement" },
  { id: "light", icon: "🚶", title: "Light", desc: "1–2 sessions / week" },
  { id: "mod", icon: "🚴", title: "Moderate", desc: "3–4 sessions / week" },
  { id: "act", icon: "🏋️", title: "Active", desc: "5–6 sessions / week" },
  { id: "ath", icon: "🥇", title: "Athlete", desc: "2-a-days, competitive" },
];
const diets = [
  { id: "veg", icon: "🥦", title: "Vegetarian" },
  { id: "nonveg", icon: "🍗", title: "Non-Veg" },
  { id: "vegan", icon: "🌱", title: "Vegan" },
  { id: "keto", icon: "🥑", title: "Keto" },
  { id: "indian", icon: "🍛", title: "Indian" },
];
const experience = [
  { id: "beg", title: "Beginner", desc: "0–1 year lifting", bars: 1 },
  { id: "int", title: "Intermediate", desc: "1–3 years lifting", bars: 2 },
  { id: "adv", title: "Advanced", desc: "3+ years lifting", bars: 3 },
];
const aiSteps = [
  "Analyzing your body metrics",
  "Calculating TDEE & macro split",
  "Designing your training split",
  "Matching meals to your preference",
  "Finalizing recovery protocol",
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [pick, setPick] = useState({
    goal: "muscle",
    activity: "act",
    diet: "indian",
    exp: "int",
    time: "Evening",
  });

  const [info, setInfo] = useState({ age: "27", height: "178", weight: "77.3", gender: "Male" });
  const [life, setLife] = useState({ sleep: 7, stress: 4, medical: "None" });
  const [aiIdx, setAiIdx] = useState(0);

  useEffect(() => {
    if (step !== 7) return;
    setAiIdx(0);
    const t = setInterval(() => setAiIdx((i) => (i < aiSteps.length ? i + 1 : i)), 750);
    const done = setTimeout(() => setStep(8), 4200);
    return () => {
      clearInterval(t);
      clearTimeout(done);
    };
  }, [step]);

  const set = (k: string, v: string) => setPick((p) => ({ ...p, [k]: v }));
  const next = () => setStep((s) => s + 1);

  return (
    <AppShell nav={false}>
      {step > 0 && step < 7 && (
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground">
            <button onClick={() => setStep((s) => s - 1)} className="font-semibold text-secondary">
              ← Back
            </button>
            <span className="num">Step {step} of 6</span>
          </div>
          <Bar value={step} goal={6} />
        </div>
      )}

      {step === 0 && (
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
          <div className="animate-popin animate-pulseglow grad-brand flex h-24 w-24 items-center justify-center rounded-3xl text-5xl">
            ⚡
          </div>
          <h1 className="animate-rise mt-8 text-5xl font-bold">
            Health<span className="grad-text">ify</span>
          </h1>
          <p className="animate-rise mt-3 text-base text-muted-foreground [animation-delay:.1s]">
            Your AI-Powered Fitness Universe
          </p>
          <div className="animate-rise mt-10 grid w-full grid-cols-3 gap-2 [animation-delay:.2s]">
            {[
              ["AI Coach", "24/7"],
              ["Workouts", "1,200+"],
              ["Foods", "9M+"],
            ].map(([a, b]) => (
              <GlassCard key={a} className="p-3 text-center">
                <div className="num text-sm font-bold text-secondary">{b}</div>
                <div className="text-[10px] text-muted-foreground">{a}</div>
              </GlassCard>
            ))}
          </div>
          <GradientButton className="animate-rise mt-10 w-full py-4 text-base [animation-delay:.3s]" onClick={next}>
            Get Started
          </GradientButton>
          <p className="mt-4 text-[11px] text-muted-foreground">Join 2.4M athletes training smarter</p>
        </div>
      )}

      {step === 1 && (
        <Step title="Tell us about you" sub="We use this to calculate your energy needs.">
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Age", "age", "yrs"],
              ["Height", "height", "cm"],
              ["Weight", "weight", "kg"],
            ].map(([label, key, unit]) => (
              <GlassCard key={key} className="p-3">
                <div className="text-[11px] text-muted-foreground">{label}</div>
                <div className="flex items-baseline gap-1">
                  <input
                    value={info[key as keyof typeof info]}
                    onChange={(e) => setInfo({ ...info, [key]: e.target.value })}
                    className="num w-full bg-transparent text-2xl font-bold outline-none"
                  />
                  <span className="text-xs text-muted-foreground">{unit}</span>
                </div>
              </GlassCard>
            ))}
            <GlassCard className="p-3">
              <div className="mb-2 text-[11px] text-muted-foreground">Gender</div>
              <div className="flex gap-1.5">
                {["Male", "Female", "Other"].map((g) => (
                  <Chip key={g} active={info.gender === g} onClick={() => setInfo({ ...info, gender: g })}>
                    {g[0]}
                  </Chip>
                ))}
              </div>
            </GlassCard>
          </div>
          <Next onClick={next} />
        </Step>
      )}

      {step === 2 && (
        <Step title="What's your goal?" sub="Your plan adapts around this.">
          <div className="grid grid-cols-2 gap-3">
            {goals.map((g) => (
              <Selectable key={g.id} active={pick.goal === g.id} onClick={() => set("goal", g.id)} className="p-4">
                <div className="text-3xl">{g.icon}</div>
                <div className="mt-2 text-sm font-bold">{g.title}</div>
                <div className="text-[11px] text-muted-foreground">{g.desc}</div>
              </Selectable>
            ))}
          </div>
          <Next onClick={next} />
        </Step>
      )}

      {step === 3 && (
        <Step title="How active are you?" sub="Outside of planned training.">
          <div className="space-y-2.5">
            {activity.map((a) => (
              <Selectable
                key={a.id}
                active={pick.activity === a.id}
                onClick={() => set("activity", a.id)}
                className="flex items-center gap-3 p-3.5"
              >
                <span className={cn("text-2xl", pick.activity === a.id && "animate-flame")}>{a.icon}</span>
                <div className="text-left">
                  <div className="text-sm font-bold">{a.title}</div>
                  <div className="text-[11px] text-muted-foreground">{a.desc}</div>
                </div>
              </Selectable>
            ))}
          </div>
          <Next onClick={next} />
        </Step>
      )}

      {step === 4 && (
        <Step title="Diet preference" sub="We'll only suggest food you'll actually eat.">
          <div className="grid grid-cols-2 gap-3">
            {diets.map((d) => (
              <Selectable key={d.id} active={pick.diet === d.id} onClick={() => set("diet", d.id)} className="p-5 text-center">
                <div className="text-4xl">{d.icon}</div>
                <div className="mt-2 text-sm font-bold">{d.title}</div>
              </Selectable>
            ))}
          </div>
          <Next onClick={next} />
        </Step>
      )}

      {step === 5 && (
        <Step title="Gym experience" sub="Sets the intensity of week one.">
          <div className="space-y-3">
            {experience.map((e) => (
              <Selectable
                key={e.id}
                active={pick.exp === e.id}
                onClick={() => set("exp", e.id)}
                className="flex items-center justify-between p-4"
              >
                <div className="text-left">
                  <div className="text-sm font-bold">{e.title}</div>
                  <div className="text-[11px] text-muted-foreground">{e.desc}</div>
                </div>
                <div className="flex items-end gap-1">
                  {[1, 2, 3].map((b) => (
                    <span
                      key={b}
                      className={cn("w-2 rounded-sm", b <= e.bars ? "grad-brand" : "bg-white/10")}
                      style={{ height: 8 + b * 7 }}
                    />
                  ))}
                </div>
              </Selectable>
            ))}
          </div>
          <Next onClick={next} />
        </Step>
      )}

      {step === 6 && (
        <Step title="Lifestyle" sub="Recovery is half the result.">
          <div className="space-y-3">
            <GlassCard>
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-muted-foreground">Sleep hours</span>
                <span className="num font-bold text-secondary">{life.sleep}h</span>
              </div>
              <input
                type="range"
                min={4}
                max={10}
                value={life.sleep}
                onChange={(e) => setLife({ ...life, sleep: +e.target.value })}
                className="w-full accent-[var(--secondary)]"
              />
            </GlassCard>
            <GlassCard>
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-muted-foreground">Stress level</span>
                <span className="num font-bold text-accent">{life.stress}/10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={life.stress}
                onChange={(e) => setLife({ ...life, stress: +e.target.value })}
                className="w-full accent-[var(--accent)]"
              />
            </GlassCard>
            <GlassCard>
              <div className="mb-2 text-xs text-muted-foreground">Preferred workout time</div>
              <div className="flex flex-wrap gap-2">
                {["Early Morning", "Morning", "Afternoon", "Evening", "Night"].map((t) => (
                  <Chip key={t} active={pick.time === t} onClick={() => set("time", t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </GlassCard>
            <GlassCard>
              <div className="mb-2 text-xs text-muted-foreground">Medical conditions</div>
              <div className="flex flex-wrap gap-2">
                {["None", "Diabetes", "PCOS", "Hypertension", "Knee injury", "Thyroid"].map((m) => (
                  <Chip key={m} active={life.medical === m} onClick={() => setLife({ ...life, medical: m })}>
                    {m}
                  </Chip>
                ))}
              </div>
            </GlassCard>
          </div>
          <Next onClick={next} label="Generate My Plan" />
        </Step>
      )}

      {step === 7 && (
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
          <div className="relative">
            <div className="animate-spin-slow grad-brand h-28 w-28 rounded-full opacity-30 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center text-5xl">🧠</div>
          </div>
          <h2 className="mt-8 text-xl font-bold">AI generating your personalized plan…</h2>
          <div className="mt-8 w-full space-y-3 text-left">
            {aiSteps.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px]",
                    i < aiIdx ? "bg-secondary text-secondary-foreground" : "bg-white/8 text-muted-foreground",
                  )}
                >
                  {i < aiIdx ? "✓" : i + 1}
                </span>
                <span className={cn("text-sm", i < aiIdx ? "text-foreground" : "text-muted-foreground")}>{s}</span>
                {i === aiIdx && <span className="skeleton ml-auto h-2 w-16 rounded-full" />}
              </div>
            ))}
          </div>
          <div className="mt-8 w-full">
            <Bar value={aiIdx} goal={aiSteps.length} color="var(--secondary)" />
          </div>
        </div>
      )}

      {step === 8 && (
        <div className="animate-rise pt-6">
          <div className="text-center">
            <div className="animate-popin text-5xl">🎉</div>
            <h1 className="mt-3 text-3xl font-bold">Your plan is ready</h1>
            <p className="mt-1 text-xs text-muted-foreground">Built from 27 data points · updates weekly</p>
          </div>
          <GlassCard glow="brand" className="mt-6 flex items-center gap-4">
            <Ring value={2650} goal={2650} size={92}>
              <span className="num text-lg font-bold">2650</span>
              <span className="text-[10px] text-muted-foreground">kcal / day</span>
            </Ring>
            <div className="flex-1 space-y-2">
              {[
                ["Protein", 165, "g", "var(--secondary)"],
                ["Carbs", 300, "g", "var(--primary)"],
                ["Fat", 78, "g", "var(--accent)"],
              ].map(([l, v, u, c]) => (
                <div key={l as string}>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">{l}</span>
                    <span className="num font-bold">
                      {v}
                      {u}
                    </span>
                  </div>
                  <Bar value={1} goal={1} color={c as string} className="mt-1 h-1.5" />
                </div>
              ))}
            </div>
          </GlassCard>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <GlassCard>
              <div className="text-[11px] text-muted-foreground">Water Goal</div>
              <div className="num text-xl font-bold text-[#38bdf8]">3.2 L</div>
              <div className="text-[11px] text-muted-foreground">8 glasses / day</div>
            </GlassCard>
            <GlassCard>
              <div className="text-[11px] text-muted-foreground">Workout Split</div>
              <div className="text-base font-bold">Push / Pull / Legs</div>
              <div className="text-[11px] text-muted-foreground">6 days · 60 min</div>
            </GlassCard>
          </div>
          <GlassCard className="mt-3">
            <div className="text-[11px] text-muted-foreground">Projected result</div>
            <p className="mt-1 text-sm">
              At this intake you should reach <span className="font-bold text-secondary">73.5 kg</span> at ~11% body
              fat in <span className="font-bold">14 weeks</span>, while adding strength on all main lifts.
            </p>
          </GlassCard>
          <GradientButton className="mt-6 w-full py-4 text-base" onClick={() => navigate({ to: "/home" })}>
            Enter Healthify
          </GradientButton>
        </div>
      )}
    </AppShell>
  );
}

function Step({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="animate-rise">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mb-5 mt-1 text-xs text-muted-foreground">{sub}</p>
      {children}
    </div>
  );
}

function Selectable({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "press glass w-full rounded-2xl text-left",
        active && "border-primary/60 bg-primary/15 shadow-[var(--shadow-glow)]",
        className,
      )}
    >
      {children}
    </button>
  );
}

function Next({ onClick, label = "Continue" }: { onClick: () => void; label?: string }) {
  return (
    <GradientButton className="mt-6 w-full py-4 text-base" onClick={onClick}>
      {label}
    </GradientButton>
  );
}
