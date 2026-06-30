type StatusBadgeProps = {
  children: string;
};

export function StatusBadge({ children }: StatusBadgeProps) {
  const tone = children.includes("Амжилттай") || children.includes("Идэвхтэй")
    ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-100"
    : children.includes("Хүлээгдэж")
      ? "border-yellow-300/40 bg-yellow-400/15 text-yellow-100"
      : children.includes("VIP")
        ? "border-yellow-300/40 bg-yellow-400/15 text-yellow-100"
        : "border-red-400/35 bg-red-500/12 text-red-100";

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${tone}`}>
      {children}
    </span>
  );
}
