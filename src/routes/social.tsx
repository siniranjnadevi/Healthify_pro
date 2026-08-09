import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/shell";
import { Chip, GlassCard, GradientButton } from "@/components/kit";
import { feed } from "@/lib/data";
import { Heart, MessageCircle, Search, Swords } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/social")({
  head: () => ({
    meta: [
      { title: "Social Feed — Healthify" },
      { name: "description", content: "See friends' workouts, PRs, progress photos and badge unlocks. Like, comment and challenge them." },
      { property: "og:title", content: "Social Feed — Healthify" },
      { property: "og:description", content: "Train together — PRs, badges and challenges from your friends." },
    ],
  }),
  component: Social,
});

function Social() {
  const [tab, setTab] = useState<"feed" | "mine">("feed");
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  return (
    <AppShell>
      <PageHeader title="Feed" subtitle="18 friends training this week" back="/home" />

      <div className="glass mb-3 flex items-center gap-2 rounded-full px-4 py-2.5">
        <Search size={15} className="text-muted-foreground" />
        <input placeholder="Find friends" className="w-full bg-transparent text-sm outline-none" />
      </div>

      <div className="mb-4 flex gap-2">
        <Chip active={tab === "feed"} onClick={() => setTab("feed")}>
          Friends
        </Chip>
        <Chip active={tab === "mine"} onClick={() => setTab("mine")}>
          My posts
        </Chip>
        <GradientButton className="ml-auto px-3 py-1.5 text-[11px]">
          <Swords size={13} /> Challenge
        </GradientButton>
      </div>

      <div className="space-y-3">
        {(tab === "feed" ? feed : feed.slice(0, 2)).map((p, i) => (
          <GlassCard key={i} className="animate-rise">
            <div className="flex items-center gap-3">
              <span className="grad-brand flex h-10 w-10 items-center justify-center rounded-full text-lg">
                {tab === "mine" ? "🦾" : p.avatar}
              </span>
              <div className="flex-1">
                <div className="text-sm font-bold">{tab === "mine" ? "You" : p.user}</div>
                <div className="text-[10px] text-muted-foreground">{p.time} ago</div>
              </div>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[9px] font-bold",
                  p.type === "PR" && "bg-gold/15 text-gold",
                  p.type === "Workout" && "bg-primary/20 text-primary",
                  p.type === "Badge" && "bg-secondary/15 text-secondary",
                  p.type === "Photo" && "bg-accent/15 text-accent",
                )}
              >
                {p.type}
              </span>
            </div>
            <p className="mt-2.5 text-sm">{p.text}</p>
            {p.type === "Photo" && (
              <div className="mt-3 flex h-40 items-center justify-center gap-6 rounded-xl bg-[linear-gradient(135deg,#1b1b28,#123c33)] text-5xl">
                🧍 <span className="text-xs text-muted-foreground">→</span> 🧍‍♂️
              </div>
            )}
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <button
                onClick={() => setLiked({ ...liked, [i]: !liked[i] })}
                className={cn("press flex items-center gap-1.5", liked[i] && "text-accent")}
              >
                <Heart size={15} fill={liked[i] ? "currentColor" : "none"} />
                <span className="num">{p.likes + (liked[i] ? 1 : 0)}</span>
              </button>
              <button className="press flex items-center gap-1.5">
                <MessageCircle size={15} />
                <span className="num">{p.comments}</span>
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </AppShell>
  );
}
