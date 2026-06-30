"use client";

/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { usePublicMovies } from "@/hooks/usePublicMovies";

type SearchOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const { movies } = usePublicMovies();

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return movies.slice(0, 8);
    }

    return movies
      .filter((movie) => {
        const searchable = [
          movie.title,
          movie.genre,
          movie.country,
          movie.description,
          ...movie.tags,
        ]
          .join(" ")
          .toLowerCase();

        return searchable.includes(normalizedQuery);
      })
      .slice(0, 10);
  }, [movies, query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/92 px-4 py-6 text-white backdrop-blur-2xl sm:px-6"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-between gap-4">
              <span className="text-2xl font-black tracking-wide">
                Like<span className="text-orange-400">Drama</span>
              </span>
              <button
                aria-label="Хайлт хаах"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-2xl text-white transition hover:border-orange-400/50 hover:bg-orange-500/10"
                onClick={onClose}
                type="button"
              >
                ×
              </button>
            </div>

            <motion.div
              animate={{ y: 0, opacity: 1 }}
              className="mt-10"
              initial={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <label className="sr-only" htmlFor="movie-search">
                Кино хайх
              </label>
              <div className="relative">
                <input
                  autoFocus
                  className="h-16 w-full rounded-full border border-white/10 bg-white/[0.07] px-6 pr-14 text-lg font-semibold text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-400/70 focus:bg-white/[0.1]"
                  id="movie-search"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Кино, төрөл, улс хайх..."
                  value={query}
                />
                <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-zinc-400">
                  ⌕
                </span>
              </div>
            </motion.div>

            <div className="mt-8 grid gap-3">
              {results.map((movie, index) => (
                <motion.a
                  animate={{ y: 0, opacity: 1 }}
                  className="group grid grid-cols-[74px_1fr] gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-3 transition hover:border-orange-400/50 hover:bg-white/[0.08]"
                  href={`/movie/${movie.id}`}
                  initial={{ y: 12, opacity: 0 }}
                  key={movie.id}
                  onClick={onClose}
                  transition={{ delay: index * 0.035 }}
                >
                  <img
                    alt={movie.title}
                    className="h-24 w-[74px] rounded-xl object-cover"
                    src={movie.posterUrl}
                  />
                  <div className="min-w-0 py-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-base font-bold text-white">
                        {movie.title}
                      </h2>
                      {movie.isVip && <Badge tone="gold">VIP</Badge>}
                      {movie.isFree && <Badge tone="green">Үнэгүй</Badge>}
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">
                      {movie.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-zinc-500">
                      <span>★ {movie.rating}</span>
                      <span>{movie.year}</span>
                      <span>{movie.genre}</span>
                      <span>{movie.episodes} анги</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {results.length === 0 && (
              <p className="mt-12 text-center text-zinc-400">
                Илэрц олдсонгүй. Өөр түлхүүр үгээр хайгаарай.
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
