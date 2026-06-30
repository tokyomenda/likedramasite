import type { Movie } from "@/types/movie";
import Link from "next/link";
import { MovieCard } from "@/components/movie/MovieCard";

type MovieSectionProps = {
  title: string;
  movies: Movie[];
  showRank?: boolean;
};

export function MovieSection({ title, movies, showRank = false }: MovieSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-orange-300">
            LikeDrama
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
            {title}
          </h2>
        </div>
        <Link
          className="hidden rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm font-semibold text-zinc-300 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:border-orange-400/50 hover:text-white sm:inline-flex"
          href={`/movies?section=${encodeURIComponent(title)}`}
        >
          Бүгдийг үзэх
        </Link>
      </div>

      <div className="-mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
        <div className="grid snap-x snap-mandatory grid-flow-col auto-cols-[minmax(170px,72vw)] gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-7 pt-2 [scrollbar-width:none] sm:auto-cols-[minmax(190px,30vw)] sm:px-6 md:auto-cols-[minmax(200px,24vw)] lg:auto-cols-[minmax(200px,18vw)] lg:px-8 xl:auto-cols-[minmax(200px,15.7vw)] [&::-webkit-scrollbar]:hidden">
          {movies.map((movie, index) => (
            <div className="snap-start" key={movie.id}>
              <MovieCard
                movie={movie}
                rank={showRank ? index + 1 : undefined}
              />
            </div>
          ))}
          <div aria-hidden="true" className="w-4 sm:w-6 lg:w-8" />
        </div>
      </div>
    </section>
  );
}
