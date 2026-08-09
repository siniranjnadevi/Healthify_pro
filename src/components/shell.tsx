import { Link, useRouterState } from "@tanstack/react-router";
import { Dumbbell, Home, LineChart, Salad, User } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/workout", label: "Workout", icon: Dumbbell },
  { to: "/nutrition", label: "Nutrition", icon: Salad },
  { to: "/progress", label: "Progress", icon: LineChart },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md px-3 pb-3">
      <div className="glass flex items-center justify-between rounded-2xl px-2 py-2 shadow-[0_-8px_40px_-12px_rgba(0,0,0,.9)]">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(to + "/");
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "press flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-medium",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-12 items-center justify-center rounded-full transition-all",
                  active && "grad-brand shadow-[var(--shadow-glow)]",
                )}
              >
                <Icon size={17} />
              </span>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function AppShell({
  children,
  nav = true,
  className,
}: {
  children: ReactNode;
  nav?: boolean;
  className?: string;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <div className="pointer-events-none fixed -left-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-[100px]" />
      <div className="pointer-events-none fixed -right-24 top-40 h-72 w-72 rounded-full bg-secondary/15 blur-[110px]" />
      <div className="pointer-events-none fixed bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-[110px]" />
      <main
        className={cn(
          "relative mx-auto w-full max-w-md px-4 pt-6",
          nav ? "pb-28" : "pb-10",
          className,
        )}
      >
        {children}
      </main>
      {nav && <BottomNav />}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  right,
  back,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  back?: string;
}) {
  return (
    <header className="animate-rise mb-5 flex items-start justify-between gap-3">
      <div>
        {back && (
          <Link to={back} className="mb-1 block text-xs font-semibold text-secondary">
            ← Back
          </Link>
        )}
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}
