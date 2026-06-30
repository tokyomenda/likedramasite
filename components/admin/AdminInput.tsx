import type { InputHTMLAttributes } from "react";

type AdminInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function AdminInput({ label, className = "", ...props }: AdminInputProps) {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-sm font-semibold text-zinc-300">
          {label}
        </span>
      )}
      <input
        className={`h-11 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-400 ${className}`}
        {...props}
      />
    </label>
  );
}
