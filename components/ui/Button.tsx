import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "bg-orange-500 text-white shadow-[0_16px_45px_rgba(249,115,22,0.35)] hover:bg-orange-400",
  secondary:
    "border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/[0.18]",
  ghost: "text-zinc-200 hover:bg-white/10 hover:text-white",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
