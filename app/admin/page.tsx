import { AdminTable } from "@/components/admin/AdminTable";
import { StatsCard } from "@/components/admin/StatsCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  adminStats,
  recentPurchases,
  recentUsers,
} from "@/data/admin";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {adminStats.map((stat) => (
          <StatsCard
            detail={stat.detail}
            key={stat.label}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-black">Үзэлтийн mock график</h2>
            <span className="text-sm font-bold text-orange-300">7 хоног</span>
          </div>
          <div className="flex h-72 items-end gap-3 rounded-2xl bg-black/35 p-5">
            {[42, 64, 48, 82, 70, 94, 76].map((height, index) => (
              <div className="flex flex-1 flex-col items-center gap-3" key={height}>
                <div
                  className="w-full rounded-t-2xl bg-gradient-to-t from-orange-600 to-orange-300"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs font-bold text-zinc-500">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
          <h2 className="text-2xl font-black">Сүүлийн хэрэглэгчид</h2>
          <div className="mt-5 space-y-3">
            {recentUsers.map((user) => (
              <div
                className="rounded-2xl border border-white/10 bg-black/30 p-4"
                key={user.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className="text-sm text-zinc-500">{user.email}</p>
                  </div>
                  <StatusBadge>{user.isVip ? "VIP" : user.status}</StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black">Сүүлийн худалдан авалт</h2>
        </div>
        <AdminTable>
          <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-zinc-500">
            <tr>
              <th className="px-5 py-4">ID</th>
              <th className="px-5 py-4">Хэрэглэгч</th>
              <th className="px-5 py-4">Бүтээгдэхүүн</th>
              <th className="px-5 py-4">Дүн</th>
              <th className="px-5 py-4">Төлөв</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {recentPurchases.map((purchase) => (
              <tr key={purchase.id}>
                <td className="px-5 py-4 font-bold">{purchase.id}</td>
                <td className="px-5 py-4 text-zinc-300">{purchase.user}</td>
                <td className="px-5 py-4 text-zinc-300">{purchase.item}</td>
                <td className="px-5 py-4 text-orange-300">{purchase.amount}</td>
                <td className="px-5 py-4">
                  <StatusBadge>{purchase.status}</StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      </section>
    </div>
  );
}
