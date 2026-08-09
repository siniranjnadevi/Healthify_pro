import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/shell";
import { Bar, GlassCard, GradientButton, SectionTitle } from "@/components/kit";
import { user } from "@/lib/data";
import { Bell, ChevronRight, HelpCircle, Lock, Ruler } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Settings — Healthify" },
      { name: "description", content: "Your lifetime stats, goals, connected wearables, subscription and app settings." },
      { property: "og:title", content: "Profile & Settings — Healthify" },
      { property: "og:description", content: "Stats, goals, wearables and settings in one place." },
    ],
  }),
  component: Profile,
});

const settings = [
  { icon: Bell, label: "Notifications", sub: "Reminders, streaks, coach nudges" },
  { icon: Ruler, label: "Units", sub: "Metric (kg, cm, ml)" },
  { icon: Lock, label: "Privacy", sub: "Feed visibility, data export" },
  { icon: HelpCircle, label: "Help & Support", sub: "FAQ, contact, feedback" },
];

function Profile() {
  return (
    <AppShell>
      <PageHeader title="Profile" />

      <GlassCard glow="brand" className="animate-rise flex items-center gap-4">
        <div className="grad-brand flex h-16 w-16 items-center justify-center rounded-2xl text-3xl">{user.avatar}</div>
        <div className="flex-1">
          <div className="text-lg font-bold">{user.name} Mehta</div>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
              Lv {user.level} · {user.title}
            </span>
            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-gold">{user.plan}</span>
          </div>
          <Bar value={user.xp} goal={user.xpToNext} className="mt-2 h-1.5" />
        </div>
      </GlassCard>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {[
          ["Workouts", user.stats.workouts],
          ["Volume", user.stats.volume],
          ["Best streak", `${user.stats.streakRecord}d`],
        ].map(([k, v]) => (
          <GlassCard key={k as string} className="p-3 text-center">
            <div className="num text-lg font-bold text-secondary">{v}</div>
            <div className="text-[10px] text-muted-foreground">{k}</div>
          </GlassCard>
        ))}
      </div>

      <div className="mt-5">
        <SectionTitle title="My goals" action="Edit" />
        <GlassCard className="space-y-2.5">
          {[
            ["Daily calories", `${user.goals.calories} kcal`],
            ["Protein", `${user.goals.protein} g`],
            ["Water", `${user.goals.water} glasses`],
            ["Target weight", "73.5 kg by Nov"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{k}</span>
              <span className="num font-bold">{v}</span>
            </div>
          ))}
        </GlassCard>
      </div>

      <div className="mt-5">
        <SectionTitle title="Connected wearables" />
        <div className="grid grid-cols-3 gap-3">
          {[
            ["⌚", "Apple Watch", true],
            ["⌚", "Fitbit", false],
            ["⌚", "Garmin", false],
          ].map(([i, n, on]) => (
            <GlassCard key={n as string} className="p-3 text-center">
              <div className="text-2xl">{i}</div>
              <div className="mt-1 text-[10px] font-semibold">{n}</div>
              <div className={`text-[9px] ${on ? "text-secondary" : "text-muted-foreground"}`}>
                {on ? "Synced" : "Connect"}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <SectionTitle title="Settings" />
        <div className="space-y-2">
          {settings.map((s) => (
            <GlassCard key={s.label} className="flex items-center gap-3 p-3">
              <s.icon size={17} className="text-secondary" />
              <div className="flex-1">
                <div className="text-sm font-semibold">{s.label}</div>
                <div className="text-[10px] text-muted-foreground">{s.sub}</div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link to="/gamification">
          <GradientButton variant="outline" className="w-full py-3">
            Rewards Hub
          </GradientButton>
        </Link>
        <Link to="/">
          <GradientButton variant="outline" className="w-full py-3">
            Restart onboarding
          </GradientButton>
        </Link>
      </div>
    </AppShell>
  );
}
