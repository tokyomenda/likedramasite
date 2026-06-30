import { AdminButton } from "@/components/admin/AdminButton";
import { AdminInput } from "@/components/admin/AdminInput";
import { AdminSelect } from "@/components/admin/AdminSelect";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { heroBanners } from "@/data/admin";

export default function AdminBannersPage() {
  const preview = heroBanners[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
      <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
        <h2 className="text-2xl font-black">Баннер удирдах</h2>
        <div className="mt-6 grid gap-4">
          <AdminInput label="Banner image URL" defaultValue={preview.imageUrl} />
          <AdminInput label="Гарчиг" defaultValue={preview.title} />
          <AdminInput label="Тайлбар" defaultValue={preview.description} />
          <AdminInput label="Watch button link" defaultValue={preview.watchLink} />
          <AdminInput label="Trailer button link" defaultValue={preview.trailerLink} />
          <AdminSelect label="Active status" options={["Идэвхтэй", "Идэвхгүй"]} />
        </div>
        <AdminButton className="mt-6">Хадгалах</AdminButton>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black">Preview</h2>
          <StatusBadge>Идэвхтэй</StatusBadge>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={preview.title}
            className="h-56 w-full object-cover"
            src={preview.imageUrl}
          />
          <div className="p-5">
            <h3 className="text-2xl font-black">{preview.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">
              {preview.description}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
