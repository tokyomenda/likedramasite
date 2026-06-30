import type { SelectHTMLAttributes } from "react";

type AdminSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: string[];
};

export function AdminSelect({
  label,
  options,
  className = "",
  ...props
}: AdminSelectProps) {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-sm font-semibold text-zinc-300">
          {label}
        </span>
      )}
      <select
        className={`h-11 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 text-sm text-white outline-none transition focus:border-orange-400 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
