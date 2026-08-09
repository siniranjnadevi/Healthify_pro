import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function GlassCard({
  children,
  className,
  glow,
}: {
  children: ReactNode;
  className?: string;
  glow?: "brand" | "mint" | "none";
}) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-4",
        glow === "brand" && "shadow-[var(--shadow-glow)]",
        glow === "mint" && "shadow-[var(--shadow-mint)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SolidCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-4", className)}>{children}</div>
  );
}

export function GradientButton({
  children,
  className,
  onClick,
  variant = "brand",
  type = "button",
  disabled,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "brand" | "ghost" | "outline" | "heat";
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "press inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold disabled:opacity-40",
        variant === "brand" &&
          "grad-brand text-primary-foreground shadow-[var(--shadow-glow)] hover:brightness-110",
        variant === "heat" &&
          "bg-[image:var(--gradient-heat)] text-background hover:brightness-110",
        variant === "outline" && "border border-border bg-white/5 text-foreground hover:bg-white/10",
        variant === "ghost" && "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Ring({
  value,
  goal,
  color = "var(--primary)",
  size = 96,
  stroke = 9,
  label,
  children,
}: {
  value: number;
  goal: number;
  color?: string;
  size?: number;
  stroke?: number;
  label?: string;
  children?: ReactNode;
}) {
  const pct = Math.min(1, goal > 0 ? value / goal : 0);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.2,.8,.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children ?? (
          <>
            <span className="num text-sm font-bold">{Math.round(pct * 100)}%</span>
            {label && <span className="text-[10px] text-muted-foreground">{label}</span>}
          </>
        )}
      </div>
    </div>
  );
}

export function Bar({
  value,
  goal,
  color = "var(--primary)",
  className,
}: {
  value: number;
  goal: number;
  color?: string;
  className?: string;
}) {
  const pct = Math.min(100, goal > 0 ? (value / goal) * 100 : 0);
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-white/8", className)}>
      <div
        className="h-full rounded-full"
        style={{
          width: `${pct}%`,
          backgroundImage: `linear-gradient(90deg, ${color}, color-mix(in oklab, ${color} 55%, white))`,
          transition: "width 1s cubic-bezier(.2,.8,.2,1)",
        }}
      />
    </div>
  );
}

export function Chip({
  children,
  active,
  onClick,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "press shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium",
        active
          ? "border-transparent grad-brand text-primary-foreground"
          : "border-border bg-white/5 text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="mb-3 flex items-end justify-between">
      <h2 className="text-base font-bold">{title}</h2>
      {action && (
        <button onClick={onAction} className="text-xs font-semibold text-secondary">
          {action}
        </button>
      )}
    </div>
  );
}

export function StatTile({
  label,
  value,
  sub,
  color = "var(--primary)",
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  color?: string;
  icon?: ReactNode;
}) {
  return (
    <GlassCard className="p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="num mt-1.5 text-xl font-bold" style={{ color }}>
        {value}
      </div>
      {sub && <div className="text-[11px] text-muted-foreground">{sub}</div>}
    </GlassCard>
  );
}

/** Front + back body silhouette with highlighted muscle groups. */
export function BodyMap({
  active = [],
  onToggle,
  size = 150,
}: {
  active?: string[];
  onToggle?: (m: string) => void;
  size?: number;
}) {
  const on = (m: string) => active.includes(m);
  const fill = (m: string, base = "rgba(255,255,255,0.07)") =>
    on(m) ? "url(#heat)" : base;
  const grp = (m: string) => ({
    fill: fill(m),
    stroke: on(m) ? "var(--accent)" : "rgba(255,255,255,0.14)",
    strokeWidth: 0.8,
    onClick: () => onToggle?.(m),
    style: { cursor: onToggle ? "pointer" : "default", transition: "fill .3s ease" },
  });
  return (
    <div className="flex items-center justify-center gap-3">
      {(["front", "back"] as const).map((view) => (
        <svg key={view} width={size} height={size * 1.5} viewBox="0 0 100 150">
          <defs>
            <linearGradient id="heat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--gold)" />
            </linearGradient>
          </defs>
          {/* head */}
          <circle cx="50" cy="12" r="8" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.14)" strokeWidth="0.8" />
          {/* neck */}
          <rect x="46" y="20" width="8" height="5" rx="2" fill="rgba(255,255,255,0.07)" />
          {view === "front" ? (
            <>
              <path d="M35 27 q15 -5 30 0 l3 8 q-18 6 -36 0 z" {...grp("Shoulders")} />
              <path d="M34 36 h32 v16 q-16 6 -32 0 z" {...grp("Chest")} />
              <path d="M37 53 h26 v26 h-26 z" {...grp("Core")} />
              <path d="M28 30 l7 3 -3 22 -8 -3 z" {...grp("Biceps")} />
              <path d="M72 30 l-7 3 3 22 8 -3 z" {...grp("Biceps")} />
              <path d="M38 80 h10 l-2 40 h-9 z" {...grp("Legs")} />
              <path d="M62 80 h-10 l2 40 h9 z" {...grp("Legs")} />
              <path d="M37 122 h8 l-1 20 h-7 z" {...grp("Calves")} />
              <path d="M63 122 h-8 l1 20 h7 z" {...grp("Calves")} />
            </>
          ) : (
            <>
              <path d="M35 27 q15 -5 30 0 l3 8 q-18 6 -36 0 z" {...grp("Shoulders")} />
              <path d="M34 36 h32 l-4 30 h-24 z" {...grp("Back")} />
              <path d="M28 30 l7 3 -3 22 -8 -3 z" {...grp("Triceps")} />
              <path d="M72 30 l-7 3 3 22 8 -3 z" {...grp("Triceps")} />
              <path d="M37 68 h26 v14 h-26 z" {...grp("Glutes")} />
              <path d="M38 83 h10 l-2 38 h-9 z" {...grp("Hamstrings")} />
              <path d="M62 83 h-10 l2 38 h9 z" {...grp("Hamstrings")} />
              <path d="M37 122 h8 l-1 20 h-7 z" {...grp("Calves")} />
              <path d="M63 122 h-8 l1 20 h7 z" {...grp("Calves")} />
            </>
          )}
          <text x="50" y="149" textAnchor="middle" fontSize="6" fill="rgba(148,163,184,.8)">
            {view === "front" ? "FRONT" : "BACK"}
          </text>
        </svg>
      ))}
    </div>
  );
}

export function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="animate-rise relative max-h-[82vh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-border bg-card p-5 pb-8">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />
        <h3 className="mb-4 text-lg font-bold">{title}</h3>
        {children}
      </div>
    </div>
  );
}
