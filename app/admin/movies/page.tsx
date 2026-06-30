import { AdminButton } from "@/components/admin/AdminButton";
import { AdminInput } from "@/components/admin/AdminInput";
import { AdminSelect } from "@/components/admin/AdminSelect";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { movies, categories } from "@/data/movies";

export default function AdminMoviesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="grid gap-4 md:grid-cols-3">
          <AdminInput placeholder="Кино хайх..." />
          <AdminSelect options={["Бүх төрөл", ...categories]} />
          <AdminSelect options={["Бүх төлөв", "Нийтлэгдсэн", "Ноорог"]} />
        </div>
        <AdminButton>Кино нэмэх</AdminButton>
      </div>

      <AdminTable>
        <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-zinc-500">
          <tr>
            <th className="px-5 py-4">Постер</th>
            <th className="px-5 py-4">Нэр</th>
            <th className="px-5 py-4">Төрөл</th>
            <th className="px-5 py-4">Он</th>
            <th className="px-5 py-4">Үнэ</th>
            <th className="px-5 py-4">Төлөв</th>
            <th className="px-5 py-4">Үйлдэл</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {movies.slice(0, 10).map((movie) => (
            <tr key={movie.id}>
              <td className="px-5 py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={movie.title}
                  className="h-16 w-11 rounded-lg object-cover"
                  src={movie.posterUrl}
                />
              </td>
              <td className="px-5 py-4 font-bold">{movie.title}</td>
              <td className="px-5 py-4 text-zinc-300">{movie.genre}</td>
              <td className="px-5 py-4 text-zinc-300">{movie.year}</td>
              <td className="px-5 py-4 text-orange-300">{movie.price}</td>
              <td className="px-5 py-4">
                <StatusBadge>
                  {movie.isFree ? "Үнэгүй" : movie.isVip ? "VIP" : "Идэвхтэй"}
                </StatusBadge>
              </td>
              <td className="px-5 py-4">
                <div className="flex flex-wrap gap-2">
                  <AdminButton variant="secondary">Засах</AdminButton>
                  <AdminButton variant="secondary">Нуух</AdminButton>
                  <AdminButton variant="danger">Устгах</AdminButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>

      <div className="flex justify-end gap-2">
        <AdminButton variant="secondary">Өмнөх</AdminButton>
        <AdminButton variant="secondary">Дараах</AdminButton>
      </div>
    </div>
  );
}
