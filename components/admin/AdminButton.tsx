import type { ButtonHTMLAttributes, ReactNode } from "react";

type AdminButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
};

const variants = {
  primary: "bg-orange-500 text-white hover:bg-orange-400",
  secondary:
    "border border-white/10 bg-white/[0.06] text-zinc-100 hover:border-orange-400/50 hover:text-white",
  danger:
    "border border-red-400/30 bg-red-500/10 text-red-100 hover:bg-red-500/20",
};

export function AdminButton({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: AdminButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
