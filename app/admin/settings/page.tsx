import { AdminButton } from "@/components/admin/AdminButton";
import { AdminInput } from "@/components/admin/AdminInput";

export default function AdminSettingsPage() {
  return (
    <section className="max-w-4xl rounded-3xl border border-white/10 bg-white/[0.035] p-6">
      <h2 className="text-2xl font-black">Сайтын тохиргоо</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <AdminInput label="Site name" defaultValue="LikeDrama" />
        <AdminInput label="Logo text" defaultValue="LikeDrama" />
        <AdminInput label="Contact email" defaultValue="hello@likedrama.mn" />
        <AdminInput label="Facebook link" defaultValue="https://facebook.com/likedrama" />
        <AdminInput label="Terms link" defaultValue="/terms" />
        <AdminInput label="Privacy link" defaultValue="/privacy" />
        <AdminInput label="SEO title" defaultValue="LikeDrama" />
        <AdminInput
          label="SEO description"
          defaultValue="Кино, драма, VIP контент үзэх платформ."
        />
      </div>
      <AdminButton className="mt-6">Хадгалах</AdminButton>
    </section>
  );
}
