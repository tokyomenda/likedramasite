import { AdminButton } from "@/components/admin/AdminButton";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { vipPlans } from "@/data/admin";

export default function AdminVipPage() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {vipPlans.map((plan) => (
        <article
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
          key={plan.id}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">{plan.name}</h2>
              <p className="mt-2 text-sm text-zinc-400">{plan.duration}</p>
            </div>
            <StatusBadge>{plan.active ? "Идэвхтэй" : "Идэвхгүй"}</StatusBadge>
          </div>
          <p className="mt-6 text-4xl font-black text-orange-300">{plan.price}</p>
          <ul className="mt-6 space-y-3 text-sm text-zinc-300">
            {plan.benefits.map((benefit) => (
              <li key={benefit}>• {benefit}</li>
            ))}
          </ul>
          <div className="mt-6 flex gap-2">
            <AdminButton>Нэмэх</AdminButton>
            <AdminButton variant="secondary">Засах</AdminButton>
          </div>
        </article>
      ))}
    </div>
  );
}
