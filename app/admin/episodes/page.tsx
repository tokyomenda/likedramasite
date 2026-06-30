import { AdminButton } from "@/components/admin/AdminButton";
import { AdminInput } from "@/components/admin/AdminInput";
import { AdminSelect } from "@/components/admin/AdminSelect";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getMovieDetail } from "@/data/movieDetails";
import { movies } from "@/data/movies";

const selectedMovie = movies[0];
const episodes = getMovieDetail(selectedMovie).episodes.slice(0, 16);

export default function AdminEpisodesPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AdminSelect
            label="Кино сонгох"
            options={movies.slice(0, 8).map((movie) => movie.title)}
          />
          <AdminInput label="Анги дугаар" placeholder="1" type="number" />
          <AdminInput label="Гарчиг" placeholder="1-р анги" />
          <AdminInput label="Хугацаа" placeholder="46 мин" />
          <AdminInput label="Video URL" placeholder="/videos/demo.mp4" />
          <AdminInput label="Subtitle URL" placeholder="/subtitles/demo.vtt" />
          <AdminSelect label="VIP түгжээ" options={["Үгүй", "Тийм"]} />
          <AdminSelect label="Publish эсэх" options={["Нийтлэх", "Ноорог"]} />
        </div>
        <AdminButton className="mt-5">Анги нэмэх</AdminButton>
      </div>

      <AdminTable>
        <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-zinc-500">
          <tr>
            <th className="px-5 py-4">Дугаар</th>
            <th className="px-5 py-4">Гарчиг</th>
            <th className="px-5 py-4">Хугацаа</th>
            <th className="px-5 py-4">VIP</th>
            <th className="px-5 py-4">Төлөв</th>
            <th className="px-5 py-4">Үйлдэл</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {episodes.map((episode) => (
            <tr key={episode.number}>
              <td className="px-5 py-4 font-bold">{episode.number}</td>
              <td className="px-5 py-4 text-zinc-300">{episode.title}</td>
              <td className="px-5 py-4 text-zinc-300">{episode.duration}</td>
              <td className="px-5 py-4">
                <StatusBadge>{episode.isVipLocked ? "VIP" : "Идэвхтэй"}</StatusBadge>
              </td>
              <td className="px-5 py-4">
                <StatusBadge>Идэвхтэй</StatusBadge>
              </td>
              <td className="px-5 py-4">
                <div className="flex gap-2">
                  <AdminButton variant="secondary">Засах</AdminButton>
                  <AdminButton variant="danger">Устгах</AdminButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
}
