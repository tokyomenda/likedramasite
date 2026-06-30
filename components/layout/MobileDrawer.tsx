"use client";

import Link from "next/link";

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ label: string; href: string }>;
  userName?: string;
  onLogout?: () => void;
  onLoginClick?: () => void;
};

export function MobileDrawer({
  isOpen,
  onClose,
  links,
  userName,
  onLogout,
  onLoginClick,
}: MobileDrawerProps) {
  const handleLogout = () => {
    onLogout?.();
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        aria-label="Цэс хаах"
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        type="button"
      />
      <aside
        className={`absolute right-0 top-0 h-full w-80 max-w-[86vw] border-l border-white/10 bg-zinc-950/96 p-6 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xl font-black tracking-wide text-white">
            Like<span className="text-orange-400">Drama</span>
          </span>
          <button
            aria-label="Цэс хаах"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-2xl text-white transition hover:bg-white/10"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <nav className="mt-9 flex flex-col gap-2">
          {links.map((link) => (
            <Link
              className="rounded-2xl px-4 py-3 text-base font-semibold text-zinc-200 transition hover:bg-white/10 hover:text-white"
              href={link.href}
              key={link.href}
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 border-t border-white/10 pt-6">
          {userName ? (
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold text-white">
                {userName}
              </div>
              <button
                className="w-full rounded-full border border-orange-400/45 px-5 py-3 text-sm font-bold text-orange-100 transition hover:bg-orange-500/15"
                onClick={handleLogout}
                type="button"
              >
                Гарах
              </button>
            </div>
          ) : (
            <button
              className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-[0_16px_45px_rgba(249,115,22,0.35)] transition hover:bg-orange-400"
              onClick={() => {
                onClose();
                onLoginClick?.();
              }}
              type="button"
            >
              Нэвтрэх
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
