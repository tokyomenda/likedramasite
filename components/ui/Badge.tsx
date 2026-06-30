import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "orange" | "dark" | "green" | "gold" | "light";
  className?: string;
};

const tones = {
  orange:
    "border-orange-300/70 bg-orange-500 text-white shadow-[0_8px_24px_rgba(249,115,22,0.38)]",
  dark: "border-white/10 bg-black/45 text-zinc-200",
  green: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
  gold: "border-yellow-300/40 bg-yellow-400/15 text-yellow-100",
  light: "border-white/20 bg-white/12 text-white",
};

export function Badge({ children, tone = "dark", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
