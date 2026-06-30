"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Хянах самбар" },
  { href: "/admin/movies", label: "Кинонууд" },
  { href: "/admin/episodes", label: "Ангиуд" },
  { href: "/admin/banners", label: "Баннер" },
  { href: "/admin/users", label: "Хэрэглэгчид" },
  { href: "/admin/vip", label: "VIP багц" },
  { href: "/admin/payments", label: "Төлбөрүүд" },
  { href: "/admin/settings", label: "Тохиргоо" },
];

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
};

export function AdminSidebar({ isOpen, onClose, onLogout }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <button
        aria-label="Цэс хаах"
        className={`fixed inset-0 z-40 bg-black/70 transition lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        type="button"
      />
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-zinc-950 p-5 transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link className="text-2xl font-black tracking-wide text-white" href="/">
          Like<span className="text-orange-400">Drama</span>
        </Link>
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">
          Админ самбар
        </p>

        <nav className="mt-8 flex flex-1 flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                className={`rounded-2xl px-4 py-3 text-sm font-bold transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-zinc-300 hover:bg-white/[0.07] hover:text-white"
                }`}
                href={link.href}
                key={link.href}
                onClick={onClose}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-left text-sm font-bold text-red-100 transition hover:bg-red-500/20"
          onClick={onLogout}
          type="button"
        >
          Админ горимоос гарах
        </button>
      </aside>
    </>
  );
}
