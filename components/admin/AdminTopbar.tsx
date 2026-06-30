"use client";

type AdminTopbarProps = {
  title: string;
  onMenuClick: () => void;
};

export function AdminTopbar({ title, onMenuClick }: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/72 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white lg:hidden"
            onClick={onMenuClick}
            type="button"
          >
            ☰
          </button>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-300">
              LikeDrama
            </p>
            <h1 className="text-xl font-black text-white sm:text-2xl">{title}</h1>
          </div>
        </div>
        <div className="hidden rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-bold text-zinc-200 sm:block">
          admin@likedrama.mn
        </div>
      </div>
    </header>
  );
}
