import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bar as RBar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { AppShell, PageHeader } from "@/components/shell";
import { Bar, Chip, GlassCard, GradientButton, Ring, SectionTitle, Sheet } from "@/components/kit";
import { indianFoods, meals, recentFoods, weeklyNutrition } from "@/lib/data";
import { Barcode, Camera, Mic, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/nutrition")({
  head: () => ({
    meta: [
      { title: "Nutrition Tracking — Healthify" },
      { name: "description", content: "Log meals with barcode scan, photo AI and voice. Track calories, macros, micros and Indian foods." },
      { property: "og:title", content: "Nutrition Tracking — Healthify" },
      { property: "og:description", content: "Calories, macros, micronutrients and AI meal logging." },
    ],
  }),
  component: Nutrition,
});

function Nutrition() {
  const [addOpen, setAddOpen] = useState(false);
  const [food, setFood] = useState<string | null>(null);
  const [serving, setServing] = useState(1);
  const [recipeOpen, setRecipeOpen] = useState(false);

  const totals = meals.reduce(
    (a, m) => ({ kcal: a.kcal + m.kcal, p: a.p + m.p, c: a.c + m.c, f: a.f + m.f }),
    { kcal: 0, p: 0, c: 0, f: 0 },
  );

  return (
    <AppShell>
      <PageHeader title="Nutrition" subtitle="Sunday · Indian · High protein" />

      <GlassCard glow="brand" className="animate-rise flex items-center gap-4">
        <Ring value={totals.kcal} goal={2650} size={116} stroke={10}>
          <span className="num text-xl font-bold">{totals.kcal}</span>
          <span className="text-[10px] text-muted-foreground">of 2650 kcal</span>
        </Ring>
        <div className="flex-1 space-y-2.5">
          {[
            ["Protein", totals.p, 165, "var(--secondary)"],
            ["Carbs", totals.c, 300, "var(--primary)"],
            ["Fat", totals.f, 78, "var(--accent)"],
          ].map(([l, v, g, c]) => (
            <div key={l as string}>
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">{l}</span>
                <span className="num font-bold">
                  {v as number}/{g as number} g
                </span>
              </div>
              <Bar value={v as number} goal={g as number} color={c as string} className="mt-1 h-1.5" />
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {[
          { icon: <Search size={16} />, label: "Search" },
          { icon: <Barcode size={16} />, label: "Barcode" },
          { icon: <Camera size={16} />, label: "Photo AI", badge: true },
          { icon: <Mic size={16} />, label: "Voice" },
        ].map((a) => (
          <button key={a.label} onClick={() => setAddOpen(true)} className="press glass relative rounded-2xl p-3 text-center">
            <span className="flex justify-center text-secondary">{a.icon}</span>
            <span className="mt-1.5 block text-[10px] font-medium">{a.label}</span>
            {a.badge && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <SectionTitle title="Today's meals" />
        <div className="space-y-3">
          {meals.map((m) => (
            <GlassCard key={m.name}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold">{m.name}</div>
                  <div className="num text-[11px] text-muted-foreground">{m.time}</div>
                </div>
                <div className="text-right">
                  <div className="num text-lg font-bold">{m.kcal}</div>
                  <div className="num text-[10px] text-muted-foreground">
                    P{m.p} · C{m.c} · F{m.f}
                  </div>
                </div>
              </div>
              {m.items.length > 0 ? (
                <div className="mt-2 space-y-1">
                  {m.items.map((it) => (
                    <button
                      key={it}
                      onClick={() => setFood(it)}
                      className="press flex w-full items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5 text-left text-xs"
                    >
                      <span>{it}</span>
                      <span className="text-muted-foreground">›</span>
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  onClick={() => setAddOpen(true)}
                  className="press mt-2 w-full rounded-xl border border-dashed border-border py-2 text-xs text-muted-foreground"
                >
                  + Add {m.name.toLowerCase()}
                </button>
              )}
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <SectionTitle title="Popular Indian foods" action="See all" />
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
          {indianFoods.map((f) => (
            <button key={f.name} onClick={() => setFood(f.name)} className="press glass w-36 shrink-0 rounded-2xl p-3 text-left">
              <div className="text-2xl">🍛</div>
              <div className="mt-1.5 text-xs font-bold leading-tight">{f.name}</div>
              <div className="num mt-1 text-[10px] text-muted-foreground">
                {f.kcal} kcal · {f.p}g P
              </div>
              <div className="text-[10px] text-muted-foreground">{f.serving}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <SectionTitle title="Weekly report" />
        <GlassCard>
          <div className="flex justify-between text-[11px]">
            <span className="text-muted-foreground">Avg intake</span>
            <span className="num font-bold">2,490 kcal · 154g protein</span>
          </div>
          <div className="mt-3 h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyNutrition}>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,.06)" />
                <XAxis dataKey="d" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,.05)" }}
                  contentStyle={{ background: "#12121A", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, fontSize: 12 }}
                />
                <RBar dataKey="kcal" fill="var(--primary)" radius={[6, 6, 0, 0]} />
                <RBar dataKey="p" fill="var(--secondary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mt-3">
        <div className="text-[11px] font-bold uppercase tracking-wide text-secondary">Meal timing</div>
        <p className="mt-1 text-sm">
          Shift 30g of your dinner protein into a pre-bed casein serving — your training window is 7 PM and overnight
          MPS is where you're leaking gains.
        </p>
      </GlassCard>

      <button
        onClick={() => setRecipeOpen(true)}
        className="press grad-brand fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-[var(--shadow-glow)]"
        aria-label="Create recipe"
      >
        <Plus size={22} />
      </button>

      <Sheet open={addOpen} onClose={() => setAddOpen(false)} title="Add food">
        <div className="glass mb-4 flex items-center gap-2 rounded-full px-4 py-2.5">
          <Search size={15} className="text-muted-foreground" />
          <input placeholder="Search 9M+ foods" className="w-full bg-transparent text-sm outline-none" />
        </div>
        <div className="mb-4 grid grid-cols-3 gap-2">
          {["📷 Barcode", "🤖 Photo AI", "🎙️ Voice"].map((x) => (
            <div key={x} className="glass rounded-xl p-3 text-center text-[11px] font-medium">
              {x}
            </div>
          ))}
        </div>
        <SectionTitle title="Recent" />
        <div className="space-y-2">
          {recentFoods.map((f) => (
            <button
              key={f.name}
              onClick={() => {
                setAddOpen(false);
                setFood(f.name);
              }}
              className="press glass flex w-full items-center justify-between rounded-xl p-3 text-left"
            >
              <span className="text-sm">{f.name}</span>
              <span className="num text-[11px] text-muted-foreground">
                {f.kcal} kcal · {f.p}g P
              </span>
            </button>
          ))}
        </div>
      </Sheet>

      <Sheet open={!!food} onClose={() => setFood(null)} title={food ?? ""}>
        <div className="flex items-center gap-4">
          <Ring value={serving * 320} goal={2650} size={90}>
            <span className="num text-base font-bold">{serving * 320}</span>
            <span className="text-[9px] text-muted-foreground">kcal</span>
          </Ring>
          <div className="flex-1 space-y-2">
            {[
              ["Protein", 14 * serving, "var(--secondary)"],
              ["Carbs", 22 * serving, "var(--primary)"],
              ["Fat", 18 * serving, "var(--accent)"],
            ].map(([l, v, c]) => (
              <div key={l as string}>
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">{l}</span>
                  <span className="num font-bold">{v as number}g</span>
                </div>
                <Bar value={v as number} goal={60} color={c as string} className="mt-1 h-1.5" />
              </div>
            ))}
          </div>
        </div>
        <SectionTitle title="Micronutrients" />
        <div className="grid grid-cols-3 gap-2">
          {[
            ["Fiber", "4.2 g"],
            ["Sugar", "6.8 g"],
            ["Sodium", "480 mg"],
            ["Calcium", "310 mg"],
            ["Iron", "2.1 mg"],
            ["Vit A", "18% DV"],
          ].map(([k, v]) => (
            <div key={k} className="glass rounded-xl p-2.5 text-center">
              <div className="num text-sm font-bold">{v}</div>
              <div className="text-[10px] text-muted-foreground">{k}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 p-3">
          <span className="text-xs text-muted-foreground">Serving size</span>
          <div className="flex items-center gap-3">
            <button onClick={() => setServing(Math.max(0.5, serving - 0.5))} className="press h-7 w-7 rounded-lg bg-white/8">
              −
            </button>
            <span className="num text-sm font-bold">{serving} cup</span>
            <button onClick={() => setServing(serving + 0.5)} className="press h-7 w-7 rounded-lg bg-white/8">
              +
            </button>
          </div>
        </div>
        <GradientButton className="mt-4 w-full py-3.5" onClick={() => setFood(null)}>
          Add to meal
        </GradientButton>
      </Sheet>

      <Sheet open={recipeOpen} onClose={() => setRecipeOpen(false)} title="Recipe creator">
        <input
          placeholder="Recipe name"
          className="glass mb-3 w-full rounded-xl px-3 py-2.5 text-sm outline-none"
          defaultValue="High-protein Paneer Bowl"
        />
        <SectionTitle title="Ingredients" />
        <div className="space-y-2">
          {["Paneer 180g", "Quinoa 1 cup", "Bell peppers 100g", "Mint yogurt 60g"].map((i) => (
            <div key={i} className="glass flex items-center justify-between rounded-xl p-3 text-sm">
              {i}
              <span className="text-muted-foreground">✕</span>
            </div>
          ))}
          <button className="press w-full rounded-xl border border-dashed border-border py-2 text-xs text-muted-foreground">
            + Add ingredient
          </button>
        </div>
        <div className="num mt-4 flex justify-between rounded-xl bg-secondary/10 p-3 text-sm font-bold text-secondary">
          <span>Total</span>
          <span>618 kcal · 46P / 52C / 24F</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {["Vegetarian", "High protein", "30 min"].map((t) => (
            <Chip key={t} active>
              {t}
            </Chip>
          ))}
        </div>
        <GradientButton className="mt-4 w-full py-3.5" onClick={() => setRecipeOpen(false)}>
          Save recipe
        </GradientButton>
      </Sheet>
    </AppShell>
  );
}
