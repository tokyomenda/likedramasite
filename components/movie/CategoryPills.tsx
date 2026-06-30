type CategoryPillsProps = {
  categories: string[];
};

export function CategoryPills({ categories }: CategoryPillsProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex gap-3 overflow-x-auto pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category, index) => (
          <button
            className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 ${
              index === 0
                ? "border-orange-400 bg-orange-500 text-white shadow-[0_12px_35px_rgba(249,115,22,0.28)]"
                : "border-white/10 bg-white/[0.06] text-zinc-300 hover:border-orange-400/50 hover:bg-orange-500/10 hover:text-white"
            }`}
            key={category}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
