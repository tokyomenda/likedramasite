type StatsCardProps = {
  label: string;
  value: string;
  detail: string;
};

export function StatsCard({ label, value, detail }: StatsCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-xl shadow-black/20">
      <p className="text-sm font-semibold text-zinc-400">{label}</p>
      <p className="mt-3 text-3xl font-black text-white">{value}</p>
      <p className="mt-2 text-xs font-semibold text-orange-300">{detail}</p>
    </article>
  );
}
